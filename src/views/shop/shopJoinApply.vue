<template>
  <div class="login-contain">
    <div class="dl_td">
      <div class="dl_zn">
        <div>
          <a href="/">
            <img src="@/assets/logo/logo1.png" width="161" height="39" alt="">
          </a>
          <span class="descs">欢迎</span>
        </div>
        <a href="/" class="dl_zn_f">返回首页</a>
      </div>
    </div>
    <div class="max_width min-width bg-white padding" id="shopJoin"  style="width:1200px;">
      <div class="title">机构入驻申请表</div>
      <el-steps :active="active" align-center>
        <el-step title="机构基本信息"></el-step>
        <el-step title="资质证书信息"></el-step>
        <el-step title="机构入驻信息"></el-step>
      </el-steps>
      <!-- 机构信息 -->
      <div v-if="active == '1'">
        <div class="item">
          <i class="el-icon-notebook-2"></i>机构基本信息
        </div>
        <el-form :inline="true"  :label-position="labelPosition"  label-width="80px" :model="form" :rules="rules" ref="form" >
          <el-form-item label="机构或代理商名称" prop="mc">
            <el-input v-model="form.mc" placeholder="请输入机构或代理商名称"></el-input>
          </el-form-item>
          <el-form-item label="统一社会信用代码或个人身份证号" prop="creditCode">
            <el-input v-model="form.creditCode" placeholder="请输入统一社会信用代码或个人身份证号"></el-input>
          </el-form-item>
          <el-form-item label="注册地址或身份证地址" prop="addr">
            <el-input v-model="form.addr" placeholder="注册地址或身份证地址"></el-input>
          </el-form-item>
          <el-form-item label="法定代表人" prop="legalPerson">
            <el-input v-model="form.legalPerson" placeholder="请输入法定代表人"></el-input>
          </el-form-item>
          <el-form-item label="行政区划" prop="value" style="width: calc(100% - 120px);">
            <el-cascader v-model="form.value" :options="options" @change="handleChange" style="width: calc(100% - 120px);"></el-cascader>
          </el-form-item>
          <el-form-item label="国家中心" style="width: calc((100% - 400px)/3);" prop="isNationLevel">
            <el-radio-group v-model="form.isNationLevel">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="省中心" style="width: calc((100% - 400px)/3);" prop="isProvinceLevel">
            <el-radio-group v-model="form.isProvinceLevel">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="类型" style="width: calc((100% - 400px)/3);" prop="mtype">
            <el-radio-group v-model="form.mtype">
              <el-radio label="1">机构</el-radio>
              <el-radio label="2">代理</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="简介" style="width: calc(100% - 120px);" prop="intro">
            <el-input type="textarea" v-model="form.intro" placeholder="请输入简介" maxlength="1000" show-word-limit rows="4" ></el-input>
          </el-form-item>
          <el-form-item label="机构业务范围" style="width: calc(100% - 120px);" prop="businessScope">
            <el-input type="textarea" v-model="form.businessScope" placeholder="请输入机构业务范围" maxlength="500" show-word-limit rows="4"></el-input>
          </el-form-item>
          <el-form-item label="备注说明" style="width: calc(100% - 120px);">
            <el-input type="textarea" v-model="form.remark" placeholder="请输入备注说明" maxlength="500" show-word-limit rows="4"></el-input>
          </el-form-item>
          <el-form-item label="logo" style="width: calc(100% - 120px);" prop="imageUrl" ref="image">
            <el-upload class="avatar-uploader"  :action="uploadUrl" :show-file-list="false" :on-success="handlelogoSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="logoUrl" :src="logoUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="相关附件上传" style="width: calc(100% - 120px);">
            <div>
              <span>
                <i class="el-icon-star-on" style="color:#F56C6C"></i>机构营业执照或身份证复印件（请上传小于2M的图片；机构或企业请上传营业执照）
              </span>
              <el-upload
                class="upload-demo"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="1"
                :action="uploadUrl"
                :show-file-list="true"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
            <div>
              <span>
                <i class="el-icon-star-on" style="color:#F56C6C"></i>入驻“淘测”平台承诺书（可上传扫描件或图片，大小不超过5M）
              </span>
              <span>
                <el-link type="primary">模板下载</el-link>
              </span>
              <el-upload
                class="upload-demo"
                :action="uploadUrl"
                :show-file-list="true"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList1"
                :before-upload="beforeAvatarUpload1"
                :on-success="handleAvatarSuccess1"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
          </el-form-item>
        </el-form>
        <div class="padding text-center">
          <el-button type="primary" @click="next">下一步</el-button>
        </div>
      </div>
      <div v-if="active == '2'">
        <div class="item"> <i class="el-icon-notebook-2"></i>资质证书信息 </div>
        <el-card class="box-card margin-bottom" v-for="(item,index) in joinCertificateFromList" :key="index">
          <div slot="header" class="clearfix">
            <span style="font-size:18px;font-weight:bold">资质证书{{index+1}}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="del(index)">删除</el-button>
            <el-button style="float: right; padding: 3px 0" class="margin-right" type="text" @click="hide(index,item.isHide)">{{ item.isHide ? '隐藏':'展示' }}</el-button>
          </div>
          <div v-if="item.isHide">
            <el-form :label-position="labelPosition" label-width="80px" :model="form">
              <el-form-item label="证书性质">
                <el-radio-group v-model="item.ceQt">
                  <el-radio  v-for="item1 in testingQualificationList" :label="item1.id" :key="item1.id" >{{item1.mc}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="证书资质">
                <el-radio-group v-model="item.ceLevel">
                  <el-radio label="1">国家中心</el-radio>
                  <el-radio label="2">省中心</el-radio>
                  <el-radio label="3">其他</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="资质证书编号" style="width: calc(100% - 120px);">
                <el-input v-model="item.ceNo" placeholder="请输入资质证书编号"></el-input>
              </el-form-item>
              <el-form-item label="备注说明" style="width: calc(100% - 120px);">
                <el-input
                  type="textarea"
                  v-model="item.remark"
                  placeholder="请输入备注说明"
                  maxlength="500"
                  show-word-limit
                  rows="4"
                ></el-input>
              </el-form-item>
              <el-form-item label="相关附件上传" style="width: calc(100% - 120px);">
                <div>
                  <span>
                    <i class="el-icon-star-on" style="color:#F56C6C"></i>检验检测资质证书（请上传小于2M的图片）
                  </span>
                  <el-upload
                    class="upload-demo"
                    :before-upload="beforeAvatarUpload"
                    :on-success="function (res, file) { return handleCeImgSuccess(res, file, index)}"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="1"
                    :action="uploadUrl"
                    :show-file-list="true"
                    :on-exceed="handleExceed"
                    :file-list="item.ceImgList"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </div>
                <div>
                  <span>
                    <i class="el-icon-star-on" style="color:#F56C6C"></i>能力附表（可上传小于4M的图片或pdf）
                  </span>
                  <el-upload
                    class="upload-demo"
                    :action="uploadUrl"
                    :show-file-list="true"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    :file-list="item.abilityFileList"
                    :before-upload="beforeAvatarUpload1"
                    :on-success="function (res, file) { return handleCeImgSuccess1(res, file, index)}"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <div>
          <el-button type="primary" @click="addCertificate">添加资质证书</el-button>
        </div>
        <div class="padding text-center">
          <el-button type="primary" @click="pre">上一步</el-button>
          <el-button type="primary" @click="three">下一步</el-button>
        </div>
      </div>
      <div v-if="active == '3'">
        <div class="item">
          <i class="el-icon-notebook-2"></i>机构入驻信息
        </div>
        <el-form
          :label-position="labelPosition"
          label-width="80px"
          :model="info"
          :rules="inforules"
          ref="info"
        >
          <el-form-item label="机构入驻联系人" prop="contactUser">
            <el-input v-model="info.contactUser" placeholder="请输入机构入驻联系人" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="机构入驻联系人QQ号" prop="qq">
            <el-input v-model="info.qq" placeholder="请输入机构入驻联系人QQ号" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="机构入驻联系人邮箱" prop="email">
            <el-input v-model="info.email" placeholder="请输入机构入驻联系人邮箱" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="机构入驻联系人手机号" prop="contactPhone">
            <el-input v-model="info.contactPhone" placeholder="请输入机构入驻联系人手机号" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="yzm">
            <el-input
              v-model="info.yzm"
              placeholder="请输入验证码"
              style="width:300px;display:inline-block;"
              maxlength="6"
            ></el-input>
            <el-button type="primary" @click="getCode" class="margin-left" v-show="show">获取验证码</el-button>
            <el-button type="primary" v-show="!show" disabled>{{sum}}s重新发送</el-button>
          </el-form-item>
        </el-form>
        <div class="padding text-center">
          <el-button type="primary" @click="next1">上一步</el-button>
          <el-button type="primary" @click="sub" :disabled="disabled">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cityList from "@/utils/city.json";
import { isEmpty } from "@/utils";
import { validateEmail, validateMobile } from "@/utils/validate";
export default {
  inject: ["reload"],
  data() {
    var emailValidator = (rule, value, callback) => {
      if (!validateEmail(value)) {
        callback(new Error("邮箱格式错误"));
      } else {
        callback();
      }
    };
    var mobileValidator = (rule, value, callback) => {
      if (!validateMobile(value)) {
        callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    };
    var valiIcon = (rule, value, callback) => {
      if (!this.hasFmt) {
        callback(new Error("请上传logo"));
      } else {
        callback();
      }
    };
    return {
      hasFmt: false,
      disabled: false,
      logoUrl: "",
      show: true,
      sum: "",
      uploadUrl: "/apis/api/tools/uploadImg",
      active: 1,
      labelPosition: "top",
      form: {},
      info: {},
      fileList: [],
      fileList1: [],
      rules: {
        mc: [
          { required: true, message: "请输入机构或代理商名称", trigger: "blur" }
        ],
        creditCode: [
          { required: true, message: "请输入统一社会信用代码", trigger: "blur" }
        ],
        addr: [
          {
            required: true,
            message: "请输入注册地址或身份证地址",
            trigger: "blur"
          }
        ],
        legalPerson: [
          { required: true, message: "请输入法定代表人", trigger: "blur" }
        ],
        isNationLevel: [
          { required: true, message: "请选择是否为国家中心", trigger: "change" }
        ],
        isProvinceLevel: [
          { required: true, message: "请选择是否为省中心", trigger: "change" }
        ],
        mtype: [{ required: true, message: "请选择类型", trigger: "change" }],
        value: [
          { required: true, message: "请选择行政区划", trigger: "change" }
        ],
        intro: [{ required: true, message: "请输入简介", trigger: "blur" }],
        businessScope: [
          { required: true, message: "请输入机构业务范围", trigger: "blur" }
        ],
        imageUrl: [{ required: true, validator: valiIcon }]
      },
      inforules: {
        contactUser: [
          { required: true, message: "请输入机构入驻联系人", trigger: "blur" }
        ],
        qq: [
          {
            required: true,
            message: "请输入机构入驻联系人QQ号",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入机构入驻联系人邮箱",
            trigger: "blur"
          },
          { validator: emailValidator, trigger: "blur" }
        ],
        contactPhone: [
          {
            required: true,
            message: "请输入机构入驻联系人手机号",
            trigger: "blur"
          },
          { validator: mobileValidator, trigger: "blur" }
        ],
        yzm: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      options: [],
      ceItem: { ceImgList: [], abilityFileList: [], isHide: true },
      joinCertificateFromList: [
        { ceImgList: [], abilityFileList: [], isHide: true }
      ],
      testingQualificationList: []
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
    this.$fetch("/api/testingQualification/lisAll").then(response => {
      this.testingQualificationList = response.data;
    });
  },
  methods: {
    del(index) {
      this.joinCertificateFromList.splice(index, 1);
    },
    hide(idx, state) {
      this.joinCertificateFromList[idx].isHide = !state;
    },
    // 行政区域
    handleChange(value) {
      this.form.value = value;
    },
    // 第一步完成，点击下一步
    next() {
      var _this = this;
      this.$refs["form"].validate(valid => {
        if (valid) {
          console.log("第一步：", _this.form);
          if(_this.form.isNationLevel == '1' || _this.form.isProvinceLevel == '1' ){
            _this.active = 2;
          }else{
            _this.active = 3;
          }
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 第一步 机构营业执照或身份证复印件
    handleAvatarSuccess(res, file) {
      this.form.businessLicense = res.data;
      this.fileList = [{ name: file.name, url: res.data }];
    },
    // 第一步 淘测平台承若书
    handleAvatarSuccess1(res, file) {
      this.form.undertaking = res.data;
      this.fileList1 = [{ name: file.name, url: res.data }];
    },
    // 第二步中的上一步
    pre() {
      this.active = 1;
    },
    next1() {
      if( this.form.isNationLevel == '1' || this.form.isProvinceLevel == '1' ){
        this.active = 2;
      }else{
        this.active = 1;
      } 
    },
    // 第二步中的下一步
    three() {
      console.log(this.joinCertificateFromList);
      for (let i = 0; i < this.joinCertificateFromList.length; i++) {
        const element = this.joinCertificateFromList[i];
        if (isEmpty(this.joinCertificateFromList[i].ceQt)) {
          this.$message.error("资质证书" + (i + 1) + ": 请选择证书性质");
          return;
        }
        if (isEmpty(this.joinCertificateFromList[i].ceLevel)) {
          this.$message.error("资质证书" + (i + 1) + ": 请选择证书资质");
          return;
        }
        if (isEmpty(this.joinCertificateFromList[i].ceNo)) {
          this.$message.error("资质证书" + (i + 1) + ": 请输入资质证书编号");
          return;
        }
        if (isEmpty(this.joinCertificateFromList[i].ceImg)) {
          this.$message.error(
            "资质证书" + (i + 1) + ": 请上传检验检测资质证书"
          );
          return;
        }
        if (isEmpty(this.joinCertificateFromList[i].abilityFile)) {
          this.$message.error("资质证书" + (i + 1) + ": 请上传能力附表");
          return;
        }
      }
      this.active = 3;
    },
    handlelogoSuccess(res, file) {
      console.log(res);
      this.hasFmt = true;
      this.logoUrl = res.data;
      this.form.logo = res.data;
    },
    handleCeImgSuccess(res, file, index) {
      this.joinCertificateFromList[index].ceImg = res.data;
      this.joinCertificateFromList[index].ceImgList = [
        { name: file.name, url: res.data }
      ];
    },
    handleCeImgSuccess1(res, file, index) {
      this.joinCertificateFromList[index].abilityFile = res.data;
      this.joinCertificateFromList[index].abilityFileList = [
        { name: file.name, url: res.data }
      ];
    },

    // 获取验证码
    getCode() {
      if (isEmpty(this.info.contactPhone)) {
        this.$message.error("请输入机构入驻联系人手机号");
        return;
      }
      var _this = this;
      this.$fetch("/api/user/getVerifyCode", {
        phone: this.info.contactPhone,
        type: "5"
      }).then(response => {
        if (response.code == 0) {
          var time_count = 60;
          if (!_this.timer) {
            _this.sum = time_count;
            _this.show = false;
            _this.timer = setInterval(() => {
              if (_this.sum > 1 && _this.sum <= time_count) {
                _this.sum--;
              } else {
                _this.sum = 0;
                _this.show = true;
                clearInterval(_this.timer);
                _this.timer = null;
              }
            }, 1000);
          }
        } else {
          this.$message.error(response.msg);
        }
      });
    },
    addCertificate() {
      this.joinCertificateFromList.push({
        ceImgList: [],
        abilityFileList: [],
        isHide: true
      });
    },

    // 提交
    sub() {
      var _this = this;
      this.$refs["info"].validate(valid => {
        if (valid) {
          console.log("第一步：", this.form);
          console.log("第二步：", this.joinCertificateFromList);
          console.log("第三步：", this.info);
          _this.disabled = true;
          _this.shopJoinApply();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 入驻接口请求 /api/user/shopJoinApply
    shopJoinApply() {
      var _this = this;
      this.$post("/api/user/shopJoinApply", {
        mc: _this.form.mc,
        creditCode: _this.form.creditCode,
        addr: _this.form.addr,
        legalPerson: _this.form.legalPerson,
        province: _this.form.value[0],
        city: _this.form.value[1],
        district: _this.form.value[2],
        isNationLevel: _this.form.isNationLevel,
        isProvinceLevel: _this.form.isProvinceLevel,
        mtype: _this.form.mtype,
        intro: _this.form.intro,
        businessScope: _this.form.businessScope,
        remark: _this.form.remark,
        businessLicense: _this.form.businessLicense,
        undertaking: _this.form.undertaking,
        joinCertificateFromList: this.joinCertificateFromList,
        contactPhone: _this.info.contactPhone,
        qq: _this.info.qq,
        contactUser: _this.info.contactUser,
        email: _this.info.email,
        yzm: _this.info.yzm,
        logo:  _this.form.logo
      }).then(response => {
        console.log(response);
        if (response.code == 0) {
          _this.$message.success("已提交，待审核");

          setTimeout(function() {
            _this.disabled = false;
            _this.reload();
            _this.$router.push({ path: "/" });
          }, 1000);
        } else {
          _this.$message.error(response.msg);
          _this.disabled = false;
        }
      });
    },

    // 图片 上传
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    beforeAvatarUpload1(file) {
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return isLt2M;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
      window.open(file.url);
    },
    handleExceed(files, fileList) {
      this.$message.warning("只能上传一个文件，请删除之后重新上传");
    }
  }
};
</script>
<style>
#shopJoin .el-form--label-top .el-form-item__label {
  padding: 0;
  font-size: 16px;
  font-weight: 800;
}
#shopJoin .el-form--inline .el-form-item {
  margin-right: 100px;
  width: 40%;
}
#shopJoin .title {
  font-size: 22px;
  font-weight: 600;
  line-height: 100px;
  text-align: center;
}
#shopJoin .item {
  line-height: 80px;
  font-size: 18px;
  font-weight: 600;
}
#shopJoin .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
#shopJoin .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
#shopJoin .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
#shopJoin .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style scoped>
@import "../../style/login.css";
</style>

 