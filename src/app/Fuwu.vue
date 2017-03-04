<template>
  <div class="hello">
    <NavBar title="服务">
      <Btn icon="add" style="right:5px;" @click="gotoNext"></Btn>
    </NavBar>
  </div>
</template>
<script>
  import NavBar from '../com/NavBar'
  import Back from '../com/Back'
  import Btn from '../com/Btn'
  var Hello = {
    data() {
      return {

      }
    },
    components: {
      NavBar,
      Back,
      Btn
    },
    methods: {
      back() {
        nav.pop()
      },
      gotoNext() {
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
