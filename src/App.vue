<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    // 在页面加载时读取localStorage里的状态信息

    if (
      localStorage.getItem('store-ivew-admin') !== null &&
      localStorage.getItem('store-ivew-admin') !== '' &&
      localStorage.getItem('store-ivew-admin') !== undefined
    ) {
      localStorage.getItem('store-ivew-admin') && this.$store.replaceState(JSON.parse(localStorage.getItem('store-ivew-admin')))
      // 获取到localStorage后清除，防止信息泄露
      localStorage.removeItem('store-ivew-admin')
    }
    // 在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener('beforeunload', () => {
      // 写入前要清除，否则报错
      localStorage.removeItem('store-ivew-admin')
      localStorage.setItem('store-ivew-admin', JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
/*表格数据*/
.ivu-table-cell {
  padding-left: 8px !important;
   padding-right: 0px !important;
}
</style>
