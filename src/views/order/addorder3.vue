

<template>
    <div class="main_width">
        <el-card class="box-card margin-bottom">
            <div slot="header" class="clearfix">
                <span class="tit">订单服务流程</span>
            </div>
            <div>
                <el-steps :active="active" align-center>
                    <el-step title="在先委托"></el-step>
                    <el-step title="信息确认"></el-step>
                    <el-step title="样品寄送"></el-step>
                    <el-step title="样品检测"></el-step>
                    <el-step title="完成检测"></el-step>
                    <el-step title="报告发放"></el-step>
                </el-steps>
            </div>
        </el-card>
        <el-card class="box-card margin-bottom">
            <div slot="header" class="clearfix">
                <span class="tit">发票信息</span>
            </div>
            <div>
                <el-form ref="form" label-width="80px">
                    <el-form-item label="是否需要发票">
                        <el-radio-group>
                            <el-radio label="是"></el-radio>
                            <el-radio label="否"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <div style="margin-top:15px;">
                    <el-button size="small">选择发票+</el-button>
                    <el-button size="small">新增发票+</el-button>
                </div>
                <ul class="shqrm_c" id="ulSampleMain">
                    <ul id="ulSampleTypeOne">
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">
                                发票抬头
                                <span class="weit_xhx">*</span>
                            </span>
                            <input
                                id="SampleName"
                                name="SampleName"
                                class="container_input required"
                                fieldname="样品名称"
                                type="text"
                                maxlength="50"
                                value=""
                            >
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">纳税人识别号</span>
                            <input
                                id="SampleNameEn"
                                name="SampleNameEn"
                                class="container_input"
                                type="text"
                                maxlength="50"
                                value=""
                            >
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">
                                发票类型
                                <span class="weit_xhx">*</span>
                            </span>
                            <input
                                id="ToSampleQuantity"
                                name="ToSampleQuantity"
                                class="container_input required decimalstwo"
                                fieldname="样品数量"
                                type="text"
                                style="width: 38%;"
                                maxlength="9"
                                value=""
                            >
                            <input
                                id="ToSampleUnit"
                                name="ToSampleUnit"
                                class="inputypdw required"
                                fieldname="数量单位"
                                placeholder="请输入数量单位"
                                type="text"
                                maxlength="50"
                                value=""
                            >
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">注册地址</span>
                            <input
                                id="BatchNo"
                                name="BatchNo"
                                class="container_input"
                                type="text"
                                maxlength="500"
                                value=""
                            >
                        </li>
                        <li class="xiangq_ju ysjs_two">
                            <span class="shenqrxq_bt">样品描述</span>
                            <input
                                id="SamplesStatus"
                                name="SamplesStatus"
                                class="container_input"
                                type="text"
                                maxlength="500"
                                value=""
                            >
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">型号规格</span>
                            <input
                                id="Specifications"
                                name="Specifications"
                                class="container_input"
                                type="text"
                                maxlength="50"
                                value=""
                            >
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">样品商标</span>
                            <input
                                id="SampleTrademark"
                                name="SampleTrademark"
                                class="container_input"
                                type="text"
                                maxlength="50"
                                value=""
                                placeholder="如为图片等格式，可以附件形式上传"
                                style="width: 225px;"
                            >
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">样品等级</span>
                            <input
                                id="SampleGrade"
                                name="SampleGrade"
                                class="container_input"
                                type="text"
                                placeholder="如：优等品、合格品、一等品等"
                                maxlength="50"
                                value=""
                            >
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">生产日期</span>
                            <input
                                id="ProductionDate"
                                name="ProductionDate"
                                class="container_input layuiDateTime"
                                type="text"
                                placeholder="如无需精确到日，请选择当月1号"
                                value=""
                                lay-key="1"
                            >
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">生产单位名称</span>
                            <input
                                id="ProductionUnit"
                                name="ProductionUnit"
                                class="container_input"
                                type="text"
                                placeholder="请输入样品生产单位名称"
                                maxlength="100"
                                value=""
                            >
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">贮存要求</span>
                            <el-select placeholder="请选择" class="form-control">
                                <option value="常温">常温</option>
                                <option value="保质期">保质期</option>
                                <option value="特殊要求">特殊要求</option>
                            </el-select>
                        </li>
                        <li class="xiangq_ju">
                            <span class="shenqrxq_bt">保密要求</span>
                            <el-select placeholder="请选择" class="form-control">
                                <option value="常温">常温</option>
                                <option value="保质期">保质期</option>
                                <option value="特殊要求">特殊要求</option>
                            </el-select>
                        </li>
                    </ul>
                </ul>
            </div>
        </el-card>
        <el-card class="box-card margin-bottom">
            <div slot="header" class="clearfix">
                <span class="tit">其他</span>
            </div>
            <div></div>
        </el-card>
        <div style="margin-top: 12px;text-align:right;">
            <router-link to="/addOrder2">
                <el-button style="margin-top: 12px;">上一步</el-button>
            </router-link>
            <el-button @click="next">加入购物车</el-button>
            <router-link to="/order">
                <el-button>提交订单</el-button>
            </router-link>
        </div>
        <!--  -->
    </div>
</template>

<script>
export default {
  name: "Sort",
  data() {
    return {
      active: 2
    };
  },
  mounted() {},
  methods: {
    next() {
      if (this.active++ > 6) this.active = 0;
    }
  }
};
</script>
<style>
.shqrm_c td {
  height: 48px;
  padding: 2px 8px 2px 14px;
}

.shqrm_c {
  width: 100%;
  padding-bottom: 4px;
}

.container_input {
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
</style>

 