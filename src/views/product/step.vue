<template>
  <div class="main_width stepBox" id="step">
    <el-form :model="param" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <!-- 订单服务流程 -->
      <el-card class="box-card margin-bottom">
        <div slot="header" class="clearfix">
          <span class="tit">订单服务流程</span>
        </div>
        <div>
          <el-steps :active="active" align-center>
            <el-step title="在线委托"></el-step>
            <el-step title="信息确认"></el-step>
            <el-step title="样品寄送"></el-step>
            <el-step title="样品检测"></el-step>
            <el-step title="完成检测"></el-step>
            <el-step :title="param.reportType == '1' ? '报告发放':'证书发放'"></el-step>
          </el-steps>
        </div>
      </el-card>
      <!-- 服务商品信息 -->
      <el-card class="box-card margin-bottom">
        <div slot="header" class="clearfix">
          <span class="tit">确认服务信息</span>
        </div>
        <div>
          <el-table :data="info" style="width: 100%" border>
            <el-table-column label="服务图片" align="center">
              <template slot-scope="scope">
                <img :src="goodsDetail.goodsImg" alt style="width:100px" />
              </template>
            </el-table-column>
            <el-table-column prop="name" label="服务名称" align="center">
              <template slot-scope="scope">
                <span>{{goodsDetail.goodsName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="机构名称" align="center">
              <template slot-scope="scope">
                <span>{{goodsDetail.jgmc}}</span>
              </template>
            </el-table-column>
            <el-table-column label="检测周期" align="center">
              <template slot-scope="scope">
                <span>{{goodsDetail.testPeriod}}</span>
              </template>
            </el-table-column>
            <el-table-column label="价格" align="center">
              <template slot-scope="scope">
                <span v-if="param.reportLauguage == '1'">¥{{goodsDetail.zhbgjg}}</span>
                <span v-if="param.reportLauguage == '2'">¥{{goodsDetail.enbgjg}}</span>
                <span v-if="param.reportLauguage == '3'">¥{{goodsDetail.zebgjg}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <!-- 附加服务信息 -->
      <el-card class="box-card margin-bottom" v-if="isFrom == '0'">
        <div slot="header" class="clearfix"> <span class="tit">附加服务信息</span> </div>
        <div>
          <el-table :data="addServerList" style="width: 100%" border  ref="multipleTable" >
            <el-table-column label="附加服务名称" align="center" prop="additionalServiceEntity.fwmc"></el-table-column>
            <el-table-column prop="name" label="送样数量/单" align="center"> 
              <template slot-scope="scope">
                <span v-if="scope.row.additionalServiceEntity.priceType == '2'" >{{ JSON.parse(scope.row.agentGoodsAdditionalServiceEntity.fwitem)[0].dprice}}</span>
                <span v-if="scope.row.additionalServiceEntity.priceType == '1'" >{{scope.row.agentGoodsAdditionalServiceEntity.dprice}}</span>
              </template>
            </el-table-column>
            <el-table-column label="数量" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.agentGoodsAdditionalServiceEntity.numItem}}</span>
              </template>
            </el-table-column>
            <el-table-column label="说明" align="center">
              <template slot-scope="scope">
                <el-button @click="handleClickDetail(scope.row)" type="text" size="small">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-card class="box-card margin-bottom" v-if="isFrom == '1'">
        <div slot="header" class="clearfix"> <span class="tit">附加服务信息</span> </div>
        <div>
          <el-table :data="addServerList" style="width: 100%" border  ref="multipleTable" >
            <el-table-column label="附加服务名称" align="center" prop="fwmc"></el-table-column>
            <el-table-column prop="jcjg" label="送样数量/单" align="center"></el-table-column>
            <el-table-column label="数量" align="center"  prop="jcsl"></el-table-column>
            <el-table-column label="说明" align="center">
              <template slot-scope="scope">
                <el-button @click="handleClickDetail(scope.row)" type="text" size="small">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <!-- 委托客户信息 -->
      <el-card class="box-card margin-bottom">
        <div slot="header" class="clearfix"> <span class="tit">委托客户信息</span> </div>
        <div>
          <el-button type="primary" size="small" class="margin-left margin-right" @click="getClient" >选择委托客户+</el-button>
          <!-- 请从用户身份认证信息中选择，若您未进行身份认证，请点击进行 -->
          <!-- <router-link to="/authentication" target="_blank"> <el-button type="text">身份认证</el-button></router-link> -->
          <ul>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt"> 委托单位名称 <span class="weit_xhx" v-if="param.reportLauguage != '2'">*</span> </span>
              <el-input v-model="param.wtdwmc" placeholder="请输入委托单位名称" class="container_input required" maxlength="200" ></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt"> 委托单位英文名称 <span class="weit_xhx" v-if="param.reportLauguage != '1'">*</span> </span>
              <el-input v-model="param.wtdwenmc" placeholder="请输入委托单位英文名称" class="container_input required"  maxlength="200" ></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">统一社会信用代码</span>
              <el-input v-model="param.creditCode"  placeholder="请输入统一社会信用代码" class="container_input required" maxlength="150" ></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">委托单位地址</span>
              <el-input v-model="param.wtdwAddress" placeholder="请输入委托单位地址" class="container_input required" maxlength="200" ></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">委托单位英文地址</span>
              <el-input v-model="param.wtdwEnAddress" placeholder="请输入委托单位英文地址" class="container_input required"  maxlength="200" ></el-input>
            </li>
            <li></li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">制造商与委托单位一致</span>
              <el-radio-group v-model="param.isZzwtYz">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
            </li>
            <li v-if="param.isZzwtYz == '1'"></li>
            <li v-if="param.isZzwtYz == '1'"></li>
            <li class="xiangq_ju" v-if="param.isZzwtYz == '2'">
              <span class="shenqrxq_bt">  制造商单位名称 <span class="weit_xhx">*</span> </span>
              <el-input  v-model="param.zzsdwmc"  placeholder="请输入制造商单位名称" class="container_input required" maxlength="200" ></el-input>
            </li>
            <li class="xiangq_ju" v-if="param.isZzwtYz == '2'">
              <span class="shenqrxq_bt">制造商单位地址</span>
              <el-input v-model="param.zzsdwdz"  placeholder="请输入制造商单位地址" class="container_input required" maxlength="200" ></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">生产商与委托单位一致</span>
              <el-radio-group v-model="param.isScwtYz">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
            </li>
            <li v-if="param.isScwtYz == '1'"></li>
            <li v-if="param.isScwtYz == '1'"></li>
            <li class="xiangq_ju" v-if="param.isScwtYz == '2'">
              <span class="shenqrxq_bt"> 生产商名称 <span class="weit_xhx">*</span> </span>
              <el-input v-model="param.scsdwmc" placeholder="请输入生产商名称" class="container_input required" maxlength="50" ></el-input>
            </li>
            <li class="xiangq_ju" v-if="param.isScwtYz == '2'">
              <span class="shenqrxq_bt">生产商地址</span>
              <el-input  v-model="param.scsdwdz"  placeholder="请输入生产商地址" class="container_input required" maxlength="200" ></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt"> 联系人 <span class="weit_xhx">*</span> </span>
              <el-input v-model="param.consignee" placeholder="请输入联系人"  class="container_input required"  maxlength="50" ></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">  手机 <span class="weit_xhx">*</span> </span>
              <el-input v-model="param.phone" placeholder="请输入手机" class="container_input required" maxlength="11" ></el-input>
            </li>
          </ul>
        </div>
      </el-card>
      <!-- 报告信息 -->
      <el-card class="box-card margin-bottom">
        <div slot="header" class="clearfix">
          <span class="tit">报告信息</span>
        </div>
        <div>
          <ul class="shqrm_c">
            <ul id="ulSampleTypeOne">
              <li class="xiangq_ju">
                <span class="shenqrxq_bt">报告用途</span>
                <el-select v-model="param.bgyt" placeholder="请选择">
                  <el-option v-for="item in bgytList"  :key="item.value"  :label="item.label" :value="item.value" ></el-option>
                </el-select>
              </li>
              <li class="xiangq_ju">
                <span class="shenqrxq_bt"> 报告数量  <span class="weit_xhx">*</span> </span>
                <el-input v-model="param.bgsl" placeholder="请输入报告数量" class="container_input required" maxlength="50" ></el-input>
                <span>份</span>
              </li>
              <li class="xiangq_ju">
                <span class="shenqrxq_bt">报告语言</span>
                <el-input value="中文语言" class="container_input required" disabled v-if="param.reportLauguage == '1'"></el-input>
                <el-input value="英文报告" class="container_input required" disabled v-if="param.reportLauguage == '2'"></el-input>
                <el-input value="中英文报告" class="container_input required" disabled v-if="param.reportLauguage == '3'"></el-input>
              </li>
              <li class="xiangq_ju">
                <span class="shenqrxq_bt">结论形式</span>
                <el-select v-model="param.jlxs" placeholder="请选择">
                  <el-option v-for="item in jlxsList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </li>
              <li class="xiangq_ju">
                <span class="shenqrxq_bt" style="width: 99px;display: inline-block;height: 50px;line-height: 12px;margin:auto">
                   <i>CQC申请编号</i> 
                   <i>www.baidu.com</i> 
                </span>
                <el-input v-model="param.cqcno" placeholder="请输入CQC申请编号" class="container_input required" maxlength="50" ></el-input>
              </li>
              <li class="xiangq_ju">
                <span class="shenqrxq_bt">报告形式</span>
                <el-input value="检测报告" class="container_input required" disabled v-if="param.reportType == '1'" ></el-input>
                <el-input value="报告证书" class="container_input required" disabled v-if="param.reportType == '2'"></el-input>
              </li>
              <li class="xiangq_ju">
                <span class="shenqrxq_bt">发放方式</span>
                <el-select v-model="param.bgfsxs" placeholder="请选择">
                  <el-option v-for="item in bgfsxsList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </li>
              <li class="xiangq_ju">
                <span class="shenqrxq_bt">备注</span>
                <el-input v-model="param.bgbz" placeholder="请输入备注" class="container_input required" maxlength="200"></el-input>
              </li>
            </ul>
            <div class="xiangq_ju" v-if="param.bgfsxs.indexOf('电子邮件') > -1">
              <span class="shenqrxq_bt"> 报告收取邮箱 <span class="weit_xhx">*</span> </span>
              <el-input v-model="param.bgemail" placeholder="请输入报告收取邮箱" class="container_input required" maxlength="50"></el-input>
            </div>
            <div class="xiangq_ju" style="border-bottom: none;display:block;height:auto;width:calc( ( 100% - 120px ));" v-if="param.bgfsxs.indexOf('快递速运') > -1">
              <span class="shenqrxq_bt"> 报告邮寄地址 <span class="weit_xhx">*</span> </span>
              <el-card :class=" !moreAddress ? 'box-card moreAddress':'box-card'" shadow="never" id="address-box" v-if="addressList.length > 0">
                <div v-for="item in addressList" :key="item.id" class="text item">
                  <el-radio v-model="param.bgaddrId" :label="item.id" @change="opt" >{{ item.proAddress + item.address }}</el-radio>
                </div>
              </el-card>
              <div style="margin-top: 15px;">
                <el-button type="primary" size="small" class="margin-left" @click="addAddress">新增地址+</el-button>
                <el-button type="primary" size="small" class="margin-left" v-if="addressList.length > 1" @click="moreAddress = !moreAddress">{{ !moreAddress ? '更多地址':'收起地址'}}</el-button>
              </div>
            </div>
          </ul>
        </div>
      </el-card>
      <el-card class="box-card margin-bottom">
        <div class="agree">
          <span>产品服务协议</span>
          <router-link to="/agreement" target="_blank">
            <el-button type="text">查看详情</el-button>
          </router-link>
        </div>
        <div class="text-right">
          <el-button style="margin-top: 12px;" type="primary" @click="next">下一步</el-button>
        </div>
      </el-card>
      <!-- 新增地址 -->
      <add-address v-if="testStatus" ref="addaddress" @refreshDataList="getAddressList" />
      <!-- 委托用户列表 -->
      <client v-if="clientStatus" ref="client" @getClientData="getClientData" />
      <!-- 附加服务详情 -->
      <el-dialog title="详情" :visible.sync="dialogVisible" width="50%">
        <div v-html="detail"></div>
        <span slot="footer" class="dialog-footer"><el-button @click="dialogVisible = false">取 消</el-button></span>
      </el-dialog> 
    </el-form>
  </div>
</template>

<script>
import cityList from "@/utils/city.json";
import { isEmpty ,getDataName,getAllCity,getAllDistrict } from "@/utils";
import { validateAllMobile,validateEmail } from '@/utils/validate'
import addAddress from "../template/add-address";
import client from "../template/client";
export default {
  components: { addAddress, client },
  data() {
    return {
      isFrom:'0',
      addServerList:[],
      detail:"",
      dialogVisible:false,
      moreAddress:false,
      clientStatus: false, // 选择委托用户状态
      param: {
        agentId:"", // 代理商id 
        jgid:"", //  机构ID
        goodsId:"", //  商品ID
        

        /**
         * 委托客户信息
         */
        wtdwmc:"", //  委托单位名称 
        wtdwenmc:"", //  委托单位英文名称
        wtdwAddress:"", //  委托单位地址 
        wtdwEnAddress:"", //  委托单位英文地址
        creditCode:"", //  统一社会信用代码
        isScwtYz:"1", //  生产商与委托单位一致 1是 2否 
        isZzwtYz:"1", //  制造商与委托单位一致 1是 2否
        scsdwdz:"", //  生产商地址 
        scsdwmc:"", //  生产商名称 
        zzsdwdz:"", //  制造商单位地址 
        zzsdwmc:"", //  制造商单位名称 
        phone:"", //  手机
        consignee:"", //  联系人  
        /**
         * 报告信息
         */ 
        bgyt: "社会证明", // 报告用途
        bgsl:"", //  报告数量
        jlxs: "实测数据", // 结论形式
        bgfsxs: "快递速运", // 发放方式
        reportLauguage: "", // 报告语言
        reportType: "", // 报告类型 
        cqcno	:"", //  CQC申请编号
        bgbz:"", //  报告备注
        bgaddrId: "", // 报告邮寄地址
       
        
        
        goodsAddtionalItemList:[]
      },
      rules:{},
      formLabelWidth: "120px",
      radio: "1",
      radio1: "1",
      active: 0,
      testStatus: false,
      
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
      goodsDetail: {}
    };
  },
  mounted() {},
  created() {
    if (!window.localStorage.getItem("paoce_token")) {
      this.$router.push({ path: "/login" }); return;
    }
    // 获取地址列表
    this.getAddressList();  
    if(this.$route.query.orderId){
      this.getOrderInfo(this.$route.query.orderId); 
      this.isFrom = "1";
    }else{
      this.isFrom = "0";
      /**
       * 从商品详情的立即购买
       */
      if (window.localStorage.getItem("taoce-param")) {
        this.param = JSON.parse(window.localStorage.getItem("taoce-param"));
      }
      // 商品详情信息
      if(window.localStorage.getItem("paoce_token-detail")){ 
        var goodsDetail = JSON.parse(window.localStorage.getItem("paoce_token-detail")); // 服务商品信息
        this.param.reportType = goodsDetail.opt.reportType;  // 报告类型
        this.param.reportLauguage = goodsDetail.opt.reportLauguage; // 报告语言
        this.addServerList = goodsDetail.multipleSelection; // 附加服务信息
        this.goodsDetail = goodsDetail; 
        this.param.isJj = this.goodsDetail.isJJ ? '1':'2';
        var _this = this;
        this.addServerList.forEach(function(v,i){
          _this.param.goodsAddtionalItemList.push({ 
            "fwid": v.fwId ,
            "jcsl": v.agentGoodsAdditionalServiceEntity.numItem
     
          })
        })
         
      }
    }  
  },
  methods: {  
    /**
     * 附加服务详情
     */
    handleClickDetail(item){ 
      this.dialogVisible = true;
      this.detail = item.additionalServiceEntity.detail
    },
    /**
     * 调用商品详情的接口
     */
    getGoodDetail(id,shopid){
      var _this = this;
      this.$post( "/api/goods/goodsInfo?goods_id=" + id + "&shopid=" + shopid, {} ).then(response => {
        if (response.code == 0) {
          var opt = { reportLauguage: _this.param.reportLauguage, reportType: _this.param.reportType }
          _this.goodsDetail = response.data;
          _this.goodsDetail.opt = opt;
          window.localStorage.setItem("paoce_token-detail", JSON.stringify(this.goodsDetail));
        }else{
          _this.$message.error(response.msg)
        }
      });
    }, 
    // 查看订单详情
    getOrderInfo(orderId) {
      var _this = this;
      this.$fetch("/api/order/orderInfo", { orderId: orderId }).then(response => {
        if (response.code == 0) {
          _this.param = response.data;  
          _this.addServerList = response.data.orderAddtionalServiceItemEntityList;
          _this.param.goodsAddtionalItemList = [];
          _this.addServerList.forEach(function(v,i){
          _this.param.goodsAddtionalItemList.push({ 
            "fwid": v.fwId ,
            "jcsl": v.jcsl
          })
        })
          _this.getGoodDetail(_this.param.goodsId,_this.param.agentId) 
        }
      });
    },
    handleIsZzwtYz(){ 
      this.param.scsdwmc = this.param.isZzwtYz == '1' ? this.param.wtdwmc : '' ;
      this.param.scsdwdz = this.param.isZzwtYz == '1' ? this.param.wtdwAddress : ''; 
    }, 
    // 下一步
    next() {
      console.log(this.param);
      // 生产商
      this.param.scsdwmc = this.param.isScwtYz == '1' ? this.param.wtdwmc : this.param.scsdwmc ;
      this.param.scsdwdz = this.param.isScwtYz == '1' ? this.param.wtdwAddress : this.param.scsdwdz;
      // 制造商
      this.param.zzsdwmc = this.param.isZzwtYz == '1' ? this.param.wtdwmc : this.param.zzsdwmc ;
      this.param.zzsdwdz = this.param.isZzwtYz == '1' ? this.param.wtdwAddress : this.param.zzsdwdz;

      this.param.agentId = this.goodsDetail.shopid; // 代理商id
      this.param.goodsId = this.goodsDetail.goodsId; // 商品id
      this.param.jgid = this.goodsDetail.jgid; // 机构id
      /**
       * 中文报告中文字段必填
       * 英文报告英文字段必填
       * 中文报告中英文字段必填
      **/
      if(this.param.reportLauguage == '1' || this.param.reportLauguage == '3'){
          if (isEmpty(this.param.wtdwmc)) {
            this.$message.error("请输入委托单位名称");
            return;
          }
      }
      if(this.param.reportLauguage == '2' || this.param.reportLauguage == '3'){
          if (isEmpty(this.param.wtdwenmc)) {
            this.$message.error("请输入委托单位英文名称");
            return;
          }
      }
      if (isEmpty(this.param.zzsdwmc)) {
        this.$message.error("请输入制造商单位名称");
        return;
      }
      if(isEmpty(this.param.zzsdwmc)){
        this.$$message.error("请输入制造商单位名称");
        return;
      } 
      if (isEmpty(this.param.scsdwmc)) {
        this.$message.error("请输入生产商名称");
        return;
      }
      if (isEmpty(this.param.consignee)) {
        this.$message.error("请输入联系人");
        return;
      }
      if (isEmpty(this.param.phone)) {
        this.$message.error("请输入手机号");
        return;
      }
      if (!validateAllMobile(this.param.phone)) {
        this.$message.error("请输入正确的手机号");
        return;
      }  
      
      if (isEmpty(this.param.bgsl)) {
        this.$message.error("请输入报告数量");
        return;
      }
      if(this.param.bgfsxs.indexOf('电子邮件') > -1){
        if (isEmpty(this.param.bgemail)) {
          this.$message.error("请输入报告接收邮箱");
          return;
        }
        if (!validateEmail(this.param.bgemail)) {
          this.$message.error("请输入正确的报告接收邮箱");
          return;
        }  
      }
      if(this.param.bgfsxs.indexOf('快递速运') > -1){
        if (isEmpty(this.param.bgaddrId)) {
          this.$message.error("请选择报告邮寄地址");
          return;
        }
      } 
      window.localStorage.setItem("taoce-param", JSON.stringify(this.param));
      this.$router.push({ path: "/step1" , query: { type : this.$route.query.type }});
    },
    
    /**
     * 选择委托客户弹框
     */
    getClient() {
      this.clientStatus = true;
      this.$nextTick(() => { this.$refs.client.init(); });
    },
    /**
     * 选择委托客户
     */
    getClientData(item) { 
      this.param.wtdwmc = item.dwmc;
      this.param.creditCode = item.creditCode;
      this.param.consignee = item.legalPerson;

      if(this.param.isScwtYz == '1'){
        this.param.scsdwmc = this.param.wtdwmc;
        this.param.scsdwdz = this.param.wtdwAddress;
      } 
      if(this.param.isZzwtYz == '1'){
        this.param.zzsdwmc = this.param.wtdwmc;
        this.param.zzsdwdz = this.param.wtdwAddress;
      }
    },
    /**
     * 获取地址列表
     */
    getAddressList() {
      var _this = this;
      this.$fetch("/api/user/userConsigneeAddressList").then(response => { 
        if (response.code == 0) {
          response.data.forEach(function(v,i){
              v.proAddress = 
              getDataName({dataList:cityList,value:'dm',lable:'name',data:v.province}) + 
              getDataName({  dataList:getAllCity(cityList),value:'id',lable:'name',data:v.city   })  + 
              getDataName({  dataList:getAllDistrict(cityList),value:'id',lable:'name',data:v.district })
          })
          _this.addressList = response.data; 
          // 默认选中地址的第一个
          // if (!window.localStorage.getItem("taoce-param")) {
          //   _this.param.bgaddrId = response.data.length > 0 ? response.data[0].id : '';
          // }
        }else{
          _this.$message.error(response.msg);
        }
      });
    },
    /**
     * 添加地址
     */
    addAddress() {
      this.testStatus = true;
      this.$nextTick(() => { this.$refs.addaddress.init(); });
    },
    /**
     * 选择地址
     */
    opt(id) { 
      this.param.bgaddrId = id;
    }
  }
};
</script>
<style>
@import "../../style/step.css";
.moreAddress {
  height: 80px;
  overflow: hidden;
}
</style>

 