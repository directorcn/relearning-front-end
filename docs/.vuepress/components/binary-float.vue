<template>
  <div class="container">
    <input placeholder="请输入" type="number" v-model="value"/>
    <div class="binary">
      <span v-for="(v, i) of bits"
        :key="i"
      >
        <input
          type="text"
          v-model="bits[i]"
          :class="['square', i > 0 ? 
            i > 11 ? 'fraction' : 'exponent'
            : 'sign']"
        /><input v-if="i === 11"
          type="text"
          value="1"
          class="square"
          disabled
          style="color: #333333;"/>
      </span>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'binary-float',
  data() {
    return {
      value: 0,
      bits: new Array(64).fill(0)
    }
  },
  watch: {
    value: function(value) {
      const bytes = new Uint8Array(8)
      const memory = new Float64Array(bytes.buffer)
      memory[0] = (value)
      for (let i = 0; i < 8; i ++) {
          let byte = bytes[i]
          for (let j = 0; j < 8; j ++) {
              this.bits[(8 - i) * 8 - j - 1] = byte & 1
              byte = byte >> 1
          }
      }
    },
    bits: function(value) {
      const bytes = new Uint8Array(8)
      const memory = new Float64Array(bytes.buffer)
      for (let i = 0; i < 8; i ++) {
        let byte = 0
        for (let j = 0; j < 8; j ++) {
          byte = byte << 1
          byte |= Number(value[i * 8 + j])
        }
        bytes[7 - i] = byte
      }
      this.value = memory[0]
    }
  }
}
</script>

<style>
.container {
  margin: 6px 0;
}
input {
  outline: none;
  margin: 4px 0;
  height: 24px;
}
.square {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid grey;
  vertical-align: middle;
  color: white;
  text-align: center;
  background: lightgray;
}
.sign {
  background: lightblue;
}
.exponent {
  background: lightgreen;
}
.fraction {
  background: lightpink;
}
</style>
