<template>
  <div class="max_width organizationBox">
    <div class="organization">
      <div class="b-special-cc">
        <img src="@/assets/icon/tz-wz-2.png" width="534" height="25" alt="">
        <p class="organization-wz">{{info.mc}}</p>
        <div class="organization-wz gl12-organization-wz">
          <div class="gl12-organization-div" style="margin-left:20px">
            <span class="gl12-organization-span gl12-organization-i2">在线咨询</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tzsb">
      <div class="tzsb-cc">
        <div class="jgzy">
          <h3 :class=" type == '1' ? 'active1':''" @click="goItem('1')">
            <img src="@/assets/icon/fw-2.png">
            <p>服务方案</p>
          </h3>
          <h3 :class=" type == '2' ? 'active1':''" @click="goItem('2')">
            <img src="@/assets/icon/zs-2.png">
            <p>资格证书 | 报告模版</p>
          </h3>
          <h3 :class=" type == '3' ? 'active1':''" @click="goItem('3')">
            <img src="@/assets/icon/jg-2.png">
            <p>机构简介</p>
          </h3>
          <div class="tzsb-jj tzsb-jjwz gl1potal" style="display:block" v-if="type == '3'">
            <p>{{info.intro}}</p>
          </div>
          <div class="tzsb-jj tzsb-jjwz gl1potal" style="display:block" v-if="type == '1'">
            <el-container style="height:auto; border: 1px solid #eee" v-loading="loading">
              <el-aside width="200px">
                <el-menu unique-opened>
                  <el-submenu v-for="(item,index) in shopCategoryList" :key="index" :index="index.toString()">
                    <template slot="title">{{item.cat_one_name}}</template>
                    <el-menu-item v-for="(ite,idx) in item.twolist" :key="idx" @click="getGoods(item.cate_one,ite.cate_two)">{{ite.cate_two_name}}</el-menu-item>
                  </el-submenu>
                  <el-menu-item @click="onLineAddOrder" v-if="isOpen == '1'">自定义委托</el-menu-item>
                </el-menu>
              </el-aside>
              <el-container>
                <el-row :gutter="10" style="padding:10px;width:100%">
                  <el-col :span="5" v-for="(item,index) in goodsList" :key="index">
                    <div class="text-center"  @click="goDetail(item.goods_id,item.shopid)">
                      <div style="overflow: hidden;width:100%">
                        <img :src="item.goods_img" style="width:100%;height:120px;margin:auto;">
                      </div>
                      <div class="text-lg" style="color:red">¥{{item.goods_price}}</div>
                      <div class="text-df">{{item.goods_name}}</div>
                    </div>
                  </el-col>
                </el-row>
              </el-container>
            </el-container>
            <div class="block padding" style="text-align:right;margin-top:30px;margin-bottom:30px;">
              <el-pagination hide-on-single-page  :page-size="pageSize" background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange" ></el-pagination>
            </div>
          </div>
          <div class="tzsb-jj tzsb-jjwz gl1potal" style="display:block" v-if="type == '2'">
            <el-row :gutter="10" style="padding:10px">
              <el-col :span="6" v-for="(item,index) in info.zhinfo" :key="index">
                <div class="text-center margin-bottom">
                  <div style="overflow: hidden;">
                    <img :src="item.ceImg" alt="" style="width:80%;height:400px;margin:auto;">
                  </div>
                </div>
              </el-col>
            </el-row>
          </div> 
        </div>
      </div>
    </div>
    <div style="height:15px;"></div>
  </div>
</template>

<script>
export default {
  name: "Sort",
  data() {
    return {
      isOpen:'',
      info:{},
      goodsList:[],
      shopCategoryList: [],
      value: 3,
      type: "1",
      list: [{}],
      loading:true,
      currentPage: 1,
      pageSize: 20,
      total:0,
      cateOne:"",
      cateThree:"",
      cateTwo:""
    };
  },
  mounted() {},
  created() { 
    this.getShopCategoryList();
    this.getInfo();
  },
  methods: {
    // 商品列表
    getGoods(cat_one,cate_two){
      this.currentPage = 1;
      this.goodsList = [];
      this.cateOne = cat_one;
      this.cateTwo = cate_two
      this.getList();
    },
    getList() {
      this.goodsList = [];
      var _this = this;
      this.$post("/api/goods/goodsList", {
        shopid:_this.$route.query.id,
        cateOne: _this.cateOne, 
        cateTwo: _this.cateTwo,
        limit: _this.pageSize,
        page: _this.currentPage
      }).then(response => {
        _this.loading = false;
        if (response.code == 0) {
          _this.goodsList = response.data.records;
          _this.total = response.data.total;
        }else{
          _this.$message.error(response.msg);
        }
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    getInfo() {
      var _this = this;
      this.$fetch("/api/user/agencyInfo", { id: this.$route.query.id }).then(
        response => { 
          if (response.code == 0) {
            _this.info = response.data; 
          }else{
            _this.$message.error(response.message)
          }
        }
      );
    },
    // 获取店铺的一级分类、二级分类
    getShopCategoryList() {
      var _this = this;
      this.$fetch("/api/category/oms/shopCategoryList", { shopId: this.$route.query.id }).then(response => { 
        if (response.code == 0) {
          _this.shopCategoryList = response.data;
          _this.cateOne = response.data[0].cat_one;
          _this.cateTwo = response.data[0].twolist[0].cate_two
          _this.isOpen = response.is_open;
          _this.getList();
        }
      });
    },
    onLineAddOrder() {
      window.localStorage.removeItem("taoce-param")
      this.$router.push({ path: "/addOrder", query: { id: "", shopid: this.$route.query.id } });
    },
    goItem(type) { this.type = type; },
    goDetail(id, shopid) {
      this.$router.push({ path: "/productDetail", query: { id: id, shopid: shopid } });
    }
    
  }
};
</script>
<style>
@import "../../style/server.css";
</style>

