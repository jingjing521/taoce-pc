<template>
  <div class="main_width customer">
    <div class="gl2-wddd_d"><div class="top_title"><strong>收藏夹</strong></div></div>
    <div class="bg-white padding" v-loading="loading">
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部检测项目" name="good">
          <el-row :gutter="10" style="padding:10px">
            <el-col :span="6" v-for="(item,index) in list" :key="index">
              <div class="text-center">
                <div @click="goDetail(item.goodsId,item.shopId)">
                    <div style="overflow: hidden;">
                      <img :src="item.goodsImg"  style="width:100%;height:160px;margin:auto;" class="goods-item-img">
                    </div>
                    <div class="text-lg" style="color:red;padding-top:10px">¥{{item.goodsPrice}}</div>
                    <div class="text-df" style="padding: 5px 0">{{item.goodsName}}</div>
                </div>
                <el-button style="padding: 8px 0" type="text" @click.native.prevent="cancleGoodsColle(item.id)">取消收藏</el-button>
              </div>
            </el-col>
          </el-row>
          <div class="text-center" v-if=" !loading && list.length == 0">暂无数据</div>
          <div class="padding-top text-right">
              <el-pagination :hide-on-single-page="value" background layout="prev, pager, next" :current-page="page" :page-size="goodLimit" :total="goodtotal" @current-change="handleCurrentChange"></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="全部店铺" name="shop">
          <el-card class="box-card" v-for="(item,index) in list1" :key="index">
            <div slot="header" class="clearfix">
              <span style="font-size:15px;">
                <i class="el-icon-s-shop"></i>
                {{item.shopName}}
              </span>
              <el-button style="float: right; padding: 3px 0" type="text" @click.native.prevent="cancleShopColle(item.id)">取消收藏</el-button>
            </div>
            <el-row :gutter="10" style="padding:10px">
              <el-col :span="5" v-for="(item,index) in item.shopGoodsList" :key="index">
                <div class="text-center" @click="goDetail(item.goods_id,item.shopid)">
                  <div style="overflow: hidden;">
                    <img :src="item.goods_img" style="width:100%;height:160px;margin:auto;" class="goods-item-img" >
                  </div>
                  <div class="text-lg" style="color:red">¥{{item.goods_price}}</div>
                  <div class="text-df">{{item.goods_name}}</div>
                </div>
              </el-col>
            </el-row>
          </el-card>
          <div class="text-center" v-if=" !loading &&  list1.length == 0">暂无数据</div>
          <div class="padding-top text-right">
              <el-pagination :hide-on-single-page="value" background layout="prev, pager, next" :current-page="page" :total="shoptotal" @current-change="handleCurrentChange1"></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value:true,
      loading:true,
      activeName: "good",
      list: [],
      list1: [],
      shoptotal:0,
      goodtotal:0,
      page:1,
      goodLimit:12,
      status: false
    };
  },
  created() {
    if (!window.localStorage.getItem("paoce_token")) {
      this.$router.push({ path: "/login" });
      return;
    }
    this.handleList();
  },
  methods: {
    // 商品和店铺的切换
    handleClick(tab, event) { 
      this.loading = true;
      this.page = 1;
      if(tab.name == 'good'){  
        this.handleList();  
      }else{
        this.handleList1();
      }
    },
    // 店铺取消收藏
    cancleShopColle(id) {
      var _this = this;
      this.$confirm("此操作将取消对该店铺的收藏, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          this.$fetch("/api/user/deleteUserCollectionShop", { id: id }).then(response => { 
            if (response.code == 0) {
              _this.$message.success("已取消收藏");
              _this.handleList1();
            }else{
              _this.$message.error(response.msg)
            }
          });
        }).catch(() => {});
    }, 
    // 商品取消收藏
    cancleGoodsColle(id){
      var _this = this;
      this.$confirm("此操作将取消对该商品的收藏, 是否继续?", "提示", {
        confirmButtonText: "确定", cancelButtonText: "取消", type: "warning"
      }).then(() => {
          this.$fetch("/api/user/deleteUserCollectionGoods", { id: id }).then(response => { 
            if (response.code == 0) {
              _this.$message.success("已取消收藏");
              _this.handleList();
            }else{
              _this.$message.error(response.msg)
            }
          });
        }).catch(() => {});
    },
    // 收藏的商品列表
    handleList() {
      var _this = this;
      this.$fetch("/api/user/userCollectionGoodsList", { limit: _this.goodLimit, page: _this.page }).then(response => { 
        _this.loading = false;
        if (response.code == 0) {
          _this.list = response.data.records;
          _this.goodtotal = response.data.total;
        }else{
          _this.$message.error(response.msg)
        }
      });
    },
    // 收藏的店铺列表
    handleList1() {
      var _this = this;
      this.$fetch("/api/user/userCollectionShopList", { limit: "10", page: _this.page }).then(response => { 
        _this.loading = false;
        if (response.code == 0) {
          _this.list1 = response.data.records;
          _this.shoptotal = response.data.total;
        }else{
          _this.$message.error(response.msg)
        }
      });
    },
    handleCurrentChange1(val) {
      this.page = val;
      this.handleList1();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.handleList();
    },
    goDetail(id, shopid) {
      let { href } = this.$router.resolve({
        path: "/productDetail",
        query: { id: id, shopid: shopid },
      });
      window.open(href, "_blank");
      // this.$router.push({ path: "/productDetail", query: { id: id, shopid: shopid } });
    }
  }
};
</script>
<style>
@import "../../style/customer.css";
</style>
