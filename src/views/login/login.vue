<template>
  <div id="login" class="login-contain">
    <!-- 头部 -->
    <div class="dl_td">
      <div class="dl_zn">
        <div>
          <a href="/"> <img src="@/assets/logo/logo1.png" style="width:100px;"> </a>
          <span class="descs">欢迎登录</span>
        </div>
        <a href="/" class="dl_zn_f">返回首页</a>
      </div>
    </div>
    <!--  -->
    <div class="dl_con">
      <div class="dl_yh">
        <img src="@/assets/log_bj_y.png" width="500" height="392" alt="" class="dl_bjs">
        <div class="yh_k">
          <div class="yh_dl">委托用户登录</div>
          <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
            <el-tab-pane label="用户登录" name="login">
              <el-form ref="form" :model="form" label-width="80px" class="biao_d_login padding" style="padding-bottom:0" >
                <el-form-item label="登录账户">
                  <el-input v-model="form.username" placeholder="请输入登录账户"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="login" style="width:100%;">登录</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="手机登录" name="code">
              <el-form ref="form" :model="form" label-width="80px" class="biao_d_login padding">
                <el-form-item label="手机号">
                  <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="验证码">
                  <el-input v-model="form.code" placeholder="请输入验证码" style="width: 120px;"></el-input>
                  <el-button
                    type="primary"
                    style="display:inline-block;float: right;width:120px;"
                    @click="getCode"
                    v-show="show"
                  >获取验证码</el-button>
                  <el-button
                    type="primary"
                    style="display:inline-block;float: right;width: 120px;"
                    v-show="!show"
                  >{{sum}}s重新发送</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit" style="width:100%;">登录</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <div class="flex" style="justify-content: space-between;padding: 0px 20px 20px 120px;">
            <div class="padding-right text-right">
              <router-link to="/forgetPass">
                <span class="padding-right">忘记密码</span>
              </router-link>
            </div>
            <div class="padding-right text-right">还没有账户？
              <router-link to="/register">
                <span class="padding-right;color:#409EFF;">去注册</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isEmpty } from "@/utils";
import md5 from "js-md5";
export default {
  data() {
    return {
      activeName: "login",
      show: true,
      sum: "",
      timer: null,
      form: {},
      type: ""
    };
  },
  mounted() {},

  created() {
    this.type = this.$route.query.type;
  },
  methods: {
    // 获取验证码
    getCode() {
      if (isEmpty(this.form.mobile)) {
        this.$message.error("请输入手机号");
        return;
      }
      var _this = this;
      this.$fetch("/api/user/getVerifyCode", {
        phone: this.form.mobile,
        type: "3"
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
    onSubmit() {
      if (isEmpty(this.form.mobile)) {
        this.$message.error("请输入手机号");
        return;
      }
      if (isEmpty(this.form.code)) {
        this.$message.error("请输入验证码");
        return;
      }
      this.$post("/api/user/loginByCode", {
        code: this.form.code,
        isagree: "1",
        mobile: this.form.mobile
      }).then(response => {
        if (response.code == 0) {
          window.localStorage.setItem("paoce_token", response.data.token);
          this.$router.push({ path: "/" });
        } else {
          this.$message.error(response.msg);
        }
      });
    },
    login() {
      if (isEmpty(this.form.username)) {
        this.$message.error("请输入登录账户");
        return;
      }
      if (isEmpty(this.form.password)) {
        this.$message.error("请输入密码");
        return;
      }
      this.$post("/api/user/loginByPwd", {
        username: this.form.username,
        isagree: "1",
        password: md5(this.form.password)
      }).then(response => {
        if (response.code == 0) {
          window.localStorage.setItem("paoce_token", response.data.token);
          if (this.type) {
            this.$router.go(-1);
          } else {
            this.$router.push({ path: "/" });
          }
        } else {
          this.$message.error(response.msg);
        }
      });
    },
    handleClick() {},
    // 注册环信
    webIMregister() {
      var _this = this;
      this.$imConn.registerUser({
        username: Number(
          Math.random()
            .toString()
            .substr(3, length) + Date.now()
        ).toString(36),
        password: "123456",
        nickname: "nickname",
        appKey: WebIM.config.appkey,
        apiUrl: WebIM.config.apiURL,
        success: function(res) {
          window.localStorage.setItem("im-userInfo", res);
        },
        error: function(res) {
          console.log();
        }
      });
    }
  }
};
</script> 
<style scoped>
@import "../../style/login.css";
</style>
