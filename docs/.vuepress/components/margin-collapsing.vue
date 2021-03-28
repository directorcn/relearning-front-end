<template>
  <div class="wrapper">
    <div class="container">
      <div class="block-box"></div>
      <div class="block-box"></div>
      <div class="block-box"></div>
      <div :class="['lightgreen', className, inlineBlock]">
        <div class="block-box"></div>
        <div class="block-box"></div>
      </div>
    </div>
    <radio :title="title1" :name="'overflow'" :list="overflow" @change="changeOverflow" />
    <radio :title="title2" :name="'display'" :list="display" @change="changeDisplay" />
  </div>
</template>

<script>
import radio from './radio'
export default {
  name: 'margin-collapsing',
  data() {
    return {
      className: 'visible',
      inlineBlock: 'block',
      title1: '改变 overflow 属性',
      title2: '改变 display 属性',
      overflow: [
        {
          key: 'visible',
          value: 'visible',
          disabled: false
        },
        {
          key: 'hidden',
          value: 'hidden',
          disabled: false
        }
      ],
      display: [
        {
          key: 'block',
          value: 'block',
          disabled: false
        },
        {
          key: 'inline-block',
          value: 'inline-block',
          disabled: false
        }
      ]
    }
  },
  components: {
    radio,
  },
  methods: {
    changeOverflow(value) {
      this.className = value;
      if (value === 'hidden') {
        this.display[1].disabled = true;
      } else {
        this.display[1].disabled = false;
      }
    },
    changeDisplay(value) {
      this.inlineBlock = value;
      if (value === 'inline-block') {
        this.overflow[1].disabled = true;
      } else {
        this.overflow[1].disabled = false;
      }
    }
  }
}
</script>

<style scoped>
.container {
  outline: 1px solid lightskyblue;
  overflow: hidden;
}
.block-box {
  width: 50px;
  height: 50px;
  margin: 20px;
  background: lightskyblue;
}
.visible {
  overflow: visible;
}
.hidden {
  overflow: hidden;
}
.lightgreen {
  background: lightgreen;
}
.inline-block {
  display: inline-block;
}
</style>