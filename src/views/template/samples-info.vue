 
<template>
    <el-dialog :close-on-click-modal="true" :visible.sync="visible" title="录入送样" id="samplesinfo">
        <!-- 送样信息 -->
        <div class="user_rt_cont gl2-user_rt_cont wddd_d gl2-wddd_d">
            <div class="top_title wddd_xx gl2-wddd_xx">
                <strong>送样信息</strong>
            </div>
        </div>
        <div style="padding-left:40px;">
            <div class="tip">* 寄送样品时，请附上准确的订单编号；建议将订单打印后连同样品一起寄送；如订单号不准确，机构将无法及时确认收样；</div>
            <div>
                <span class="samplesinfo-item">送样地址</span>
                <span>{{ orderDetail.receivingSampleLibEntity.remark }}</span>
            </div>
            <div>
                <span class="samplesinfo-item">送样要求</span>
                <span>{{ orderDetail.syyq }}</span>
            </div>
        </div>
        <div class="user_rt_cont gl2-user_rt_cont wddd_d gl2-wddd_d">
            <div class="top_title wddd_xx gl2-wddd_xx">
                <strong>快递信息</strong>
            </div>
        </div>
        <div>
            <el-form :model="form" :rules="rules" ref="form" >
                <el-form-item label="订单编号" :label-width="formLabelWidth">
                    <el-input v-model="orderDetail.ordreSn" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="物品名称" :label-width="formLabelWidth">
                    <el-input v-model="orderDetail.goodsName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="寄件人地址" :label-width="formLabelWidth" prop="jjrdz">
                    <el-input v-model="form.jjrdz" autocomplete="off" placeholder="请输入寄件人地址"></el-input>
                </el-form-item>
                <el-form-item label="快递单号" :label-width="formLabelWidth" prop="kddh">
                    <el-input v-model="form.kddh" autocomplete="off" placeholder="请输入快递单号"></el-input>
                </el-form-item>
                <el-form-item label="快递公司" :label-width="formLabelWidth" prop="kdgs">
                    <el-input v-model="form.kdgs" autocomplete="off" placeholder="请输入快递公司"></el-input>
                </el-form-item>
                <el-form-item label="送样备注" :label-width="formLabelWidth">
                    <el-input v-model="form.sybz" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="submitForm('form')">确认</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      orderDetail: {
        receivingSampleLibEntity: {}
      },
      orderId:'',
      value: [],
      visible: false,
      isLoading: false,
      dataList: [],
      form: {},
      formLabelWidth: "120px",
      options: [],
      rules: {
        jjrdz: [{ required: true, message: "请输入寄件人地址", trigger: "blur" }],
        kddh: [{ required: true, message: "请输入快递单号", trigger: "blur" }],
        kdgs: [{ required: true, message: "请输入快递公司", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    handleChange(value) {
      console.log(value);
    },
    init(orderId) {
      this.visible = true;
      this.orderId = orderId;
      this.$nextTick(() => {
        this.getOrderInfo(orderId);
      });
    },
    // 订单详情
    getOrderInfo(orderId) {
      var _this = this;
      this.$fetch("/api/order/orderInfo", {
        orderId: orderId
      }).then(response => {
        if (response.code == 0) {
          console.log(response.data);
          _this.orderDetail = response.data;
        }
      });
    },
    handle() {
      var _this = this;
      this.$post("/api/order/addOrderSywlxx", {
        jjrdz: _this.form.jjrdz,
        kddh: _this.form.kddh,
        kdgs: _this.form.kdgs,
        orderId: _this.orderId,
        sybz: _this.form.sybz
      }).then(response => {
          console.log(response);
          if(response.code == 0){
              _this.visible = false;
              _this.$emit('getList')
          }
      });
    },
    submitForm(formName) {
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.handle() 
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  }
};
</script>
<style scoped>
#addOrUpdateAddr .el-input,
#addOrUpdateAddr .el-select,
#addOrUpdateAddr .el-cascader {
  width: 400px;
}
#addOrUpdateAddr .distpicker-address-wrapper select {
  width: 130px !important;
}
#samplesinfo .tip {
  color: red;
  /* line-height: 40px; */
}
.samplesinfo-item {
  font-size: 16px;
  font-weight: bold;
}
</style>

 
