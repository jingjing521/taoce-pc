<template>
  <div class="main_width customer" id="user-auth">
    <div class="gl2-wddd_d"><div class="top_title"><strong>用户认证</strong></div></div>
    <div class="bg-white padding">
      <el-row :gutter="20" type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <div class="text-center auth-item" style="border:3px solid #b3d8ff"> 
            <div class="gl3-certification-img">
              <img src="@/assets/icon/enterprisecertification.png" alt="">
            </div>
            <router-link to="/enterpriseList">
              <el-button type="primary" plain style="width: 50%;">企业认证</el-button>
            </router-link>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="text-center auth-item" style=""> 
            <div class="gl3-certification-img">
              <img src="@/assets/icon/personalcertificate.png" alt="">
            </div>
            <router-link to="/personal">
              <el-button type="primary" plain style="width: 50%;">个人认证</el-button>
            </router-link>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  }
};
</script>
<style>
@import "../../../style/customer.css";
</style> 
