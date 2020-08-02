<template>
  <div class="main_width customer" v-loading="loading">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="充值明细" name="account">
        <div class="gl2-wddd_d">
          <div class="top_title">
            <strong>充值明细</strong>
          </div>
        </div>
        <div class="block"> 
          <el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          <el-button type="primary" style="margin-left:20px;">查询</el-button>
        </div>
        <div class="padding-top padding-bottom" style="font-size:16px;"> 
          <span>充值总金额：200.00元</span>
        </div>
        <el-table :data="list" style="width: 100%" stripe border v-loading="loading">
          <el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
          <el-table-column prop="orderSn" label="交易编号" align="center"></el-table-column>
          <el-table-column prop="createTime" label="交易时间" align="center"></el-table-column>
          <el-table-column prop="otherSn" label="交易渠道流水号" align="center" min-width="150"></el-table-column>
          <el-table-column prop="payType" label="交易渠道" align="center" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.payType == '1'">支付宝</span>
              <span v-if="scope.row.payType == '2'">微信</span>
              <span v-if="scope.row.payType == '3'">线上汇款</span>
            </template>
          </el-table-column>
          <el-table-column prop="payMoney" label="充值金额" align="center"></el-table-column>
        </el-table> 
        <div class="padding-top text-right">
          <el-pagination :hide-on-single-page="value" background layout="prev, pager, next" :page-size="limit" :current-page="page" :total="total" @current-change="handleCurrentChange"></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="消费明细" namee="consume">
        <div class="gl2-wddd_d">
          <div class="top_title">
            <strong>消费明细</strong>
          </div>
        </div>
        <div class="block"> 
          <el-date-picker v-model="value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          <el-button type="primary" style="margin-left:20px;">查询</el-button>
        </div>
        <div class="padding-top padding-bottom" style="font-size:16px;">
          <span class="padding-right">消费总金额：100.00元</span> 
        </div>
        <el-table :data="list1" border="" style="width: 100%">
          <el-table-column prop="orderId" label="订单编号" align="center"></el-table-column>
          <el-table-column prop="orderSn" label="账单流水" align="center"></el-table-column>
          <el-table-column prop="orderAmount" label="订单价格" align="center"></el-table-column>
          <el-table-column prop="goodsName" label="样品名称" align="center"></el-table-column>
          <el-table-column prop="createTime" label="支付方式" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.payType == '1'">支付宝</span>
              <span v-if="scope.row.payType == '2'">微信</span>
              <span v-if="scope.row.payType == '3'">余额支付</span>
              <span v-if="scope.row.payType == '4'">线下支付</span>
            </template>
          </el-table-column>
          <el-table-column prop="addTime" label="创建时间" align="center"></el-table-column>
        </el-table>
        <div class="padding-top text-right">
          <el-pagination :hide-on-single-page="value" background layout="prev, pager, next" :page-size="limit" :current-page="page" :total="total1" @current-change="handleCurrentChange1"></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1:'',
      value:true,
      loading:true,
      activeName: "account",
      list: [],
      list1: [],
      total:0,
      total1:0,
      page:1,
      limit:10,
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
    // 切换
    handleClick(tab, event) { 
      this.loading = true;
      this.page = 1;
      if(tab.name == 'account'){ 
        this.handleList();
      }else{
        this.handleList1();
      }
    },
    // 充值明细
    handleList() {
      var _this = this;
      this.$fetch("/api/order/chargeOrder", { limit: _this.limit, page: _this.page  }).then(response => { 
        _this.loading = false;
        if (response.code == 0) {
          _this.list = response.data.records;
          _this.total = response.data.total;
        }else{
          _this.$message.error(response.msg)
        }
      });
    },
    // 消费明细
    handleList1() {
      var _this = this;
      this.$fetch("/api/order/userOrderList", {
        limit: _this.limit,
        page: _this.page,
        payStatus:'1'
      }).then(response => { 
        _this.loading = false;
        if (response.code == 0) {
          _this.list1 = response.data.records;
          _this.total1 = response.data.total;
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
    }
  }
};
</script>
<style>
@import "../../style/customer.css";
</style>