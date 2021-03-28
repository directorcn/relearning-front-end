<template>
  <div class="wrapper center" style="flex-direction: column;">
    <div class="margin center">
      <div class="border center">
        <div class="padding center">
          <div class="content">
            <div class="pos-con">content-box: width</div>
          </div>
        </div>
        <div class="pos-bord">border-box: width</div>
      </div>
    </div>
    <div class="legend">
      <span class="con-legend">content</span>
      <span class="pad-legend">padding</span>
      <span class="bord-legend">border</span>
      <span class="marg-legend">margin</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'box-model'
}
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper {
  font-size: 24px;
}
.content {
  width: 150px;
  height: 100px;
  background: rgb(140, 182, 192);
  color:white;
  line-height: 100px;
  text-align: center;
  position: relative;
}
.pos-con {
  width: 148px;
  height: 20px;
  position: absolute;
  bottom: -20px;
  border-left: 1px solid orangered;
  border-right: 1px solid orangered;
  font-size: 14px;
  color: orangered;
  line-height: 20px;
}
.padding {
  width: 250px;
  height: 200px;
  background: rgb(195, 208, 139);
  border: 1px dashed rgb(195, 208, 139);
}
.border {
  width: 300px;
  height: 250px;
  background: rgb(253, 221, 155);
  position: relative;
}
.pos-bord {
  position: absolute;
  width: 298px;
  height: 20px;
  bottom: -20px;
  font-size: 18px;
  text-align: center;
  line-height: 30px;
  border-left: 1px solid #333;
  border-right: 1px solid #333;
}
.margin {
  width: 360px;
  height: 310px;
  background: rgb(249, 204, 157);
}
.legend {
  margin-top: 30px;
}
.legend  span{
  margin-right: 30px;
}
.legend span::before{
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 4px;
  vertical-align: middle;
}
.con-legend::before {
  background: rgb(140, 182, 192);
}
.pad-legend::before {
  background: rgb(195, 208, 139);
}
.bord-legend::before {
  background: rgb(249, 204, 157);
}
.marg-legend::before {
  background: rgb(253, 221, 155);
}
</style>
