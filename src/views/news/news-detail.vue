<template>
  <div class="gl1-news-content">
    <div>
      <h1>
        <router-link to="/news">
          <span id="newtoold">《 新闻中心</span>
        </router-link>
      </h1>
    </div>
    <div class="gl1-news-cont">
      <div class="gl1-news-left">
        <div class="gl1-newsdetails-title">
          <h1>{{detail.title}}</h1>
          <div class="gl1-newsdetails-time"> 
            <span>时间：{{detail.createTime}}</span>
          </div>
        </div>
        <div class="gl1-newsdetails-cont" v-html="detail.content"></div>
      </div>
      <div class="gl1-news-right">
        <div class="gl1-news-two">
          <h1 class="gl1-news-h gl1-news-h1">
            <span class="gl1-blue1-title" id="todaytitle3">今日推荐</span>
          </h1>
          <ul class="gl1-news-twoul" id="todayNews3">
            <li v-for="(item, index)  in todayList" :key="index" @click="goDetail(item.id)">
              <a data-id="10" href="javascript:;">
                <span>{{item.title}}</span>
                <em></em>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject:['reload'],
  data() {
    return {
      todayList: [],
      detail: ""
    };
  },
  created() {
    var _this = this;
    _this.getList();
    this.$post("/api/news/info?news_id=" + _this.$route.query.id, {}).then(
      response => {
        if (response.code == 0) {
          _this.detail = response.data;
        } else {
          _this.$message.error(response.msg);
        }
      }
    );
  },
  methods: {
    goDetail(id) {
      this.reload();
      this.$router.push({ path: "/news-detail", query: { id: id } });
    },
    getList() {
      var _this = this;
      this.$fetch("/api/news/list", { limit: 5, page: 1 }).then(response => {
        _this.loading = false;
        if (response.code == 0) {
          _this.todayList = response.data.records;
          _this.total = response.data.total;
        } else {
          _this.$message.error(response.msg);
        }
      });
    }
  }
};
</script>
<style>
@import "../../style/news.css";
</style>
