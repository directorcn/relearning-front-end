<template>
<div class="wrapper">
  <div class="container">
    <div class="level">领域知识</div>
    <div class="level">前端知识</div>
    <div class="skill">
      <div>编程能力</div>
      <div>架构能力</div>
      <div>工程能力</div>
    </div>
  </div>
  <div class="bar">
    <div>实践中学习</div>
    <div>构建知识体系</div>
    <div>刻意练习</div>
  </div>
</div>
  
</template>

<script>
export default {
  name: 'skill-model',
}
</script>

<style scoped>
.wrapper {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.container {
  width: 80%;
  height: 260px;
  padding: 14px;
  box-sizing: border-box;
  outline: 1px dashed orange;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;
  font-size: 22px;
}
.level {
  width: 100%;
  height: 60px;
  background: orange;
  text-align: center;
  line-height: 60px;
}
.skill {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.skill > div {
  width: 30%;
  height: 60px;
  background: orange;
  text-align: center;
  line-height: 60px;
}
.bar {
  width: 20%;
  height: 260px;
  padding: 14px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.bar > div {
  height: 60px;
  line-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
