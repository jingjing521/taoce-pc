<template>
  <div class="container main_home max_width main main_width padding margin-bottom shadow" style="margin:15px auto;">
    <div class="find-blue-title margin-bottom">证书查询</div>
    <div class="server-content">
      <el-form :inline="true" ref="ruleForm" label-width="100px" class="demo-ruleForm"  >
        <el-form-item label="" prop="name">
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select" style="width:300px">
            <el-select v-model="select" slot="prepend" placeholder="请选择" style="width:120px">
              <el-option label="证书编号" value="1"></el-option>
              <!-- <el-option label="申请人" value="2"></el-option>
              <el-option label="制造商" value="3"></el-option>
              <el-option label="生产厂" value="4"></el-option>
              <el-option label="工厂编号" value="5"></el-option>
              <el-option label="产品名称" value="6"></el-option>
              <el-option label="产品型号" value="7"></el-option>
              <el-option label="模糊查询" value="8"></el-option> -->
            </el-select>
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="手机号" prop="name">
          <el-input v-model="ruleForm.name" style="width:300px" placeholder="请输入手机号码" maxlength="11"></el-input>
          <el-button type="primary" @click="submitForm('ruleForm')" class="margin-left">获取验证码</el-button>
        </el-form-item>
        <el-form-item label="验证码" prop="name">
          <el-input v-model="ruleForm.name" style="width:300px" placeholder="请输入验证码" maxlength="6"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="search()">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="list" border style="width: 100%">
        <el-table-column label="#" type="index" align="center"></el-table-column>
        <el-table-column prop="ceNo" label="证书编号" align="center" min-width="120px"></el-table-column>
        <el-table-column prop="ceUser" label="申请人" align="center" min-width="120px"></el-table-column>
        <el-table-column prop="zzsdwmc" label="制造商" align="center" min-width="120px"></el-table-column>
        <el-table-column prop="scsdwmc" label="生产商" align="center" min-width="120px"></el-table-column>
        <el-table-column prop="cpmc" label="产品名称" align="center" min-width="120px"></el-table-column>
        <el-table-column prop="xhgg" label="型号/规格" align="center" min-width="120px"></el-table-column>
        <el-table-column prop="bzmc" label="标准" align="center"></el-table-column>
        <el-table-column prop="ceStartTime" label="发证日期" align="center" min-width="180px"></el-table-column>
        <el-table-column prop="ceFirstStartTime" label="首次签发日期" align="center" min-width="180px"></el-table-column>
        <el-table-column prop="ceEndTime" label="证书有效期至" align="center" min-width="180px"></el-table-column>
        <el-table-column prop="ceStatus" label="现状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.ceStatus == '1'">有效</span>
            <span v-if="scope.row.ceStatus == '2'">暂停</span>
            <span v-if="scope.row.ceStatus == '3'">撤销</span>
          </template>
        </el-table-column>
        <el-table-column prop="ceStatusUpdadeTime" label="发证机构" align="center" min-width="200px"></el-table-column>
        <el-table-column prop="remark" label="原因" align="center"></el-table-column>
        <el-table-column prop="ceFile" label="附件" align="center">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
              附件
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { isEmpty } from "@/utils";
export default {
  data() {
    return {
      input3: '',
      select: '1',
      list: [],
      loading:true,
      currentPage: 1,
      pageSize: 30,
      total:0,
      input3:''
    }
  },
  created() { 
    if (!window.localStorage.getItem("paoce_token")) {
      this.$router.push({ path: "/login" });
      return;
    }
     
  },
  methods: {
    search(){
      if (isEmpty(this.input3)) {
        this.$message.error("请输入要搜索的内容");
        return;
      }
      this.getList();
    },
    getList() {
      this.$fetch("/api/ordercertificate/list", { zsbh : this.input3 }).then(response => {
        this.loading = false;
        if (response.code == 0) {
          this.list = response.data; 
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
</style>

 


 