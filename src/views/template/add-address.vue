 
<template>
  <el-dialog
    :close-on-click-modal="true"
    :visible.sync="visible"
    :title="form.id ? '修改地址': '添加地址'"
    id="addOrUpdateAddr"
  >
    <div>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="收件人" :label-width="formLabelWidth" prop="consignee">
          <el-input v-model="form.consignee" autocomplete="off" placeholder="请输入收件人" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label="单位名称" :label-width="formLabelWidth">
          <el-input v-model="form.companyName" autocomplete="off" placeholder="请输入单位名称"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off" placeholder="请输入联系方式" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="行政区域" :label-width="formLabelWidth" prop="value">
          <el-cascader v-model="form.value" :options="options" @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off" placeholder="请输入详细地址"></el-input>
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
        consignee: [
          { required: true, message: "请输入收件人", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
          { validator: mobileValidator, trigger: "blur" }
        ],
        value: [
          { required: true, message: "请选择行政区域", trigger: "change" }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    var _this = this;
    cityList.forEach(function(value, index) {
      var item = { value: value.dm, label: value.name, children: [] };
      _this.options.push(item);
      value.ssqdmEntityList.forEach(function(v, i) {
        _this.options[index].children.push({
          value: v.dm,
          label: v.name,
          children: []
        });
        v.ssqdmEntityList.forEach(function(x, y) {
          _this.options[index].children[i].children.push({
            value: x.dm,
            label: x.name
          });
        });
      });
    });
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
          var param = {
            address: _this.form.address,
            city: _this.form.value[1],
            companyName: _this.form.companyName,
            consignee: _this.form.consignee,
            district: _this.form.value[2],
            phone: _this.form.phone,
            province: _this.form.value[0]
          }
          if( _this.form.id){
              param.id = _this.form.id;
          }
          _this.disabled = true;
          this.$post( _this.form.id ? "/api/user/mdUserConsigneeAddress" : "/api/user/addUserConsigneeAddress" , param).then(response => {
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

  
