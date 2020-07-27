<template>
	<div class="main_width customer">
		<div class="gl2-wddd_d"> <div class="top_title"> <strong>用户信息</strong> </div> </div>
		<div class="user_rt_cont gl2-user_rt_cont bg-white padding-top padding-bottom">
			<el-form ref="form" :model="userInfo" :rules="rules" label-width="80px" style="width:400px">
				<el-form-item label="登录账户">
					<el-input v-model="userInfo.username" disabled></el-input>
				</el-form-item>
				<el-form-item label="手机号码">
					<el-input v-model="userInfo.mobile" disabled></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="userInfo.email"></el-input>
				</el-form-item>
			</el-form>
		</div>
		<div class="text-center padding bg-white">
			<el-button type="primary" @click.native.prevent="addOrUpdate()" :disabled="disabled">保存</el-button>
		</div>
	</div>
</template>
		 
<script>
import { validateEmail } from '@/utils/validate'
export default {
  data() {
	var emailValidator = (rule, value, callback) => {
      if (!validateEmail(value)) { callback(new Error("邮箱格式错误")); } else { callback(); }
    };
    return {
		disabled:false,
		list: [],
		userInfo: {},
		rules: {
			email: [{required: true, message: "请输入邮箱",trigger: "blur" },{ validator: emailValidator, trigger: "blur" }]
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
	// 获取用户的基本信息
    getUserInfo() {
      var _this = this;
      this.$fetch("/api/user/userInfo").then(response => {
        if (response.code == 0) {
		  _this.userInfo = response.data;
		  _this.userInfo.mobile = response.data.mobile.slice(0,3)+"****"+response.data.mobile.slice(7)
        } else {
          _this.$message.error(response.message);
        }
      });
    },
	// 修改
	addOrUpdate(){
		var _this = this;
      	this.$refs["form"].validate(valid => {
			if (valid) { 
				_this.disabled = true;
				this.$post("/api/user/mdUserInfo?email="+_this.userInfo.email,{}).then(response => {
					if (response.code == 0) { 
						_this.$message({ message: '提交成功', type: 'success', duration: 1500, onClose: () => {  _this.disabled = false; }})
					} else {
						_this.$message.error(response.message);
						_this.disabled = false;
					}
				});
				
				
			} else { 
				return false;
			}
		});
	}
  }
};
</script>
<style>
@import "../../style/customer.css";
</style>
