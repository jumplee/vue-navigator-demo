<template>
  <div class="x-layout-flex">

        <NavBar title="首页"></NavBar>
        <div class="x-inner">
          <div class="x-scroll">
              <h2>{{msg}}</h2>
              <h2>{{msg}}</h2>
                <h2>{{msg}}</h2>
                  <h2>{{msg}}</h2>  <h2>{{msg}}</h2>
                        shouye
            <h2>{{msg}}</h2>
              <h2>{{msg}}</h2>
                <h2>{{msg}}</h2>
                  <h2>{{msg}}</h2>  <h2>{{msg}}</h2>      shouye
            <h2>{{msg}}</h2>
              <h2>{{msg}}</h2>
                <h2>{{msg}}</h2>
                  <h2>{{msg}}</h2>  <h2>{{msg}}</h2>      shouye
            <h2>{{msg}}</h2>
              <h2>{{msg}}</h2>
                <h2>{{msg}}</h2>
                  <h2>{{msg}}</h2>  <h2>{{msg}}</h2>
          </div>

        </div>

  </div>
</template>
<script>
  import NavBar from '../com/NavBar'
  import Back from '../com/Back'
  export default {
    name: 'index',
    components: {
      Back,
      NavBar
    },
    data() {
      return {
        msg: 'ceshi'
      }
    },
    methods: {

    }
  }

</script>
<style scoped>
  .index {
    color: orange;
  }
</style>
