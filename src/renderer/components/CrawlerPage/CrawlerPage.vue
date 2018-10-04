<template>
  <div id="wrapper">
    <div class="doc">
      <router-link to="/">Back</router-link>
      <button style="float:right" class="alt" @click="startCrawl()">Start</button>
      <button style="float:right" class="alt" @click="viewScheduler()">View scheduler dashboard</button>
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
  import Scheduler from '../../scheduler/scheduler'
  import CrawlerService from '../../common/crawler.service'

  export default {
    data () {
      return {
        db: {},
        scheduler: {},
        extractUrls: `https://www.amazon.com/dp/B00N0IHMXM, https://www.amazon.com/dp/B009FUF6DM`,
        crawlUrls: [],
      }
    },
    created () {
      this.scheduler = new Scheduler();
    },
    methods: {
      viewScheduler() {
        var shell = require('electron').shell;
                         event.preventDefault();
                          shell.openExternal('http://localhost:3000/');
      },
      startCrawl() {
        this.scheduler.runEveryMinute(this.extractUrls);
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
