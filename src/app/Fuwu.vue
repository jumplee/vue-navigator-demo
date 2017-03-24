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
        <div class="my-list">
          <div class="list-item" v-for="item in ListData">
            {{item.name}}
          </div>
        </div>
      </scroller>
    </div>

  </div>
</template>
<script>
let counter = 0
function buildData(){
  const t = []
  for(let i = 0; i < 10; i++){
    counter++
    t.push({
      name: '临时数据' + counter
    })
  }
  return t
}
import scroller from 'vue-scroller'
var Hello = {
  data(){
    return {
      ListData: buildData()
    }
  },
  components: {
    scroller
  },
  methods: {
    back(){
      nav.pop()
    },
    gotoNext(){
      nav.push(Hello)
    },
    refresh(...args){
      const self = this

      setTimeout(() => {
        self.ListData = self.ListData.concat(buildData())
        self.$refs.my_scroller.finishPullToRefresh()
      }, 1000)
    },
    infinite(...args){
      const self = this
      setTimeout(() => {
        if(counter > 100){
          self.$refs.my_scroller.finishInfinite(true)
        }else{
          self.ListData = self.ListData.concat(buildData())
          self.$refs.my_scroller.finishInfinite()
        }
      }, 1500)
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
  .list-item{
    padding:15px;
    border-bottom:1px solid #eee;
  }
</style>
