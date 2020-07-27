<template>
  <div class="gl1-news-content" v-loading="loading">
    <div class="gl1-news-cont">
      <div class="gl1-news-left">
        <div class="gl1-news-one">
          <h1 class="gl1-news-h">
            <span class="gl1-blue-title" id="todaytitle1">新闻中心</span>
          </h1>
          <ul class="gl1-news-ul" id="todayNews1">
            <li v-for="(item, index)  in list" :key="index" @click="goDetail(item.id)">
              <a data-id="111" href="javascript:;">
                <span class="padding-right" style="font-weight: bold;">{{item.createTime.slice(0,10)}}</span>
                <span style="color:#409EFF">{{item.title}}</span>
                <em></em>
              </a>
            </li>
          </ul>
        </div>
        <div class="block" style="text-align:right;margin-top:30px;margin-bottom:30px;">
          <el-pagination hide-on-single-page  :page-size="pageSize" background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange" ></el-pagination>
        </div>
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
  data() { 
    return {
      list: [],
      todayList: [],
      loading:true,
      currentPage: 1,
      pageSize: 10,
      total:0
    };
  },
  created() {
    this.getList();
    this.getTodayList();
  },
  methods: {
    //获取新闻列表
    getList() {
      var _this = this;
      this.$fetch("/api/news/list", { limit: _this.pageSize, page: _this.currentPage }).then(response => {
        _this.loading = false;
        if (response.code == 0) {
          _this.list = response.data.records;
          _this.total = response.data.total;
        } else {
          _this.$message.error(response.msg);
        }
      });
    },
    getTodayList(){
      var _this = this;
      this.$fetch("/api/news/list", { limit: 5, page: 1 }).then(response => {
        _this.loading = false;
        if (response.code == 0) {
          _this.todayList = response.data.records; 
        } else {
          _this.$message.error(response.msg);
        }
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    goDetail(id) {
      this.$router.push({ path: "/news-detail", query: { id: id } });
    }
  }
};
</script>
<style>
@import "../../style/news.css";
</style>
