<template>
    <div class="main_width" id="step">
        <el-card class="box-card margin-bottom">
            <div slot="header" class="clearfix"> <span class="tit">订单服务流程</span> </div>
            <div>
                <el-steps :active="active" align-center>
                    <el-step title="在线委托"></el-step>
                    <el-step title="信息确认"></el-step>
                    <el-step title="样品寄送"></el-step>
                    <el-step title="样品检测"></el-step>
                    <el-step title="完成检测"></el-step>
                    <el-step title="报告发放"></el-step>
                </el-steps>
            </div>
        </el-card>
        <!-- 报告信息 -->
        <el-card class="box-card margin-bottom">
            <div slot="header" class="clearfix"> <span class="tit">报告信息</span> </div>
            <div>
                <ul class="shqrm_c" id="ulSampleMain">
                    <ul id="ulSampleTypeOne">
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">报告用途</span>
                            <el-select v-model="param.bgyt" placeholder="请选择">
                                <el-option  v-for="item in bgytList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt"> 报告数量 <span class="weit_xhx">*</span> </span>
                            <el-input v-model="param.bgsl" placeholder="请输入报告数量" class="container_input required" maxlength="50" ></el-input>
                            <span>份</span>
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">报告语言</span>
                            <el-select v-model="param.reportLauguage" placeholder="请选择">
                                <el-option label="中文语言" value="1"></el-option>
                                <el-option label="英文报告" value="2"></el-option>
                                <el-option label="中英文报告" value="3"></el-option>
                            </el-select>
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">结论形式</span>
                            <el-select v-model="param.jlxs" placeholder="请选择">
                                <el-option v-for="item in jlxsList" :key="item.value" :label="item.label" :value="item.value" ></el-option>
                            </el-select>
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">CQC申请编号</span>
                            <el-input v-model="param.cqcno" placeholder="CQC申请编号"  class="container_input required" maxlength="50" ></el-input>
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">报告形式</span>
                            <el-select v-model="param.reportType" placeholder="请选择">
                                <el-option label="检测报告" value="1"></el-option>
                                <el-option label="报告证书" value="2"></el-option>
                            </el-select>
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">发放方式</span>
                            <el-select v-model="param.bgfsxs" placeholder="请选择">
                                <el-option v-for="item in bgfsxsList" :key="item.value"  :label="item.label" :value="item.value" ></el-option>
                            </el-select>
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">备注</span>
                            <el-input  v-model="param.bgbz" placeholder="备注" class="container_input required" maxlength="200" ></el-input>
                        </li>
                    </ul>
                    <div class="xiangq_ju" v-if="param.bgfsxs.indexOf('电子邮件') > -1">
                        <span class="shenqrxq_bt">报告收取邮箱</span>
                        <el-input v-model="param.bgemail" placeholder="报告收取邮箱" class="container_input required" maxlength="50" ></el-input>
                    </div>
                    <div class="xiangq_ju" style="border-bottom: none;display:block;height:auto;" v-if="param.bgfsxs.indexOf('快递速运') > -1">
                        <span class="shenqrxq_bt"> 报告邮寄地址 <span class="weit_xhx">*</span> </span>
                        <el-card class="box-card" shadow="never" id="address-box">
                            <div v-for="item in addressList" :key="item.id" class="text item">
                                <el-radio v-model="param.bgaddrId" :label="item.id" @change="opt" >{{item.address }}</el-radio>
                            </div>
                        </el-card>
                        <div style="margin-top: 15px;">
                            <el-button type="primary" size="small" class="margin-left" @click="addAddress" >新增地址+</el-button>
                            <el-button type="primary" size="small" class="margin-left" v-if="addressList.length > 1" >更多地址</el-button>
                        </div>
                    </div>
                </ul>
            </div>
        </el-card>
        <!-- 委托客户信息 -->
        <el-card class="box-card margin-bottom">
            <div slot="header" class="clearfix"> <span class="tit">委托客户信息</span> </div>
            <div>
                <el-button type="primary" size="small" class="margin-left margin-right" @click="getClient">选择委托客户+</el-button> 请从用户身份认证信息中选择，若您未进行身份认证，请点击进行
                <router-link to="/authentication"> <el-button type="text" class="margin-left">身份认证</el-button> </router-link>
                <ul class="shqrm_c" id="ulSampleMain">
                    <ul id="ulSampleTypeOne">
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt"> 委托单位名称 <span class="weit_xhx">*</span> </span>
                            <el-input v-model="param.wtdwmc" placeholder="请输入委托单位名称" class="container_input required"maxlength="200" ></el-input>
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">委托单位英文名称</span>
                            <el-input v-model="param.wtdwenmc" placeholder="请输入委托单位英文名称" class="container_input required" maxlength="200" ></el-input>
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">统一社会信用代码</span>
                            <el-input v-model="param.creditCode" placeholder="请输入统一社会信用代码" class="container_input required" maxlength="50" ></el-input>
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">委托单位地址</span>
                            <el-input v-model="param.wtdwAddress" placeholder="请输入委托单位地址" class="container_input required" maxlength="200" ></el-input>
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">委托单位英文地址</span>
                            <el-input v-model="param.wtdwEnAddress" placeholder="请输入委托单位英文地址" class="container_input required" maxlength="200" ></el-input>
                        </li>
                        <li></li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">制造商与委托单位一致</span>
                            <el-radio v-model="param.isZzwtYz" label="1">是</el-radio>
                            <el-radio v-model="param.isZzwtYz" label="2">否</el-radio>
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt"> 制造商单位名称 <span class="weit_xhx">*</span> </span>
                            <el-input v-model="param.zzsdwmc"  placeholder="请输入制造商单位名称" class="container_input required" maxlength="200" ></el-input>
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">制造商单位地址</span>
                            <el-input  v-model="param.zzsdwdz" placeholder="请输入制造商单位地址" class="container_input required" maxlength="200" ></el-input>
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">生产商与委托单位一致</span>
                            <el-radio v-model="param.isScwtYz" label="1">是</el-radio>
                            <el-radio v-model="param.isScwtYz" label="2">否</el-radio>
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt"> 生产商名称 <span class="weit_xhx">*</span> </span>
                            <el-input v-model="param.scsdwmc" placeholder="请输入生产商名称" class="container_input required" maxlength="50" ></el-input>
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">生产商地址</span>
                            <el-input v-model="param.scsdwdz" placeholder="请输入生产商地址" class="container_input required" maxlength="50" ></el-input>
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt"> 联系人 <span class="weit_xhx">*</span> </span>
                            <el-input v-model="param.consignee" placeholder="请输入联系人" class="container_input required" maxlength="50" ></el-input>
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt"> 手机 <span class="weit_xhx">*</span> </span>
                            <el-input v-model="param.phone" placeholder="请输入手机" class="container_input required" maxlength="11" ></el-input>
                        </li>
                    </ul>
                </ul>
            </div>
        </el-card>
        <el-card class="box-card margin-bottom">
      <div slot="header" class="clearfix">
        <span class="tit">发票信息</span>
      </div>
      <div class="xiangq_ju" style="width: 90%;">
        <span class="shenqrxq_bt">是否需要发票</span>
        <el-radio-group v-model="param.isFp">
          <el-radio label="1">是</el-radio>
          <el-radio label="2">否</el-radio>
        </el-radio-group>
      </div>
      <div class="margin-top" v-if="param.isFp == '1'">
        <el-button type="primary" size="small" class="margin-left" v-if="invoiceList.length > 0" @click="optInvoice">选择发票+</el-button>
        <el-button type="primary" size="small" class="margin-left" @click="addInvoice">新增发票+</el-button>
        <ul class="shqrm_c">
            <li class="xiangq_ju">
              <span class="shenqrxq_bt"> 发票抬头 <span class="weit_xhx">*</span> </span>
              <el-input placeholder="请输入发票抬头" class="container_input required" v-model="param.fptt"></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt"> 纳税人识别号 <span class="weit_xhx">*</span> </span>
              <el-input placeholder="请输入纳税人识别号" class="container_input required" v-model="param.nsrsbh"></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">发票类型 <span class="weit_xhx">*</span></span>
              <el-radio v-model="param.fplx" label="1">专用发票</el-radio>
              <el-radio v-model="param.fplx" label="2">普通发票</el-radio>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">注册地址 <span class="weit_xhx">*</span></span>
              <el-input placeholder="请输入注册地址" class="container_input required" v-model="param.dwzcdz"></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">开户银行 <span class="weit_xhx">*</span></span>
              <el-input placeholder="请输入开户银行" class="container_input required" v-model="param.dwkhyh"></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">银行账户 <span class="weit_xhx">*</span></span>
              <el-input placeholder="请输入银行账户" class="container_input required" v-model="param.dwyhzh"></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">注册电话号码 <span class="weit_xhx">*</span></span>
              <el-input placeholder="请输入注册电话号码" class="container_input required" v-model="param.dwzcdh"></el-input>
            </li>
        </ul>
        <div class="xiangq_ju" style="border-bottom: none;">
          <span class="shenqrxq_bt">
            发票邮寄地址
            <span class="weit_xhx">*</span>
          </span>
          <el-card class="box-card" shadow="never" id="address-box">
              <div v-for="item in addressList" :key="item.id" class="text item">
                  <el-radio v-model="param.fpaddrId" :label="item.id">{{item.address }}</el-radio>
              </div>
          </el-card>
          <div style="margin-top: 15px;">
            <el-button type="primary" size="small" class="margin-left" @click="addAddress">新增地址+</el-button>
            <el-button type="primary" size="small" class="margin-left" v-if="addressList.length > 1">更多地址</el-button>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card margin-bottom"> 
      <div class="text-right">
        <router-link to="/addorder"><el-button style="margin-top: 12px;">上一步</el-button> </router-link> 
        <el-button style="margin-top: 12px;margin-left:10px;" type="info" @click="sub('1')">存草稿</el-button>
        <el-button style="margin-top: 12px;" type="primary" @click="sub('2')">提交订单</el-button>
      </div>
    </el-card>
        <!-- 新增地址 -->
        <add-address v-if="testStatus" ref="addaddress" @refreshDataList="getAddressList"/>
        <add-or-update-invoice v-if="status" ref="invoic" @refreshDataList="getInvoiceList"/>
        <client v-if="clientStatus" ref="client" @getClientData="getClientData"/>
        <invoice-list v-if="optInvoiceStatus" ref="invoicelist" @refreshDataList="getInvoiceList"/>
    </div>
</template>

<script>
import { isEmpty } from "@/utils";
import addAddress from "../template/add-address";
import addOrUpdateInvoice from "../template/add-or-update-invoice";
import invoiceList from "../template/invoice-list";
import client from "../template/client";
export default {
  components: { addAddress, client,addOrUpdateInvoice,invoiceList },
  name: "Sort",
  data() {
    return {
      active: 1,
      param: {
        reportLauguage: "1", // 报告语言 
        reportType: "1", // 报告形式
        wtdwmc: "",
        bgaddrId: "",
        creditCode: "",
        consignee: "",
        isScwtYz: "1",
        isZzwtYz: "1",
        bgyt: "社会证明",
        jlxs: "实测数据",
        bgfsxs: "快递速运",
        isFp:'2',
        fpaddrId:''
      },
      formLabelWidth: "120px",
      radio: "1",
      radio1: "1",

      testStatus: false,
      clientStatus: false,
      status:false,
      optInvoiceStatus:false,
      info: [{}],
      bgytList: [
        { value: "社会证明", label: "社会证明" },
        { value: "其他", label: "其他" }
      ],
      jlxsList: [
        { value: "实测数据", label: "实测数据" },
        { value: "结果判定", label: "结果判定" }
      ],
      bgfsxsList: [
        { value: "快递速运", label: "快递速运" },
        { value: "电子邮件", label: "电子邮件" },
        { value: "客户自取", label: "客户自取" },
        { value: "快递速运及电子邮件", label: "快递速运及电子邮件" }
      ],
      addressList: [],
      invoiceList:[],
      goodsDetail: {}
    };
  },
  mounted() {},
  created() {
    this.getAddressList();
    this.getInvoiceList();
    Object.assign(this.param,JSON.parse(window.localStorage.getItem("taoce-param")));
  },
  methods: {
    // 发票列表
    getInvoiceList(){
      var _this = this;
      this.$fetch("/api/user/userInvoiceInfoList").then(response => { 
        _this.listLoading = false;
        if (response.code == 0) {
          _this.invoiceList = response.data;
        }else{
          _this.$message.error(response.msg);
        }
      });
    },
    // 获取地址列表
    getAddressList() {
      var _this = this;
      this.$fetch("/api/user/userConsigneeAddressList").then(response => {
        if (response.code == 0) {
          _this.addressList = response.data;
          _this.param.bgaddrId = response.data[0].id;
          _this.param.fpaddrId = response.data[0].id;
        }else{
          _this.$message.error(response.msg);
        }
      });
    },
    handleList(){

    },
    addInvoice(){
      this.status = true;
      this.$nextTick(() => { this.$refs.invoic.init(); });
    },
    optInvoice(){
      this.optInvoiceStatus = true;
      this.$nextTick(() => { this.$refs.invoicelist.init(); });
    },









    opt(id) {
      console.log(id);
      this.param.bgaddrId = id;
    },
    getClientData(item) {
      console.log(item);
      this.param.wtdwmc = item.dwmc;
      this.param.creditCode = item.creditCode;
      this.param.consignee = item.legalPerson;
    },
    next() {
      console.log(this.param);
      if (isEmpty(this.param.wtdwmc)) {
        this.$message.error("请输入委托单位名称");
        return;
      }
      if (isEmpty(this.param.zzsdwmc)) {
        this.$message.error("请输入制造商单位名称");
        return;
      }
      if (isEmpty(this.param.scsdwmc)) {
        this.$message.error("请输入生产商名称");
        return;
      }
      if (isEmpty(this.param.phone)) {
        this.$message.error("请输入手机号");
        return;
      }
      if (isEmpty(this.param.consignee)) {
        this.$message.error("请输入联系人");
        return;
      }
      if (isEmpty(this.param.bgsl)) {
        this.$message.error("请输入报告数量");
        return;
      }
      window.localStorage.setItem("taoce-param", JSON.stringify(this.param));
      this.$router.push({ path: "/step1" });
    },
    // 新增检测标准
    addAddress() {
      this.testStatus = true;
      this.$nextTick(() => {
        this.$refs.addaddress.init();
      });
    },
    getClient() {
      this.clientStatus = true;
      this.$nextTick(() => {
        this.$refs.client.init();
      });
    },
    
    sub(type) {
      this.param.isJj = this.checked ? "1" : "2";
      this.param.isCg = type;
      this.param.isAggree = '1';

      this.$post("/api/order/addSpecialOrder", this.param).then(response => {
        console.log(response);
        if(response.code == 0){
          this.$message('提交成功');
          this.$router.push({ path: "/order" });
        }else{
          this.$message.error(response.msg);
        }
      });
    }
  }
};
</script>
<style>
.xiangq_ju .el-input__inner {
  border: none;
}
.shqrm_c td {
  height: 48px;
  padding: 2px 8px 2px 14px;
}

.shqrm_c {
  width: 100%;
  padding-bottom: 4px;
}

#step .container_input {
  width: 62%;
  height: 38px;
  border: 0;
}

.biaoge_x {
  border: 1px solid #e0e0e0;
  height: 48px;
  padding: 8px;
}

.sqrx_bg {
  margin-top: 20px;
  margin-bottom: 11px;
}

.xiangq_ju {
  width: 29%;
  height: 46px;
  border-bottom: 1px dashed #afafaf;
  display: inline-block;
  padding: 4px 4px 4px 18px;
  margin-left: 15px;
  margin-bottom: 4px;
}

.shenqrxq_bt {
  font-size: 14px;
  color: #0269a9;
  margin-right: 8px;
  line-height: 44px;
  font-weight: bold;
}

.tjdd_xq li {
  float: left;
  width: 20%;
  font-size: 16px;
  color: #666666;
  line-height: 60px;
}

.tjdd_xq {
  background: #fff;
  padding: 10px 0px 10px 0px;
  overflow: hidden;
}

.ddtj_ys {
  color: #fe6603;
  font-size: 24px;
}

.result_submit {
  width: 210px;
  height: 68px;
  background-color: #fe6603;
  text-align: center;
  line-height: 68px;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  border: 0;
}
.inputypdw {
  width: 30%;
  border: 1px solid #e2dddd;
  padding: 6px;
}
.form-control {
  border: 0;
  width: 79%;
  height: 47px;
  float: right;
}
.weit_xhx {
  color: #ff3b00;
}
.tit {
  font-size: 16px;
  color: #020308;
  border-left: 5px solid #006fb3;
  text-indent: 10px;
  display: inline-block;
  text-shadow: 3px 11px 8px rgba(249, 249, 249, 0.6);
}
.agree span {
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
}
#address-box .el-card__body {
  padding: 0;
}
#address-box .el-card__body .item {
  line-height: 45px;
  padding-left: 15px;
  border-bottom: 1px solid #f1f1f1;
  text-align: left;
}
</style>

 