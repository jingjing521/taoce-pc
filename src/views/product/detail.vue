 <template>
  <div class="content main_width" id="goodDetail" v-loading="loading">
    <!-- 产品详情 -->
    <el-row
      :gutter="20"
      class="margin-top bg-white padding-top"
      style="margin-left:0;margin-right:0"
    >
      <el-col :span="12">
        <div style="border:1px solid #ccc;">
          <img :src="goodsDetail.goodsImg" alt style="width:100%;" />
        </div>
        <div
          class="bg-white flex justify-between"
          style="font-size:15px;padding:10px 20px;margin-bottom:10px;"
        >
          <div>
            <span
              style="margin-right:15px;cursor: pointer;"
              @click="collectGood"
              v-if="goodsDetail.isscsp == 0"
            >收藏商品</span>
            <span style="margin-right:15px;cursor: pointer;" v-if="goodsDetail.isscsp == 1">已收藏商品</span>
            <span style="cursor: pointer;" @click="collectShop" v-if="goodsDetail.isscdp == 0">收藏店铺</span>
            <span style="cursor: pointer;" v-if="goodsDetail.isscdp == 1">已收藏店铺</span>
          </div>
          <div>
            <span>成交数量</span>
            <span>{{goodsDetail.cgsl}}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <div class="sp-mc">{{goodsDetail.goodsName}}</div>
          <div class="sp-item">
            <span>价格</span>
            <span class="sp-price">¥{{goodsPrice.toFixed(2)}}</span>
          </div>
          <div class="sp-item">
            <span>服务编号</span>
            <span>{{goodsDetail.goodsSn}}</span>
          </div>
          <div class="sp-item">
            <span>报告语言</span>
            <span>
              <el-button
                type="text"
                v-if="goodsDetail.zhbgjg != -1"
                :class="opt.reportLauguage == '1' ? '':'is-black'"
                @click="getReportLauguage('1')"
              >中文报告</el-button>
              <el-button
                type="text"
                v-if="goodsDetail.enbgjg != -1"
                :class="opt.reportLauguage == '2' ? '':'is-black'"
                @click="getReportLauguage('2')"
              >英文报告</el-button>
              <el-button
                type="text"
                v-if="goodsDetail.zebgjg != -1"
                :class="opt.reportLauguage == '3' ? '':'is-black'"
                @click="getReportLauguage('3')"
              >中英文报告</el-button>
            </span>
          </div>
          <div class="sp-item" v-if="goodsDetail.bgzsjg != -1">
            <span>报告形式</span>
            <span>
              <el-button
                type="text"
                :class="opt.reportType == '1' ? '':'is-black'"
                @click="getReportType('1')"
              >检测报告</el-button>
              <el-button
                type="text"
                :class="opt.reportType == '2' ? '':'is-black'"
                @click="getReportType('2')"
              >报告证书</el-button>
            </span>
          </div>
          <div class="sp-item" v-if="goodsDetail.jjms != 0">
            <span>加急周期</span>
            <el-checkbox-group
              v-model="isJJ"
              style="display:inline-block"
              size="small"
              @change="getJJItem"
            >
              <el-checkbox-button>{{goodsDetail.jjms}}个工作日</el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div class="sp-item">
            <span>检测周期</span>
            <span v-if="isJJ">{{ ( goodsDetail.testPeriod - goodsDetail.jjms)}}个工作日</span>
            <span v-if="!isJJ">{{goodsDetail.testPeriod}}个工作日</span>
          </div>
          <div class="sp-item">
            <span>业务类型</span>
            <span>{{goodsDetail.serviceLi}}</span>
          </div>
          <div class="sp-item">
            <span>检测资质</span>
            <span>{{goodsDetail.testing}}</span>
          </div>
          <div class="sp-item">
            <span>店铺</span>
            <router-link :to="{path:'/potal', query:{ id : goodsDetail.shopid}}">
              <el-link type="primary" style="font-size:16px;">{{goodsDetail.shopName}}</el-link>
            </router-link>
          </div>
          <div class="sp-item">
            <span>服务提供商</span>
            <router-link :to="{path:'/server', query:{ id : goodsDetail.jgid}}">
              <el-link type="primary" style="font-size:16px;">{{goodsDetail.jgmc}}</el-link>
            </router-link>
          </div>
          <el-row class="margin-top padding-left">
            <!-- <el-dropdown > -->
            <el-button @click.native="goChat()" v-if="kfList.length > 0">在线咨询</el-button>
            <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->

            <!-- <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item,index) in kfList"
                  :key="index"
                  @click.native="goChat(item)"
                >平台客服{{index+1}}</el-dropdown-item>
            </el-dropdown-menu>-->
            <!-- </el-dropdown> -->
            <el-button type="primary" @click="buy">立即购买</el-button>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row
      :gutter="10"
      style="margin-left:0;margin-right:0;"
      v-if="goodsDetail.goodsAddtionServiceEntityList.length > 0  "
    >
      <el-col :span="16" class="bg-white padding-top">
        <div class="bg-white padding">
          <el-table
            :data="goodsDetail.goodsAddtionServiceEntityList"
            border
            style="width: 100%"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="additionalServiceEntity.fwmc" label="套餐服务" align="center"></el-table-column>
            <el-table-column prop="capabilityLibEntity.bzh" label="送样数量/单" align="center">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.additionalServiceEntity.priceType == '2'"
                >{{ JSON.parse(scope.row.additionalServiceEntity.fwitem)[0].price}}</span>
                <span
                  v-if="scope.row.additionalServiceEntity.priceType == '1'"
                >{{scope.row.additionalServiceEntity.price}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="capabilityLibEntity.jczq" label="价格/单" align="center">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.additionalServiceEntity.priceType == '2'"
                >{{ JSON.parse(scope.row.additionalServiceEntity.fwitem)[0].min}}</span>
                <span v-if="scope.row.additionalServiceEntity.priceType == '1'">1</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="capabilityLibEntity.jczq"
              label="单"
              align="center"
              min-width="100px"
            >
              <template slot-scope="scope">
                <el-input-number
                  size="mini"
                  :min="scope.row.additionalServiceEntity.min"
                  :max="scope.row.additionalServiceEntity.max"
                  @change="handleChange(scope.row.additionalServiceEntity,scope.row.additionalServiceEntity.isDeleted)"
                  v-model="scope.row.additionalServiceEntity.isDeleted"
                  v-if="scope.row.additionalServiceEntity.priceType == '2'"
                ></el-input-number>
                <el-input-number
                  size="mini"
                  :min="z"
                  @change="handleChange(scope.row.additionalServiceEntity,scope.row.additionalServiceEntity.isDeleted)"
                  v-model="scope.row.additionalServiceEntity.isDeleted"
                  v-if="scope.row.additionalServiceEntity.priceType == '1'"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column prop="capabilityLibEntity.jcjg" align="center" label="套餐内容">
              <template slot-scope="scope">
                <el-button @click="handleClickDetail(scope.row)" type="text" size="small">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-tabs
          v-model="activeName"
          type="border-card"
          @tab-click="handleClick"
          style="margin:20px"
        >
          <el-tab-pane label="服务概述" name="1">
            <div>
              <div class="box-card" shadow="never">
                <div class="detail-title">
                  <span>服务简介</span>
                </div>
                <div class="detail-content">{{goodsDetail.goodsDesc}}</div>
                <div class="detail-title">
                  <span>送样信息</span>
                </div>
                <div class="detail-content">{{goodsDetail.syyq}}</div>
                <div class="detail-title">
                  <span>检测项目</span>
                </div>
                <div class="padding-bottom">
                  <el-table :data="goodsDetail.goodsCheckitemEntityList" border style="width: 100%">
                    <el-table-column prop="capabilityLibEntity.jcxm" label="项目名称" align="center"></el-table-column>
                    <el-table-column prop="capabilityLibEntity.bzh" label="项目标准" align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.row.capabilityLibEntity.bzh + " '|' " + scope.row.capabilityLibEntity.bzhmc}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="capabilityLibEntity.jczq"
                      label="检测周期（工作日）"
                      align="center"
                    ></el-table-column>
                    <el-table-column prop="capabilityLibEntity.jcjg" label="检测价格" align="center"></el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="商品评价" name="2">
            <ul class="padding">
              <li
                style="font-size:14px;"
                v-for="(item,index) in commentList"
                :key="index"
                class="margin-bottom"
              >
                <div class="flex justify-between" style="line-height：35px;">
                  <div>{{item.username}} {{item.createTime}}</div>
                  <div>
                    <el-rate v-model="item.star" disabled text-color="#ff9900"></el-rate>
                  </div>
                </div>
                <div>{{item.pjnr}}</div>
              </li>
            </ul>
            <div class="block" style="text-align:right;margin-top:30px;margin-bottom:30px;">
              <el-pagination
                hide-on-single-page
                :page-size="pageSize"
                background
                layout="prev, pager, next"
                :total="total"
                @current-change="handleCurrentChange"
              ></el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-white">
          <div class="hot-title detail-title text-center">热门推荐</div>
          <div
            v-for="(item,index) in goodsList"
            :key="index"
            @click="goDetail(item.goods_id,item.shopid)"
            style="cursor: pointer;"
          >
            <div style="text-align:center">
              <img :src="item.goods_img" alt style="width:80%;" />
            </div>
            <div class="text-center text-df" style="line-height:30px;">{{item.goods_name}}</div>
            <div
              class="text-center text-df"
              style="line-height:30px;color:red;"
            >¥{{item.goods_price}}</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 附加服务详情 -->
    <el-dialog title="详情" :visible.sync="dialogVisible" width="50%">
      <div v-html="adddetail.additionalServiceEntity.detail"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      z: 1,
      loading: true,
      kfList: [],
      multipleSelection: [],
      num: "",
      adddetail: {
        additionalServiceEntity: {},
      },
      additionalServicePrice: 0,
      reportPrice: 0,
      goodsPrice: 0, // 商品价格
      lauguagePrice: 0, // 报告语言价格
      isJJ: false, // 是否加急
      tableData: [],
      dialogVisible: false,
      commentList: [],
      goodsList: [],
      userInfo: {},
      currentPage: 1,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      activeName: "1",
      goodsDetail: {
        goodsAddtionServiceEntityList: [],
      },
      opt: {
        reportLauguage: "1",
        reportType: "1",
      },
    };
  },
  created() {
    this.getGoodDetail();
    this.getGoodsCommentList(this.$route.query.id);
    this.getList();

    if (!window.localStorage.getItem("im-userInfo")) {
      this.webIMregister();
    }
  },
  methods: {
    // 价格数量
    handleChange(item, value) {
      var fwitem = JSON.parse(item.fwitem);
      var _this = this;
      if (item.priceType == "1") {
        item.priceItem = item.price;
        item.numItem = item.isDeleted;
      } else {
        fwitem.forEach(function (v, i) {
          if (value >= v.min && value <= v.max) {
            item.priceItem = v.price;
            item.numItem = value;
          }
        });
      }
      _this.additionalServicePrice = 0;
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach(function (v, i) {
          if (v.additionalServiceEntity.priceType == "1") {
            _this.additionalServicePrice +=
              v.additionalServiceEntity.priceItem *
              v.additionalServiceEntity.numItem;
          } else {
            _this.additionalServicePrice += parseFloat(
              v.additionalServiceEntity.priceItem
            );
          }
        });
        this.getPrice();
      }
    },
    // 选择附加服务
    handleSelectionChange(val) {
      this.multipleSelection = val;
      var _this = this;
      _this.additionalServicePrice = 0;
      this.multipleSelection.forEach(function (v, i) {
        if (v.additionalServiceEntity.priceType == "1") {
          _this.additionalServicePrice +=
            v.additionalServiceEntity.priceItem *
            v.additionalServiceEntity.numItem;
        } else {
          _this.additionalServicePrice += parseFloat(
            v.additionalServiceEntity.priceItem
          );
        }
      });
      this.getPrice();
    },
    // 价格计算
    getPrice() {
      this.goodsPrice =
        this.goodsDetail.goodsPrice +
        this.additionalServicePrice +
        this.reportPrice +
        this.lauguagePrice +
        (this.isJJ ? this.goodsDetail.jjjg : 0);
    },

    // 客服列表
    getKfList() {
      var _this = this;
      this.$fetch("/api/user/kf-list", {
        cone: "",
        ctwo: "",
        limit: 10,
        page: 1,
        sid: _this.goodsDetail.shopid,
      }).then((response) => {
        if (response.code == 0) {
          _this.kfList = response.data.records;
        } else {
          _this.$message.error(response.msg);
        }
      });
    },

    getJJItem(ite) {
      console.log(ite);
      this.getPrice();
    },
    handleClickDetail(item) {
      this.dialogVisible = true;
      this.adddetail = item;
    },
    handleClick() {},
    // 商品详情页面
    getGoodDetail() {
      var _this = this;
      this.$post(
        "/api/goods/goodsInfo?goods_id=" +
          this.$route.query.id +
          "&shopid=" +
          this.$route.query.shopid,
        {}
      ).then((response) => {
        _this.loading = false;
        if (response.code == 0) {
          this.goodsDetail = response.data;
          var testing = [];
          var serviceLi = [];
          this.goodsDetail.testingQualificationEntityList.forEach(function (
            v,
            i
          ) {
            testing.push(v.mc);
          });
          this.goodsDetail.serviceEntityList.forEach(function (v, i) {
            serviceLi.push(v.mc);
          });
          this.goodsDetail.testing = testing.toString();
          this.goodsDetail.serviceLi = serviceLi.toString();
          this.goodsPrice =
            this.goodsDetail.goodsPrice + this.goodsDetail.zhbgjg;
          this.lauguagePrice = this.goodsDetail.zhbgjg;
          this.reportPrice = 0;
          this.goodsDetail.goodsAddtionServiceEntityList.forEach(function (
            v,
            i
          ) {
            v.additionalServiceEntity.min = parseInt(
              JSON.parse(v.additionalServiceEntity.fwitem)[0].min
            );
            v.additionalServiceEntity.numItem =
              v.additionalServiceEntity.priceType == "2"
                ? parseInt(JSON.parse(v.additionalServiceEntity.fwitem)[0].min)
                : parseInt(_this.z);
            v.additionalServiceEntity.priceItem =
              v.additionalServiceEntity.priceType == "2"
                ? parseFloat(
                    JSON.parse(v.additionalServiceEntity.fwitem)[0].price
                  )
                : parseFloat(v.additionalServiceEntity.price);
            v.additionalServiceEntity.max = parseInt(
              JSON.parse(v.additionalServiceEntity.fwitem)[
                JSON.parse(v.additionalServiceEntity.fwitem).length - 1
              ].max
            );
            v.additionalServiceEntity.isDeleted =
              v.additionalServiceEntity.priceType == "2"
                ? parseInt(v.additionalServiceEntity.min)
                : parseInt(_this.z);
          });
          _this.getKfList();
        } else {
          this.$message.error(response.msg);
        }
      });
    },
    // 收藏商品
    collectGood() {
      var _this = this;
      if (!window.localStorage.getItem("paoce_token")) {
        this.$router.push({ path: "/login", query: { type: "1" } });
        return;
      }
      this.$fetch("/api/user/addUserCollectionGoods", {
        goodsId: _this.goodsDetail.goodsId,
        shopId: _this.goodsDetail.shopid,
      }).then((response) => {
        if (response.code == 0) {
          _this.$message({ message: "收藏商品成功", type: "success" });
          _this.getGoodDetail();
        } else {
          _this.$message.error(response.msg);
        }
      });
    },
    // 收藏店铺
    collectShop() {
      var _this = this;
      if (!window.localStorage.getItem("paoce_token")) {
        this.$router.push({ path: "/login", query: { type: "1" } });
        return;
      }
      this.$fetch("/api/user/addUserCollectionShop", {
        id: _this.goodsDetail.shopid,
      }).then((response) => {
        if (response.code == 0) {
          _this.$message({ message: "收藏店铺成功", type: "success" });
          _this.getGoodDetail();
        } else {
          _this.$message.error(response.msg);
        }
      });
    },
    // 报告语言
    getReportLauguage(type) {
      this.opt.reportLauguage = type;
      if (type == "1") {
        this.lauguagePrice = this.goodsDetail.zhbgjg;
      }
      if (type == "2") {
        this.lauguagePrice = this.goodsDetail.enbgjg;
      }
      if (type == "3") {
        this.lauguagePrice = this.goodsDetail.zebgjg;
      }
      this.getPrice();
    },
    // 报告形式
    getReportType(type) {
      this.opt.reportType = type;
      if (this.opt.reportType == "2") {
        this.reportPrice = this.goodsDetail.bgzsjg;
      } else {
        this.reportPrice = 0;
      }
      this.getPrice();
    },
    // 热门推荐
    getList() {
      this.goodsList = [];
      this.$post("/api/goods/goodsList", { limit: "3", page: "1" }).then(
        (response) => {
          this.goodsList = response.data.records;
        }
      );
    },
    goDetail(id, shopid) {
      this.reload();
      this.$router.push({
        path: "/productDetail",
        query: { id: id, shopid: shopid },
      });
    },

    handleClick() {},
    handleSizeChange(val) {},
    handleCurrentChange(val) {},
    goChat() {
      console.log(JSON.parse(window.localStorage.getItem("im-userInfo")));
      var item = this.kfList[0];
      var loginname = JSON.parse(window.localStorage.getItem("im-userInfo"))
        .entities[0].username;
      window.open(
        "http://kf.dyjcyun.com/contact/" +
          item.userName +
          "/" +
          loginname +
          "/" +
          this.$route.query.id +
          "/" +
          this.$route.query.shopid,
        "_blank"
      );
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

    // 立即购买
    buy() {
      this.goodsDetail.opt = this.opt;
      this.goodsDetail.isJJ = this.isJJ;
      this.goodsDetail.totalPrice = this.goodsPrice;
      this.goodsDetail.multipleSelection = this.multipleSelection;
      window.localStorage.setItem(
        "paoce_token-detail",
        JSON.stringify(this.goodsDetail)
      );
      window.localStorage.removeItem("taoce-param");
      if (!window.localStorage.getItem("paoce_token")) {
        this.$router.push({ path: "/login", query: { type: "1" } });
        return;
      }
      this.$fetch(
        "/api/user/userInfo?token=" + window.localStorage.getItem("paoce_token")
      ).then((response) => {
        if (response.isrz == "1") {
          this.$router.push({ path: "/step" });
        } else {
          this.$confirm("您还未进行认证, 是否前往认证?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$router.push({ path: "/authentication" });
            })
            .catch(() => {});
        }
      });
    },

    // 商品评价
    getGoodsCommentList(id) {
      var _this = this;
      this.$fetch("/api/goods/goodsCommentList", {
        goods_id: id,
        limit: _this.pageSize,
        page: _this.currentPage,
      }).then((response) => {
        if (response.code == 0) {
          _this.commentList = response.data.records;
          _this.commentList.forEach((v) => {
            v.star = parseInt(v.star);
          });
          _this.total = response.data.total;
        } else {
          _this.$message.error(response.msg);
        }
      });
    },
  },
};
</script>

<style>
#goodDetail .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: #fff;
  background-color: #409eff;
  border-right-color: #dcdfe6;
  border-left-color: #dcdfe6;
}
.el-checkbox-button:last-child .el-checkbox-button__inner {
  border-radius: 4px;
}
</style>
<style scoped>
.is-black {
  color: #333;
}

.sp-item span.sp-price {
  font-size: 26px;
  color: red;
}
.detail-title {
  line-height: 45px;
  padding-left: 10px;
  font-size: 14px;
  font-weight: bold;
}
.detail-content {
  padding: 10px 20px;
  line-height: 25px;
  font-size: 14px;
}
.hot-title {
  color: red;
  border-bottom: 1px solid #f1f1f1;
}
.el-col {
  border-radius: 4px;
  margin-bottom: 10px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.name {
  font-size: 16px;
  line-height: 32px;
  text-align: center;
}
.sp-mc {
  font-size: 20px;
  font-weight: 700;
  line-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  max-width: 95%;
}
.sp-item span {
  font-size: 16px;
  line-height: 35px;
  display: inline-block;
  min-width: 120px;
}
el-link {
  font-size: 16px;
}
</style>

