<template>
  <div class="main_width customer">
    <div class="gl2-wddd_d"> <div class="top_title"> <strong>反馈意见</strong> </div> </div>
    <div class="bg-white padding">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="反馈意见">
          <el-input type="textarea" v-model="form.content" placeholder="请输入反馈意见" maxlength="500"
            show-word-limit :autosize="{ minRows: 5, maxRows: 10}"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :disabled="disabled">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { isEmpty } from "@/utils";
export default {
  data() {
    return {
      disabled:false,
      form: {}
    };
  },
  created() {
    if (!window.localStorage.getItem("paoce_token")) {
      this.$router.push({ path: "/login" });
      return;
    }
  },
  methods: {
    onSubmit() {
      var _this = this;
      if (isEmpty(_this.form.content)) { 
        this.$message.error("请输入反馈意见"); 
        return;
      }
      _this.disabled = true;
      this.$put("/api/user/feedback", { content: _this.form.content }).then(response => { 
        _this.disabled = false;
        if (response.code == 0) {
          _this.$message.success("反馈意见已提交成功");
          _this.form.content = "";
        } else {
          _this.$message.error(response.msg);
        }
      });
    }
  }
};
</script>
<style>
@import "../../style/customer.css";
</style>