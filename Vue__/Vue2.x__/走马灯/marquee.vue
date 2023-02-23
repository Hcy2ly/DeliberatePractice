<template>
  <div :style="extraStyle.containerStyle">
    <div v-if="randomList && randomList.length > 0" :class="['marquee-wrap']" :style="extraStyle.wrapStyle">
      <div
        v-for="(user, index) in randomList"
        :key="user.nickname"
        :class="marqueeItemCla"
        :style="{
          top: `${getTopPx(index)}`,
          ...extraStyle.itemStyle
        }"
      >
        <img v-if="needAvatar" class="marquee-avatar" :style="extraStyle.avatarStyle" :src="user.avatar">
        <span :style="extraStyle.nickNameStyle">{{ getText(user.nickname) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { requestRandomList } from 'src/api/vest' // 数据接口
/** px转换rem 带后缀 */
const px2RemWithSuffix = (px) => (px * window.screen.width) / 750 + 'px'

// /** px转换rem */
// export const px2Rem = (px) => (px * window.screen.width) / 750

export default {
  name: 'Marquee',

  props: {
    /** 额外样式 */
    extraStyle: {
      type: Object,
      default() {
        return {
          /** 最外层样式 */
          containerStyle: {},
          /** 跑马灯容器样式 */
          wrapStyle: {},
          /** 跑马灯每项样式 */
          itemStyle: {},
          /** 昵称样式 */
          nickNameStyle: {},
          /** 头像样式 */
          avatarStyle: {}
        }
      }
    },
    /** 滚动间隔时间 */
    intervalTime: {
      type: Number,
      default() {
        return 3000
      }
    },
    /** 是否需要头像 */
    needAvatar: {
      type: Boolean,
      default() {
        return false
      }
    },
    /** 文案模版 */
    textTemplate: {
      type: String,
      default() {
        return ''
      }
    },
    /** item是否有特殊样式 */
    itemSpecialClass: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      randomList: [],
      second: 0,
      timer: null,
      animation: false,
      px2RemWithSuffix
    }
  },
  computed: {
    marqueeItemCla() {
      const itemCla = ['marquee-item']
      if (this.itemSpecialClass) {
        itemCla.push(this.itemSpecialClass)
      }
      return itemCla.join(' ')
    }
  },

  created() {
    this.init()
  },

  methods: {
    init() {
      this.fetchRandomList()
    },

    getText(nickname) {
      if (!this.textTemplate) return nickname
      const result = this.textTemplate
      return result.replace(/\*nickname\*/g, nickname)
    },

    getTopPx(index) {
      const height = Number(this.extraStyle.itemStyle.height?.substr(0, this.extraStyle.itemStyle.height.length - 2))

      if (height) {
        return `${height * (index - 1)}px`
      }

      return px2RemWithSuffix(50 * (index - 1))
    },

    async fetchRandomList() {
      const { data } = await requestRandomList()

      this.randomList = data.length > 0 ? data : []

      this.startTimer()
    },

    startTimer() {
      this.timer = setInterval(this.scrollCallback, this.intervalTime || 3000)
    },
    scrollCallback() {
      const item = this.randomList.shift()
      this.randomList.push(item)
    }
  }
}
</script>

<style lang="less" scoped>
.marquee-wrap {
  position: relative;
  height: 50px;
  overflow: hidden;
  transition: all 1s ease-in-out;

  .marquee-item {
    position: absolute;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: inherit;
    height: 50px;
    transition: all 1s ease-in-out;

    &.special {
      &:nth-child(even) span {
        transition: all 1s ease-in-out;
        background: rgba(26, 38, 77, 0.4);
      }

      &:nth-child(odd) span {
        transition: all 1s ease-in-out;
        background: rgba(26, 38, 77, 0.79);
      }

      &:nth-child(1) span {
        background: transparent;
        transition: all 0.5s ease-in-out;
      }
    }

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .marquee-trans {
    transition: top 1s ease-in-out;
  }

  .marquee-avatar {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
}
</style>
