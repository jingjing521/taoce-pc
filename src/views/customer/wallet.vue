<template>
  <div class="main_width customer" id="balance-box">
    <div class="gl2-wddd_d">
      <div class="top_title">
        <strong>我的钱包</strong>
      </div>
    </div>
    <div class="user_rt_cont gl2-user_rt_cont bg-white padding">
      <div class="balance-title">
        <span class="margin-right">账户余额</span>
        <el-link type="primary" @click="goDetail">充值记录</el-link>
      </div>
      <div class="flex margin-top">
        <div class="balance">¥{{userInfo.androidBalance}}</div>
        <div>
          <el-button type="primary" size="small" @click="recharge">充值</el-button>
          <!-- <el-button type="primary" size="small" @click="widthdraw">提现</el-button> -->
        </div>
      </div>
    </div>
    <div class="bg-white padding text-center">
      <div style="width:800px;height:500px" ref="chart"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  created() {
    if (!window.localStorage.getItem("paoce_token")) {
      this.$router.push({ path: "/login" });
      return;
    }
    this.getUserInfo();
    this.myConsumptionStatistics();
  },
  mounted() {
    
    
  },
  methods: {
    getUserInfo() {
      var _this = this;
      this.$fetch("/api/user/userInfo").then(response => {
        if (response.code == 0) {
          _this.userInfo = response.data;
        }
      });
    },
    // 统计
    myConsumptionStatistics(){
      var _this = this;
      this.$fetch("/api/order/myConsumptionStatistics").then(response => {
        console.log(response);
        if (response.code == 0) {
          var chargeList = [];
          var orderList = [];
          for (var i in response.data.chargeList[0]) { 
            console.log(i);
            chargeList.push(response.data.chargeList[0][i])
          }
          for (var x in response.data.orderList[0]) { 
            orderList.push(response.data.orderList[0][x])
          }
          console.log(chargeList,orderList)
          _this.initCharts(chargeList,orderList);
        }
      });
    },
    goDetail() {
      this.$router.push({ path: "/rechargeDetail" });
    },
    recharge() {
      this.$router.push({ path: "/recharge" });
    },
    widthdraw() {
      this.$router.push({ path: "/widthdraw" });
    },
    initCharts(chargeList,orderList) {
      let myChart = this.$echarts.init(this.$refs.chart);
      myChart.setOption({
        title: {
          text: "近12个月的消费趋势"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["充值金额", "消费金额"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月","8月","9月","10月","11月","12月"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "充值金额",
            type: "line",
            stack: "总量",
            data: chargeList
          },
          {
            name: "消费金额",
            type: "line",
            stack: "总量",
            data: orderList
          }
        ]
      });
    }
  }
};
</script>
<style>
@import "../../style/customer.css";
</style>

 


