<template>
  <div class="hello" :style="{backgroundColor:color}">
    <button style="float:right" @click="gotoNext">下一页</button>
    <button @click="back">返回</button>
    <h1>{{msg}}</h1>
  </div>
</template>
<script>
  var counter = 0
  var getRandomColor = function () {
    var str = '#'
    for (var i = 0; i < 6; i++) {
      str += '0123456789abcdef'[Math.floor(Math.random() * 16)]
    }
    return str
  }
  var Hello = {
    name: 'hello',
    data () {
      return {
        msg: counter++,
        color: getRandomColor()
      }
    },
    methods: {
      back () {
        nav.pop()
      },
      gotoNext () {
        nav.push(Hello)
      }
    }
  }
  export default Hello

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    font-size: 10em;
    text-align: center;
  }

  button {
    padding: 15px;
    font-size: 18px;
    margin: 15px;
  }

</style>
