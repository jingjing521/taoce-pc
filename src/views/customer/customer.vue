<template>
  <div class="main_width customer">
    <div class="gl2-wddd_d">
      <div class="top_title">
        <strong>欢迎</strong>
      </div>
    </div>
    <div class="user_factbook">
      <div class="user_icon">
        <img src="@/assets/icon/DefaultAvatar.jpg" alt="">
      </div>
      <div class="user_infor">
        <div class="user_infor_item">{{userInfo.username}}</div>
        <div class="user_infor_item">上次登录时间:{{updateTime}}</div>
      </div>
    </div>
    <div>
      <dl class="user_order_tips">
        <dt>订单提醒</dt>
        <dd>
          <router-link :to="{ path:'/order', query: {type:'1'}}">
            <strong class="orderCount">{{orderNum.dsysl}}</strong>
            <em>待送样订单</em>
          </router-link>
        </dd>
        <dd>
          <router-link :to="{ path:'/order', query: {type:'2'}}">
            <strong class="orderCount">{{orderNum.dfksl}}</strong>
            <em>待付款订单</em>
          </router-link>
        </dd>
        <dd>
          <router-link :to="{ path:'/order', query: {type:'4'}}">
            <strong class="orderCount">{{orderNum.dqssl}}</strong>
            <em>待签收订单</em>
          </router-link>
        </dd>
        <dd>
          <router-link :to="{ path:'/order', query: {type:'5'}}">
            <strong class="orderCount">{{orderNum.dpjsl}}</strong>
            <em>待评价订单</em>
          </router-link>
        </dd>
      </dl>
    </div>
  </div>
</template>
		 
<script>
export default {
  data() {
    return {
      userInfo: {},
      orderNum: {},
      updateTime: ""
    };
  },
  created() {
    if (!window.localStorage.getItem("paoce_token")) {
      this.$router.push({ path: "/login" });
      return;
    }
    this.getOrderNum();
    this.getUserInfo();
    this.getTime();
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      var _this = this;
      this.$fetch("/api/user/userInfo").then(response => {
        if (response.code == 0) {
          _this.userInfo = response.data;
        } else {
          _this.$message.error(response.msg);
        }
      });
    },
    // 获取订单数量
    getOrderNum() {
      var _this = this;
      this.$fetch("/api/order/statisticsUserOrder").then(response => {
        if (response.code == 0) {
          _this.orderNum = response.data;
        } else {
          _this.$message.error(response.msg);
        }
      });
    },
    // 获取最后一次登录时间
    getTime() {
      var _this = this;
      this.$fetch("/api/user/userLoginLogList").then(response => {
        if (response.code == 0) {
          _this.updateTime = response.data.records[0].updateTime;
        } else {
          _this.$message.error(response.msg);
        }
      });
    }
  }
};
</script>
<style>
@import "../../style/customer.css";
</style>
