<template>
  <div class="max_width organizationBox" id="server">
    <div class="organization">
      <div class="b-special-cc">
        <img src="@/assets/icon/tz-wz-2.png" width="534" height="25" alt="">
        <p class="organization-wz">{{info.mc}}</p>
        <div class="organization-wz gl12-organization-wz">
          <div class="gl12-organization-div" style="margin-left:20px">
            <span class="gl12-organization-span gl12-organization-i2">在线咨询</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tzsb">
      <div class="tzsb-cc">
        <div class="jgzy">
          <h3 :class=" type == '1' ? 'active1':''" @click="goItem('1')" >
            <img src="@/assets/icon/zs-2.png">
            <p>资格证书 | 报告模版</p>
          </h3>
          <h3 :class=" type == '2' ? 'active1':''" @click="goItem('2')">
            <img src="@/assets/icon/jg-2.png">
            <p>机构简介</p>
          </h3>
          <div class="tzsb-jj tzsb-jjwz gl1potal" style="display:block" v-if=" type == '1'" >
            <el-row :gutter="10" style="padding:10px">
              <el-col :span="6" v-for="(item,index) in info.zhinfo" :key="index">
                <div class="text-center margin-bottom">
                  <div style="overflow: hidden;">
                    <img :src="item.ceImg" alt="" style="width:80%;height:400px;margin:auto;">
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="tzsb-jj tzsb-jjwz gl1potal" style="display:block" v-if="type == '2'">
            <p v-html="info.intro"></p>
          </div>
        </div>
      </div>
    </div>
    <div style="height:15px;"></div>
  </div>
</template> 
<script>
export default { 
  data() {
    return {
      info: {},
      type: "1",
      list:[]
    };
  },
  created() {
    this.getInfo();
  },
  mounted() {},
  methods: {
    getInfo() {
      var _this = this;
      this.$fetch("/api/user/agencyInfo", { id: this.$route.query.id }).then(
        response => { 
          if (response.code == 0) {
            _this.info = response.data; 
          }else{
            _this.$message.error(response.message)
          }
        }
      );
    },
    goItem(type) {
      this.type = type;
    }
  }
};
</script>
<style>
@import "../../style/server.css";
</style>

