<template>
  <div class="main_width customer">
    <div class="gl2-wddd_d">
      <div class="top_title">
        <strong>我的消息</strong>
      </div> 
    </div>
    <div class="bg-white padding" v-loading="loading">
      <el-collapse accordion v-if="list.length > 0">
        <el-collapse-item v-for="(item, index)  in list" :key="index" :name="index">
          <template slot="title"> 
            <div class="flex justify-between text-df" style="width: 100%;">
              <div>{{item.createTime}} {{item.title}}</div>
              <div>{{item.mtype == '2' ? '认证类型':'订单类型'}}</div> 
            </div>
          </template>
          <div>{{item.msg}}</div>
        </el-collapse-item> 
      </el-collapse>
      <div v-else style="text-align:center;font-size:15px;" class="padding">
        暂无数据
      </div>
    </div>
    <div class="block bg-white padding" style="text-align:right;">
      <el-pagination hide-on-single-page  :page-size="pageSize" background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange" ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { 
      list:[], 
      loading:true,
      currentPage: 1,
      pageSize: 10,
      total:0
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      var _this = this;
      this.$fetch("/api/user/userNoticeMsgList", { limit: _this.pageSize, page: _this.currentPage }).then(response => {
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
      this.currentPage = val;
      this.getList();
    }
  }
};
</script>
<style>
@import "../../style/customer.css";
</style>