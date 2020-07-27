 
<template>
  <el-dialog :close-on-click-modal="true" :visible.sync="visible" title="发票列表">
    <div>
      <el-table v-loading="isLoading" :data="invoiceList" border="" style="width: 100%;">
        <el-table-column fixed label="序号" align="center" width="60px" type="index"></el-table-column>
        <el-table-column prop="fptt" header-align="center" align="left" label="发票抬头" :show-overflow-tooltip="true" />
        <el-table-column prop="nsrsbh" header-align="center" align="left" label="纳税人识别号" :show-overflow-tooltip="true" />
        <el-table-column prop="fplx" header-align="center" align="center" label="发票类型">
            <template slot-scope="scope">
                <span v-if="scope.row.fplx == '1'">专用发票</span>
                <span v-if="scope.row.fplx == '2'">普通发票</span>
            </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作">
         <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">选择</el-button>
            </template>
        </el-table-column>   
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
      invoiceList: []
    };
  },
  created() {
      
  },
  methods: {
    init() {
      this.visible = true;
      this.getInvoiceList();
      this.$nextTick(() => {});
    },
    getInvoiceList(){
      var _this = this;
      this.$fetch("/api/user/userInvoiceInfoList").then(response => { 
        _this.listLoading = false;
        if (response.code == 0) {
          _this.invoiceList = response.data;
        }
      });
    },
    handleClick(item){
      this.visible = false;
      this.$emit('getInvoiceData',item)
    }
  }
};
</script>
 
