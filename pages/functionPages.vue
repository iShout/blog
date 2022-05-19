<template>
  <section class="layout-basic" style="min-height: 100%; height: auto">
    <header>
      <p class="title">{{ $store.state.siteName }}</p>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{$store.state.moduleTitle}}</el-breadcrumb-item>
      </el-breadcrumb>
    </header>
    <body class="main-content">
      <router-view></router-view>
    </body>
  </section>
</template>

<script>
export default {
  name: 'FunctionPages',
  data() {
    return {}
  },
  mounted() {
    console.log(document.cookie,'cookies')
  },
  methods: {},
}
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
}
.title {
  font-size: 43.6px;
  font-weight: bolder;
  display: inline-block;
}
.crumbs {
  display: inline-block;
  margin-left: 24px;
}
.main-content {
  width: 100%;
  height: calc(100% - 61px);
}
</style>
