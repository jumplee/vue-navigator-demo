<template>
  <div class="hello">
    <NavBar title="个人中心">
      <Btn style="left:0;" icon="back" @click="back">返回</Btn>
      <Btn icon="settings" style="right:5px" @click="gotoNext"></Btn>
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
.hello{
  display: flex;
  flex-flow:column;
}
</style>
