<template>
  <div class="main_width addorderBox">
    <el-card class="box-card margin-bottom">
      <div slot="header" class="clearfix"><span class="tit">订单服务流程</span></div>
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
    <el-card class="box-card margin-bottom">
      <div slot="header" class="clearfix"><span class="tit">样品信息</span></div>
      <div>
        <ul class="shqrm_c" id="ulSampleMain">
          <ul id="ulSampleTypeOne">
            <li class="xiangq_ju">
              <span class="shenqrxq_bt"> 样品名称 <span class="weit_xhx">*</span> </span>
              <el-input v-model="param.ypmc" placeholder="请输入样品名称" class="container_input required" maxlength="200" ></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">样品英文名称</span>
              <el-input v-model="param.ypenmc" placeholder="请输入样品英文名称" class="container_input required" maxlength="200" ></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">样品数量 <span class="weit_xhx">*</span> </span>
              <el-input v-model="param.ypsl" placeholder="请输入样品数量" class="container_input required" maxlength="200" ></el-input>
            </li>
            
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">型号规格</span>
              <el-input v-model="param.ypxhgg" placeholder="请输入型号规格" class="container_input required" maxlength="200" ></el-input>
            </li>
            <li class="xiangq_ju ysjs_two">
              <span class="shenqrxq_bt">样品商标</span>
              <el-input v-model="param.ypsbmc" placeholder="如为图片等格式,以附件形式上传" class="container_input required" maxlength="200" style="width:250px;" ></el-input>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">保密程度</span>
              <el-select v-model="param.ypbmyq" placeholder="请选择">
                <el-option v-for="item in ypbmyqList" :key="item.value" :label="item.label" :value="item.value" ></el-option>
              </el-select>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt">生产日期</span>
              <el-date-picker v-model="param.ypscrq" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
            </li>
            <li class="xiangq_ju">
              <span class="shenqrxq_bt"> 样品退还方式 <span class="weit_xhx">*</span> </span>
              <el-select v-model="param.ypthfs" placeholder="请选择">
                <el-option v-for="item in ypthfsList" :key="item.value" :label="item.label" :value="item.value" ></el-option>
              </el-select>
            </li>
          </ul>
        </ul>
      </div>
    </el-card>
    <el-card class="box-card margin-bottom">
      <div slot="header" class="clearfix">
        <span class="tit">检测项目</span>
      </div>
      <!-- 服务需求 -->
      <div class="server-title">服务需求</div>
      <div>
        <el-checkbox-group v-model="param.fwxq1">
          <el-checkbox-button v-for="item in serviceDemandList" :label="item.id" :key="item.id" >{{item.mc}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <!-- <div style="margin:20px 0;">
        <el-radio v-model="param.sqlx" label="1">新申请</el-radio>
        <el-radio v-model="param.sqlx" label="2">变更</el-radio>
        <el-radio v-model="param.sqlx" label="3">派生</el-radio>
      </div> -->
      <!-- <div>
        <el-radio-group v-model="param.ypxh">
          <el-radio-button label="1">单型号</el-radio-button>
          <el-radio-button label="2">多型号</el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <span style="line-height: 40px;font-size: 18px; font-weight: 400; margin: 15px 0;">型号数量 <span class="weit_xhx">*</span> </span>
        <el-input v-model="param.ypxhsl" class="container_input required input-order" style="width:100px;" size="small"></el-input> 个
      </div> -->
      <!-- <div class="server-title">差异描述</div>
      <div>
        <el-input type="textarea" v-model="param.ypxhcyms"></el-input>
      </div> -->
      <!-- ypsl -->
      <div class="server-title">机构</div>
      <el-radio-group v-model="param.jgid" @change="getLibListByJg(param.jgid)">
        <el-radio-button v-for="item in agencyList" :key="item.jid" :label="item.jid">{{item.jmc}}</el-radio-button>
      </el-radio-group>
      <div class="server-title">接样实验室</div>
      <div>
        <el-radio-group v-model="param.libid">
          <el-radio-button v-for="item in receivingSampleLibList" :key="item.id" :label="item.id" >{{item.mc}}</el-radio-button>
        </el-radio-group>
      </div>
      <div class="server-title">附加服务</div>
      <div>
        <el-checkbox v-model="checked">加 急</el-checkbox>
      </div>
      <div class="server-title">检测标准</div>
      <div>
        <el-table ref="multipleTable" :data="listCheckItemList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="项目名称" prop="jcxm"></el-table-column>
          <el-table-column prop="bzhmc" label="检测标准"></el-table-column>
          <el-table-column prop="bzh" label="检测标准号"></el-table-column>
        </el-table>
      </div>
      <div class="xiangq_ju" style="width: 95%;">
        <span class="shenqrxq_bt">需要沟通的其他内容</span>
        <el-input placeholder="请详细描述您的检测需求，方便客服根据您的需求进行确认，最长可输入200字，如备注内容较多可附件形式上传" class="container_input required" maxlength="200" v-model="param.xygtnr"></el-input>
      </div>
      <div class="shqrm_c">
        <li class="xiangq_ju gl2-xiangq_ju-fu" style="width: 90%;">
          <span class="shenqrxq_bt gl2-shenq-fujian">附件</span>
          <el-upload style="display: inline;" class="upload-demo" multiple 
          :limit="1" :action="uploadUrl" :show-file-list="true"  
          :on-success="handleAvatarSuccess" :file-list="fileList" 
          :on-preview="handlePreview" :before-upload="beforeAvatarUpload"
          :on-exceed="handleExceed" :before-remove="beforeRemove" :on-remove="handleRemove">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </li>
        <div>
          <label id="lblSapmletInfo" class="gl2-fujian-require" style="color: red;">
            <br>1.若您在“检测项目”中添加了自定义检测项，请在附件中上传对应的标准文本或规范文件；
            <br>2.如委托单中有未涉及到的必要信息，可在此上传文件补充相关信息；
            <br>3.附件格式：jpg、PDF、word、excel、压缩包；单个文件大小不超过10M；
          </label>
        </div>
        <div id="divFiles" style="padding-bottom:10px;"></div>
      </div>
    </el-card>
    <el-card class="box-card margin-bottom">
      <div class="info">
        已选择 <span>{{ multipleSelection.length }}</span> 项服务 价格:<span>待后台确认</span>
      </div>
      <div class="text-right"> 
        <el-button style="margin-top: 12px;" type="primary" @click="next('2')">下一步</el-button>
      </div>
    </el-card>
    <!-- 检测标准 -->
    <test v-if="testStatus" ref="test"/>
    <!-- 店铺产品分类 -->
    <shop-classify v-if="classStatus && param.agentId" ref="shopclassify" @getClass="getClass($event)" :shopid="param.agentId"/>
  </div>
</template>

<script>
import { isEmpty } from "@/utils";
import test from "../template/test";
import shopClassify from "../template/shop-classify";
export default {
  components: { test,shopClassify },
  name: "Sort",
  data() {
    return {
      classStatus:true,




      active: 0,
      checked: false, // 是否加急默认不加急
      param: {
        ypmc:"",// 样品名称
        ypenmc:"", // 样品英文名称
        ypbmyq:"一般保密", // 保密要求
        ypthfs:"代为处理", // 样品退还方式
        ypxhgg:"", // 样品型号规格
        ypsl:"", // 样品数量
        ypscrq:"", // 生产日期
        ypsbmc:"", // 样品商标
        isJj:"2", //是否加急 1是 2否
        cateOne:"", // 一级分类
        cateThree:"", // 三级分类
        cateTwo:"", // 二级分类


        agentId:"",
        fwxq1:[],
        fwxq:[], // 服务需求
        sqlx: "1", // 默认新申请
        ypxh:"1", // 默认单型号
        ypxhsl:"1", // 型号数量
        ypxhcyms:"", // 差异描述
        jgid:"", // 机构id
        libid:"", // 接种实验室
        xygtnr:"", // 需要沟通的其他内容  
        fjxx:"",// 附近
        fwItemIds:"" // 检测标准
      },
      hasSelectList:[],
      ypbmyqList: [
        { value: "一般保密", label: "一般保密" },
        { value: "严格保密", label: "严格保密" }
      ],
      ypthfsList: [
        { value: "代为处理", label: "代为处理" },
        { value: "客户自取", label: "客户自取" },
        { value: "邮寄", label: "邮寄" }
      ],
      agencyList: [],
      receivingSampleLibList: [],
      serviceDemandList: [],
      listCheckItemList: [],
      testStatus: false,
      multipleSelection:[],
      uploadUrl: "/apis/api/tools/uploadImg",
      fileList:[]
    };
  },
  created() {
    if (!window.localStorage.getItem("paoce_token")) {
      this.$router.push({ path: "/login" });
      return;
    }



    
    
    if(window.localStorage.getItem("taoce-param")){
      this.param = JSON.parse(window.localStorage.getItem("taoce-param"));
      this.param.isJj == '2' ? this.checked == false : this.checked == true;
      this.fileList = [{ name: "附件", url: this.param.fjxx }];
      this.multipleSelection = this.param.fwItemIds.split(); 
    } 

    this.getServiceDemand();
    if(this.$route.query.orderId){
      this.getOrderInfo(this.$route.query.orderId); 
       this.param.agentId = this.$route.query.shopid;
    }else{
      this.param.agentId = this.$route.query.shopid;
      this.getAgencyList();
      
    }
    
    
    
    
  
  },
  mounted() {},
  methods: { 
    /**
     * 获取订单详情
     */
    getOrderInfo(orderId) {
      var _this = this;
      this.$fetch("/api/order/orderInfo", { orderId: orderId }).then(response => {
        if (response.code == 0) {
          _this.param = response.data; 
          _this.param.fwxq1 = response.data.fwxq.split(",");

          _this.multipleSelection = response.data.orderItemEntityList


          response.data.orderItemEntityList.forEach(function(v,i){
            _this.hasSelectList.push(v.checkId)
          })

          _this.getAgencyList();
        }
      });
    }, 
    /**
     * 选择分类
     */
    getClass(data){
      this.param.cateOne	= data.cateOne ;
      this.param.cateTwo	= data.cateTwo ;
      this.param.cateThree	= data.cateThree 
      this.getListCheckItem();
    },
    
 
    /**
     * 获取服务需求
     */
    getServiceDemand() {
      this.$fetch("/api/serviceDemand/listAll", {}).then(response => {
        if (response.code == 0) {
          this.serviceDemandList = response.data;
        }
      });
    },
    /**
     * 获取商户下的机构列表
     */
    getAgencyList() {
      this.$fetch("/api/order/agencyListByShop", {
        shopId: this.param.agentId
      }).then(response => {
        console.log(response);
        if (response.code == 0) {
          this.agencyList = response.data;
          if(window.localStorage.getItem("taoce-param")){ 
            this.param.jgid = JSON.parse(window.localStorage.getItem("taoce-param")).jgid;
            this.getLibList(this.param.jgid);
          }else{
            this.param.jgid = response.data[0].jid;
            this.getLibList(response.data[0].jid);
          } 
        }
      });
    },
    /**
     * 机构下的接种实验室和检查标准
     */
    getLibListByJg(id){ 
      this.param.jgid = id;
      this.receivingSampleLibList = [];
      this.getListCheckItem();
      this.getLibList(id);
    },
    // 获取接种实验室
    getLibList(id) {
      this.$fetch("/api/order/receivingSampleLibList", { jgId: id  }).then(response => { 
        if (response.code == 0) {
          this.receivingSampleLibList = response.data;
          this.param.libid = response.data[0].id;
        }
      });
    },
    /**
     * 获取服务项目 - 检查标准
     */
    getListCheckItem() {
      var _this = this;
      this.$fetch("/api/capabilityLib/listCheckItem", {
        cone: this.param.cateOne,cthree: this.param.cateThree,ctwo: this.param.cateTwo,jid: this.param.jgid,
        limit: "10",
        page: "1"
      }).then(response => {
        console.log("获取服务项目", response.data.records);
        if (response.code == 0) {
          _this.listCheckItemList = response.data.records;
          console.log(_this.hasSelectList)

          if(_this.hasSelectList.length > 0){
            _this.$nextTick(()=>{
              _this.listCheckItemList.forEach(row => {
                console.log(row)
                if(_this.hasSelectList.indexOf(row.id) >= 0){
                  _this.$refs.multipleTable.toggleRowSelection(row,true);
                }
              })
            })
          }

          
        }
      });
    },
    /**
     * 检查项目的选择
     */
    handleSelectionChange(val) {  
      this.param.fwItemIds = "";
      var arr = [];
      this.multipleSelection = val; 
      this.multipleSelection.forEach(function(v, i) {
        arr.push(v.id); 
      });
      this.param.fwItemIds = arr.toString();
    },
    /**
     * 附件的上传
     */
    handleAvatarSuccess(res, file){ 
      this.fileList = []
      this.param.fjxx = res.data;
      this.fileList.push({ name: file.name, url: res.data })
    },
    beforeAvatarUpload(file) { 
      const isLt10M = file.size / 1024 / 1024 < 10; 
      if (!isLt10M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isLt10M;
    },
    handlePreview(file){
      window.open(file.url)
    },
    handleExceed(files, fileList) {
      this.$message.warning("数量多时请以压缩包的形式上传");
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove(file, fileList) {
      this.fileList = []
      this.param.fjxx = '';
    },
    /**
     * 点击下一步
     */
    next() { 
      if (isEmpty(this.param.ypmc)) {
        this.$message.error("请输入样品名称");
        return;
      }
      if (isEmpty(this.param.ypsl)) {
        this.$message.error("请输入样品数量");
        return;
      } 
      if (this.param.fwxq1.length < 1) {
        this.$message.error("请选择服务需求");
        return;
      } 
      // if (isEmpty(this.param.ypxhsl)) {
      //   this.$message.error("请输入型号数量");
      //   return;
      // }
      if (isEmpty(this.param.fwItemIds)) {
        this.$message.error("请选择检测标准");
        return;
      }
      this.param.fwxq = this.param.fwxq1.toString(); 
     
      window.localStorage.setItem("taoce-param-other", JSON.stringify(this.param));  
      this.$router.push({ path: "/addorder2",query: { type :this.$route.query.type ? this.$route.query.type : "" } });
    }  
  }
};
</script>
<style>
.server-title {
  line-height: 40px;
  border-bottom: 1px solid #f1f1f1;
  font-size: 18px;
  font-weight: 400;
  margin: 15px 0;
}
.shqrm_c td {
  height: 48px;
  padding: 2px 8px 2px 14px;
}

.shqrm_c {
  width: 100%;
  padding-bottom: 4px;
}

.addorderBox .container_input {
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
<style>
.addorderBox .el-radio-button .el-radio-button__inner,.el-checkbox-button .el-checkbox-button__inner{
  border-left: 1px solid #dcdfe6;
  border-radius: 4px;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  margin-right: 10px;
  margin-bottom: 10px;
}
.addorderBox .el-input__inner{
  border:none;
}
.addorderBox .info {
  font-size: 18px;
}
.addorderBox .info span {
  color: #fe6603;
  font-size: 25px;
}
.addorderBox .input-order .el-input__inner  {
      border: 1px solid #DCDFE6;
}
</style>


 