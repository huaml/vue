<template>
  <div id="app">
    <Title></Title>
    <search></search>
  </div>
</template>

<script>
import Title from './components/title/title'
import Search from './components/search/search'

export default {
  name: 'App',
  components: {
    Title,
    Search
  }
}
</script>

<style lang="scss" type="text/css">
#app {
  font: 14px "Microsoft YaHei", Verdana, arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}
</style>
