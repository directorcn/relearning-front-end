<template>
  <iframe :src="source" :height="height" scrolling="no" frameborder="0" id="main"></iframe>
</template>

<script>
export default {
  name: 'view-frame',
  props: {
    source: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 500
    }
  }
}
</script>

<style scoped>
  #main {
    width: 100%;
  }
</style>
