<template>
  <div class="content main_width" v-loading="loading">
    <el-row :gutter="20">
      <el-col :span="4" v-for="(item, index)  in list" :key="index">
        <div class="grid-content text-center" style="padding-top:10px;cursor: pointer;" @click="goDetail(item.id)">
          <img v-if="item.logo" :src="item.logo" alt="" style="width:200px;height:100px;margin:auto;">
          <img v-else src="@/assets/logo/logo.png" alt="" style="width:200px;height:100px;margin:auto;">
          <div class="text-center text-sm" style="margin:10px 0">{{item.mc}}</div>
        </div>
      </el-col>
    </el-row>
    <div class="block" style="text-align:right;margin-top:30px;margin-bottom:30px;">
      <el-pagination hide-on-single-page  :page-size="pageSize" background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange" ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading:true,
      currentPage: 1,
      pageSize: 30,
      total:0,
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取机构列表  
    getList() {
      var _this = this;
      this.$fetch("/api/user/agencyList", {
        limit: _this.pageSize,
        page: _this.currentPage,
        mc: _this.$route.query.mc
      }).then(response => { 
        _this.loading = false;
        if (response.code == 0) {
          _this.list = response.data.records;
          _this.total = response.data.total;
        }else{
          _this.$message.error(response.msg);
        }
      });
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    goDetail(id) {
      this.$router.push({ path: "/server", query: { id: id}});
    }
  }
};
</script> 
