<template>
  <div>
    <div style="outline: 1px dashed #333; height: 300px">
    float: <div :class="['float', list.includes('1') ? 'clear' : '']">1</div>
    文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
    float: <div :class="['float', list.includes('2') ? 'clear' : '']">2</div>
    文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
    float: <div :class="['float', list.includes('3') ? 'clear' : '']">3</div>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字
    </div>
    <div class="checkbox-group">clear float：
      <label><input type="checkbox" value="1" /> 1</label>
      <label><input type="checkbox" value="2" /> 2</label>
      <label><input type="checkbox" value="3" /> 3</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'float',
  data() {
    return {
      list: []
    }
  },
  mounted() {
    const checkboxes = document.getElementsByClassName('checkbox-group')[0]
    checkboxes.addEventListener('click', e => {
      const target = e.target
      const value = target.value
      if (target.tagName.toLowerCase() === 'input') {
        if (!this.list.includes(value)) {
          this.list.push(value)
        } else {
          this.list.splice(this.list.indexOf(value), 1)
        }
      }
    })
  }
}
</script>
<style scoped>
.float {
  width: 100px;
  height: 100px;
  background: lightgreen;
  float: left;
  font-size: 24px;
}
.clear {
  clear: left;
}
.checkbox-group {
  margin: 6px 0;
}
</style>