<template>
  <div class="container main_home max_width main main_width padding" style="margin-top:10px;margin-bottom:10px;" v-loading="loading" id="ask">
    <div>
      <ul>
        <li v-for="(item,index) in list" :key="index" class="margin-bottom" style="display:flex;">
          <div style="height:180px;width:300px;overflow: hidden;"><img :src="item.cover" alt="" style="width:100%;overflow: hidden;"></div>
          <div class="des">
            <div class="name">{{item.title}}</div>
            <div class="time">{{item.createTime.slice(0,10)}}</div>
            <div class="content">{{item.content}}...</div> 
            <div><el-button type="primary" size="small" @click="goDetail(item.id)" style="background:#00b8db;border-color: #00b8db;">查看更多</el-button></div>
          </div>
        </li>
      </ul>
    </div>
    <div class="block" style="text-align:right;margin-top:30px;margin-bottom:30px;">
      <el-pagination hide-on-single-page :page-size="pageSize" background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      loading: true,
      currentPage: 1,
      pageSize: 20,
      total: 0
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      var _this = this;
      this.$fetch("/api/knowledge/list", {
        limit: _this.pageSize,
        page: _this.currentPage
      }).then(response => {
        _this.loading = false;
        if (response.code == 0) {
          _this.list = response.data.records;
          _this.total = response.data.total;
        } else {
          _this.$message.error(response.msg);
        }
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val; this.getList();
    },
    goDetail(id) {
      this.$router.push({ path: "/test-knowledge-detail", query: { id: id } });
    }
  }
};
</script>
<style scoped>
#ask {
  box-shadow: 0 -4px 30px 2px rgba(0, 0, 0, 0.1);
}
#ask .name {
  font-size: 16px;
  color: #00b8db;
}
#ask .time{
  font-weight: bold;
  font-size: 14px;
}
#ask .content {
  font-size: 14px;
}
#ask .des {
  padding: 20px 30px 20px 20px;
  
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>


 