<template>
  <body ref="container" class="body-size mask" :style="{ '--blurPx': blurPx }">
    <welcome-comp
      ref="welcome"
      class="welcome"
      :style="welcomePos"
      load-text="Testing Text"
      :text-size="textSize"
    />
    <transition enter-active-class="animate__slideInLeft">
    <nav v-if="showNav" class="navigation animate__animated animate__faster">
      <div v-for="tab in tabs" :key="tab.title" class="items">{{tab.title}}</div>
    </nav>
    </transition>
    <!-- there are main funcitons in this site -->
    <section class="functions">
      <transition
        mode="out-in"
        :enter-active-class="inAction"
        :leave-active-class="outAction"
      >
        <func-sections
          v-if="scrollProgress >= 1000"
          :key="showTabNumber"
          class="func-module animate__animated animate__faster"
          style="width: 80%"
        />
      </transition>
    </section>
  </body>
</template>

<script>
import welcomeComp from '../components/welcomeComp.vue'
import mockdata from './mockData'
import FuncSections from '@/components/funcSections.vue'
export default {
  name: 'IndexPage',
  components: { welcomeComp, FuncSections },
  data() {
    const offsetX = 0
    const offsetY = 0
    const welcomePos = {
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%)',
    }
    return {
      welcomePos,
      offsetX,
      offsetY,
      freeze: false,
      toTop: 0,
      toLeft: 0,
      scrollProgress: 0, // 滑动组件进度的百分比，1000为100%
      textSize: 80,
      blurPx: '5px', //  蒙层虚化值
      blurNumber: 5,
      mocks: mockdata,
      tabs: [],
      showTabNumber: 0, //  the index number of controling shown tab
      isRevert: false, // 控制功能模块切换方向是正向还是反向
      inAction: 'animate__fadeInUpBig',
      outAction: 'animate__fadeOutUpBig',
      showNav:false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.addScrollListener()
    }, 3000)
    this.getTabs()
  },
  destroyed() {
    window.removeEventListener(
      'wheel',
      this._.throttle(this.switchTab, 1500, { trailing: false })
    )
  },
  methods: {
    getTabs() {
      this.tabs = this.mocks.funtionTabs
    },
    //  add `scroll` event when DOM ready
    addScrollListener() {
      const welcomeDom = this.$refs.welcome.$el
      this.toTop = parseInt(window.getComputedStyle(welcomeDom).top) - 100
      this.toLeft = parseInt(window.getComputedStyle(welcomeDom).left) - 250
      window.addEventListener('wheel', this.changePos)
    },
    //  function of changing welcome component's postion
    changePos(e) {
      if (this.scrollProgress >= 1000) {
        window.removeEventListener('wheel', this.changePos)
        this.addSwitchEvent()
        this.showNav = true
      }
      let velocity = e.deltaY
      velocity = velocity >= 30 ? 30 : velocity
      const topBase = this.toTop / 1000
      const leftBase = this.toLeft / 1000
      const fontBase = (this.textSize - 24) / 1000
      //  进度<0时，设置freeze变量冻结组件偏移
      this.freeze = !!(this.scrollProgress < 0)
      if (!this.freeze) {
        requestAnimationFrame(this.updatePos)
        if (this.offsetX < this.toLeft && this.offsetY < this.toTop) {
          this.offsetX = this.offsetX + leftBase * velocity
          this.offsetY = this.offsetY + topBase * velocity
        }
        this.textSize = this.textSize - fontBase * velocity
        this.scrollProgress = this.scrollProgress + velocity
        this.changeMask(velocity)
      } else if (velocity > 0) {
        //  组件冻结时，只有正向偏移才会有效
        this.offsetX = this.offsetX + leftBase * velocity
        this.offsetY = this.offsetY + topBase * velocity
        this.scrollProgress = this.scrollProgress + velocity
      }
    },
    //  update welcome's position
    updatePos() {
      this.$set(this.welcomePos, 'left', 'calc(50% - ' + this.offsetX + 'px)')
      this.$set(this.welcomePos, 'top', 'calc(50% - ' + this.offsetY + 'px)')
    },
    // function of changing blur of mask
    changeMask(velocity) {
      this.blurNumber = this.blurNumber - 0.005 * velocity
      this.blurPx = this.blurNumber + 'px'
    },
    // add a 'wheel' event for switching shown tab
    addSwitchEvent() {
      this._.delay(() => {
        window.addEventListener(
          'wheel',
          this._.throttle(this.switchTab, 1500, { trailing: false })
        )
      }, 1000)
    },
    switchTab(e) {
      let dire = e.deltaY
      dire = dire > 0 ? dire : 0
      this.isRevert = Boolean(dire)

      this.inAction = this.isRevert
        ? 'animate__fadeInUpBig'
        : 'animate__fadeInDownBig'
      this.outAction = this.isRevert
        ? 'animate__fadeOutUpBig'
        : 'animate__fadeOutDownBig'

      const max = this.tabs.length - 1
      this.isRevert ? this.showTabNumber++ : this.showTabNumber--
      if (this.showTabNumber > max) {
        this.showTabNumber = 0
      } else if (this.showTabNumber < 0) {
        this.showTabNumber = max
      }
    },
  },
}
</script>
<style scoped lang="less">
.body-size {
  width: 100%;
  height: 100vh;
  overflow: auto;
}
.navigation {
  width: 120px;
  min-height: 500px;
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 30%;
  .items{
    width: 80px;
    height: 60px;
  }
}
.welcome {
  width: 500px;
  height: 100px;
  position: fixed;
  z-index: 10;
}
.mask {
  position: relative;
  background: url('../static/images/lxh.gif') center no-repeat;
  background-color: rgb(247, 249, 251);
  z-index: -10;
}
.mask::after {
  width: 100%;
  height: 100%;
  content: '';
  background: inherit;
  position: absolute;
  left: 0;
  top: 0;
  filter: blur(var(--blurPx));
  z-index: -10;
}
.functions {
  width: 70%;
  height: 100vh;
  margin: 0 auto;
  padding-top: calc((100vh - 480px) / 2);
  box-sizing: border-box;
  .func-module {
    margin: 0 auto 32px;
  }
}
</style>
