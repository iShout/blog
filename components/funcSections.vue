<template>
  <div class="section-frame section-layout">
    <h1>functions</h1>
  </div>
</template>

<script>
export default {
  name: 'FuncSections',
  data() {
    return {
      show: true,
    }
  },
  methods: {
  },
}
</script>

<style lang="less" scoped>
.section-frame {
  width: 100%;
  height: 480px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 10px 10px 16px #888888;
  box-sizing: border-box;
}
.section-layout {
  padding: 48px;
}
</style>
