<template>
  <div class="gl1-news-content">
    <div>
      <h1>
        <router-link to="/answer">
          <span id="newtoold">《 问答中心</span>
        </router-link>
      </h1>
    </div>
    <div class="gl1-news-cont">
      <div class="gl1-news-left" style="width:100%;">
        <div class="gl1-newsdetails-title">
          <h1>{{detail.title}}</h1>
          <div class="gl1-newsdetails-time">
            <!-- <span>来源：浙江市场监管矩阵</span>
            <span>关键字：
              <a href="http://zljweb.com/" style="color:red" target="_blank">浙里检 小微企业 助力</a>
            </span>-->
            <span>时间：{{detail.createTime}}</span>
          </div>
        </div>
        <div class="gl1-newsdetails-cont" v-html="detail.content"></div>
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
    this.$post("/api/ask/info?news_id=" + _this.$route.query.id, {}).then(
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
