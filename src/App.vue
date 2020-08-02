<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import AMap from "AMap";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  created() {
    this.getLocation();
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
    getLocation() {
      const self = this;
      AMap.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          console.log("定位成功信息：", data);

          self.mapCoor([data.position.lng, data.position.lat]);

          // let geocoder = new AMap.Geocoder({  radius: 1000, extensions: 'all' })
          // geocoder.getAddress([data.position.lng, data.position.lat], function (status, result) {
          //   console.log(status, result);
          //     if (status === 'complete' && result.info === 'OK') {
          //         if (result && result.regeocode) {
          //             console.log(result.regeocode.formattedAddress)

          //         }
          //     }
          // })
        }

        function onError(data) {
          // 定位出错
          console.log("定位失败错误：", data);
          self.getLngLatLocation();
        }
      });
    },
    getLngLatLocation() {
      AMap.plugin("AMap.CitySearch", function () {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function (status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            console.log("通过ip获取当前城市：", result);
            localStorage.setItem("taoce_province",result.province);
            localStorage.setItem("taoce_city",result.city)
             
          }
        });
      });
    },
    mapCoor(lnglatXY) {
      var _this = this;
      AMap.service("AMap.Geocoder", function () {
        //回调函数
        var geocoder = new AMap.Geocoder({});
        geocoder.getAddress(lnglatXY, function (status, result) { 
          if (status === "complete" && result.info === "OK") {
            //获得了有效的地址信息:
            _this.arrive = result.regeocode.formattedAddress;
            localStorage.setItem("taoce_province",result.regeocode.addressComponent.province);
            localStorage.setItem("taoce_city",result.regeocode.addressComponent.city)
            console.log(_this.arrive);
          } else {
            _this.arrive = "暂无位置";
          }
        });
      });
    },
  },
};
</script>

<style>
html {
  overflow-y: scroll !important;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  min-width: 1200px;
  margin: auto;
  font: 12px/1.5 Helvetica, "Hiragino Sans GB", "Microsoft YaHei", Helvetica,
    "宋体", STFangsong, STXihei, Arial, serif;
  color: #3e3e3e;
  font-weight: normal;
}

.main_width {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
.color-red {
  color: #ff4001;
}
.text-center {
  text-align: center;
}
.title {
  line-height: 30px;
  font-size: 18px;
  font-weight: 400;
  position: relative;
}

.cu-bar {
  display: flex;
  position: relative;
  align-items: center;
  min-height: 50px;
  justify-content: space-between;
}

.cu-bar .action {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
  max-width: 100%;
}
.cu-bar .action.border-title {
  position: relative;
  top: -5px;
}
.text-bold {
  font-weight: bold;
}

.text-xl {
  font-size: 18px;
}
.cu-bar .action.border-title span:last-child {
  position: absolute;
  bottom: -0.5rem;
  min-width: 2rem;
  height: 3px;
  left: 15px;
}
.bg-grey {
  background-color: #8799a3;
  color: #ffffff;
}
.bg-red {
  background-color: #e54d42;
  color: #ffffff;
}
.margin {
  margin: 15px;
}
</style>
