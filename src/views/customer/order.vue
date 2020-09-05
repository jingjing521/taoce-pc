<template>
  <div class="main_width customer order">
    <div class="gl2-wddd_d"> <div class="top_title"> <strong>我的订单</strong> </div> </div>
    <div class="user_rt_cont">
      <div class="ddzt_xk clear_fix">
        <ul class="dd-zt">
          <li :class="tag == item.tag ? 'ddxz_zt':''" v-for="item in tagList" :key="item.tag" :tag="item.tag" @click="goType(item.tag)">
            {{item.name}} <i style="display: block;" v-if="item.num">{{item.num}}</i>
          </li>
        </ul>
        <el-input placeholder="请输入订单编号" v-model="orderSn" class="input-with-select" style="width:200px" size="small">
          <el-button slot="append" size="small" @click="search">查询</el-button>
        </el-input>
      </div>
      <div id="divMain" v-loading="loading">
        <ul class="order_li gl2-order_li" v-if="dataList.length > 0">
          <li v-for="item in dataList" :key="item.orderSn">
            <table class="order_table gl2-order_table">
              <caption>
                <strong>{{item.addTime}}</strong>
                <strong>订单编号： <em> <a class="ord_dd operate ord_dxq gl2-ord_dxq">{{item.orderSn}}</a> </em> </strong>
                <div class="dpth_xx gl2-dpth_xx">
                  <a class="ord_dd gl2-ord_dd-userimg gl2-logo-liname" style="max-width:300px;">{{item.shopName}}</a>
                </div>
                <a class="ord_dd operate ord_dxq gl2-ord_dxq" @click="godetail(item)">订单详情</a>
                <a class="ord_dd operate ord_dxq gl2-ord_dxq" @click="orderCopy(item)">订单复制</a>
              </caption>
              <tbody>
                <tr class="dd_wt">
                  <td class="center ord_gd gl2-center" @click="goGoodDetail(item)" style="cursor: pointer;">
                    <img src="@/assets/logo/logo.png" alt="" v-if="!item.goodsImg" width="80px" height="80px">
                    <img v-if="item.goodsImg" :src="item.goodsImg" width="80px" height="80px">
                  </td>
                  <td class="qymc_dd gl2-companyname" @click="goGoodDetail(item)">{{item.goodsName ? item.goodsName : "自定义委托订单" }}</td>
                  <td class=""></td>
                  <td class="ord_bk_z">
                    <b class="ord_jg gl2-ord_jg">{{item.orderAmount  != 0? '￥'+item.orderAmount : '待评估'}}</b>
                  </td>
                  <td class="ord_bk ord_bk_z"> 
                    <span class="ddzt_zt">{{getOrderStatus(item.orderStatus)}}</span>  
                  </td>
                </tr>
                <tr class="tj_dd_a" v-if="item.orderStatus == '0'">
                  <td colspan="5" style="text-align: right;padding-right:15px">
                    <span>
                      <a class="a_btn operate mrxz" @click="edit(item)">编辑</a>
                      <a class="a_btn operate mrxz" @click="del(item.orderId)">删除</a>
                    </span>
                  </td>
                </tr>
                <tr class="tj_dd_a" v-if="item.orderStatus == '1'">
                  <td colspan="5" style="text-align: right;padding-right:15px">
                    <span>
                      <a class="a_btn operate mrxz" @click="cancle(item.orderId)">取消订单</a>
                      <a class="a_btn operate mrxz" @click="samples(item.orderId)">录入送样</a>
                    </span>
                  </td>
                </tr>
                <tr class="tj_dd_a" v-if="item.orderStatus == '2'">
                  <td colspan="5" style="text-align: right;padding-right:15px">
                    <span>
                      <a class="a_btn operate mrxz" @click="gopay(item.orderId,item.orderSn,item.orderAmount)">去支付</a>
                    </span>
                  </td>
                </tr>
                <tr class="tj_dd_a" v-if="item.ycms == '1'">
                  <td colspan="5" style="text-align: right;padding-right:15px">
                    <span>
                       <a class="a_btn operate mrxz" @click="goOtherDetail(item)">异常信息</a>
                    </span>
                  </td>
                </tr>
                <tr class="tj_dd_a" v-if="item.orderStatus == '4'">
                  <td colspan="5" style="text-align: right;padding-right:15px">
                    <span>
                      <a class="a_btn operate mrxz" @click="viewLogistics(item.orderId)">查看物流</a>
                      <a class="a_btn operate mrxz" @click="confirmReceipt(item.orderId)">确认收货</a>
                    </span>
                  </td>
                </tr>
                <tr class="tj_dd_a" v-if="item.orderStatus == '5'">
                  <td colspan="5" style="text-align: right;padding-right:15px">
                    <span>
                      <a class="a_btn operate mrxz" @click="appraise(item.orderId,item.orderSn)">评价</a>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        </ul>
        <div v-if="dataList.length > 0" style="text-align:right;">
          <el-pagination background="" layout="prev, pager, next" :total="total" @current-change="handleCurrentChange" ></el-pagination>
        </div>
        <div v-if="dataList.length == 0">
          <div style="line-height:100px;font-size:15px;text-align:center">暂无数据</div>
        </div>
      </div>
    </div>
    <!-- 录入送样 -->
    <samples-info v-if="samplesStatus" ref="samplesinfo" @getList="getList"/>
    <!-- 查看物流 -->
    <el-dialog title="查看物流" :visible.sync="logisticsVisible" width="30%"> 
      <el-form :model="appraiseform" style="width:500px;">
        <el-form-item label="寄件人地址" :label-width="formLabelWidth">
          <el-input v-model="orderDetail.orderFfbgxxEntity.jjrdz" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="快递公司" :label-width="formLabelWidth">
          <el-input v-model="orderDetail.orderFfbgxxEntity.kdgs" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="快递单号" :label-width="formLabelWidth">
          <el-input v-model="orderDetail.orderFfbgxxEntity.kddh" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="报告备注" :label-width="formLabelWidth">
          <el-input v-model="orderDetail.orderFfbgxxEntity.bgbz" autocomplete="off" disabled></el-input>
        </el-form-item>
         
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="logisticsVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 评价 -->
    <el-dialog title="评价" :visible.sync="appraiseVisible" width="50%">
      <el-form :model="appraiseform" style="width:500px;">
        <el-form-item label="订单编号" :label-width="formLabelWidth">
          <el-input v-model="appraiseform.orderSn" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="星级评价" :label-width="formLabelWidth">
          <el-rate v-model="appraiseform.star" show-text style="margin-top:8px;"></el-rate>
        </el-form-item>
        <el-form-item label="评价内容" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="appraiseform.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="appraiseVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAppraise">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { isEmpty } from "@/utils";
import samplesInfo from "../template/samples-info";
export default {
  components: { samplesInfo },
  data() {
    return {
      loading: true,
      orderSn:"",

      tag: "", // 选中的订单type
      // typeList
      tagList: [
        { name: "全部订单", tag: "", num: "" },
        { name: "待提交", tag: "0", num: "" },
        { name: "待送样", tag: "1", num: "" },
        { name: "待付款", tag: "2", num: "" },
        { name: "服务中", tag: "3", num: "" },
        { name: "待签收", tag: "4", num: "" },
        { name: "待评价", tag: "5", num: "" },
        { name: "已取消", tag: "7", num: "" },
        { name: "异常订单", tag: "8", num: "" }
      ],
      dataList: [],
      formLabelWidth: "100px",
      logisticsVisible: false,
      samplesStatus: false,
      appraiseVisible: false,
      appraiseform: {
        id: "",
        orderSn: "",
        star: 3
      },

      page: "1",
      limit: "10",
      total: null,
      orderDetail: {
        orderFfbgxxEntity:{}
      }
    };
  },
  created() {
    if (this.$route.query.type) {
      this.tag = this.$route.query.type;
      this.handleList(this.$route.query.type);
    } else {
      this.handleList("");
    }
  },
  methods: {
    search(){
      this.handleList(this.tag);
    },
    goGoodDetail(item){
      this.$router.push({ path: "/productDetail", query: { id: item.goodsId, shopid: item.shopId } });
    },
    // 编辑订单
    edit(item){
      console.log(item)  
      if(item.goodsId){
        this.$router.push({ path: "/step", query: { orderId: item.orderId ,type:"edit" } });
      }else{
        this.$router.push({ path: "/addorder", query: { orderId: item.orderId ,type:"edit" } });
      }  
    },
    // 订单详情
    godetail(item) {
      console.log(item) 
      this.$router.push({ path: "/orderDetail", query: { orderId: item.orderId} });
    },
    goOtherDetail(item){
      this.$router.push({ path: "/otherDetail", query: { orderId: item.orderId} });
    },
    orderCopy(item){ 
      window.localStorage.removeItem("taoce-param");
      window.localStorage.removeItem("paoce_token-detail");
      if(item.goodsId){
        this.$router.push({ path: "/step", query: { orderId: item.orderId ,type:"view" } });
      }else{
        this.$router.push({ path: "/addorder", query: { orderId: item.orderId ,type:"view" } });
      }  
    },
    // 查看物流
    viewLogistics(orderId) {
      this.logisticsVisible = true;
      var _this = this;
      this.$fetch("/api/order/orderInfo", {
        orderId: orderId
      }).then(response => {
        if (response.code == 0) {
          _this.orderDetail = response.data;
        }
      });
    },
    // 确认收货
    confirmReceipt(id) {
      var _this = this;
      this.$confirm("是否要确认收货?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$fetch("/api/order/confirmUserOrder", { id: id }).then(
            response => {
              if (response.code == 0) {
                this.$message({ type: "success", message: "已确认收货!" });
                _this.handleList(_this.tag);
              }
            }
          );
        })
        .catch(() => {});
    },

    getList() {
      this.handleList(this.tag);
    },
    // 获取订单状态
    getOrderStatus(value) {
      let text = "";
      switch (value) {
        case 0:
        case "0":
          text = "草稿待提交";
          break;
        case 1:
        case "1":
          text = "待送样";
          break;
        case 2:
        case "2":
          text = "待付款";
          break;
        case 3:
        case "3":
          text = "服务中";
          break;
        case 4:
        case "4":
          text = "待签收";
          break;
        case 5:
        case "5":
          text = "待评价";
          break;
        case 6:
        case "6":
          text = "已评价";
          break;
        case 7:
        case "7":
          text = "已取消";
        case 8:
        case "8":
          text = "异常订单";
      }

      return text;
    },
    samples(orderId) {
      this.samplesStatus = true;
      this.$nextTick(() => {
        this.$refs.samplesinfo.init(orderId);
      });
    },
    //取消订单
    cancle(id) {
      var _this = this;
      this.$prompt("", "取消订单", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: "请输入取消原因"
      })
        .then(({ value }) => {
          if (isEmpty(value)) {
            this.$message.error("请输入取消原因");
            return;
          }
          this.$fetch("/api/order/cancelUserOrder", {
            id: id,
            qxddms: value
          }).then(response => {
            if (response.code == 0) {
              this.$message({ type: "success", message: "取消成功!" });
              _this.handleList(_this.tag);
            }
          });
        })
        .catch(() => {});
    },
    // 去支付
    gopay(orderId, orderSn,orderAmount) {
      if(orderAmount == 0){
        this.$message({ type: "info", message: "系统正在评估价格，请耐心等候" });
        return;
      }
      this.$router.push({
        path: "/orderPay",
        query: { orderId: orderId, orderSn: orderSn }
      });
    },
    goType(type) {
      this.loading = true;
      this.page = "1";
      this.tag = type;
      this.handleList(this.tag);
    },
    // 订单列表
    handleList() {
      var _this = this;
      this.$fetch("/api/order/userOrderList", {
        type: _this.tag,
        page: _this.page,
        limit: _this.limit,
        orderSn: _this.orderSn
      }).then(response => {
        _this.loading = false;
        if (response.code == 0) {
          _this.dataList = response.data.records;
          _this.total = response.data.total;
        } else {
          this.$message.error(response.message);
        }
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.handleList();
    },
    del(id) {
      var _this = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
         this.$fetch("/api/order/deleteUserOrder", { id: id }).then(
            response => {
              if (response.code == 0) {
                this.$message({ type: "success", message: "删除成功!" });
                _this.handleList(_this.tag);
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 评价
    appraise(id, orderSn) {
      this.appraiseVisible = true;
      this.appraiseform.id = id;
      this.appraiseform.orderSn = orderSn;
    },
    // 评价
    handleAppraise() {
      if (isEmpty(this.appraiseform.star)) {
        this.$message.error("请选择星级评价");
        return;
      }
      var _this = this;
      this.$fetch("/api/order/commentUserOrder", {
        content: _this.appraiseform.content,
        star: _this.appraiseform.star,
        id: _this.appraiseform.id
      }).then(response => {
        console.log(response);
        if (response.code == 0) {
          this.$message({ type: "success", message: "已评价!" });
          _this.appraiseVisible = false;
          _this.handleList(_this.tag);
        }
      });
    }
  }
};
</script>

<style>
@import "../../style/customer.css";
</style> 


