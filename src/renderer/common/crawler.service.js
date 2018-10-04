import DbConnection from '../db/connection';
import Item from '../db/models/item';
const Crawler = require("crawler");

export default class CrawlerService {
  constructor() {
    this.db = new DbConnection();
    this.db.connect();
  }

  initCrawler() {
    return new Crawler({
      rateLimit: 1000,
      callback: (err, res, done) => {
        if (err) {
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
  }
  startCrawl(urls) {
    var c = this.initCrawler();
    urls = urls.split(",");
    if (urls.length > 0) {
      console.log("Starting crawling ...");
      c.queue(urls);
    }
  }
}