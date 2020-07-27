<template>
  <div class="main_width customer">
    <div class="gl2-wddd_d">
      <div class="top_title">
        <strong>个人认证</strong>
      </div>
    </div>
    <div class="bg-white padding-top padding-bottom">
      <el-form :model="ruleForm"  :rules="rules"  ref="ruleForm" label-width="100px" class="demo-ruleForm"  style="width:500px" > 
        <el-form-item label="审核状态" prop="trueName" v-if="ruleForm.id">
          <el-input v-if="ruleForm.status == '0'" value="待审核" disabled></el-input>
          <el-input v-if="ruleForm.status == '1'" value="审核通过" disabled></el-input>
          <el-input v-if="ruleForm.status == '2'" value="审核不通过" disabled></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="trueName">
          <el-input v-model="ruleForm.trueName" placeholder="请输入真实姓名" maxlength="10" :disabled="ruleForm.id && ruleForm.status != '2'"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idNo">
          <el-input v-model="ruleForm.idNo" placeholder="请输入身份证号" maxlength="18" :disabled="ruleForm.id && ruleForm.status != '2'"></el-input>
        </el-form-item>
        <el-form-item label="身份证正面" prop="idCover">
          <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :disabled="ruleForm.id && ruleForm.status != '2'">
            <img v-if="ruleForm.idCover" :src="ruleForm.idCover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="身份证反面" prop="idBgCover">
          <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload" :disabled="ruleForm.id && ruleForm.status != '2'">
            <img v-if="ruleForm.idBgCover" :src="ruleForm.idBgCover" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <div class="padding" style="padding-left:100px;color:red;width:800px;">*提示：请上传小于8M的身份证图片（JPG、JPEG、PNG、BMP格式），上传的身份证照片请确保边框完整，字体清晰，亮度均匀，否则可能无法通过核验</div>
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">返回</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')" :disabled="disabled" v-if="!ruleForm.id">提交</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')" :disabled="disabled" v-if="ruleForm.id && ruleForm.status !== '1'">编辑</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var valiIcon = (rule, value, callback) => { 
      if (!this.hasFmt) { 
        callback(new Error("请上传身份证正面"));
      } else {
        callback();
      }
    };
    var valiIcon1 = (rule, value, callback) => { 
      if (!this.hasFmt1) { 
        callback(new Error("请上传身份证反面"));
      } else {
        callback();
      }
    };
    
    return {
      list:[],
      hasFmt:false,
      hasFmt1:false,
      disabled:false,
      uploadUrl: "/apis/api/tools/uploadImg", 
      ruleForm: {
        idCover: "",
        idBgCover: ""
      },
      imageUrl: "",
      rules: {
        trueName: [ { required: true, message: "请输入真实姓名", trigger: "blur" } ],
        idNo: [
          { required: true, message: "请选择身份证号", trigger: "blur" },
          { min: 18, max: 18, message: '请输入正确的身份证号', trigger: 'blur' }
        ],
        idCover: [{ required: true, validator: valiIcon, trigger: 'click' }],
        idBgCover: [{ required: true, validator: valiIcon1, trigger: 'click' }]
      }
    };
  },
  created(){
    if (!window.localStorage.getItem("paoce_token")) {
      this.$router.push({ path: "/login" });
      return;
    }
    this.handleList();
  },
  methods: {
    // 个人认证列表
    handleList() {
      var _this = this;
      this.$fetch("/api/user/userAuthenticationList", { type: "1" }).then(
        response => { 
          console.log(response);
          if (response.code == 0) {
            if(response.data.length > 0){
              _this.ruleForm = response.data[0];
            } 
          } else {
            _this.$message.error(response.msg);
          }
        }
      );
    },
    // 提交
    submitForm(formName) {
      var _this = this; 
      this.$refs[formName].validate(valid => {
        if (valid) { 
          _this.disabled = true;
          this.$post( "/api/user/userAuthenticationByPerson", this.ruleForm ).then(response => {
            if (response.code == 0) {
              _this.$message({ message: '操作成功', type: 'success', duration: 1500, onClose: () => { 
                _this.disabled = false;
                _this.$router.go(-1); 
              }})  
            } else {
              _this.disabled = false;
              _this.$message.error(response.msg);
            }
          });
        } else { 
          return false;
        }
      });
    },
    editForm(){
      var _this = this; 
      this.$refs[formName].validate(valid => {
        if (valid) { 
          // _this.disabled = true;
          // this.$post( "/api/user/userAuthenticationByPerson", this.ruleForm ).then(response => {
          //   if (response.code == 0) {
          //     _this.$message({ message: '操作成功', type: 'success', duration: 1500, onClose: () => { 
          //       _this.disabled = false;
          //       _this.$router.go(-1); 
          //     }})  
          //   } else {
          //     _this.disabled = false;
          //     _this.$message.error(response.msg);
          //   }
          // });
        } else { 
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.go(-1);
    },
    handleAvatarSuccess(res, file) {
      this.hasFmt = true;
      this.ruleForm.idCover = res.data;
    },
    handleAvatarSuccess1(res, file) {
      this.hasFmt1 = true;
      this.ruleForm.idBgCover = res.data;
    },
    beforeAvatarUpload(file) { 
      const isLt8M = file.size / 1024 / 1024 < 8; 
      if (!isLt8M) {
        this.$message.error("上传头像图片大小不能超过 8MB!");
      }
      return isLt8M;
    }
  }
};
</script>
<style>
@import "../../../style/customer.css";
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

