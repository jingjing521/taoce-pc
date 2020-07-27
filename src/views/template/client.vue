 
<template>
  <el-dialog :close-on-click-modal="true" :visible.sync="visible" title="委托客户列表">
    <div id="main">
      <el-table v-loading="isLoading" :data="dataList" border="" style="width: 100%;">
        <el-table-column fixed label="序号" align="center" width="60px" type="index"></el-table-column>
        <el-table-column prop="dwmc" align="center" label="委托单位/委托人" :show-overflow-tooltip="true" min-width="150px"/>
        <el-table-column prop="creditCode" align="center" label="统一社会信用代码" min-width="150px"/>
        <el-table-column prop="legalPerson" align="center" label="联系人"/>
        <el-table-column prop="agentPass" align="center" label="认证类型">
          <template slot-scope="scope">
            <span v-if="scope.row.mtype == '2'">企业</span>
            <span v-if="scope.row.mtype == '1'">个人</span>
          </template>
        </el-table-column>
        <el-table-column prop="auditFailed" align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <!-- <el-button type="primary" @click="visible = false">确认</el-button> -->
    </span>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      visible: false,
      isLoading: false,
      dataList: []
    };
  },
  created() {
    var _this = this;
    this.$fetch("/api/user/userAuthenticationList",{type:'2'}).then(response => {
      console.log(response);
      if (response.code == 0) {
        _this.dataList = response.data;
      }
    });
  },
  methods: {
    init(item) {
      this.visible = true;
      this.$nextTick(() => {});
    },
    handleClick(item){
      this.visible = false;
      this.$emit('getClientData',item)
    }
  }
};
</script>
 
