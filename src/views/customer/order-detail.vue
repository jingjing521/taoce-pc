<template>
  <div class="main_width customer order stepBox" id="orderDetail">
    <div class="gl2-wddd_d flex justify-between">
      <div class="top_title">
        <strong>订单详情</strong>
      </div>
      <!-- <div>
        <el-button type="primary">打印</el-button>
        <el-button type="primary">导出</el-button>
      </div> -->
    </div>
    <div>
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
            <el-step title="报告发放"></el-step>
          </el-steps>
        </div>
      </el-card>
      <el-card class="box-card margin-bottom" id="box">
        <div slot="header" class="clearfix">
          <span class="tit">订单编号 {{orderDetail.ordreSn}}</span>
          <span style="float: right; padding: 3px 0;font-size:15px;">下单时间：{{orderDetail.addTime}}</span>
        </div>
        <div class="shqrm_c">
         <div class="xiangq_ju" style="width: 90%;">
            <span class="shenqrxq_bt">订单状态</span>
            <el-input
              class="container_input required"
              maxlength="200"
              :value="getOrderStatus(orderDetail.orderStatus)"
              disabled
            ></el-input>
          </div>
        </div>
      </el-card>
      <el-card class="box-card margin-bottom">
        <div slot="header" class="clearfix">
          <span class="tit">订单流程记录</span>
          <span style="float: right; padding: 3px 0"></span>
        </div>
        <div>
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in orderDetail.orderMsgEntityList"
              :key="index"
              :timestamp="activity.createTime"
            >{{activity.msg}}</el-timeline-item>
          </el-timeline>
        </div>
      </el-card>
      <!-- 已取消订单 显示取消订单的原因  -->
      <el-card class="box-card margin-bottom" v-if="orderDetail.orderStatus == '7'">
        <div slot="header" class="clearfix">
          <span class="tit">订单取消</span>
        </div>
        <div class="shqrm_c">
          <div class="xiangq_ju" style="width: 90%;">
            <span class="shenqrxq_bt">取消订单原因</span>
            <el-input
              class="container_input required"
              maxlength="200"
              v-model="orderDetail.qxddms"
              disabled
            ></el-input>
          </div>
        </div>
      </el-card>
      <!-- 待签收时展示物流信息 -->
      <el-card
        class="box-card margin-bottom"
        v-if="orderDetail.orderStatus == '4' && orderDetail.orderFfbgxxEntity"
      >
        <div slot="header" class="clearfix">
          <span class="tit">物流信息</span>
        </div>
        <div>物流编号：{{orderDetail.orderFfbgxxEntity.kddh}}</div>
      </el-card>
      <!-- 委托客户信息 -->
      <el-card class="box-card margin-bottom">
        <div slot="header" class="clearfix">
          <span class="tit">委托客户信息</span>
        </div>
        <div>
          <ul>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">委托单位名称</span>
              <el-input
                v-model="orderDetail.wtdwmc"
                placeholder="请输入委托单位名称"
                class="container_input required"
                maxlength="200"
                disabled
              ></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">委托单位英文名称</span>
              <el-input
                v-model="orderDetail.wtdwenmc"
                placeholder="请输入委托单位英文名称"
                class="container_input required"
                maxlength="200"
                disabled
              ></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">统一社会信用代码</span>
              <el-input
                v-model="orderDetail.creditCode"
                placeholder="请输入统一社会信用代码"
                class="container_input required"
                maxlength="150"
                disabled
              ></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">委托单位地址</span>
              <el-input
                v-model="orderDetail.wtdwAddress"
                placeholder="请输入委托单位地址"
                class="container_input required"
                maxlength="200"
                disabled
              ></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">委托单位英文地址</span>
              <el-input
                v-model="orderDetail.wtdwEnAddress"
                placeholder="请输入委托单位英文地址"
                class="container_input required"
                maxlength="200"
                disabled
              ></el-input>
            </li>
            <li></li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">制造商与委托单位一致</span>
              <el-radio v-model="orderDetail.isZzwtYz" label="1" disabled>是</el-radio>
              <el-radio v-model="orderDetail.isZzwtYz" label="2" disabled>否</el-radio>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">制造商单位名称</span>
              <el-input
                v-model="orderDetail.zzsdwmc"
                placeholder="请输入制造商单位名称"
                class="container_input required"
                maxlength="200"
                disabled
              ></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">制造商单位地址</span>
              <el-input
                v-model="orderDetail.zzsdwdz"
                placeholder="请输入制造商单位地址"
                class="container_input required"
                maxlength="200"
                disabled
              ></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">生产商与委托单位一致</span>
              <el-radio v-model="orderDetail.isScwtYz" label="1" disabled>是</el-radio>
              <el-radio v-model="orderDetail.isScwtYz" label="2" disabled>否</el-radio>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">生产商名称</span>
              <el-input
                v-model="orderDetail.scsdwmc"
                placeholder="请输入生产商名称"
                class="container_input required"
                maxlength="50"
                disabled
              ></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">生产商地址</span>
              <el-input
                v-model="orderDetail.scsdwdz"
                placeholder="请输入生产商地址"
                class="container_input required"
                maxlength="200"
                disabled
              ></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">联系人</span>
              <el-input
                v-model="orderDetail.consignee"
                placeholder="请输入联系人"
                class="container_input required"
                maxlength="50"
                disabled
              ></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">手机</span>
              <el-input
                v-model="orderDetail.phone"
                placeholder="请输入手机"
                class="container_input required"
                maxlength="11"
                disabled
              ></el-input>
            </li>
          </ul>
        </div>
      </el-card>
      <!-- 样品信息 -->
      <el-card class="box-card margin-bottom">
        <div slot="header" class="clearfix">
          <span class="tit">样品信息</span>
        </div>
        <div>
          <ul class="shqrm_c" id="ulSampleMain">
            <ul id="ulSampleTypeOne">
              <li class="xiangq_ju">
                <span class="shenqrxq_bt">
                  样品名称
                  <span class="weit_xhx">*</span>
                </span>
                <el-input
                  v-model="orderDetail.ypmc"
                  placeholder="请输入样品名称"
                  class="container_input required"
                  disabled
                ></el-input>
              </li>
              <li class="xiangq_ju">
                <span class="shenqrxq_bt">样品英文名称</span>
                <el-input
                  v-model="orderDetail.ypenmc"
                  placeholder="请输入样品英文名称"
                  class="container_input required"
                  disabled
                ></el-input>
              </li>
              <li class="xiangq_ju">
                <span class="shenqrxq_bt">
                  样品数量
                  <span class="weit_xhx">*</span>
                </span>
                <el-input
                  v-model="orderDetail.ypsl"
                  placeholder="请输入样品数量"
                  class="container_input required"
                  disabled
                ></el-input>
              </li>
              <li class="xiangq_ju">
                <span class="shenqrxq_bt">样品商标</span>
                <el-input
                  v-model="orderDetail.ypsbmc"
                  placeholder="如为图片等格式，可以附件形式上传"
                  class="container_input required"
                  disabled
                ></el-input>
              </li>
              <li class="xiangq_ju">
                <span class="shenqrxq_bt">保密要求</span>
                <el-input
                  v-model="orderDetail.ypbmyq"
                  placeholder="如为图片等格式，可以附件形式上传"
                  class="container_input required"
                  disabled
                ></el-input>
              </li>
              <li class="xiangq_ju">
                <span class="shenqrxq_bt">型号规格</span>
                <el-input
                  v-model="orderDetail.ypxhgg"
                  placeholder="请输入型号规格"
                  class="container_input required"
                  disabled
                ></el-input>
              </li>
            </ul>
          </ul>
        </div>
      </el-card>
      <el-card class="box-card margin-bottom">
        <div slot="header" class="clearfix">
          <span class="tit">接样实验室</span>
        </div>
        <div>
          <el-radio-group>
            <el-radio-button>{{orderDetail.receivingSampleLibEntity.mc}}</el-radio-button>
          </el-radio-group>
        </div>
        <div style="line-height:35px;">
          <el-link type="warning" :underline="false">{{orderDetail.receivingSampleLibEntity.addr}}</el-link>
        </div>
      </el-card>
      <el-card class="box-card margin-bottom" v-if="orderDetail.orderItemEntityList.length > 0">
        <div slot="header" class="clearfix">
          <span class="tit">检测项目</span>
        </div>
        <div>
          <el-table ref="multipleTable" :data="orderDetail.orderItemEntityList"  tooltip-effect="dark" style="width: 100%"  border >
            <el-table-column label="项目名称" prop="jcxm"></el-table-column>
            <el-table-column prop="bzhmc" label="检测标准"></el-table-column>
            <el-table-column prop="bzh" label="检测标准号"></el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-card class="box-card margin-bottom" v-if="orderDetail.orderAddtionalServiceItemEntityList.length > 0">
        <div slot="header" class="clearfix">
          <span class="tit">附加服务项目</span>
        </div>
        <div>
          <el-table ref="multipleTable" :data="orderDetail.orderAddtionalServiceItemEntityList"  tooltip-effect="dark" style="width: 100%"  border >
            <el-table-column label="服务名称" prop="fwmc"></el-table-column>
            <el-table-column prop="jcjg" label="服务总价"></el-table-column>
            <el-table-column prop="jcsl" label="服务数量"></el-table-column>
          </el-table>
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
                <el-input v-model="orderDetail.bgyt" class="container_input required" disabled></el-input>
              </li>
              <li class="xiangq_ju">
                <span class="shenqrxq_bt">报告数量</span>
                <el-input v-model="orderDetail.bgsl" class="container_input required" disabled></el-input>
                <span>份</span>
              </li>
              <li class="xiangq_ju">
                <span class="shenqrxq_bt">报告语言</span>
                <el-input
                  value="中文语言"
                  class="container_input required"
                  disabled
                  v-if="orderDetail.reportLauguage == '1'"
                ></el-input>
                <el-input
                  value="英文报告"
                  class="container_input required"
                  disabled
                  v-if="orderDetail.reportLauguage == '2'"
                ></el-input>
                <el-input
                  value="中英文报告"
                  class="container_input required"
                  disabled
                  v-if="orderDetail.reportLauguage == '3'"
                ></el-input>
              </li>
              <li class="xiangq_ju">
                <span class="shenqrxq_bt">结论形式</span>
                <el-input v-model="orderDetail.jlxs" class="container_input required" disabled></el-input>
              </li>
              <li class="xiangq_ju">
                <span class="shenqrxq_bt">CQC申请编号</span>
                <el-input v-model="orderDetail.cqcno" class="container_input required" disabled></el-input>
              </li>
              <li class="xiangq_ju">
                <span class="shenqrxq_bt">报告形式</span>
                <el-input
                  value="检测报告"
                  class="container_input required"
                  maxlength="50"
                  disabled
                  v-if="orderDetail.reportType == '1'"
                ></el-input>
                <el-input
                  value="报告证书"
                  class="container_input required"
                  maxlength="50"
                  disabled
                  v-if="orderDetail.reportType == '2'"
                ></el-input>
              </li>
              <li class="xiangq_ju">
                <span class="shenqrxq_bt">发放方式</span>
                <el-input class="container_input required" v-model="orderDetail.bgfsxs" disabled></el-input>
              </li>
              <li class="xiangq_ju">
                <span class="shenqrxq_bt">备注</span>
                <el-input v-model="orderDetail.cqcno" class="container_input required" disabled></el-input>
              </li>
            </ul>
            <div class="xiangq_ju" v-if="orderDetail.bgfsxs.indexOf('电子邮件') > -1">
              <span class="shenqrxq_bt">报告收取邮箱</span>
              <el-input v-model="orderDetail.bgemail" class="container_input required" disabled></el-input>
            </div>
            <div
              class="xiangq_ju"
              v-if="orderDetail.bgfsxs.indexOf('快递速运') > -1"
              style="width:500px;"
            >
              <span class="shenqrxq_bt">报告邮寄地址</span>
              <el-input v-model="orderDetail.bgaddrXx" class="container_input required" disabled></el-input>
            </div>
          </ul>
        </div>
      </el-card>
      <!-- 发票信息 -->
      <el-card class="box-card margin-bottom">
        <div slot="header" class="clearfix">
          <span class="tit">发票信息</span>
        </div>
        <div class="xiangq_ju" style="width: 90%;">
          <span class="shenqrxq_bt">是否需要发票</span>
          <el-radio-group v-model="orderDetail.isFp">
            <el-radio label="1" disabled>是</el-radio>
            <el-radio label="2" disabled>否</el-radio>
          </el-radio-group>
        </div>
        <div class="margin-top" v-if="orderDetail.isFp == '1'">
          <ul class="shqrm_c">
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">发票抬头</span>
              <el-input class="container_input required" v-model="orderDetail.fptt" disabled></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">纳税人识别号</span>
              <el-input class="container_input required" v-model="orderDetail.nsrsbh" disabled></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">发票类型</span>
              <el-radio v-model="orderDetail.fplx" label="1" disabled>专用发票</el-radio>
              <el-radio v-model="orderDetail.fplx" label="2" disabled>普通发票</el-radio>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">注册地址</span>
              <el-input class="container_input required" v-model="orderDetail.dwzcdz" disabled></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">开户银行</span>
              <el-input class="container_input required" v-model="orderDetail.dwkhyh" disabled></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">银行账户</span>
              <el-input class="container_input required" v-model="orderDetail.dwyhzh" disabled></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">注册电话号码</span>
              <el-input class="container_input required" v-model="orderDetail.dwzcdh" disabled></el-input>
            </li>
          </ul>
          <div class="xiangq_ju" style="border-bottom: none;">
            <span class="shenqrxq_bt">发票邮寄地址</span>
          </div>
        </div>
      </el-card>
      <!-- 其他 -->
      <el-card class="box-card margin-bottom">
        <div slot="header" class="clearfix">
          <span class="tit">其他</span>
        </div>
        <div class="shqrm_c">
          <div class="xiangq_ju" style="width: 45%;">
            <span class="shenqrxq_bt">样品退还方式</span>
            <el-input
              class="container_input required"
              maxlength="200"
              v-model="orderDetail.ypthfs"
              disabled
            ></el-input>
          </div>
        </div>
        <div class="shqrm_c">
          <div class="xiangq_ju" style="width: 45%;">
            <span class="shenqrxq_bt">需要沟通的其他内容</span>
            <el-input
              class="container_input required"
              maxlength="200"
              v-model="orderDetail.xygtnr"
              disabled
            ></el-input>
          </div>
        </div>
        <div class="shqrm_c" v-if="orderDetail.fjxx">
          <li class="xiangq_ju gl2-xiangq_ju-fu" style="width: 90%;">
            <span class="shenqrxq_bt gl2-shenq-fujian">附件</span>
            <a :href="orderDetail.fjxx" target="_blank">附件</a>
          </li>
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
    },
    // 获取订单状态
    getOrderStatus(value) {
      let text = "";
      switch (value) {
        case 0:
        case "0":
          text = "草稿待提交";
          break;
        case 1:
        case "1":
          text = "待送样";
          break;
        case 2:
        case "2":
          text = "待付款";
          break;
        case 3:
        case "3":
          text = "服务中";
          break;
        case 4:
        case "4":
          text = "待签收";
          break;
        case 5:
        case "5":
          text = "待评价";
          break;
        case 6:
        case "6":
          text = "已评价";
          break;
        case 7:
        case "7":
          text = "已取消";
        case 8:
        case "8":
          text = "异常订单";
      }

      return text;
    },
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


  



