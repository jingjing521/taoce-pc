<template>
  <div class="max_width">
    <div class>
      <div class="main main_width">
        <!-- 商品/分类 -->
        <el-row :gutter="0" style="position: relative;padding-top:10px;">
          <!-- 分类 -->
          <el-col :span="5" style="background:#f5f5f5;box-shadow: 0 -4px 30px 2px rgba(0, 0, 0, 0.1);">
            <div class="index-slot-left index-menu" @mouseleave="dow = false">
              <div class="page-slot page-slot-0">
                <div style="height:auto;display:block;min-height:0;">
                  <div class="ace-floor" style="margin-top:undefinedpx;margin-bottom:undefinedpx;padding:0px 0px 0px;background-color:transparent;">
                    <div class="ace-grid">
                      <div class="ace-grid-row">
                        <div
                          style="padding:0px 0px 0px;"
                          class="ace-grid-col ace-grid-col-xs-24 ace-grid-col-sm-24 ace-grid-col-md-24 ace-grid-col-lg-24"
                        >
                          <div
                            style="position:relative;"
                            class="componenet-wrap"
                            id="module-eOfdHAaL5"
                          >
                            <a
                              style="position:relative;top:-150px;display:block;height:0;overflow:hidden;"
                            ></a>
                            <div class="index-menu">
                              <div class="index-menu-wrap">
                                <span class="index-menu-title">产品分类</span>
                                <div class="index-menu-list">
                                  <div
                                    class
                                    v-for="(item,index) in categoryList"
                                    v-if="index < 8"
                                    :key="index"
                                    @mouseover="selectStyle(item.id,index)"
                                    :class=" (dow && oneid === item.id) ? 'item-active index-menu-item' : 'index-menu-item'"
                                  >
                                    <a
                                      href="javascript:void(0);"
                                      class="index-menu-item-title nopointer"
                                      target="_self"
                                    >
                                      {{item.cname}}
                                      <i
                                        class="el-icon-arrow-right index-menu-item-icon"
                                      ></i>
                                    </a>
                                    <div class="index-menu-item-top-list">
                                      <a
                                        href="javascript:;"
                                        class="top-list-item pointer"
                                        v-for="(itm,idx) in item.categoryList"
                                        :key="idx"
                                      >{{itm.cname}}</a>
                                    </div>
                                  </div>
                                </div>
                                <a
                                  href="javascript:;"
                                  class="index-menu-bottom-btn"
                                  @click="viewAll"
                                >查看全部</a>
                              </div>
                              <!--  -->
                              <div class="index-menu-content" v-if="dow">
                                <div class="sub-menu">
                                  <div class="sub-menu-box">
                                    <div
                                      class="sub-menu-item-box simple-sub-menu"
                                      v-for="item in categoryTwoList"
                                      :key="item.id"
                                      style="display: flex;align-items: center;"
                                    >
                                      <a
                                        href="javascript:void(0);"
                                        class="sub-menu-title nopointer"
                                      >
                                        {{item.cname}}
                                        <i class="el-icon-arrow-right index-menu-item-icon"></i>
                                      </a>
                                      <div
                                        class="sub-menu-list margin-left"
                                        style="border-bottom: 1px dashed #f0f0f0;"
                                      >
                                        <a
                                          href="javascript:;"
                                          class="sub-menu-item pointer orange"
                                          v-for="itm in item.categoryList"
                                          :key="itm.id"
                                          @click="getList(item.id,itm.id,itm.cname)"
                                        >
                                          <span
                                            class="sub-menu-item-text no-tag-title"
                                          >{{itm.cname}}</span>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <!-- 商品列表 -->
          <el-col :span="20" style="width:calc(100% - 260px)">
            <div class="bg-white">
              <el-row :gutter="10" style="padding:10px">
                <el-col :span="5" v-for="(item,index) in list" :key="index">
                  <div
                    class="text-center"
                    @click="goDetail(item.goods_id,item.shopid)"
                    style="min-height:200px;"
                  >
                    <div style="overflow: hidden;">
                      <img
                        :src="item.goods_img"
                        alt
                        style="width:100%;height:120px;margin:auto;"
                        class="goods-item-img"
                      />
                    </div>
                    <div class="text-lg" style="color:red">¥{{item.goods_price}}</div>
                    <div class="text-df" style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; min-height: 44px;">{{item.goods_name}}</div>
                    <div class="text-sm" style="color:#666">{{item.jgmc}}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" v-for="(item,index) in adList" :key="index">
            <div
              class="grid-content bg-purple"
              style="height:200px;"
              @click="getProductIndex(item)"
            >
              <img :src="item.img" alt />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="main_home max_width main main_width max_width" style="background:#f5f5f5">
      <div class="cu-bar justify-center text-center margin">
        <div class="action border-title">
          <span class="text-xl text-bold">明星店铺</span>
          <span class="bg-red"></span>
        </div>
      </div>
      <el-row :gutter="20">
        <el-col :span="4" v-for="(item,index) in list1" :key="index">
          <div
            class="grid-content text-center"
            style="padding-top:10px;min-height: 90px;"
            @click="goADetail(item.id)"
          >
            <img :src="item.logo" alt style="width:120px;height:50px;margin:auto;" />
            <div class="text-center text-df" style="line-height:50px">{{item.mc}}</div>
          </div>
        </el-col>
        <!-- <el-col :span="4">
          <div class="grid-content text-center" style="padding-top:10px;min-height: 90px;line-height:90px;font-size: 16px;"  @click="goAllList()">
             查看更多
          </div>
        </el-col>-->
      </el-row>
    </div>
    <div class="bg-white">
      <div class="main main_width bg-white main_home max_width">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <div
                class="cu-bar justify-center bg-white text-center margin"
                style="padding-bottom:50px"
              >
                <div class="action border-title">
                  <span class="text-xl text-bold">新闻中心</span>
                  <span class="bg-red"></span>
                </div>
              </div>
              <ul>
                <li
                  class="flex justify-start"
                  style="margin-bottom:15px;padding-left:15px;cursor: pointer;"
                  v-for="(item,index) in newsList"
                  :key="index"
                  @click="goNewDetail(item.id)"
                >
                  <div class="padding-right text-center" style="width:80px;">
                    <div class="text-xl">{{item.createTime.slice(8,10)}}</div>
                    <div class="text-xl">{{item.createTime.slice(0,7)}}</div>
                  </div>
                  <div style="width: calc(100% - 80px);">
                    <div class="text-df" style="font-weight:bold;margin-bottom:5px;">{{item.title}}</div>
                    <div class="text-df">{{item.content ? item.content:item.title}}</div>
                  </div>
                </li>
              </ul>
              <div class="padding text-center">
                <router-link to="news">
                  <el-button type="primary">查看更多</el-button>
                </router-link>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <div
                class="cu-bar justify-center bg-white text-center margin"
                style="padding-bottom:50px"
              >
                <div class="action border-title">
                  <span class="text-xl text-bold">问答中心</span>
                  <span class="bg-red"></span>
                </div>
              </div>
              <ul>
                <li
                  class="flex justify-start"
                  style="margin-bottom:15px;padding-left:15px;cursor: pointer;"
                  v-for="(item,index) in askList"
                  :key="index"
                  @click="goAskDetail(item.id)"
                >
                  <div class="padding-right text-center" style="width:80px;">
                    <div class="text-xl">{{item.createTime.slice(8,10)}}</div>
                    <div class="text-xl">{{item.createTime.slice(0,7)}}</div>
                  </div>
                  <div style="width: calc(100% - 80px);">
                    <div class="text-df" style="font-weight:bold;margin-bottom:5px;">{{item.title}}</div>
                    <div class="text-df">{{item.content}}</div>
                  </div>
                </li>
              </ul>
              <div class="padding text-center">
                <router-link to="answer">
                  <el-button type="primary">查看更多</el-button>
                </router-link>
              </div>
              <!-- <div style="background:#ebebeb;min-height:100px;padding:15px;">
                <ul>
                  <li v-for="(item,index) in askList" :key="index" @click="goAskDetail(item.id)" style="cursor: pointer;">
                    <div class="text-xl" style="line-height:45px;color:#409EFF;font-weight:400;">{{item.title}}</div>
                    <div class="text-df">{{item.content}}</div>
                  </li>
                </ul>
                <div class="padding text-center">
                  <router-link to="answer"><el-button type="primary">查看更多</el-button></router-link>
                </div>
              </div>-->
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 固定导航 -->
    <ul class="navSideList">
      <li>
        <router-link to="/customer">个人中心</router-link>
      </li>
      <li>
        <router-link to="/collection">收藏夹</router-link>
      </li>
      <li @click="goChat()">在线客服</li>
      <li @click="goTop">返回顶部</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oneid: "",
      current: false,
      input1: "",
      input2: "",
      input3: "",
      type: "1",
      dow: true,
      list: [],
      list1: [],
      categoryList: [],
      categoryTwoList: [],
      newsList: [],
      askList: [],
      adList: [],
    };
  },
  created() {
    this.dow = false;
    if (window.sessionStorage.getItem("categoryList")) {
      this.categoryList = JSON.parse(
        window.sessionStorage.getItem("categoryList")
      );
    } else {
      this.$fetch("/api/category/oms/getIndexCategoryList").then((response) => {
        if (response.code == 0) {
          this.categoryList = response.data[0].categoryList;
          this.categoryList.forEach((v, i) => {
            v.itemName = v.cname;
            v.categoryList.forEach((x, y) => {
              if (y < 4) {
                v.itemName += " / " + x.cname;
              }
            });
          });
          console.log(this.categoryList);
          window.sessionStorage.setItem(
            "categoryList",
            JSON.stringify(this.categoryList)
          );
        }
      });
    }

    this.getGoodList();
    this.getAgentList();
    this.getNewsList();
    this.getAskList();
    this.categoryAd();
    this.getAList();
  },
  methods: {
    goTop() {
      // 回到顶部
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    goChat() {
      var loginname = JSON.parse(window.localStorage.getItem("im-userInfo"))
        .entities[0].username;
      window.open(
        "http://kf.taoce.cn/contact/admin/" + loginname + "/1/1",
        "_blank"
      );
    },
    // 获取机构列表
    getAList() {
      var _this = this;
      this.$fetch("/api/user/agentList", {
        limit: 11,
        page: 1,
      }).then((response) => {
        if (response.code == 0) {
          _this.list1 = response.data.records;
        } else {
          _this.$message.error(response.msg);
        }
      });
    },
    getProductIndex(item) {
      this.$router.push({
        path: "/product",
        query: {
          cateOne: item.cateOne,
          cateTwo: item.cateTwo,
          cateThree: item.cateThree,
        },
      });
    },
    // 分类广告
    categoryAd() {
      var _this = this;
      this.$fetch("/api/categoryAd/list", {}).then((response) => {
        console.log(response);
        _this.loading = false;
        if (response.code == 0) {
          _this.adList = response.data;
        } else {
          _this.$message.error(response.msg);
        }
      });
    },
    // 一级分类鼠标事件
    selectStyle(id, index) {
      this.dow = true;
      this.oneid = id;
      this.categoryTwoList = this.categoryList[index].categoryList;
    },

    // 新闻列表
    getNewsList() {
      var _this = this;
      this.$fetch("/api/news/list", { limit: 4, page: 1 }).then((response) => {
        _this.loading = false;
        if (response.code == 0) {
          _this.newsList = response.data.records;
        } else {
          _this.$message.error(response.msg);
        }
      });
    },
    goADetail(id) {
      this.$router.push({ path: "/potal", query: { id: id } });
    },
    goNewDetail(id) {
      this.$router.push({ path: "/news-detail", query: { id: id } });
    },
    // 问答列表
    getAskList() {
      var _this = this;
      this.$fetch("/api/ask/list", { limit: 4, page: 1 }).then((response) => {
        _this.loading = false;
        if (response.code == 0) {
          _this.askList = response.data.records;
        } else {
          _this.$message.error(response.msg);
        }
      });
    },
    goAskDetail(id) {
      this.$router.push({ path: "/ask-detail", query: { id: id } });
    },
    goAllList() {
      this.$router.push({ path: "/institution" });
    },
    // 代理商列表
    getAgentList() {
      this.$fetch("/api/user/agentList", { limit: "10", page: "1" }).then(
        (response) => {
          console.log(response);
        }
      );
    },

    outStyle() {
      this.dow = false;
    },
    // 查看全部
    viewAll() {
      this.$router.push({ path: "/product" });
    },
    getList(twoid, threeid, name) {
      this.twoid = twoid;
      this.threeid = threeid;
      console.log(this.oneid, this.twoid, this.threeid);
      this.$router.push({
        path: "/product",
        query: {
          cateOne: this.oneid,
          cateTwo: this.twoid,
          cateThree: this.threeid,
          name: name,
        },
      });
    },
    // 商品列表
    getGoodList() {
      var _this = this;
      this.$post("/api/goods/goodsList", { limit: "15", page: "1" }).then(
        (response) => {
          if (response.code == 0) {
            _this.list = response.data.records;
          }
        }
      );
    },
    goDetail(id, shopid) {
      let { href } = this.$router.resolve({
        path: "/productDetail",
        query: { id: id, shopid: shopid },
      });
      window.open(href, "_blank");
      // this.$router.push({
      //   path: "/productDetail",
      //   query: { id: id, shopid: shopid }
      // });
    },
  },
};
</script>
<style scoped>
.el-col-5 {
  width: calc(100% / 5);
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
  margin-bottom: 20px;
}
.grid-content {
  border-radius: 4px;
  min-height: 30px;
  background: #fff;
}
.grid-content img {
  width: 100%;
  height: 100%;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.justify-center {
  justify-content: center;
}
.bg-white {
  background-color: #fff;
}
.el-menu--horizontal > .el-submenu .el-submenu__title,
.el-menu--horizontal > .el-menu-item {
  height: 45px;
  line-height: 45px;
}
.el-menu-item {
  padding: 0 60px;
}
.top_nav {
  line-height: 40px;
  background-color: #f1f1f1;
}
#cart li {
  margin: 3px;
  box-sizing: border-box;
  /* border-bottom: 1px solid #f1f1f1; */
  font-size: 14px;
  cursor: pointer;
  padding: 5px 10px;
}
#cart li.cateone-item:hover {
  background: #f1f1f1;
  border-radius: 5px;
}
#cart li:hover,
#cart li:hover a {
  color: red;
}
#cart .menu-dow {
  position: absolute;
  left: 200px;
  top: 0;
  z-index: 999999999999;
  background: #fff;
  width: 50%;
  padding-left: 20px;
  min-height: 200px;
}
#cart .menu-dow h3 {
  font-size: 16px;
  line-height: 35px;
  font-weight: bold;
}
#cart .menu-dow ul {
  display: flex;
}
#cart .menu-dow ul li {
  padding-right: 10px;
  font-size: 14px;
}
#cart li.child-item {
  margin: 0;
  padding: 0;
}
#img img {
  display: inline-block;
  width: 30%;
  height: 100px;
  margin-right: 15px;
}
.goods-item-img {
  -webkit-transition: ease 0.2s;
  transition: ease 0.2s;
  -webkit-transform-origin: 50% 50%;
  /* transform-origin默认值就是居中，可以不加 */
  transform-origin: 50% 50%;
  /* transform-origin默认值就是居中，可以不加 */
}

.goods-item-img:hover {
  -webkit-transform: scale(2);
  /*放大1.2倍*/
  transform: scale(2);
  /*放大1.2倍*/
}
</style>



<style>
.index-menu,
.index-menu-wrap {
  position: relative;
  width: 230px;
}
.index-menu {
  height: 100%;
  margin-right: 20px;
  background: #e9e9e9;
  float: left;
}
.index-menu-wrap {
  /* height: 624px; */
  background: #fff;
}
.index-menu-wrap .index-menu-title {
  display: block;
  height: 30px;
  background: #ff6a00;
  font-size: 14px;
  color: #fff;
  letter-spacing: 1px;
  text-align: center;
  line-height: 30px;
}
.index-menu-wrap .index-menu-list {
  box-sizing: border-box;
  /* height: 500px; */
  position: relative;
}
.index-menu-item {
  padding: 15px 16px 0;
}
.index-menu-item.item-active {
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.13s ease-in-out;
}
.index-menu a:hover {
  color: #ff6a00;
}
.index-menu-item-title {
  display: block;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 2px;
  color: #181818 !important;
  text-decoration: none !important;
}
.nopointer {
  cursor: default;
}
.index-menu-item-top-list {
  width: 100%;
  border-bottom: 1px solid #eee;
  padding: 3px 0;
  overflow: hidden;
}

.index-menu-item-top-list .top-list-item {
  padding-right: 6px;
  margin: 4px 5px 4px 0;
  box-sizing: border-box;
  font-size: 13px;
  color: #999;
  text-decoration: none;
  display: inline-block;
  max-width: 100%;
  border-right: 1px solid #eee;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.index-menu-item-top-list .top-list-item:last-child {
  border-right: 0;
}
.index-menu-wrap .index-menu-bottom-btn {
  display: block;
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 13px;
  color: #ff6a00;
  /* position: absolute;
  left: 0;
  bottom: 0; */
  cursor: pointer;
  text-decoration: none;
}
.index-menu-content {
  width: 700px;
  height: 624px;
  position: absolute;
  left: 230px;
  top: 0;
  background: #fff;
  z-index: 99999;
  /* visibility: hidden; */
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
  transition: opacity 0.13s ease-in-out, box-shadow 0.13s ease-in-out;
}
.index-menu-content .sub-menu {
  width: 100%;
  height: 100%;
  padding: 30px 20px 0;
  box-sizing: border-box;
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  /* visibility: hidden; */
}
.index-menu-content .sub-menu .sub-menu-box .sub-menu-item-box .sub-menu-title {
  display: block;
  font-size: 14px;
  color: #181818;
  font-weight: 600;
  margin: 15px 0;
  text-decoration: none;
  height: 16px;
  line-height: 16px;
  white-space: nowrap;
  /* overflow: hidden;
    text-overflow: ellipsis;
    width: 100px; */
}
.index-menu-content
  .sub-menu
  .sub-menu-box
  .sub-menu-item-box
  .sub-menu-list
  .sub-menu-item {
  text-decoration: none;
  font-size: 13px;
  line-height: 27px;
  padding-right: 6px;
  margin: 4px 5px 4px 0;
  border-right: 1px solid #eee;
}
.index-menu-content
  .sub-menu
  .sub-menu-box
  .sub-menu-item-box
  .sub-menu-list
  .sub-menu-item:hover
  span {
  color: #ff6a00;
}
.index-menu-content
  .sub-menu
  .sub-menu-box
  .sub-menu-item-box
  .sub-menu-list
  .sub-menu-item:last-child {
  border-right: 0;
}
.index-menu-content
  .sub-menu
  .sub-menu-box
  .sub-menu-item-box
  .sub-menu-list
  .sub-menu-item
  .sub-menu-item-text {
  display: inline-block;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 27px;
  vertical-align: middle;
}

.navSideList {
  position: fixed;
  right: 10px;
  margin: auto;
  top: 300px;
  background: #ff6a00;
  color: #fff;
  z-index: 9;
}
.navSideList li {
  border-bottom: 1px solid #f1f1f1;
  line-height: 40px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
}
</style>
