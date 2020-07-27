<template>
  <div class="main_width customer">
    <div class="gl2-wddd_d">
      <div class="top_title">
        <strong>支付宝支付</strong>
      </div>
    </div>
    <div v-html="payGateWay">{{payGateWay}}</div>
  </div>
</template>
<script>
export default {
  name: "payGateWay",
  data() {
    return {
      payGateWay: ""
    };
  },
  mounted() {
    let form = this.$route.query.htmlData;
    this.payGateWay = form;
    this.$nextTick(() => {
      document.forms[0].submit();
    });
  }
};
</script>
<style>
@import "../../style/customer.css";
</style>
  