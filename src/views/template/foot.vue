<template>
  <div class="max_width" id="footer">
    <div class="main_width">
      <el-row :gutter="20" style="padding:20px 0;">
        <el-col :span="3">
          <div>
            <img src="@/assets/logo/logo1.png" alt="" style="width:250px;" class="text-center">
          </div>
        </el-col>
        <el-col :span="15" class="text-center">
          <div class="server">
            <el-row :gutter="20">
              <el-col :span="7">
                <div class="server-item">
                  <el-tag effect="plain">全</el-tag>全天候响应
                </div>
              </el-col>
              <el-col :span="7">
                <div class="server-item">
                  <el-tag effect="plain">邮</el-tag>邮寄免费</div>
              </el-col>
              <el-col :span="7">
                <div class="server-item">
                  <el-tag effect="plain">特</el-tag>特色服务体验</div>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-row :gutter="20">
              <el-col :span="6">
                <div class="st">新手指南</div>
                <ul>
                  <li>
                    <router-link :to="{path:'/agreement',query:{id:'2'}}" target="_blank">买家入门</router-link>
                  </li>
                  <li>
                    <router-link :to="{path:'/agreement',query:{id:'3'}}" target="_blank">卖家入门</router-link>
                  </li>
                  <li>
                    <router-link :to="{path:'/agreement',query:{id:'4'}}" target="_blank">帮助中心</router-link>
                  </li>
                </ul>
              </el-col>
              <el-col :span="6">
                <div class="st">买家服务</div>
                <ul>
                  <li><router-link :to="{path:'/agreement',query:{id:'5'}}" target="_blank">支付流程</router-link></li>
                  <li><router-link :to="{path:'/agreement',query:{id:'9'}}" target="_blank">投诉举报</router-link></li>
                </ul>
              </el-col>
              <el-col :span="6">
                <div class="st">卖家服务</div>
                <ul>
                  <li><router-link :to="{path:'/shopJoinApply'}" target="_blank">我要开店</router-link></li>
                  <li><router-link :to="{path:'/agreement',query:{id:'9'}}" target="_blank">投诉举报</router-link></li>
                </ul>
              </el-col>
              <el-col :span="6">
                <div class="st">平台服务</div>
                <ul>
                  <li><router-link :to="{path:'/agreement',query:{id:'6'}}" target="_blank">法律声明</router-link></li>
                  <li><router-link :to="{path:'/agreement',query:{id:'7'}}" target="_blank">隐私政策</router-link></li>
                  <li><router-link :to="{path:'/agreement',query:{id:'8'}}" target="_blank">赔付退款</router-link></li>
                </ul>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="text-center st"> 小程序</div>
          <div>
            <img src="@/assets/logo/code.png" alt="" style="width:150px;height:120px;" class="text-center">
          </div>
        </el-col>
        <el-col :span="3">
          <div class="text-center st"> 公众号</div>
          <div>
            <img src="@/assets/logo/code.png" alt="" style="width:150px;height:120px;" class="text-center">
          </div>
        </el-col>
      </el-row>
      <div class="footer-item">
        <span><router-link :to="{path:'/agreement',query:{id:'6'}}" target="_blank">关于我们</router-link></span>
        <span><router-link :to="{path:'/agreement',query:{id:'6'}}" target="_blank">诚聘英才</router-link></span>
        <span><router-link :to="{path:'/agreement',query:{id:'6'}}" target="_blank">联系我们</router-link></span>
        <span>COPYRIGHT 2018-2019 沪ICP备18022763号-3</span>
      </div>
      <div class="link-list">
        <span>友情链接</span>
        <span v-for="(item, index)  in friendLink" :key="index"><a :href="item.url" target="_blank">{{item.url}}</a></span> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      type: "1",
      activeIndex2: "",
      userInfo: {},
      friendLink:[]
    };
  },
  created() {
    console.log("******", window.localStorage.getItem("paoce_token"));
    if (window.localStorage.getItem("paoce_token")) {
      this.$fetch( "/api/user/userInfo?token=" + window.localStorage.getItem("paoce_token")).then(response => {
        this.userInfo = response.data;
      });
    } else {
      this.userInfo = {};
    }

    this.$fetch( "/api/tools/oms/getFriendLink").then(response => {
      this.friendLink = response.data.records;
    });
     
  },
  methods: {
    goUrl(url) {
      if (!window.localStorage.getItem("paoce_token")) {
        this.$router.push({ path: "/login" });
        return;
      }
      this.$router.push({ path: url });
    },
    loginout() {
      window.localStorage.clear();
      this.$router.push({ path: "/login" });
    }
  }
};
</script> 
<style scoped>
#footer{
  font-size: 14px;
  color: #fff;
  background-color: #656565;
}
#footer .server .server-item{
  font-size: 16px;
  font-weight: bold;
  line-height: 35px;
}
#footer .server .server-item .el-tag{
  width: 23px;
  height: 23px;
  line-height: 23px;
  padding: 0;
  border-radius: 50%;
  margin-right: 5px;
}
#footer ul li{
  font-size: 12px;
  line-height: 25px;
}
#footer .st{
  font-size: 14px;
  font-weight: bold;
  line-height: 35px;
}
#footer .footer-item {
  border-top: 1px solid #f1f1f1;
  line-height: 50px;
  font-size: 16px;
  font-weight: bold;
}
#footer .footer-item span {
  display: inline-block;
  padding-right: 50px;
}
#footer .footer-item span:last-child {
  font-weight: 300;
  font-size: 14px;
}
#footer .link-list {
  font-size: 14px;
  padding-bottom: 20px;
}
#footer .link-list span {
  padding-right: 50px;
}
</style>
