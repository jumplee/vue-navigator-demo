<template>
  <div class="hello">
    <nav-bar title="服务">
      <btn icon="add" style="right:5px;" @click="gotoNext"></btn>
    </nav-bar>
    <div class="inner">
      <scroller
        :on-refresh="refresh"
        :on-infinite="infinite"
        ref="my_scroller">
        nihao
      </scroller>
    </div>

  </div>
</template>
<script>

  import scroller from 'vue-scroller'
  var Hello = {
    data() {
      return {

      }
    },
    components: {
      scroller
    },
    methods: {
      back() {
        nav.pop()
      },
      gotoNext() {
        nav.push(Hello)
      },
      refresh(...args){
          console.log(args)
      },
      infinite(...args){
        console.log(args)
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
  .inner{
    position: relative;
    flex:1;
    border:1px solid red;
  }
  button {
    padding: 15px;
    font-size: 18px;
    margin: 15px;
  }
</style>
