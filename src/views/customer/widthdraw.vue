<template>
  <div class="main_width customer" id="balance-box">
    <div class="gl2-wddd_d">
      <div class="top_title">
        <strong>提现</strong>
      </div>
    </div>
    <div class="bg-white padding" style="font-size:14px;">
      <div class="margin-bottom">当前余额：¥{{userInfo.androidBalance || 0}}</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        style="width:500px;"
      >
        <el-form-item label="提现金额" prop="rechargeAmount">
          <el-input placeholder="请输入提现金额" v-model="ruleForm.rechargeAmount"></el-input>
        </el-form-item>
        <el-form-item label="选择账户">
          <div @click="goAddBnank">
            <el-button size="mini" type="primary">添加账户</el-button>
          </div>
          <el-radio-group v-model="ruleForm.bank" v-if="list.length > 0">
            <el-radio border  style="display:block;" v-for="(item) in list"  :key="item.id" :label="item">{{item.bankName}}({{item.bankCardNo}})</el-radio>
          </el-radio-group>
          
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="phone" placeholder="请输入手机号" maxlength="11" disabled></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" placeholder="请输入验证码" style="width: 250px;" maxlength="6"></el-input>
          <el-button type="primary" style="display:inline-block;float: right;" @click="getCode" v-show="show">获取验证码</el-button>
          <el-button type="info" style="display:inline-block;float: right;"  v-show="!show" >{{sum}}s重新发送</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" size="small" @click="back">取消提现</el-button>
          <el-button type="primary" size="small" @click="submitForm('ruleForm')" :disabled="disabled">提现</el-button>
        </el-form-item>
      </el-form>
      <div>
        <div>提现提醒：</div>
        <div>1）提现金额应不超过原途径充值金额 ，若提现金额超过原途径充值金额，则提现失败，需修改提现金额后重新发起提现；</div>
        <div>2）提现金额于3-30个工作日内到账，请您耐心等待。</div>
      </div>

    </div>

    <!-- 新增或者编辑地址 -->
    <add-bank v-if="status" ref="addbank" @refreshDataList="handleList" />
  </div>
</template>
<script>
import addBank from "../template/add-bank";
import vueQr from "vue-qr";
import { isEmpty } from "@/utils";
export default {
  components: {
    vueQr,
    addBank,
  },
  data() {
    var validateMoney = (rule, value, callback) => {
      if (!/(^[\-0-9][0-9]*(.[0-9]+)?)$/.test(value)) {
        callback(new Error("请输入正确的提现金额"));
      } else if (value < 500) {
        callback(new Error("提现金额至少500元"));
      } else {
        callback();
      }
    };
    return {
      status: false,
      phone: "",
      disabled: false,
      list: [],
      show: true,
      sum: "",
      timer: null,
      ruleForm: {
        device: 2,
        rechargeAmount: "",
        bank: "0",
      },
      html: "",
      dialogVisible: false,
      codeUrl: "",
      imageUrl: "",
      userInfo: {},
      personalBankNo: {},
      rules: {
        rechargeAmount: [
          { required: true, message: "请输入提现金额", trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  created() {
    if (!window.localStorage.getItem("paoce_token")) {
      this.$router.push({ path: "/login" });
      return;
    }
    this.getUserInfo();
    this.handleList();
  },
  methods: {
    goAddBnank() {
      this.status = true;
      this.$nextTick(() => {
        this.$refs.addbank.init();
      });
    },
    getCode() {
      var _this = this;
      this.$fetch("/api/user/getVerifyCode", {
        phone: _this.userInfo.mobile,
        type: "6",
      }).then((response) => {
        if (response.code == 0) {
          var time_count = 60;
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
    // 修改密码
    submitForm(formName) {
      var _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.disabled = true;
          this.$put("/api/user/userWithdraw", {
            code: _this.ruleForm.code,
            mobile: _this.userInfo.mobile,
            amount: _this.ruleForm.rechargeAmount,
            bankCardNo: _this.ruleForm.bank.bankCardNo,
            bankName: _this.ruleForm.bank.bankName,
            bankUserName: _this.ruleForm.bank.bankUserName,
            branchName: _this.ruleForm.bank.branchName,
          }).then((response) => {
            if (response.code == 0) {
              _this.$message({
                message: "提现申请成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  _this.disabled = false;
                  _this.$router.go(-1);
                },
              });
            } else {
              _this.disabled = false;
              _this.$message.error(response.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

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
          _this.phone =
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
    handleList() {
      var _this = this;
      this.$fetch("/api/user/userBankCardInfoList").then((response) => {
        _this.loading = false;
        if (response.code == 0) {
          _this.list = response.data;
          _this.ruleForm.bank = response.data[0];
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

 


