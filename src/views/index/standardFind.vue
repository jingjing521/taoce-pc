<template>
  <div
    class="container main_home max_width main main_width padding margin-bottom shadow"
    style="margin:15px auto;"
  >
    <div class="find-blue-title margin-bottom">标准查询</div>
    <div class="server-content">
      <el-form :inline="true" :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
        <el-form-item label="标准号">
          <el-input v-model="ruleForm.bzbh" style="width:200px" placeholder="请输入标准号" maxlength="6"></el-input>
        </el-form-item>
        <el-form-item label="标准名称">
          <el-input v-model="ruleForm.bzmc" style="width:200px" placeholder="请输入标准名称" maxlength="11"></el-input>
        </el-form-item>
        <!-- <el-form-item label="验证码">
          <el-input v-model="ruleForm.code" style="width:200px" placeholder="请输入验证码" maxlength="6"></el-input>
          <el-button type="primary">获取验证码</el-button>
        </el-form-item> -->
      </el-form>
      <div class="padding text-center">
        <el-button type="primary" @click="search()">搜索</el-button>
      </div>
    </div>
    <div style="padding-top:10px" id="divList" v-loading="loading">
      <ul class="release-a" v-for="(item, index)  in list" :key="index">
        <li class="release-rq">
          <div> 
            <span style="width:250px;display:inline-block;" class="release-r">{{item.bzbh}}</span> 
            <span class="margin-left">{{item.zhmc}}</span>
          </div>
          <div class="release-n" style="margin-top:10px;">
            <span style="width:250px;display:inline-block;">发布日期：{{item.publishTime}}</span> 
            <span class="margin-left">实施日期：{{item.bzbh}}</span>
          </div>
        </li>
        <li class="release-tb"> 
          <el-tag  effect="dark" size="small" v-if="item.status == '1'"> 现行 </el-tag>
          <el-tag  effect="dark" size="small" v-if="item.status == '2'" type="info"> 废弃 </el-tag>
          <el-button type="primary" size="small" class="margin-left" @click="view(item.bzfj)">阅览</el-button>
           
        </li>
      </ul> 
      <div class="block" style="text-align:right;margin-top:30px;margin-bottom:30px;">
        <el-pagination hide-on-single-page :page-size="pageSize" background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { isEmpty } from "@/utils";
export default {
  data() {
    return {
      loading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      input3: "",
      select: "1",
      list: [],
      ruleForm: {
        name: "",
        no: "",
        captcha: ""
      }
    };
  },
 created() {
    this.getList();
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    view(url){ 
      window.open(url,'_blank') 
    },
    search(){ 
      this.currentPage = 1;
      this.getList();
    },
     getList() {
      this.$fetch("/api/standardquery/list", { 
        limit: this.pageSize, 
        page: this.currentPage,
        bzbh:this.ruleForm.bzbh,
        bzmc: this.$route.query.mc ? this.$route.query.mc : this.ruleForm.bzmc
      }).then(response => {
        this.loading = false;
        if (response.code == 0) {
          this.list = response.data.records;
          this.total = response.data.total;
        } else {
          this.$message.error(response.msg);
        }
      });
    },  
  }
};
</script>
<style>
.find-blue-title {
  display: inline-block;
  font-size: 18px;
  color: #2291f7;
  border-bottom: 2px solid #2291f7;
  font-weight: bold;
}
.shadow {
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 -4px 30px 2px rgba(0, 0, 0, 0.1);
}
.release-a {
    width: 1098px;
    height: 87px;
    margin-left: 20px;
    margin-top: 15px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    align-items: center;
}
.release-r{
  font-size: 17px;
  font-weight: bold;
    color: #4a74bc;
}
</style>
 


 