 
<template>
    <el-dialog :close-on-click-modal="true" :visible.sync="visible" :title="form.id ? '修改发票': '添加发票'">
        <div>
            <el-form :model="form" :rules="rules"  ref="form" style="width:400px;">
                <el-form-item label="发票抬头" :label-width="formLabelWidth" prop="fptt">
                    <el-input v-model="form.fptt" autocomplete="off" placeholder="请输入发票抬头"></el-input>
                </el-form-item>
                <el-form-item label="发票类型" :label-width="formLabelWidth" prop="fplx">
                    <el-radio v-model="form.fplx" label="1">专用发票</el-radio>
                    <el-radio v-model="form.fplx" label="2">普通发票</el-radio>
                </el-form-item>
                <el-form-item label="纳税人识别号" :label-width="formLabelWidth" prop="nsrsbh">
                    <el-input v-model="form.nsrsbh" autocomplete="off" placeholder="请输入纳税人识别号"></el-input>
                </el-form-item>
                <el-form-item label="注册地址" :label-width="formLabelWidth" prop="dwzcdz">
                    <el-input v-model="form.dwzcdz" autocomplete="off" placeholder="请输入注册地址"></el-input>
                </el-form-item>
                <el-form-item label="开户银行" :label-width="formLabelWidth" prop="dwkhyh">
                    <el-input v-model="form.dwkhyh" autocomplete="off" placeholder="请输入开户银行"></el-input>
                </el-form-item>
                <el-form-item label="银行账号" :label-width="formLabelWidth" prop="dwyhzh">
                    <el-input v-model="form.dwyhzh" autocomplete="off" placeholder="请输入银行账号"></el-input>
                </el-form-item>
                <el-form-item label="注册联系人" :label-width="formLabelWidth" prop="dwzclxr">
                    <el-input v-model="form.dwzclxr" autocomplete="off" placeholder="请输入注册联系人"></el-input>
                </el-form-item>
                <el-form-item label="注册电话号码" :label-width="formLabelWidth" prop="dwzcdh">
                    <el-input v-model="form.dwzcdh" autocomplete="off" placeholder="请输入注册电话号码"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="handle" :disabled="disabled">确认</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { validateAllMobile } from '@/utils/validate'
export default {
  components: {},
  data() {
    var mobileValidator = (rule, value, callback) => {
        if (!validateAllMobile(value)) {
            callback(new Error('请输入正确的注册电话号码'))
        } else {
            callback()
        }
    }
    return {
      value: [],
      disabled:false,
      visible: false,
      isLoading: false,
      dataList: [],
      form: { fplx:'1' },
      formLabelWidth: "120px",
      options: [],
      rules: {
        fptt: [ { required: true, message: "请输入发票抬头", trigger: "blur" }],
        nsrsbh: [{ required: true, message: "请输入纳税人识别号", trigger: "blur" }],
        dwzcdz: [{ required: true, message: "请输入注册地址", trigger: "blur" }],
        dwkhyh: [{ required: true, message: "请输入开户银行", trigger: "blur" }],
        dwyhzh: [{ required: true, message: "请输入银行账户", trigger: "blur" }],
        dwzclxr: [{ required: true, message: "请输入注册联系人", trigger: "blur" }],
        dwzcdh: [
          { required: true, message: "请输入注册电话号码", trigger: "blur" },
          { validator: mobileValidator, trigger: 'blur' }
        ]
      }
    };
  },
  created() {},
  methods: {
    init(item) {
      this.visible = true;
      this.disabled = false;
      this.$nextTick(() => {
        if(item){
          var obj = JSON.parse(JSON.stringify(item));
          this.form = obj;
        }else{
          this.form = {}
          this.form.fplx = '1'
          this.clearValidate('form')
        } 
      });
    },
    clearValidate(formName) {
      this.$refs[formName].clearValidate();
    },
    // 确认提交
    handle() {
      var _this = this;
      this.$refs['form'].validate((valid) => {
          if (valid) {
            _this.disabled = true;
            this.$post(_this.form.id ? "/api/user/mdUserInvoiceInfo" : "/api/user/addUserInvoiceInfo", _this.form).then(response => {
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
      })
    }
  }
};
</script>

 
