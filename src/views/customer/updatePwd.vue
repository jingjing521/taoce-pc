<template>
  <div class="main_width customer">
    <div class="gl2-wddd_d">
      <div class="top_title">
        <strong>修改密码</strong>
      </div>
    </div>
    <div class="bg-white padding">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width:500px;">
        <el-form-item label="手机号">
          <el-input v-model="phone" placeholder="请输入手机号" maxlength="11" disabled></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" placeholder="请输入验证码" style="width: 250px;" maxlength="6"></el-input>
          <el-button type="primary" style="display:inline-block;float: right;" @click="getCode" v-show="show">获取验证码</el-button>
          <el-button type="info" style="display:inline-block;float: right;" v-show="!show">{{sum}}s重新发送</el-button>
        </el-form-item>
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="ruleForm.oldPassword" placeholder="请输入原密码" maxlength="16" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入新密码" maxlength="16" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="newPassword">
          <el-input v-model="ruleForm.newPassword" placeholder="请输入确认密码" maxlength="16" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" :disabled="disabled">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { isEmpty, starPhone } from "@/utils";
import md5 from "js-md5";
export default {
  data() {
    var validateComfirmPassword = (rule, value, callback) => {
      if (!/\S/.test(value)) {
        callback(new Error("请输入确认密码"));
      } else if (this.ruleForm.password !== value) {
        callback(new Error("确认密码与新密码输入不一致"));
      } else {
        callback();
      }
    };
    return {
      disabled:false,
      show: true,
      sum: "",
      timer: null,
      phone: "",
      ruleForm: {},
      userInfo: {},
      rules: {
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        oldPassword: [
          { required: true, message: "请输入原密码", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          {
            required: true,
            validator: validateComfirmPassword,
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    if (!window.localStorage.getItem("paoce_token")) {
      this.$router.push({ path: "/login" });
      return;
    }
    this.getUserInfo();
  },
  methods: {
    getCode() {
      var _this = this;
      this.$fetch("/api/user/getVerifyCode", {
        phone: _this.userInfo.mobile,
        type: "4"
      }).then(response => {
        if (response.code == 0) {
          var time_count = 60;
          if (!_this.timer) {
            _this.sum = time_count;
            _this.show = false;
            _this.timer = setInterval(() => {
              if (_this.sum > 1 && _this.sum <= time_count) {
                _this.sum--;
              } else {
                _this.sum = 0;
                _this.show = true;
                clearInterval(_this.timer);
                _this.timer = null;
              }
            }, 1000);
          }
        } else {
          _this.$message.error(response.msg);
        }
      });
    },
    // 修改密码
    submitForm(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          _this.disabled = true;
          this.$post("/api/user/mdUserPass", {
            code: _this.ruleForm.code,
            mobile: _this.userInfo.mobile,
            newpass: md5(_this.ruleForm.password),
            oldpass:md5(_this.ruleForm.oldPassword)
          }).then(response => {
            if (response.code == 0) {
                _this.$message({ message: '成功修改密码，请重新登录', type: 'success', duration: 1500, onClose: () => { 
                    _this.disabled = false;
                    _this.$router.push({ path: "/login" });
                }})
            }else{
              _this.disabled = false;
              _this.$message.error(response.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 获取用户信息
    getUserInfo() {
      var _this = this;
      this.$fetch("/api/user/userInfo").then(response => {
        if (response.code == 0) {
          _this.userInfo = response.data;
          _this.phone = starPhone(_this.userInfo.mobile);
        }
      });
    }
  }
};
</script>
<style>
@import "../../style/customer.css";
</style>