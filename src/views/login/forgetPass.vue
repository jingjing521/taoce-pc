<template>
  <div id="register" class="login-contain">
    <div class="dl_td">
      <div class="dl_zn">
        <a href="/"> <img src="@/assets/logo/logo1.png" width="161" height="39" alt=""></a>
        <div class="descs">忘记密码</div>
        <a href="/" class="dl_zn_f">返回首页</a>
        <router-link to="/login" class="dl_zn_f" style="margin-right:20px">前往登录</router-link>
      </div>
    </div>
    <section class="zhuc_zx padding-top" style="min-height:500px">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width:500px;margin: auto;">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入手机号" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" placeholder="请输入验证码" style="width: 250px;" maxlength="6"></el-input>
          <el-button type="primary" style="display:inline-block;float: right;" @click="getCode" v-show="show">获取验证码</el-button>
          <el-button type="info" style="display:inline-block;float: right;" v-show="!show">{{sum}}s重新发送</el-button>
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
    </section>
  </div>
</template>

<script>
import { validateMobile } from '@/utils/validate'
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
    var mobileValidator = (rule, value, callback) => {
      if (!validateMobile(value)) {
        callback(new Error("手机号格式错误"));
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
        phone:[
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: mobileValidator, trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [ { required: true, message: "请输入新密码", trigger: "blur" }],
        newPassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { required: true, validator: validateComfirmPassword, trigger: "blur" }
        ]
      }
    };
  },
  created() {
  },
  methods: {
    getCode() {
      var _this = this;
      this.$fetch("/api/user/getVerifyCode", { phone: _this.ruleForm.phone, type: "2"
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
    // 忘记密码
    submitForm(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          _this.disabled = true;
          this.$post("/api/user/findUserPass", {
            code: _this.ruleForm.code,
            mobile: _this.ruleForm.phone,
            newpass: md5(_this.ruleForm.password), 
          }).then(response => {
            if (response.code == 0) {
              _this.$message({ message: '成功找回密码，请登录', type: 'success', duration: 1500, onClose: () => { 
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
    }
  }
};
</script> 
<style scoped>
#register .dl_td {
  width: 100%;
  height: 89px;
  overflow: hidden;
  background-color: #025ab4;
}
#register .dl_td .dl_zn {
  width: 1190px;
  height: 89px;
  margin: 0 auto;
  position: relative;
}
#register .dl_td .dl_zn img {
  margin-top: 22px;
}
#register .descs {
  font-size: 18px;
  line-height: 34px;
  border-left: 1px solid #ccc;
  position: absolute;
  left: 200px;
  top: 28px;
  padding-left: 20px;
  font-weight: bold;
  color: #fff;
}
#register .dl_zn_f {
  float: right;
  line-height: 92px;
  font-size: 14px;
  color: #bbd5ea;
}
.zhuc_zx {
  position: relative;
  background: white;
  width: 1200px;
  margin: 30px auto;
  overflow: hidden;
  padding-bottom: 6%;
}
.biao_d {
  width: 400px;
  margin: auto;
  margin-top: 30px;
}
</style>
