 
<template>
  <el-dialog :close-on-click-modal="true" :visible.sync="visible" title="检测标准">
    <div id="main">
      <el-table v-loading="isLoading" :data="dataList" border="" style="width: 100%;">
        <el-table-column fixed label="序号" align="center" width="60px">
          <template slot-scope="scope">
            <span>{{ scope.$index+(queryCondition.page - 1) * queryCondition.size + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="agentName"
          header-align="center"
          align="left"
          label="服务编号"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="agentUserName"
          header-align="center"
          align="left"
          label="服务方案名称"
          :show-overflow-tooltip="true"
        />
        <el-table-column prop="agentCode" header-align="center" align="center" label="检测产品名称"/>
        <el-table-column
          prop="agentExamine"
          header-align="center"
          align="right"
          label="检测周期（工作日）"
          sortable
        />
        <el-table-column prop="agentPass" header-align="center" align="right" label="服务价格"/>
        <el-table-column prop="auditFailed" header-align="center" align="right" label="操作"/>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="visible = false">确认</el-button>
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
  created() {},
  methods: {
    init(item) {
      this.visible = true;
      this.$nextTick(() => {});
    }
  }
};
</script>
 
