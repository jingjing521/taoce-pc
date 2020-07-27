<template>
  <div class="main_width customer">
    <div class="gl2-wddd_d">
      <div class="top_title">
        <strong>发票簿</strong>
      </div>
    </div>
    <div class="bg-white padding">
      <el-button type="primary" size="small" class="margin-bottom" @click="addOrUpdate()">添加+</el-button>
      <el-table :data="list" style="width: 100%" stripe border="" v-loading="listLoading">
        <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
        <el-table-column prop="fptt" label="发票抬头" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isDefault == '1'">
              <el-tag effect="dark" size="small" style="margin-right:5px;">默认</el-tag>
              {{scope.row.fptt}}
            </span>
            <span v-if="scope.row.isDefault == '0'">{{scope.row.fptt}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="nsrsbh" label="纳税人识别号" align="center"></el-table-column>
        <el-table-column prop="fplx" label="发票类型" align="center" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.fplx == '1'">专用发票</span>
            <span v-if="scope.row.fplx == '2'">普通发票</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.isDefault == '0'" @click.native.prevent="handDefault(scope.row.id)" size="mini" type="info" >设为默认</el-button>
            <el-button @click.native.prevent="addOrUpdate(scope.row)" size="mini" type="primary">修改</el-button>
            <el-button @click.native.prevent="deleteRow(scope.row.id)" size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增或者编辑发票 -->
    <add-or-update-invoice v-if="status" ref="invoic" @refreshDataList="handleList"/>
  </div>
</template>
<script>
import addOrUpdateInvoice from "../template/add-or-update-invoice";
export default {
  components: { addOrUpdateInvoice },
  data() {
    return {
      list: [],
      status: false,
      listLoading: true
    };
  },
  created() {
    if (!window.localStorage.getItem("paoce_token")) {
      this.$router.push({ path: "/login" });
      return;
    }
    this.handleList();
  },
  methods: {
    // 新增/修改发票
    addOrUpdate(item) {
      this.status = true;
      this.$nextTick(() => {
        this.$refs.invoic.init(item);
      });
    },
    // 删除  
    deleteRow(id) {
      var _this = this;
      this.$confirm("此操作将永久删除该发票信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$fetch("/api/user/deleteUserInvoiceInfo", { id: id }).then(
            response => {
              if (response.code == 0) {
                _this.$message.success('操作成功');
                _this.handleList();
              } else {
                _this.$message.error(response.msg);
              }
            }
          );
        })
        .catch(() => {});
    },
    // 设为默认
    handDefault(id) {
      var _this = this;
      this.$confirm("是否将该发票设为默认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$fetch("/api/user/defaultUserInvoiceInfo", { id: id }).then(
            response => {
              if (response.code == 0) {
                _this.$message.success('已设为默认');
                _this.handleList();
              } else {
                _this.$message.error(response.msg);
              }
            }
          );
        })
        .catch(() => {});
    },
    // 发票列表
    handleList() {
      var _this = this;
      this.$fetch("/api/user/userInvoiceInfoList").then(response => {
        _this.listLoading = false;
        if (response.code == 0) {
          _this.list = response.data;
        } else {
          _this.$message.error(response.msg);
        }
      });
    }
  }
};
</script>

<style>
@import "../../style/customer.css";
</style>