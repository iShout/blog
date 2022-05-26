<template>
  <div class="section-frame section-layout">
    <el-skeleton v-if="!details.description" animated>
      <template slot="template">
        <el-row>
          <el-col :span="12">
            <el-skeleton-item variant="image" class="cover-pic" />
          </el-col>
          <el-col
            :span="12"
            style="height: 100%; padding: 24px 12px"
            class="function-info"
          >
            <el-skeleton-item
              variant="h1"
              style="width: 20%; margin-bottom: 12px"
            />
            <el-skeleton-item variant="p" style="width: 100%" />
            <el-skeleton-item variant="p" style="width: 100%" />
            <el-skeleton-item variant="p" style="width: 70%" />
          </el-col>
        </el-row>
      </template>
    </el-skeleton>
    <el-row v-else style="width: 100%; height: 100%">
      <el-col :span="12" style="height: 100%">
        <div class="cover-pic">
          <component :is="picComponents[tabIndex]" />
        </div>
      </el-col>
      <el-col
        :span="12"
        style="height: 100%; padding: 24px 12px"
        class="function-info"
      >
        <h1 class="function-title">{{ details.title }}</h1>
        <p>{{ details.description }}</p>
        <a class="link-to-page" @click="jumpToPage"
          >see detail
          <p class="el-icon-d-arrow-right"
        /></a>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'FuncSections',
  components: {
    PicMarkdown: () => import('./picMarkdown.vue'),
    PicEcharts: () => import('./picEcharts.vue'),
  },
  props: {
    functionInfo: {
      type: Object,
      default: () => {
        return {}
      },
    },
    tabIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      show: true,
      details: {},
      picComponents: ['PicMarkdown', 'PicEcharts', 'PicEcharts'],
    }
  },
  watch: {
    functionInfo: {
      handler(newval, oldval) {
        this._.delay(() => {
          this.details = newval
        }, 500)
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    jumpToPage() {
      this.$store.commit('setTitle', this.details.title)
      this.$router.push({
        name: 'functionPages-blogPage',
        params: {},
      })
    },
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
.cover-pic {
  width: 100%;
  height: 100%;
}
.function-info {
  position: relative;
  .function-title {
    margin-bottom: 12px;
  }
  .link-to-page {
    text-decoration-line: none;
    position: absolute;
    cursor: pointer;
    bottom: 24px;
    right: 12px;
  }
  .link-to-page:hover {
    color: #1890ff;
  }
}
</style>
