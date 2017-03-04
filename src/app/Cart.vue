<template>
  <div class="hello">
    <NavBar title="购物车">
    </NavBar>
    <div class="cart-list">
      <div class="cart-list-item" v-for="item in goodList">
        <img class="item-img" src="null" alt="">
        <div class="item-content">
            <h2>{{item.name}}</h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import NavBar from '../com/NavBar'
  import Back from '../com/Back'
  import Btn from '../com/Btn'
  var Hello = {
    data() {
      return {
        goodList: [
          {
            name: '小米手机'
          },

          {
            name: '华为'
          },

          {
            name: '大米手机1'
          },

          {
            name: '小米手机'
          },

          {
            name: '华为'
          },

          {
            name: '大米手机1'
          },

          {
            name: '华为'
          },

          {
            name: '大米手机1'
          },

          {
            name: '小米手机'
          },

          {
            name: '华为'
          },

          {
            name: '大米手机1'
          }
        ]
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
  overflow: hidden;
}
.cart-list{
  overflow: auto;
}
</style>
