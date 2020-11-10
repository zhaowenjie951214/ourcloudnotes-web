<template>
  <div id="app" @click="closeMenu">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
    closeMenu(){
      this.$store.commit('visible',false)
    }
  },
  mounted() {
    // 禁用浏览器返回键
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', this.disableBrowserBack)
  },
  destroyed() {
      // 清除popstate事件 否则会影响到其他页面
      window.removeEventListener("popstate", this.disableBrowserBack, false)
  }
}
</script>

<style>
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #2c3e50; */
  margin: 0;
  padding: 0;
}
.clear{
  clear: both;
}
</style>
