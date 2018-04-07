<template>
  <div id="app">
    <b-header></b-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <detail></detail>
  </div>
</template>

<script>
  import BHeader from 'components/header/header'
  import Tab from 'components/tab/tab'
  import Detail from 'components/detail/detail'

  export default {
    components: {
      BHeader,
      Tab,
      Detail
    }
  }
</script>

<style lang="scss" type="text/css">

</style>
