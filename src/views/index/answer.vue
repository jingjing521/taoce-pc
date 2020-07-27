<template>
  <div id="TopstoryContent" class="bg-white">
    <div
      class="Card TopstoryItem TopstoryItem-isRecommend"
      v-for="(item, index)  in list"
      :key="index"
    >
      <div class="Feed">
        <div class="ContentItem AnswerItem">
          <h2 class="ContentItem-title">
            <div>
              <a>{{item.title}}</a>
            </div>
          </h2>
          <div class="RichContent is-collapsed">
            <div class="RichContent-inner">
              <span
                class="RichText ztext CopyrightRichText-richText"
                itemprop="text"
              >{{item.content}}</span>
              <button
                type="button"
                class="Button ContentItem-more Button--plain"
                @click="goDetail(item.id)"
              >
                阅读全文
                <span style="display: inline-flex; align-items: center;">
                  ​
                  <svg
                    class="Zi Zi--ArrowDown ContentItem-arrowIcon"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      d="M12 13L8.285 9.218a.758.758 0 0 0-1.064 0 .738.738 0 0 0 0 1.052l4.249 4.512a.758.758 0 0 0 1.064 0l4.246-4.512a.738.738 0 0 0 0-1.052.757.757 0 0 0-1.063 0L12.002 13z"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      todayList: [],
      loading: true,
      currentPage: 1,
      pageSize: 30,
      total: 0,
      detail: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取机构列表
    getList() {
      var _this = this;
      this.$fetch("/api/ask/list", {
        limit: _this.pageSize,
        page: _this.currentPage
      }).then(response => {
        _this.loading = false;
        if (response.code == 0) {
          _this.list = response.data.records;
          _this.total = response.data.total;
        } else {
          _this.$message.error(response.msg);
        }
      });
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    goDetail(id) { 
      this.$router.push({ path: "/ask-detail", query: { id: id } });
    }
  }
};
</script>
<style>
#TopstoryContent {
  min-width: 1200px;
  width: 1200px;
  margin: 10px auto;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 -4px 30px 2px rgba(0, 0, 0, 0.1);
}
#TopstoryContent .Card {
  margin-bottom: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-bottom: 1px solid #f0f2f7;
  padding: 20px;
}
.ContentItem-title {
  font-size: 16px;
  font-weight: 600;
  font-synthesis: style;
  line-height: 1.6;
  color: #1a1a1a;
  margin-top: -4px;
  margin-bottom: -4px;
}
.RichContent-inner {
  margin-top: 9px;
  margin-bottom: -4px;
  overflow: hidden;
  max-height: 100px;
}
.CopyrightRichText-richText {
  white-space: normal;
  font-size: 14px;
}
.ztext b {
  font-weight: 600;
}
.Button {
  display: inline-block;
  padding: 0 16px;
  font-size: 14px;
  line-height: 32px;
  color: #8590a6;
  text-align: center;
  cursor: pointer;
  background: none;
  /* border: 1px solid; */
  border-radius: 3px;
}
.ContentItem-more {
  padding: 0;
  margin-left: 4px;
  color: #175199;
}
</style>

 
