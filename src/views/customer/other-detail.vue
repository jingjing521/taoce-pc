<template>
  <div class="main_width customer order stepBox" id="orderDetail">
    <div class="gl2-wddd_d flex justify-between">
      <div class="top_title">
        <strong>异常信息</strong>
      </div>
      <!-- <div>
        <el-button type="primary">打印</el-button>
        <el-button type="primary">导出</el-button>
      </div> -->
    </div>
    <div>
      <el-card class="box-card margin-bottom" v-if="orderDetail.orderStatus == '8'">
        <div slot="header" class="clearfix">
          <span class="tit">订单异常分析</span>
          <span style="float: right; padding: 3px 0"></span>
        </div>
        <div>
          <ul>
            <li class="xiangq_ju" style="width: calc( ( 100% - 120px ) / 2);">
              <span class="shenqrxq_bt">订单号</span>
              <el-input v-model="ycms.orderSn" class="container_input required" disabled ></el-input>
            </li>
            <li class="xiangq_ju" style="width: calc( ( 100% - 120px ) / 2);">
              <span class="shenqrxq_bt">异常报送日期</span>
              <el-input v-model="ycms.reportDate" class="container_input required" disabled ></el-input>
            </li>
            <li class="xiangq_ju" style="width: calc( ( 100% - 120px ));">
              <span class="shenqrxq_bt">产品类别</span>
              <el-input v-model="ycms.cplb" class="container_input required" disabled ></el-input>
            </li>
            <li class="xiangq_ju" style="width: calc( ( 100% - 120px ));">
              <span class="shenqrxq_bt">产品名称</span>
              <el-input v-model="ycms.cpmc" class="container_input required" disabled ></el-input>
            </li>
            <li class="xiangq_ju" style="width: calc( ( 100% - 120px ));">
              <span class="shenqrxq_bt">产品型号</span>
              <el-input v-model="ycms.cpxh" class="container_input required" disabled ></el-input>
            </li>
            <div v-for="(item,index) in ycms.ycitems" :key="index">
              <li class="xiangq_ju" style="width: calc( ( 100% - 120px ) / 4);">
                <span class="shenqrxq_bt">异常{{index+1}}</span>
                <div class="shenqrxq_bt">数据明细</div>
              </li>
              <li class="xiangq_ju" style="width: calc( ( 100% - 120px ) / 4);">
                <span class="shenqrxq_bt">项目名称</span>
                <el-input v-model="item.xmmc" class="container_input required" disabled style="width:100%"></el-input>
              </li>
              <li class="xiangq_ju" style="width: calc( ( 100% - 120px ) / 4);">
                <span class="shenqrxq_bt">标准值</span>
                <el-input v-model="item.bzz" class="container_input required" disabled style="width:100%"></el-input>
              </li>
              <li class="xiangq_ju" style="width: calc( ( 100% - 120px ) / 4);">
                <span class="shenqrxq_bt">实测值</span>
                <el-input v-model="item.scz" class="container_input required" disabled style="width:100%"></el-input>
              </li>
              <li class="xiangq_ju" style="width: calc( ( 100% - 120px ));margin-top: 20px;">
                <span class="shenqrxq_bt">异常分析</span>
                <el-input v-model="item.ycfx" class="container_input required" disabled ></el-input>
              </li>
              <li class="xiangq_ju" style="width: calc( ( 100% - 120px ));">
                <span class="shenqrxq_bt">整改措施和意见</span>
                <el-input v-model="item.zgcsyj" class="container_input required" disabled ></el-input>
              </li>
            </div>
            
          </ul>
        </div>
      </el-card> 
    </div>
  </div>
</template>
<script>
import { isEmpty } from "@/utils";
export default {
  data() {
    return {
      active: 1,
      orderDetail: {
        bgfsxs: "",
        receivingSampleLibEntity: {},
        orderAddtionalServiceItemEntityList:[],
        orderItemEntityList:[]


      },
      ycms: [],
    };
  },
  created() {
    this.getOrderInfo(this.$route.query.orderId);
  },
  methods: {
    // 查看订单详情
    getOrderInfo(orderId) {
      var _this = this;
      this.$fetch("/api/order/orderInfo", {
        orderId: orderId,
      }).then((response) => {
        if (response.code == 0) {
          _this.orderDetail = response.data;
          if (response.data.ycms) {
            _this.ycms = JSON.parse(response.data.ycms);
            console.log(_this.ycms);
          }
        }
      });
    }
  },
};
</script>
<style>
#box .el-card__body {
  padding: 0 !important;
}
</style>
<style>
@import "../../style/customer.css";
@import "../../style/step.css";
</style>
<style>
#orderDetail.stepBox .container_input {
  width: 52%;
}
</style>


  



