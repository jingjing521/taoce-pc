<template>
  <div class="gl1-news-content">
    <div>
      <h1>
        <router-link to="/test-knowledge">
          <span id="newtoold">《 检测知识</span>
        </router-link>
      </h1>
    </div>
    <div class="gl1-news-cont">
      <div class="gl1-news-left" style="width:100%;">
        <div class="gl1-newsdetails-title">
          <h1>{{detail.title}}</h1>
          <div class="gl1-newsdetails-time"> 
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
  data() {
    return { 
      detail: ""
    };
  },
  created() {
    var _this = this; 
    this.$post("/api/knowledge/info?news_id=" + _this.$route.query.id, {}).then(
      response => {
        if (response.code == 0) {
          _this.detail = response.data;
        } else {
          _this.$message.error(response.msg);
        }
      }
    );
  },
  methods: {}
};
</script>
<style>
@import "../../style/news.css";
</style>













 