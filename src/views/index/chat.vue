<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      unid: "",
      messageValue: "哈哈恍恍惚惚"
    };
  },
  created() {
    if (window.localStorage.getItem("unid")) {
      this.unid = window.localStorage.getItem("unid");
      this.webIMlogin();
    }
    this.getUserInfo();
    this.getList();
  },
  methods: {
    getUserInfo() {
      var _this = this;
      this.$fetch("/api/user/userInfo").then(response => {
        if (response.code == 0) {
          _this.userInfo = response.data;
          // _this.webIMregister();
        } else {
          _this.$message.error(response.message);
        }
      });
    },
    // 注册环信
    webIMregister() {
      var _this = this;
      this.$imConn.registerUser({
        username: "username1223",
        password: "password",
        nickname: "nickname",
        appKey: WebIM.config.appkey,
        apiUrl: WebIM.config.apiURL,
        success: function(res) {
          console.log(res);
          _this.unid = res.entities.uuid;
          window.localStorage.setItem("unid", _this.unid);
          _this.webIMlogin();
        },
        error: function(res) {
          console.log();
        }
      });
    },
    // 登录环信
    webIMlogin() {
      this.$imConn.open({
        apiUrl: WebIM.config.apiURL,
        user: "username1223",
        pwd: "password",
        appKey: WebIM.config.appkey,
        success: function(token) {
          console.log("环信登录成功");
          _this.onSend();
        },
        error: function() {}
      });
    },
    // 发送消息与表情图一样是发送文本
    onSend() {
      this.ishowEmoji = false;
      let self = this;
      let id = this.$imConn.getUniqueId(); // 生成本地消息id
      let msg = new WebIM.message("txt", id); // 创建文本消息
      msg.set({
        msg: this.messageValue, // 消息内容
        to: this.forumUserData.phone, // 接收消息对象（用户id）
        roomType: false,
        success: function(id, serverMsgId) {
          self.chatContent.push({
            // userLogo: self.userInfo.logoPath,
            msg: self.messageValue,
            from: self.userInfo.phoneMobile,
            msg_type: "txt",
            timestamp: new Date().getTime(),
            isShowTime: self.timestampStatus()
          });
          //处理表情已图片展示
          self.replace_em();
          //清空发送输入框内容
          self.messageValue = "";
        }, // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
        fail: function(e) {
          console.log("Send private text error");
        } // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
      });
      console.log(msg);
      this.$imConn.send(msg.body);
    },
    getList() {
      var options = {
        queue: "username1223",
        isGroup: false,
        count: 10,
        success: function() {},
        fail: function() {}
      };
      this.$imConn.fetchHistoryMessages(options);
    }
  }
};
</script>
<style>
</style>

 
