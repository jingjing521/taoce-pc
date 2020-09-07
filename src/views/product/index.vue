<template>
  <div class="content main_width">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:40px;">
      <el-breadcrumb-item :to="{ path: '/' }">所有产品</el-breadcrumb-item>
      <el-breadcrumb-item>产品检验</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 产品列表 -->
    <el-card class="box-card product">
      <div slot="header" class="clearfix">
        <span class="header-title">
          所选条件
          <i class="el-icon-arrow-right"></i>
        </span>
        <el-tag
          v-for="(tag,index) in tags"
          :key="tag.name"
          size="small"
          closable
          @close="delTag(tag,index)"
        >{{tag.name}}</el-tag>
      </div>
      <div class="filter" style="min-width:50px;">
        <!-- 一级分类 -->
        <el-row :gutter="20">
          <el-col :span="2">
            <div>分类</div>
          </el-col>
          <el-col :span="1">
            <div>
              <el-link
                style="margin-right:0"
                :underline="false"
                @click="getCategory('')"
                :class="param.cateOne == '' ? 'on':''"
              >全部</el-link>
            </div>
          </el-col>
          <el-col :span="21" class="filter-select">
            <div>
              <el-link
                v-for="item in categoryList"
                :underline="false"
                :key="item.id"
                :class="param.cateOne == item.id ? 'on':''"
                @click="getCategory(item.id,item.cname)"
              >{{item.cname}}</el-link>
            </div>
          </el-col>
        </el-row>
        <!-- 二级分类 -->
        <el-row :gutter="20" class="margin-top" v-if="twoStatus">
          <el-col :span="3">
            <div>&nbsp;</div>
          </el-col>
          <el-col :span="21" class="filter-select">
            <el-card shadow="never">
              <el-link
                :underline="false"
                :class="param.cateTwo == '' ? 'on':''"
                @click="getCategoryTwo('')"
              >全部</el-link>
              <el-link
                v-for="item in categoryListTwo"
                :underline="false"
                :key="item.id"
                :class=" param.cateTwo == item.id ? 'on':''"
                @click="getCategoryTwo(item.id,item.cname)"
              >{{item.cname}}</el-link>
            </el-card>
          </el-col>
        </el-row>
        <!-- 三级分类 -->
        <el-row :gutter="20" class="margin-top" v-if="threeStatus">
          <el-col :span="3">
            <div>&nbsp;</div>
          </el-col>
          <el-col :span="21" class="filter-select">
            <el-card shadow="never">
              <el-link
                :underline="false"
                :class="param.cateThree == '' ? 'on':''"
                @click="getCategoryThree('')"
              >全部</el-link>
              <el-link
                :underline="false"
                v-for="item in categoryListThree"
                :key="item.id"
                :class="param.cateThree == item.id ? 'on':''"
                @click="getCategoryThree(item.id,item.cname)"
              >{{item.cname}}</el-link>
            </el-card>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="20" v-if="serverList.length > 0">
          <el-col :span="2">
            <div>服务需求</div>
          </el-col>
          <el-col :span="1">
            <div style="width:80px">
              <el-link
                :underline="false"
                style="margin-right:0"
                :class="param.fwxq == '' ? 'on':''"
                @click="getserverId('')"
              >全部</el-link>
            </div>
          </el-col>
          <el-col :span="21" class="filter-select">
            <div>
              <el-link
                :underline="false"
                v-for="item in serverList"
                :key="item.id"
                :class="param.fwxq == item.id ? 'on':''"
                @click="getserverId(item.id,item.mc)"
              >{{item.mc}}</el-link>
            </div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="20" v-if="cateStandardList.length > 0">
          <el-col :span="2">
            <div>相关标准</div>
          </el-col>
          <el-col :span="1">
            <div style="width:80px">
              <el-link
                :underline="false"
                style="margin-right:0"
                @click="getStandard('')"
                :class=" param.xgbz == '' ? 'on':''"
              >全部</el-link>
            </div>
          </el-col>
          <el-col :span="21" class="filter-select">
            <div>
              <el-link
                :underline="false"
                v-for="(item,index) in cateStandardList"
                v-if="index < 15"
                :key="item.id"
                :class=" param.xgbz == item.id ? 'on':''"
                @click="getStandard(item.id,item.mc)"
                style="margin-bottom:2px;"
              >{{item.mc}}</el-link>
              <div class="filter-input">
                <el-input
                  placeholder="请输入相关标准"
                  class="input-with-select"
                  size="small"
                  v-model="xgbzInput"
                >
                  <el-button slot="append" icon="el-icon-search" @click="searchxgbz()"></el-button>
                </el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="20">
          <el-col :span="2">
            <div>相关指标</div>
          </el-col>
          <el-col :span="1">
            <div style="width:80px">
              <el-link
                :underline="false"
                style="margin-right:0"
                :class=" param.xgzb == '' ? 'on':''"
                @click="getStandard1('')"
              >全部</el-link>
            </div>
          </el-col>
          <el-col :span="21" class="filter-select">
            <div>
              <el-link
                :underline="false"
                v-for="(item,index) in standardList"
                :key="item.id"
                v-if="index < 15"
                :class=" param.xgzb == item.id ? 'on':''"
                @click="getStandard1(item.id,item.mc)"
                style="margin-bottom:2px;"
              >{{item.mc}}</el-link>
              <div class="filter-input">
                <el-input
                  placeholder="请输入相关指标"
                  class="input-with-select"
                  size="small"
                  v-model="xgzbInput"
                >
                  <el-button slot="append" icon="el-icon-search" @click="searchxgzb()"></el-button>
                </el-input>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="20">
          <el-col :span="2">
            <div>检验资质</div>
          </el-col>
          <el-col :span="1">
            <div style="width:80px">
              <el-link
                :underline="false"
                style="margin-right:0"
                :class=" param.jyzz == '' ? 'on':''"
                @click="getjyzz('')"
              >全部</el-link>
            </div>
          </el-col>
          <el-col :span="21" class="filter-select">
            <div>
              <el-link
                :underline="false"
                v-for="item in testingQualificationList"
                :key="item.id"
                :class=" param.jyzz == item.id ? 'on':''"
                @click="getjyzz(item.id,item.mc)"
              >{{item.mc}}</el-link>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <!-- 查询条件 -->
    <el-card class="box-card">
      <div class="clearfix list-header">
        <div>
          <el-radio-group v-model="param.px" size="mini" @change="getpx(param.px)">
            <el-radio-button label="1">综合</el-radio-button>
            <el-radio-button label="2">服务量</el-radio-button>
            <el-radio-button label="3">评价</el-radio-button>
            <el-radio-button label="4">服务周期</el-radio-button>
          </el-radio-group>
          <el-cascader
            v-model="param.value"
            :props="{ checkStrictly: true }"
            :options="options"
            @change="handleChange"
            style="width: 250px;"
            size="mini"
          ></el-cascader>
        </div>
        <div>
          <el-input placeholder="请输入服务名称" class="input-with-select" v-model="param.mc">
            <el-button slot="append" @click="getList">搜索</el-button>
          </el-input>
        </div>
      </div>
    </el-card>
    <div style="overflow:auto;margin-bottom:30px;" class="bg-white">
      <el-row :gutter="10" style="padding: 20px;margin:0">
        <el-col :span="5" v-for="(item,index) in goodsList" :key="index">
          <div class="text-center" @click="goDetail(item.goods_id,item.shopid)">
            <img :src="item.goods_img" alt style="height:200px;" />
            <div class="price">¥{{item.goods_price}}</div>
            <div class="name">{{item.goods_name}}</div>
            <div class="des">{{item.jgmc}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import cityList from "@/utils/city.json";
import { getDataName } from "@/utils";
export default {
  data() {
    return {
      // 二级、三级的显示、隐藏
      twoStatus: true,
      threeStatus: true,
      tags: [], // 已选条件
      param: {
        px: "1",
        cateOne: "", // 一级分类
        cateTwo: "", // 二级分类
        cateThree: "", // 三级分类
        fwxq: "", //服务需求
        jyzz: "", // 检验资质
        xgzb: "", // 相关指标
        xgbz: "", // 相关标准
        mc: "",
        limit: "1000",
      },
      categoryList: [],
      categoryListTwo: [],
      categoryListThree: [],
      serverList: [],
      testingQualificationList: [],
      standardList: [],
      cateStandardList: [],
      goodsList: [],
      xgbzInput: "",
      xgzbInput: "",

      loading: true,
      count: 10,
      currentPage: 1,
      options: [],
      value: "",
    };
  },
  created() {
    this.param.cateOne = this.$route.query.cateOne || "";
    this.param.cateTwo = this.$route.query.cateTwo || "";
    this.param.cateThree = this.$route.query.cateThree || "";
    this.getCategoryOneList(); // 一级分类
    if (this.param.cateOne) {
      this.getCategoryTwoList(this.param.cateOne, "1"); // 2级分类
    } else {
      this.twoStatus = false;
    }
    if (this.param.cateTwo) {
      this.getCategoryTwoList(this.param.cateTwo, "2"); // 3级分类
      this.tags[0] = { name: this.$route.query.name, type: "" };
    } else {
      this.threeStatus = false;
    }

    var _this = this;
    cityList.forEach(function (value, index) {
      var item = { value: value.dm, label: value.name, children: [] };
      _this.options.push(item);
      value.ssqdmEntityList.forEach(function (v, i) {
        _this.options[index].children.push({
          value: v.dm,
          label: v.name,
          children: [],
        });
        v.ssqdmEntityList.forEach(function (x, y) {
          _this.options[index].children[i].children.push({
            value: x.dm,
            label: x.name,
          });
        });
      });
    });

    this.getServiceList();
    this.getStandardList();
    this.getCategoryStandard();
    this.getTestingQualificationList();
    this.getList();
  },
  watch: {
    $route: "getList",
  },
  methods: {
    handleChange(value) {
      this.value = value;
      console.log(value);
      this.param.province = this.value[0];
      this.param.city = this.value[1];
      this.param.district = this.value[2];
      this.getList();
    },
    goDetail(id, shopid) {
      let { href } = this.$router.resolve({
        path: "/productDetail",
        query: { id: id, shopid: shopid },
      });
      window.open(href, "_blank");
    },
    getList() {
      this.goodsList = [];
      if (this.$route.query.mc) {
        this.param.mc = this.$route.query.mc;
      }

      this.$post("/api/goods/goodsList", this.param).then((response) => {
        if (response.code == 0) {
          this.goodsList = response.data.records;
        }
      });
    },
    // 获取商品的一级分类
    getCategoryOneList() {
      this.$fetch("/api/category/oms/listOne").then((response) => {
        this.categoryList = response.data[0].categoryList;
      });
    },
    // 一级分类点击事件
    getCategory(id, name) {
      this.param.cateOne = id;
      this.param.cateTwo = "";
      this.param.cateThree = "";
      this.param.fwxq = "";
      this.param.xgbz = "";
      this.tags = [];
      this.twoStatus = false; // 二级分类隐藏
      this.threeStatus = false; // 二级分类隐藏
      if (this.param.cateOne) {
        this.tags[0] = { name: name, type: "" };
        this.getCategoryTwoList(id, "1"); // 二级分类编号
      }
      this.getStandardList();
      this.getCategoryStandard();
      this.getList();
    },
    // 获取二级分类、三级分类列表
    getCategoryTwoList(id, type) {
      this.$fetch("/api/category/oms/listDown/" + id).then((response) => {
        if (type == "1") {
          this.categoryListTwo = response.data;
          this.twoStatus = this.categoryListTwo.length > 0 ? true : false;
        } else {
          this.categoryListThree = response.data;
          this.threeStatus = this.categoryListThree.length > 0 ? true : false;
        }
        this.getList();
      });
    },
    // 二级分类点击事件
    getCategoryTwo(id, name) {
      this.param.cateTwo = id;
      this.param.cateThree = "";
      this.param.fwxq = "";
      this.param.xgbz = "";
      this.tags = [];
      this.threeStatus = false;
      if (this.param.cateTwo) {
        this.tags[0] = { name: name, type: "" };
        this.getCategoryTwoList(id, "2");
      }
      this.getStandardList();
      this.getCategoryStandard();
      this.getList();
    },
    // 三级分类点击事件
    getCategoryThree(id, name) {
      this.param.cateThree = id;
      this.param.fwxq = "";
      this.param.xgbz = "";
      this.tags = [];
      if (this.param.cateThree) {
        this.tags[0] = { name: name, type: "" };
      }
      this.getStandardList();
      this.getCategoryStandard();
      this.getList();
    },
    // 服务需求
    getServiceList() {
      this.$fetch("/api/serviceDemand/listAll", {}).then((response) => {
        if (response.code == 0) {
          this.serverList = response.data;
        } else {
          this.serverList = [];
        }
      });
    },
    // 服务需求点击事件
    getserverId(id, name) {
      this.param.fwxq = id;
      var a = true;
      if (this.param.fwxq) {
        this.tags.forEach((v) => {
          if (v.type == "fwxq") {
            a = false;
            v.name = name;
            return;
          }
        });
        if (a) {
          this.tags.push({ name: name, type: "fwxq" });
        }
      }
      this.getList();
    },
    // 获取相关标准的列表
    getCategoryStandard() {
      this.$fetch("/api/categoryStandard/lisAll", {
        cone: this.param.cateOne,
        ctwo: this.param.cateTwo,
        cthree: this.param.cateThree,
      }).then((response) => {
        if (response.code == 0) {
          this.cateStandardList = response.data;
        } else {
          this.cateStandardList = [];
        }
      });
    },
    // 获取相关标准
    getStandard(id, name) {
      this.param.xgbz = id;
      var a = true;
      if (this.param.xgbz) {
        this.tags.forEach((v) => {
          if (v.type == "xgbz") {
            a = false;
            v.name = name;
            return;
          }
        });
        if (a) {
          this.tags.push({ name: name, type: "xgbz" });
        }
      }
      this.getStandardList();
      this.getList();
    },
    // 相关指标
    getStandardList() {
      this.$fetch("/api/standardIndex/lisAll", {
        cone: this.param.cateOne,
        ctwo: this.param.cateTwo,
        cthree: this.param.cateThree,
        stid: this.param.xgbz,
      }).then((response) => {
        if (response.code == 0) {
          this.standardList = response.data;
        } else {
          this.standardList = [];
        }
      });
    },
    getStandard1(id, name) {
      this.param.xgzb = id;
      var a = true;
      if (this.param.xgzb) {
        this.tags.forEach((v) => {
          if (v.type == "xgzb") {
            a = false;
            v.name = name;
            return;
          }
        });
        if (a) {
          this.tags.push({ name: name, type: "xgzb" });
        }
      }
      this.getList();
    },
    // 检验资质
    getTestingQualificationList() {
      this.$fetch("/api/testingQualification/lisAll").then((response) => {
        if (response.code == 0) {
          this.testingQualificationList = response.data;
        } else {
          this.testingQualificationList = [];
        }
      });
    },
    getjyzz(id, name) {
      console.log(id, name);
      this.param.jyzz = id;
      var a = true;
      if (this.param.jyzz) {
        this.tags.forEach((v) => {
          if (v.type == "jyzz") {
            a = false;
            v.name = name;
            return;
          }
        });
        if (a) {
          this.tags.push({ name: name, type: "jyzz" });
        }
      }
      this.getList();
    },
    // 搜索相关标准
    searchxgbz() {
      var _this = this;
      this.$fetch("/api/categoryStandard/lisAll", {
        cone: this.param.cateOne,
        ctwo: this.param.cateTwo,
        cthree: this.param.cateThree,
        mc: this.xgbzInput,
      }).then((response) => {
        console.log(response);
        if (response.code == 0) {
          if (response.data.length > 0) {
            // _this.cateStandardList.unshift(response.data[0]);
            // console.log(_this.cateStandardList)
            // _this.xgbzInput = "";
            // _this.getStandard(response.data[0].id, response.data[0].mc)
          } else {
            _this.$message.error("未检测到相关标准");
          }
        } else {
        }
      });
    },
    searchxgzb() {
      var _this = this;
      this.$fetch("/api/standardIndex/lisAll", {
        cone: this.param.cateOne,
        ctwo: this.param.cateTwo,
        cthree: this.param.cateThree,
        stid: this.param.xgbz,
        mc: this.xgzbInput,
      }).then((response) => {
        if (response.code == 0) {
          if (response.data.length > 0) {
            // _this.standardList.unshift(response.data[0]);
            // _this.xgzbInput = "";
            // _this.getStandard1(response.data[0].id, response.data[0].mc)
          } else {
            _this.$message.error("未检测到相关指标");
          }
        } else {
        }
      });
    },
    getpx(item) {
      this.param.px = item;
      this.getList();
    },
    delTag(tag, index) {
      this.tags.splice(index, 1);
      this.param[tag.type] = "";
      if (tag.type == "") {
        this.param.cateOne = "";
        this.param.cateTwo = "";
        this.param.cateThree = "";
        this.twoStatus = false; // 二级分类隐藏
        this.threeStatus = false; // 二级分类隐藏
      }
      this.getList();
    },
  },
};
</script>

<style scoped>
.filter-class-sub {
  background-color: #fafafa;
  margin-top: 12px;
}
.list-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.box-card {
  font-size: 14px;
}
.header-title {
  line-height: 24px;
  font-size: 14px;
  color: #303133;
  font-weight: 400;
}
.product .el-tag + .el-tag {
  margin-left: 10px;
}
.el-divider--horizontal {
  margin: 10px 0 !important;
}
.el-divider {
  background: none !important;
  border-bottom: 1px dashed #dcdfe6;
}

.el-link {
  margin-right: 15px;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  position: relative;
  text-decoration: none;
  outline: 0;
  padding: 0;
}
.on {
  /* background: #409eff; */
  color: #409eff !important;
  border-radius: 30px;
  padding: 0 4px 0 3px !important;
  box-sizing: border-box;
  min-width: 40px;
}
.filter-input {
  width: 200px !important;
  display: inline-flex !important;
}
.el-col-5 {
  width: calc(100% / 5);
}
.price {
  line-height: 30px;
  font-size: 18px;
  color: #e4393c;
}
.name {
  font-size: 15px;
  color: #303133;
  font-weight: 400;
}
.des {
  line-height: 30px;
  font-size: 13px;
  color: #999;
}
</style>
