<template>
  <div class="main_width customer">
    <div class="gl2-wddd_d">
      <div class="top_title">
        <strong>地址库</strong>
      </div>
    </div>
    <div class="bg-white padding">
      <el-button type="primary" size="small" class="margin-bottom" @click="addOrUpdate()">添加+</el-button>
      <el-table :data="list" style="width: 100%" stripe border v-loading="loading">
        <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
        <el-table-column prop="consignee" label="收件人" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isDefault == '1'">
              <el-tag effect="dark" size="small" style="margin-right:5px;">默认</el-tag>
              {{scope.row.consignee}}
            </span>
            <span v-if="scope.row.isDefault == '0'">{{scope.row.consignee}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
        <el-table-column prop="address" label="详细地址" align="center" width="120"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.isDefault == '0'" @click.native.prevent="handDefault(scope.row.id)" size="mini" type="info" >设为默认</el-button>
            <el-button @click.native.prevent="addOrUpdate(scope.row)" size="mini" type="primary">修改</el-button>
            <el-button @click.native.prevent="deleteRow(scope.row.id)" size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table> 
    </div>
    <!-- 新增或者编辑地址 -->
    <add-address v-if="status" ref="addaddress" @refreshDataList="handleList"/>
  </div>
</template>
<script>
import addAddress from "../template/add-address";
export default {
  components: { addAddress },
  data() {
    return {
      list: [],
      status: false,
      loading:true
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
    // 新增/修改地址
    addOrUpdate(item) {
      this.status = true;
      this.$nextTick(() => {
        this.$refs.addaddress.init(item);
      });
    },
    // 删除 /api/user/deleteUserConsigneeAddress
    deleteRow(id) {
      var _this = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$fetch("/api/user/deleteUserConsigneeAddress", {
            id: id,
            token: window.localStorage.getItem("paoce_token")
          }).then(response => { 
            if (response.code == 0) {
              _this.handleList();
            }else {
              _this.$message.error(response.msg);
            }
          });
        })
        .catch(() => {
          _this.$message({ type: "info", message: "已取消删除" });
        });
    },
    handDefault(id){
      var _this = this;
      this.$confirm("是否将该地址设为默认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$fetch("/api/user/defaultUserConsigneeAddress", { id: id}).then(response => { 
            if (response.code == 0) {
              _this.handleList();
            }else {
              _this.$message.error(response.msg);
            }
          });
        })
        .catch(() => { });
    },
    handleList() {
      var _this = this;
      this.$fetch("/api/user/userConsigneeAddressList").then(response => { 
        _this.loading = false
        if (response.code == 0) {
          _this.list = response.data;
        }else {
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