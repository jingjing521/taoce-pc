<template>
	<div class="main_width customer" id="balance-box">
		<div class="gl2-wddd_d"><div class="top_title"><strong>充值记录</strong></div></div>
    <div class="bg-white padding">
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
      <div class="block" style="text-align:right;margin-top:30px;margin-bottom:30px;">
        <el-pagination hide-on-single-page  :page-size="pageSize" background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange" ></el-pagination>
      </div>
    </div>
	</div>
</template>
<script>
export default {
  data() {
    return { 
      list: [],
      status: false,
      loading:true,
      currentPage: 1,
      pageSize: 10,
      total:0
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
    handleList() {
      var _this = this;
      this.$fetch("/api/order/chargeOrder",{ limit: _this.pageSize, page: _this.currentPage }).then(response => { 
        _this.loading = false
        if (response.code == 0) {
          _this.list = response.data.records;
          _this.total = response.data.total;
        }else {
          _this.$message.error(response.msg);
        }
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.handleList();
    },
  }
};
</script>
<style>
@import "../../style/customer.css";
</style>

 


