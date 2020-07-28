<template>
    <div id="register" class="login-contain">
        <div class="dl_td">
            <div class="dl_zn">
                <a href="/"> <img src="@/assets/logo/logo1.png" width="161" height="39" alt=""> </a>
                <div class="descs">欢迎注册</div>
                <a href="/" class="dl_zn_f">返回首页</a>
                <router-link to="/login" class="dl_zn_f" style="margin-right:20px">
                 前往登录
                </router-link>
            </div>
        </div>
        <section class="zhuc_zx" style="min-height:500px">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="biao_d">
                <el-form-item label="登录账户" prop="username">
                    <el-input v-model="form.username" placeholder="请输入登录账户"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="form.mobile" placeholder="请输入手机号" maxlength="11" type="number"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                    <el-input v-model="form.code" placeholder="请输入验证码" style="width: 170px;" maxlength="6"></el-input>
                    <el-button type="primary" style="display:inline-block;float: right;" @click="getCode" v-show="show" >获取验证码</el-button>
                    <el-button type="info" style="display:inline-block;float: right;" v-show="!show" >{{sum}}s重新发送</el-button>
                </el-form-item>
                <el-form-item label="密码" prop="userpass">
                    <el-input v-model="form.userpass" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="" prop="isagree" style="width:1000px;"> 
                  <el-checkbox label="阅读并同意" v-model="form.isagree"></el-checkbox>
                  <router-link to="/agreement" style="margin-right:3px;color:#409EFF">
                    《淘测用户注册协议》
                  </router-link>
                  <router-link to="/agreement" style="margin-right:3px;color:#409EFF">
                    《隐私政策》
                  </router-link>
                  <router-link to="/agreement" style="margin-right:3px;color:#409EFF">
                    《平台法律声明》
                  </router-link>  
                </el-form-item> 
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" style="width:100%;">注册</el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>

<script>
import { validateMobile,isValidUserName } from '@/utils/validate'
import { isEmpty } from "@/utils";
import md5 from 'js-md5';
export default {
  
  data() {
    var mobileValidator = (rule, value, callback) => {
      if (!validateMobile(value)) {
        callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    };
    var userNameValidator = (rule, value, callback) => {
      if (!isValidUserName(value)) {
        callback(new Error("登录帐号仅支持字母或数字，禁止使用全角字符和特殊符号"));
      } else {
        callback();
      }
    }; 
    return {
      show: true,
      sum: "",
      timer: null,
      form: {},
      rules: {
          username: [
            { required: true, message: '请输入登录账户', trigger: 'blur' },
            { validator: userNameValidator, trigger: "blur" }
          ],
          mobile:[
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: mobileValidator, trigger: "blur" }
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ],
          userpass: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          isagree:[
            { required: true, message: '请选择是否同意', trigger: 'change' }
          ]
        }
    };
  },
  mounted() {},
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
        type: "1"
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
        }else{
          _this.$message.error(response.msg);
        }
      });
    },
    onSubmit() {
      console.log(this.form);
      var _this = this;
      this.$refs["form"].validate(valid => {
        if (valid){
            this.$post("/api/user/regByCode", {
              code: this.form.code,
              isagree: this.form.isagree == true ? '1':'2',
              mobile: this.form.mobile,
              username: this.form.username,
              userpass:md5(this.form.userpass)
            }).then(response => {
              console.log(response);
              if(response.code == 0){
                _this.$message({ message: '注册成功', type: 'success', duration: 1500, onClose: () => {  
                    _this.$router.push({ path: "/login"});
                }})
              }else{
                _this.$message.error(response.msg);
              }
               
            });
        }
      })
    
      

      //         {
      //   "code": "string",
      //   "isagree": "string",
      //   "mobile": "string",
      //   "username": "string"
      // }
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
