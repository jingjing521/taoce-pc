<template>
  <div class="main_width customer">
    <div class="gl2-wddd_d">
      <div class="top_title">
        <strong>企业认证</strong>
      </div>
    </div>
    <div class="bg-white padding-top padding-bottom">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px" class="demo-ruleForm" style="width:500px" >
        <el-form-item label="统一社会信用代码" prop="creditCode">
          <el-input v-model="ruleForm.creditCode" placeholder="请输入统一社会信用代码" maxlength="50" :disabled="type == '1'" ></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="dwmc">
          <el-input v-model="ruleForm.dwmc" placeholder="请输入企业名称" maxlength="100" :disabled="type == '1'" ></el-input>
        </el-form-item>
        <el-form-item label="法定代表人" prop="legalPerson">
          <el-input v-model="ruleForm.legalPerson" placeholder="请输入法定代表人" maxlength="20" :disabled="type == '1'" ></el-input>
        </el-form-item>
        <el-form-item label="营业执照" prop="imageUrl" ref="image">
          <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload" :disabled="type == '1'" >
            <img v-if="ruleForm.businessLicense" :src="ruleForm.businessLicense" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div style="width: 600px; line-height: 25px; color: red;" >提示：请上传小于4M的营业执照副本图片（JPG、JPEG、PNG、BMP格式），请确保边框完整，字体清晰，亮度均匀，否则可能无法通过核验；</div>
        </el-form-item>
        <el-form-item label="授权委托书(单位介绍信)">
          <el-upload class="upload-demo" multiple :action="uploadUrl" :show-file-list="true" :limit="1" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess" :file-list="fileList" :disabled="type == '1'" :on-change="handleChange" :on-preview="handlePreview">
            <el-button size="small" type="primary" :disabled="type == '1'">点击上传</el-button>
            <div slot="tip" class="el-upload__tip" style="width: 800px;color:red" >提示：请上传小于4M的并带有公章的授权委托书（单位介绍信）附件（图片或PDF）</div>
          </el-upload>
          <div v-if="type != '1'"> 
            <a href="https://jjjcn.oss-cn-beijing.aliyuncs.com/wtsq/%E6%8E%88%E6%9D%83%E5%A7%94%E6%89%98%E4%B9%A6%E6%A8%A1%E6%9D%BF.docx" download="授权书模板.docx" style="color:#409EFF">授权书模板下载</a>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">返回</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')" v-if="type == '2'">编辑</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')" v-if="!type">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var valiIcon = (rule, value, callback) => {
      // 图片验证
      if (!this.hasFmt) {
        //hasFmt设置为true/false
        callback(new Error("请上传营业执照"));
      } else {
        callback();
      }
    };
    return {
      hasFmt: false,
      uploadUrl: "/apis/api/tools/uploadImg",
      fileList: [],
      ruleForm: {
        businessLicense: "",
        pzImg: ""
      },
      imageUrl: "",
      rules: {
        creditCode: [
          { required: true, message: "请输入统一社会信用代码", trigger: "blur" }
        ],
        dwmc: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        legalPerson: [
          { required: true, message: "请输入法定代表人", trigger: "blur" }
        ],
        imageUrl: [{ required: true, validator: valiIcon }]
      },
      type: ""
    };
  },
  created() {
    if (this.$route.query.type) {
      this.type = this.$route.query.type;
      this.ruleForm = this.$route.query.item;
      this.fileList = [{ name: "授权委托书", url: this.ruleForm.pzImg }];
      this.hasFmt = true;
    }
  },
  methods: {
    submitForm(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) { 
          this.$post( "/api/user/userAuthenticationByCompany", this.ruleForm ).then(response => { 
            if (response.code == 0) { 
                _this.$message({ message: '提交成功', type: 'success', duration: 1500, onClose: () => {  _this.$router.go(-1); }})
            }else{ 
              _this.$message.error(response.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.go(-1);
    },
    handleAvatarSuccess(res, file) { 
      this.fileList = [];
      this.ruleForm.pzImg = res.data;
      this.fileList = [{ name: file.name, url: res.data }];
    },
    handleAvatarSuccess1(res, file) {
      console.log(res);
      this.hasFmt = true;
      this.ruleForm.businessLicense = res.data;
    },
    beforeAvatarUpload(file) {
      const isLt4M = file.size / 1024 / 1024 < 4;
      if (!isLt4M) {
        this.$message.error("授权委托书大小不能超过 4MB!");
      }
      return isLt4M;
    },
    handleChange(file, fileList) {
      console.log(fileList); 
    },
    handlePreview(file){
      window.open(file.url)
    }
  }
};
</script>
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
<style>
@import "../../../style/customer.css";
</style>

