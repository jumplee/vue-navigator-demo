<template>
  <div class="x-layout-flex">
    <NavBar title="首页">
      <Btn style="left:0;" icon="back" @click="back">返回</Btn>
      <Btn icon="add" style="right:5px;" @click="gotoNext"></btn>
    </NavBar>
    <div class="x-inner">
      <scroll
        :on-refresh="refresh"
        :on-infinite="infinite"
        :enableInfinite="!isNone">
        <div class="my-list">
          <div class="list-item" v-for="item in ListData">
            {{item.name}}
          </div>
        </div>
      </scroll>
    </div>

  </div>
</template>
<script>
  import NavBar from '../com/NavBar'
  import Back from '../com/Back'
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
import Btn from '../com/Btn'
import scroll from '../com/scroll/index'
var Hello = {
  data(){
    return {
      isNone: false,
      ListData: buildData()
    }
  },
  components: {
    scroll,
    Btn,
    NavBar
  },
  methods: {
    back(){
      nav.pop()
    },
    gotoNext(){
      nav.push(Hello)
    },
    refresh(done){
      const self = this

      setTimeout(() => {
        self.ListData = self.ListData.concat(buildData())
        done()
      }, 1000)
    },
    infinite(done){
      const self = this
      setTimeout(() => {
        if(counter > 100){
          self.isNone = true
        }else{
          self.ListData = self.ListData.concat(buildData())
          done()
        }
      }, 1000)
    }
  }
}
export default Hello

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  h1 {
    font-size: 10em;
    text-align: center;
  }
  .inner{
    position: relative;
    flex:1;
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
  .hello{
    height:100%;
  }
</style>
