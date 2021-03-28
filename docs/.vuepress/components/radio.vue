<template>
  <div :id="name" class="radio-group">{{title}}：
    <label v-for="(it, idx) in list"
      :key="idx"
    >
      <input :name="name"
        type="radio"
        :value="it.value"
        :checked="idx === 0 ? true : ''"
        :disabled="it.disabled"
      /> {{it.key}}
    </label>
  </div>
</template>

<script>
export default {
  name: 'radio',
  props: {
    name: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: []
    }
  },
  mounted() {
    const radioes = document.getElementById(this.name)
    radioes.addEventListener('click', e => {
      const target = e.target
      if (target.tagName.toLowerCase() === 'input') {
        this.$emit('change', target.value)
      }
    })
  }
}
</script>

<style scoped>
.radio-group {
  margin: 6px 0;
}
label {
  cursor: pointer;
}
</style>