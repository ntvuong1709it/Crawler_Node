<template>
  <div id="wrapper">
    <div class="doc">
      <button style="float:right" class="alt" @click="startCrawl()">Start</button>
      <router-link to="/">Back</router-link>
      <br /> <br>
      <div> 
        <span>Extract URLs</span>
      </div>
      <div>
        <textarea style="resize:none" v-model="extractUrls" rows="50" cols="155"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
  const Crawler = require("crawler");
  import DbConnection from '../../db/connection';
  import Item from '../../db/models/item';
  import JQuery from 'jquery'
  let $ = JQuery

  export default {
    data () {
      return {
        db: {},
        extractUrls: `https://www.amazon.com/dp/B00N0IHMXM, https://www.amazon.com/dp/B009FUF6DM`,
        crawlUrls: [],
        count: 0
      }
    },
    created () {
      this.db = new DbConnection();
      this.db.connect("mongodb://localhost:27017/scraper");
    },
    methods: {
      initCrawler() {
        return new Crawler({
          rateLimit: 1000,
          callback: (err, res, done) => {
            if(err) {
              console.log(err);
            } else {
              var $ = res.$;
              var item = new Item();

              var totalReview = $(".totalReviewCount").text().trim();
              item.totalReview = Number(totalReview.replace(/,/g, '.'));

              item.productTitle = $("#productTitle").text().trim();
              item.rating = $("#acrPopover").attr("title");
              item.price = $("#priceblock_ourprice").text().trim();
              item.asin = $("#ASIN").val();

              $('[data-hook=recent-review]').each((i, element) => {
                var review = {};

                review.reviewer = $(element).find('.a-profile-name').text().trim();
                review.rating = $(element).find('.a-icon-alt').text().trim();
                review.title = $(element).find('[data-hook=review-title-recent]').text().trim();
                review.content = $(element).find('[data-hook=review-body-recent]').text().trim();

                item.recentReviews.push(review);
              });

              this.db.findOneAndUpdate(item);
            }
            done();
          }
        });
      },
      startCrawl(urls) {
        var c = this.initCrawler();
        var urls = this.extractUrls.split(",");
        if(urls.length > 0) {
          c.queue(urls);
        }
      }
    }
  }
</script>

<style scoped>
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items { margin-top: 8px; }

  .item {
    display: flex;
    margin-bottom: 6px;
  }

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .item .value {
    color: #35495e;
    font-weight: bold;
  }
</style>
