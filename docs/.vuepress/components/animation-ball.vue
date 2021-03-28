<template>
  <div class="container">
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'animation-ball'
}
</script>

<style scoped>
@keyframes ball {
  from {
    background: darkgreen;
    width: 100px;
    height: 100px;
    transform: translate(0, 0);
  }
  to {
    background: lightgreen;
    width: 10px;
    height: 10px;
    transform: translate(500px, 45px);
  }
}
.container {
  width: 100%;
  height: 100px;
  border: 1px dashed lightgreen;
  border-radius: 10px;
}
.container > div {
  border-radius: 50%;
  animation: ball 10s infinite;
}
</style>