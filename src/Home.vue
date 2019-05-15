<template>

  <div class="x-tab-panels x-layout-flex">
    <div class="x-inner">
      <div class="x-tab-panel" v-show="currentView==='Index'">
        <Index/>
      </div>
      <div class="x-tab-panel" v-show="currentView==='Fuwu'">
        <Fuwu/>
      </div>
      <div class="x-tab-panel" v-show="currentView==='Cart'">
        <Cart/>
      </div>
      <div class="x-tab-panel" v-show="currentView==='My'">
        <My/>
      </div>
    </div>

    <Tab-bar>
      <div :class="[currentView==='Index' ? 'active': '']" class="x-tab-bar_item" @click="changeView('Index')">
        <i :class="[currentView==='Index' ? 'icon-homefill': 'icon-home']" class="x-tab-bar_icon iconfont"></i>
        <div class="x-tab-bar_title">首页</div>
      </div>
      <div :class="[currentView==='Fuwu' ? 'active': '']" class="x-tab-bar_item" @click="changeView('Fuwu')">
        <i :class="[currentView==='Fuwu' ? 'icon-commentfill': 'icon-comment']" class="x-tab-bar_icon iconfont"></i>
        <div class="x-tab-bar_title">服务</div>
      </div>
      <div :class="[currentView==='Cart' ? 'active': '']" class="x-tab-bar_item" @click="changeView('Cart')">
        <i :class="[currentView==='Cart' ? 'icon-cartfill': 'icon-cart']" class="x-tab-bar_icon iconfont"></i>
        <div class="x-tab-bar_title">购物车</div>
      </div>
      <div :class="[currentView==='My' ? 'active': '']" class="x-tab-bar_item" @click="changeView('My')">
        <i :class="[currentView==='My' ? 'icon-myfill': 'icon-my']" class="x-tab-bar_icon iconfont"></i>
        <div class="x-tab-bar_title">个人中心</div>
      </div>
    </Tab-bar>
  </div>
</template>

<script>
  import Fuwu from './app/Fuwu'
  import My from './app/My'
  import Cart from './app/Cart'
  import Index from './app/Index'
  import TabBar from './com/TabBar'
  export default {
    name: 'app',
    components: {
      Fuwu,
      TabBar,
      Index,
      My,
      Cart
    },
    data() {
      return {
        currentView: 'Index'
      }
    },
    methods: {
      changeView(view) {
        this.currentView = view
      }
    }
  }

</script>

<style lang="scss">
  .x-tab-bar_item.active {
    color: #fc511e;
  }
</style>
