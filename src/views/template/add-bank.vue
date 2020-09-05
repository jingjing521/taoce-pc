 
<template>
  <el-dialog
    :close-on-click-modal="true"
    :visible.sync="visible"
    :title="form.id ? '修改银行卡': '添加银行卡'"
    id="addOrUpdateAddr"
  >
    <div>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="银行卡号" :label-width="formLabelWidth" prop="bankCardNo">
          <el-input v-model="form.bankCardNo" autocomplete="off" placeholder="请输入银行卡号"></el-input>
        </el-form-item>
        <el-form-item label="银行名称" :label-width="formLabelWidth" prop="bankName">
          <el-input v-model="form.bankName" autocomplete="off" placeholder="请输入银行名称"></el-input>
        </el-form-item>
        <el-form-item label="银行户名" :label-width="formLabelWidth" prop="bankUserName">
          <el-input v-model="form.bankUserName" autocomplete="off" placeholder="请输入银行户名" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="支行名称" :label-width="formLabelWidth" prop="branchName">
          <el-input v-model="form.branchName" autocomplete="off" placeholder="请输入支行名称"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleAddress" :disabled="disabled">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { validateAllMobile } from '@/utils/validate'
import cityList from "@/utils/city.json";
export default {
  components: {},
  data() {
    var mobileValidator = (rule, value, callback) => {
      if (!validateAllMobile(value)) {
        callback(new Error("联系方式格式错误"));
      } else {
        callback();
      }
    };
    return {
      disabled: false,
      value: [],
      visible: false,
      isLoading: false,
      dataList: [],
      form: {},
      formLabelWidth: "120px",
      options: [],
      rules: {
        bankCardNo: [
          { required: true, message: "请输入银行卡号", trigger: "blur" }
        ],
        bankName: [
          { required: true, message: "请输入银行名称", trigger: "blur" }
        ],
        bankUserName: [
          { required: true, message: "请选择银行户名", trigger: "change" }
        ],
        branchName: [
          { required: true, message: "请输入支行名称", trigger: "blur" }
        ]
      }
    };
  },
  created() { 
  },
  methods: {
    init(item) {
      var _this = this;
      _this.visible = true;
      _this.disabled = false;
      _this.$nextTick(() => {
        if (item) {
          var obj = JSON.parse(JSON.stringify(item)); 
          _this.form = obj;
          _this.form.value = [obj.province,obj.city,obj.district]
        } else {   
          _this.form = {};
          _this.clearValidate("form");
        }
      });
    },
    clearValidate(formName) {
      this.$refs[formName].clearValidate();
    }, 
    handleChange(value) {
      this.form.value = value;
    },
    // 确认按钮
    handleAddress() {
      var _this = this; 
      this.$refs["form"].validate(valid => {
        if (valid) { 
          _this.disabled = true;
          this.$post( _this.form.id ? "/api/user/mdUserBankCardInfo" : "/api/user/addUserBankCardInfo" , _this.form).then(response => {
              if (response.code == 0) { 
                _this.$message({ message: _this.form.id ? '修改成功' :'添加成功', type: 'success', duration: 1500, onClose: () => { 
                    _this.visible = false;
                    _this.disabled = false;
                    _this.$emit('refreshDataList') 
                }})
              }else{
                _this.disabled = false;
                _this.$message.error(response.msg);
              }
          });
        } else { 
          return false;
        }
      });
    }
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
</style>

  
