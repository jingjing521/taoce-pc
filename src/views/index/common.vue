<template>
  <div class="max_width">
    <div class="container main_home max_width" id="top-nav">
      <div class="top_nav">
        <div class="main_width flex justify-between">
          <div>
            <span class="padding-right">{{province + ' ' +city}}</span>
            <span class="padding-right">嗨，欢迎来到淘测</span>
            <router-link to="/login" v-if="!userInfo.username">
              <span class="padding-right">请登录</span>
            </router-link>
            <router-link to="/register" v-if="!userInfo.username">
              <span class="padding-right">免费注册</span>
            </router-link>
            <router-link to="/customer" v-if="userInfo.username">
              <span class="padding-right">{{userInfo.username}}</span>
            </router-link>
            <span
              class="padding-right"
              @click="loginout"
              v-if="userInfo.username"
              style="cursor: pointer;"
            >退出</span>
          </div>
          <div style="width:300px">
            <demo :lists="lists" v-if="lists.length > 0"></demo>
          </div>
          <div>
            <span class="padding-right cursor-pointer" @click="goUrl('/product')">我要检测</span>
            <span class="padding-right cursor-pointer" @click="goUrl1('/shopJoinApply')">我要开店</span>
            <span class="padding-right cursor-pointer" @click="goUrl('/order')">草稿箱</span>
            <span class="padding-right cursor-pointer" @click="goUrl('/collection')">收藏夹</span>
            <span class="padding-right cursor-pointer" @click="goChat()">平台客服</span>
            <el-popover placement="top-start" width="100" trigger="hover">
              <div>
                <img src="@/assets/logo/code.png" alt width="150px" />
              </div>
              <el-button slot="reference" type="text" size="small" style="color:#3E3E3E;">手机端</el-button>
            </el-popover>
          </div>
        </div>
      </div>
      <div class="logo_nav main_width flex" style="margin:10px auto" id="logo_nav">
        <div class="text-center" style="margin-top: 15px;">
          <a href="/">
            <img src="@/assets/logo/logo.png" alt style="width:100px;" class="text-center" />
          </a>
        </div>
        <div style="width:680px;margin-left:230px;margin-top:5px;">
          <div class="aliyun-common-search-tab">
            <div
              :class=" selectType == '1' ? 'aliyun-common-search-tab-item active':'aliyun-common-search-tab-item'"
              @click="getSelectType('1')"
              style="margin-left:3px;"
            >服务</div>
            <div
              :class=" selectType == '2' ? 'aliyun-common-search-tab-item active':'aliyun-common-search-tab-item'"
              @click="getSelectType('2')"
            >机构</div>
            <div
              :class=" selectType == '3' ? 'aliyun-common-search-tab-item active':'aliyun-common-search-tab-item'"
              @click="getSelectType('3')"
            >标准</div>
          </div>
          <el-input placeholder="请输入内容" class="input-with-select" v-model="input">
            <el-button slot="append" @click="search">搜索</el-button>
          </el-input>
        </div>
      </div>
      <div class="bg-white" id="nax-box">
        <el-menu
          :default-active="activeIndex2"
          :default-openeds="['2','4','5']"
          class="el-menu-demo main_width"
          mode="horizontal"
          background-color="#fff"
          text-color="#333"
          active-text-color="#ff6a00"
          router
        >
          <el-menu-item index="/" class="top_nav_item is-active">产品分类</el-menu-item>
          <el-menu-item index="/news" class="top_nav_item">新闻中心</el-menu-item>
          <el-menu-item index="/answer" class="top_nav_item">问答集锦</el-menu-item>
          <el-menu-item index="/institution" class="top_nav_item">机构展示</el-menu-item>
          <el-submenu index="/reportFind" style="width:100px;">
            <template slot="title">查询</template>
            <el-menu-item index="/reportFind" class="top_nav_item text-center">报告查询</el-menu-item>
            <el-menu-item index="/certificateFind" class="top_nav_item text-center">证书查询</el-menu-item>
            <el-menu-item index="/standardFind" class="top_nav_item text-center">标准查询</el-menu-item>
          </el-submenu>
          <el-menu-item index="/test-knowledge" class="top_nav_item">检测知识</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div>
      <el-container>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-container>
    </div>
    <div>
      <foot ref="foot" />
    </div>
  </div>
</template>

<script>
import foot from "../template/foot";
import demo from "../../components/demo";
export default {
  inject: ["reload"],
  components: { foot, demo },
  data() {
    return {
      lists: [], //轮播中的文字
      input: "",
      selectType: "1",
      activeIndex2: "/",
      userInfo: {
        username: "",
      },
      input1: "",
      input2: "",
      input3: "",
      select: "",
      province: "",
      city: "",
    };
  },
  mounted() {
    console.log(this.$route.path);
  },
  watch: {
    $route: function (val) {
      console.log(val);
      if (
        val.path.indexOf("server") >= 0 ||
        val.path.indexOf("institution") >= 0
      ) {
        this.activeIndex2 = "/institution";
      } else if (
        val.path.indexOf("news") >= 0 ||
        val.path.indexOf("news-detail") >= 0
      ) {
        this.activeIndex2 = "/news";
      } else if (
        val.path.indexOf("answer") >= 0 ||
        val.path.indexOf("ask-detail") >= 0
      ) {
        this.activeIndex2 = "/answer";
      }
    },
  },
  created() {
    if (!window.localStorage.getItem("im-userInfo")) {
      this.webIMregister();
    }
    this.province = window.localStorage.getItem("taoce_province");
    this.city = window.localStorage.getItem("taoce_city");
    if (window.localStorage.getItem("paoce_token")) {
      this.$fetch(
        "/api/user/userInfo?token=" + window.localStorage.getItem("paoce_token")
      ).then((response) => {
        this.userInfo = response.data;
      });
    } else {
      this.userInfo = { username: "" };
    }
    this.getStatisticsIndex();
  },
  methods: {
    /**
     * 获取首页统计数据
     */
    getStatisticsIndex() {
      var _this = this;
      this.$fetch(  "/api/order/statisticsIndex",{} ).then((response) => {
        console.log("首页统计数据",response)
        if(response.code == 0){
          _this.lists = [ "共发布服务方案" + response.data.fbfws + "条,累计成交量" + response.data.onum +"单,已入驻机构"+response.data.rzjgs+"家"]
        }
      });
    },

    webIMregister() {
      var _this = this;
      this.$imConn.registerUser({
        username: "u" + Math.random(),
        password: "123456",
        nickname: "nickname",
        appKey: WebIM.config.appkey,
        apiUrl: WebIM.config.apiURL,
        success: function (res) {
          _this.unid = res.entities.uuid;
          window.localStorage.setItem("im-userInfo", JSON.stringify(res));
        },
        error: function (res) {},
      });
    },
    goUrl(url) {
      if (!window.localStorage.getItem("paoce_token")) {
        this.$router.push({ path: "/login" });
        return;
      }
      this.$router.push({ path: url });
    },
    goUrl1(url) {
      this.$router.push({ path: url });
    },
    loginout() {
      window.localStorage.removeItem("paoce_token");
      window.localStorage.removeItem("taoce-param-other");
      window.localStorage.removeItem("paoce_token-detail");
      this.$router.push({ path: "/login" });
    },
    getSelectType(type) {
      this.selectType = type;
    },
    search() {
      this.activeIndex2 = "";
      if (this.selectType == "2") {
        this.activeIndex2 = "/institution";
        this.$router.push({
          path: "/institution?v=" + Math.random(),
          query: { mc: this.input },
        });
      } else if (this.selectType == "1") {
        this.activeIndex2 = "/";
        this.$router.push({
          path: "/product?v=" + Math.random(),
          query: { mc: this.input },
        });
      } else if (this.selectType == "3") {
        this.activeIndex2 = "/standardFind";
        this.$router.push({
          path: "/standardFind?v=" + Math.random(),
          query: { mc: this.input },
        });
      }
      console.log(this.selectType);
    },
    goChat() {
      var loginname = JSON.parse(window.localStorage.getItem("im-userInfo"))
        .entities[0].username;
      window.open(
        "http://kf.taoce.cn/contact/admin/" + loginname + "/1/1",
        "_blank"
      );
    },
  },
};
</script>
<style>
.el-menu--collapse .el-menu .el-submenu,
.el-menu--popup {
  min-width: 100px !important;
}
#top-nav {
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
#top-nav .el-menu-item:focus,
.el-menu-item:hover {
  background-color: #fff;
}
#logo_nav .el-select .el-input {
  width: 130px;
}
#top-nav .el-menu--horizontal > .el-submenu .el-submenu__title,
#top-nav .el-menu--horizontal > .el-menu-item {
  height: 45px;
  line-height: 45px;
}
#top-nav .el-menu-item.top_nav_item {
  margin: 0 60px;
}
#top-nav .top_nav {
  line-height: 40px;
  /* background-color: #f1f1f1; */
}
#top-nav .el-menu--horizontal > .el-menu-item.is-active {
  border-bottom-width: 5px;
}
.aliyun-common-search-tab {
  display: flex;
}
.aliyun-common-search-tab-item {
  margin-right: 13px;
  font-size: 13px;
  cursor: pointer;
  box-sizing: border-box;
  padding: 3px 2px;
}
.aliyun-common-search-tab-item.active {
  background-color: #ff6a00;
  color: #fff;

  box-sizing: border-box;
}
#top-nav .el-input__inner {
  border: 2px solid #ff6a00;
}
#top-nav .el-input-group__append,
#top-nav .el-input-group__prepend {
  background-color: #ff6a00;
  color: #ffffff;
  vertical-align: middle;
  display: table-cell;
  position: relative;
  border: 1px solid #ff6a00;
  border-radius: 0px;
  padding: 0 20px;
  width: 1px;
  white-space: nowrap;
}
#top-nav .el-submenu__title {
  text-align: center;
}
</style>
