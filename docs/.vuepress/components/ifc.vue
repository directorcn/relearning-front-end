<template>
  <div>
    <div style="font-size: 44px; line-height: 100px; background-color: lightgreen; margin: 20px 0;">
      <div class="base" :style="{verticalAlign: vertical}">
        <div style="width: 740px; height: 2px; background-color: orange;"></div>
      </div>
      <div class="base" :style="{verticalAlign: boxesVertical}" v-if="type === '2' && isShow === 'visible'">
        <div style="width: 740px; height: 2px; background-color: orangered;"></div>
      </div>
      Hello <div class="text" :style="{verticalAlign: vertical}" v-text="text" v-show="type === '1'"></div>
      <div class="box" v-show="type === '2' && visiblity === 'visible'" :style="{verticalAlign: vertical}"></div>
      <div class="boxes" v-show="type === '2' && isShow === 'visible'" :style="{verticalAlign: boxesVertical}"></div>
    </div>
    <div class="radio-group marg"
      v-if="type === '1' "
    >改变 World 的 vertical-align属性 
      <label v-for="(it, idx) in baseList" :key="it.key">
        <input name="vertical" type="radio" :value="it.value" :checked="idx === 0 ? true : ''"> {{it.key}}
      </label>
    </div>
    <div class="radioes marg" v-if="type === '2'">显示 height 为 300px 的行盒 <span class="orange"></span> 
      <label v-for="(val, idx) in visibleList" :key="idx">
        <input name="visiblity" type="radio" :value="val" :checked="idx === 0 ? true : ''"> {{val}}
      </label>
    </div>
    <div class="vertical-radioes marg" v-if="type === '2'">改变 <span class="orange"></span> baseline 
      <label v-for="(val, idx) in baselineList" :key="idx">
        <input name="vertical-1" type="radio" :value="val" :checked="idx === 0 ? true : ''"> {{val}}
      </label>
    </div>
    <div class="radioes marg" v-if="type === '2'">显示 height 为 200px 的行盒 <span class="orangered"></span> 
      <label v-for="(val, idx) in visibleList" :key="idx">
        <input name="visiblity-2" type="radio" :value="val" :checked="idx === 0 ? true : ''"> {{val}}
      </label>
    </div>
    <div class="vertical-radioes marg" v-if="type === '2'">改变 <span class="orangered"></span> baseline 
      <label v-for="(val, idx) in baselineList" :key="idx">
        <input name="vertical-2" type="radio" :value="val" :checked="idx === 0 ? true : ''"> {{val}}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ifc',
  data() {
    return {
      vertical: 'baseline',
      boxesVertical: 'baseline',
      text: ' World!',
      visiblity: 'hidden',
      isShow: 'hidden',
      visibleList: [ 'hidden', 'visible' ],
      baselineList: [ 'baseline', 'top', 'middle', 'bottom' ],
      baseList: [
        { key: 'baseline', value: 'baseline' },
        { key: 'top', value: 'top' },
        { key: 'middle', value: 'middle' },
        { key: 'bottom', value: 'bottom' },
        { key: '无文本', value: 'noText' }
      ],
    }
  },
  props: {
    type: {
      type: String,
      default: '1'
    }
  },
  mounted() {
    const group = document.getElementsByClassName('radio-group')[0]
    const radioes = document.getElementsByClassName('radioes')[0]
    const vertical = document.getElementsByClassName('vertical-radioes')[0]
    const orangeredBox = document.getElementsByClassName('radioes')[1]
    const verticalRadioes = document.getElementsByClassName('vertical-radioes')[1]

    group.addEventListener('click', e => {
      const target = e.target
      if (target.tagName.toLowerCase() === 'input' && this.type === '1') {
        if (target.value === 'noText') {
          this.vertical = 'baseline'
          this.text = ''
        } else {
          this.vertical = target.value
         this.text = ' World!'
        }
      }
    })
    this.handlerChange(radioes, 'visiblity', '2')
    this.handlerChange(vertical, 'vertical', '2')
    this.handlerChange(orangeredBox, 'isShow', '2')
    this.handlerChange(verticalRadioes, 'boxesVertical', '2')
  },
  methods: {
    handlerChange(selector, key, type) {
      selector.addEventListener('click', e => {
        const target = e.target;
        if (target.tagName.toLowerCase() === 'input' && this.type === type) {
          this[key] = target.value;
        }
      })
    }
  }
}
</script>

<style scoped>
.base {
  overflow: visible;
  display: inline-block;
  width: 1px;
  height: 1px;
}
.text {
  display: inline-block;
  background: aqua;
  width: 100px;
  height: 100px;
  line-height: 70px;
}
label {
  cursor: pointer;;
}
.box {
  display: inline-block;
  width: 100px;
  height: 300px;
  background: orange;
}
.boxes {
  display: inline-block;
  width: 100px;
  height: 200px;
  background: orangered;
}
.orange {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: orange;
}
.orangered {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: orangered;
}
.marg {
  margin: 6px 0;
}
</style>
