<template>
	<div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
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
.margin{
	margin: 15px;
}
</style>
