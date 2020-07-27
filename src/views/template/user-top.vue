<template>
	<div class="main_width">
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
						<router-link to="/customer" v-if="userInfo.username">
							<span class="padding-right">用户名：{{userInfo.username}}</span>
						</router-link>
						<router-link to="/">
							<span>返回首页</span>
						</router-link>
						<span @click="loginout">退出</span>
					</ul>
				</section>
			</div>
		</div>
		<el-container style="height:auto; border: 1px solid #eee">
			<transition name="fade" mode="out-in">
				<router-view></router-view>
			</transition>
		</el-container>
	</div>
</template>
<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item),
	  activeIndex: "1",
	  userInfo:{}
    };
  },
  created() {
    console.log("******", window.localStorage.getItem("paoce_token"));
    if (window.localStorage.getItem("paoce_token")) {
      this.$fetch(
        "/api/user/userInfo?token=" + window.localStorage.getItem("paoce_token")
      ).then(response => { 
        this.userInfo = response.data;
      });
    } else {
      this.userInfo = {};
    }
    //
  },
  methods: {
    loginout() {
      window.localStorage.clear();
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style>
/* .el-header {
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.el-menu {
  height: 100%;
}
.el-submenu__title {
  font-size: 18px;
  color: blue;
  font-weight: 400;
} */
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

