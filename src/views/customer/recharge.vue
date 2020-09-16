<template>
  <div class="main_width customer" id="balance-box">
    <div class="gl2-wddd_d">
      <div class="top_title">
        <strong>充值</strong>
      </div>
    </div>
    <div class="bg-white padding" style="font-size:14px;">
      <div class="margin-bottom">当前余额：¥{{userInfo.androidBalance}}</div>
      <div>
        充值金额：
        <el-input
          v-model="ruleForm.rechargeAmount"
          placeholder="请输入充值金额"
          style="width:200px;"
          size="small"
        ></el-input>
      </div>
      <div style="margin-top: 20px">
        <el-radio-group v-model="ruleForm.payType">
          <el-radio label="1" border style="display:block;">支付宝</el-radio>
          <el-radio label="2" border style="display:block;">微信</el-radio>
          <el-radio label="3" border style="display:block;">线下汇款</el-radio>
        </el-radio-group>
      </div>
      <!-- 线上汇款  -->

      <el-card class="box-card margin-bottom" v-if="ruleForm.payType == 3">
        <div slot="header" class="clearfix">
          <span>温馨提示：</span>
        </div>
        <div class="text item">
          受银行处理时间影响，线下汇款方式到账会有延误，强烈建议采用支付宝、微信实时到账。
          <br />线下汇款直接向上海华道检测的专属账户汇款，系统会将汇款直接匹配到您的淘测账户。各种方式的到账时间一般为：交行1-2天，跨行2-5天（具体到账时间以银行的实际到账时间为准）。
          请避免北京时间21：00-00：00进行汇款，否则受银行出账时间影响，可能出现延迟一天到账情况。
          <br />淘测网余额提现仅支持原路返回，请谨慎选择充值/付款的账号。
          <br />
        </div>
      </el-card>

      <el-card class="box-card margin-bottom" v-if="ruleForm.payType == 3">
        <div slot="header" class="clearfix">
          <span>请您通过网银转账,或者自行到银行进行汇款， 汇款账户如下：</span>
        </div>
        <div>
          <div style="display:flex;justify-content: space-between;">
            <div class="text item">开户名称：{{personalBankNo.khmc}}</div>
            <div class="text item" style="color:red">专属账号电子证明下载</div>
          </div>

          <div class="text item">开户银行：{{personalBankNo.khyh}}</div>
          <div class="text item item1">
            专属汇款账户：
            <input type="text" :value="personalBankNo.zsbankno" disabled />
          </div>
          <div class="text item item1">
            将以上账户，免费发送到手机：{{userInfo.mobile}}
            <el-button
              size="small"
              type="warning"
              plain
              @click="sendPersonalBankNoToSm"
              v-show="show"
            >发送短信</el-button>
            <el-button size="small" type="warning" plain v-show="!show" disabled>{{sum}}s重新发送</el-button>
          </div>
        </div>
      </el-card>

      <div>
        <el-button type="info" size="small" @click="back">取消充值</el-button>
        <el-button type="primary" size="small" @click="recharge" v-if="ruleForm.payType != 3">充值</el-button>
      </div>
    </div>
    <!-- 微信 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <div style="text-align: center;">
        <div style="line-height:45px;">微信支付</div>
        <vue-qr :logoSrc="imageUrl" :text="codeUrl" :size="300"></vue-qr>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="wxSave" type="primary">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import vueQr from "vue-qr";
import { isEmpty } from "@/utils";
export default {
  components: {
    vueQr,
  },
  data() {
    return {
      show: true,
      sum: "",
      timer: null,
      ruleForm: {
        device: 2,
        rechargeAmount: "",
        payType: "1",
      },
      html: "",
      dialogVisible: false,
      codeUrl: "",
      imageUrl: "",
      userInfo: {},
      personalBankNo: {},
    };
  },
  created() {
    if (!window.localStorage.getItem("paoce_token")) {
      this.$router.push({ path: "/login" });
      return;
    }
    this.getUserInfo();
    this.getPersonalBankNo();
  },
  methods: {
    // 发送短信
    sendPersonalBankNoToSm() {
      var _this = this;
      this.$fetch("/api/user/sendPersonalBankNoToSm", {}).then((response) => {
        if (response.code == 0) {
          var time_count = 120;
          if (!_this.timer) {
            _this.sum = time_count;
            _this.show = false;
            _this.timer = setInterval(() => {
              if (_this.sum > 1 && _this.sum <= time_count) {
                _this.sum--;
              } else {
                _this.sum = 0;
                _this.show = true;
                clearInterval(_this.timer);
                _this.timer = null;
              }
            }, 1000);
          }
        } else {
          _this.$message.error(response.msg);
        }
      });
    },

    back() {
      this.$router.go(-1);
    },
    wxSave() {
      this.dialogVisible = false;
      this.ruleForm = { device: 2, rechargeAmount: "", payType: "1" };
    },
    getUserInfo() {
      var _this = this;
      this.$fetch("/api/user/userInfo").then((response) => {
        if (response.code == 0) {
          _this.userInfo = response.data;
          _this.userInfo.mobile =
            response.data.mobile.slice(0, 3) +
            "****" +
            response.data.mobile.slice(7);
        } else {
          _this.$message.error(response.msg);
        }
      });
    },
    // 充值
    recharge() {
      var _this = this;
      if (isEmpty(_this.ruleForm.rechargeAmount)) {
        _this.$message.error("请输入充值");
        return;
      }
      if (_this.ruleForm.payType == "3") {
        _this.$message.info("线下汇款功能暂未开发");
        return;
      }
      this.$put("/api/order/chargeOrder", this.ruleForm).then((response) => {
        if (response.code == 0) {
          if (_this.ruleForm.payType != "3") {
            _this.rechargeOrder(response.data);
          }
        } else {
          _this.$message.error(response.msg);
        }
      });
    },
    rechargeOrder(orderSn) {
      var _this = this;
      this.$fetch(
        "/api/order/chargeOrderPay?device=web&orderSn=" +
          orderSn +
          "&payType=" +
          this.ruleForm.payType,
        {}
      ).then((response) => {
        console.log(response);
        if (_this.ruleForm.payType == "1") {
          _this.html = response;
          let routerData = this.$router.resolve({
            path: "/payGateWay",
            query: { htmlData: response },
          });
          window.open(routerData.href, "_blank");
        }
        if (response.code == 0) {
          if (_this.ruleForm.payType == "2") {
            _this.dialogVisible = true;
            var codeUrl = response.data.codeUrl;
            _this.codeUrl = codeUrl;
          }
        } else {
          _this.$message.error(response.msg);
        }
      });
    },
    getPersonalBankNo() {
      var _this = this;
      this.$fetch("/api/user/getPersonalBankNo", {}).then((response) => {
        console.log(response);
        if (response.code == 0) {
          _this.personalBankNo = response.data;
        } else {
          _this.$message.error(response.msg);
        }
      });
    },
  },
};
</script>
<style>
@import "../../style/customer.css";
#balance-box .el-radio.is-bordered + .el-radio.is-bordered {
  margin-left: 0;
}
#balance-box .el-radio.is-bordered {
  padding: 0 20px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 50px;
  line-height: 50px;
}
#balance-box .el-radio {
  color: #606266;
  cursor: pointer;
  margin-right: 30px;
  margin-bottom: 20px;
  width: 600px;
  height: 50px;
}
#balance-box .item {
  line-height: 35px;
  font-size: 15px;
}
#balance-box .item1 {
  margin-left: 70px;
  color: #999;
}
#balance-box .item1 input {
  color: #999;
}
</style>

 


