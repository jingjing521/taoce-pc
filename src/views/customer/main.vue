<template>
	<div>
		<div class="main_width" id="cus-main">
			<div class="global_header love_0210 bg-blue">
				<div class="header_wrap fix_header bg-blue">
					<section class="header_content main_width clear_fix">
						<a href="/" target="_parent" class="logo_img">
							<img src="@/assets/logo/logo.png" alt="" width="100px" class="f_left">
						</a>
						<div class="global_nav">
							<div style="width:500px;margin-left:50px;margin-top:5px;">
								<el-input placeholder="请输入内容" class="input-with-select">
									<el-button slot="append">搜索</el-button>
								</el-input>
							</div>
						</div>
						<ul style="text-align: right;line-height: 60px;" id="navList">
							<router-link to="/customer">
								<span>{{userInfo.username}}</span>
							</router-link>
							<router-link to="/">
								<span>返回首页</span>
							</router-link>
							<router-link to="/login">
								<span @click="loginout" style="cursor: pointer;">退出</span>
							</router-link>
						</ul>
					</section>
				</div>
			</div>
			<el-container style="height:auto;">
				<el-aside width="200px" style="min-heigth:1500px;">
					<el-menu :default-openeds="['1', '2','3']" router>
						<el-submenu index="1">
							<template slot="title">订单管理</template>
							<el-menu-item index="/order">我的订单</el-menu-item>
						</el-submenu>
						<el-submenu index="2">
							<template slot="title">资金管理</template>
							<el-menu-item index="/wallet">我的钱包</el-menu-item>
						</el-submenu>
						<el-submenu index="3">
							<template slot="title">设置</template>
							<el-menu-item index="/userInfo">用户信息</el-menu-item>
							<el-menu-item index="/authentication">用户认证</el-menu-item>
							<el-menu-item index="/address">地址库</el-menu-item>
							<el-menu-item index="/invoice">发票薄</el-menu-item>
							<el-menu-item index="/updatePwd">修改密码</el-menu-item>
							<el-menu-item index="/message">我的消息</el-menu-item>
							<el-menu-item index="/buyData">买家大数据</el-menu-item>
							<el-menu-item index="/feedback">反馈意见</el-menu-item>
							<el-menu-item index="/collection">我的收藏</el-menu-item>
						</el-submenu>
					</el-menu>
				</el-aside>
				<el-container>
					<transition name="fade" mode="out-in">
						<router-view></router-view>
					</transition>
				</el-container>
			</el-container>
		</div>
		<div>
			<foot ref="foot"/>
		</div>
	</div>
</template>
<script>
import foot from "../template/foot";
export default {
  components: { foot },
  data() {
    return {
      activeIndex: "1",
      userInfo: {}
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      var _this = this;
      this.$fetch("/api/user/userInfo").then(response => {
        if (response.code == 0) {
          _this.userInfo = response.data;
        } else {
          _this.$message.error(response.msg);
        }
      });
    },
    loginout() {
      window.localStorage.clear();
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style>
#cus-main {
	min-height: 600px;
	margin-bottom: 10px;
}
#cus-main .el-header {
  color: #333;
  line-height: 60px;

}

#cus-main .el-aside {
  color: #333;
}
#cus-main .el-submenu__title {
  font-size: 18px;
  color: blue;
  font-weight: 400;
}
</style>
<style>
#navList {
  padding-right: 30px;
  font-size: 14px;
}
#navList span {
  margin-left: 40px;
}
</style>

