<template>
  <div class="hello" :style="{backgroundColor:color}">
      
      <button style="float:right" @click="gotoNext">下一页</button>
      <button @click="back">back</button>

        <h1>{{msg}}</h1>
  </div>
</template>

<script>


var hello={
  name: 'hello',
  data () {
    return {
      msg: '',
      color:''
    }
  },
  methods:{
    back(){
      nav.pop()
    },
       gotoNext(){
      nav.push(hello)
    }
  }
}
export default hello
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  font-size:10em;
  text-align: center;
}
button{
  padding:15px;
  font-size:18px;
  margin:15px;
}
</style>
