<template>
  <div>
    <p v-if="showText" class="text" :style="{ fontSize: textSize + 'px' }">
      {{ loadText }}
    </p>
    <div v-else ref="welcome" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
export default {
  name: 'WelcomeComp',
  props: {
    loadText: {
      type: String,
      default: 'Blog',
    },
    textSize: {
      type: Number,
      default: 80,
    },
  },
  data() {
    const option = {
      graphic: {
        elements: [
          {
            type: 'text',
            left: 'center',
            top: 'center',
            style: {
              text: this.loadText,
              fontSize: 80,
              fontWeight: 'bold',
              lineDash: [0, 200],
              lineDashOffset: 0,
              fill: 'transparent',
              stroke: '#000',
              lineWidth: 1,
            },
            keyframeAnimation: {
              duration: 3000,
              loop: false,
              keyframes: [
                {
                  percent: 0.7,
                  style: {
                    fill: 'transparent',
                    lineDashOffset: 200,
                    lineDash: [200, 0],
                  },
                },
                {
                  // Stop for a while.
                  percent: 0.8,
                  style: {
                    fill: 'transparent',
                  },
                },
                {
                  percent: 1,
                  style: {
                    fill: 'black',
                  },
                },
              ],
            },
          },
        ],
      },
    }
    return {
      option,
      showText: false,
    }
  },
  mounted() {
    this.initComp()
    setTimeout(() => {
      this.showText = true
    }, 3000)
  },
  methods: {
    initComp() {
      this.$echarts.init(this.$refs.welcome).setOption(this.option)
    },
  },
}
</script>

<style scoped lang="less">
.text {
  text-align: center;
  font-weight: bold;
  position: relative;
  top: 4px;
}
</style>
