 
import func from './vue-temp/vue-editor-bridge';
<template>
    <el-dialog :visible.sync="visible" title="请选择产品类别">
        <div class="filter">
            <!-- 一级分类 -->
            <el-row :gutter="20">
                <el-col :span="21" class="filter-select">
                    <div>
                        <el-link v-for="item in categoryList" :underline="false" 
                        :key="item.cat_one" :class="param.cateOne == item.cat_one ? 'on':''" 
                        @click="getCategory(item.cat_one)" style="margin-right:8px;">{{item.cat_one_name}}</el-link>
                    </div>
                </el-col>
            </el-row>
            <!-- 二级分类 -->
            <el-row :gutter="20" class="margin-top">
                <el-col :span="21" class="filter-select">
                    <el-card shadow="never">
                        <el-link
                            v-for="item in categoryListTwo"
                            :underline="false"
                            :key="item.cate_two"
                            :class="param.cateTwo == item.cate_two ? 'on':''"
                            @click="getCategoryTwo(item.cate_two)"
                            style="margin-right:8px;"
                        >{{item.cate_two_name}}</el-link>
                    </el-card>
                </el-col>
            </el-row>
            <!-- 三级分类 -->
            <el-row :gutter="20" class="margin-top">
                <el-col :span="21" class="filter-select">
                    <el-card shadow="never">
                        <el-link
                            :underline="false"
                            v-for="item in categoryListThree"
                            :key="item.cate_three"
                            :class="param.cateThree == item.cate_three ? 'on':''"
                            style="margin-right:8px;"
                            @click="getCategoryThree(item.cate_three,item.cate_three_name)"
                        >{{item.cate_three_name}}</el-link>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handle">确认</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      value: [],
      visible: true,
      categoryList: [],
      categoryListTwo: [],
      categoryListThree: [],
      param: {
        cateOne: "",
        cateTwo: "",
        cateThree: ""
      },

      isLoading: false,
      dataList: [],
      form: {},
      formLabelWidth: "120px",
      options: []
    };
  },
  created() {
    var _this = this;
    this.$fetch("/api/category/oms/shopCategoryList", { shopId: "4028b88171af205f0171b16a5bde003b" }).then(response => { 
      if (response.code == 0) {
        _this.categoryList = response.data;
        _this.param.cateOne = response.data[0].cat_one;
        _this.categoryListTwo = response.data[0].twolist;
        _this.param.cateTwo = response.data[0].twolist[0].cate_two; 
        _this.getCategory1();
      }
    });
  },
  methods: { 
    getCategory1() {
      var _this = this;
      this.$fetch("/api/category/oms/shopCategoryThreeListDown", {
        shopId: "4028b88171af205f0171b16a5bde003b",
        cateTwo: _this.param.cateTwo
      }).then(response => {
        if (response.code == 0) {
          _this.categoryListThree = response.data;
          _this.param.cateThree = response.data[0].cate_three;
        }
      });
    },
    // 一级分类点击事件
    getCategory(id) { 
      var _this = this;
      this.param.cateOne = id;
       
      this.categoryList.forEach(function(v,i){ 
        if(v.cat_one == id){
          _this.categoryListTwo = _this.categoryList[i].twolist;
          _this.param.cateTwo = _this.categoryList[i].twolist[0].cate_two;
          _this.getCategory1();
        }
      })
      
    },
    getCategoryTwo(id){
      this.param.cateTwo = id;
      this.getCategory1();
    },
    getCategoryThree(id,name){
      this.param.cateThree = id;
    },
    
     
    handleChange(value) {
      console.log(value);
    },
    init(item) {
      this.visible = true;
      this.$nextTick(() => {});
    },
    onSelected(data) {
      this.form.province = data.province.value;
      this.form.city = data.city.value;
      this.form.district = data.area.value;
    },
    handle() { 
      this.visible = false;
      this.$emit('getClass',this.param);
    }
  }
};
</script>
<style scoped>
#addOrUpdateAddr .el-input,
#addOrUpdateAddr .el-select,
#addOrUpdateAddr .el-cascader {
  width: 400px;
}
#addOrUpdateAddr .distpicker-address-wrapper select {
  width: 130px !important;
}
.on {
  background: #409eff;
  color: #fff !important;
  border-radius: 30px;
  padding: 3px 5px !important;
  font-size: 13px;
}
</style>

 
