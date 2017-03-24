<template>
  <div class="x-tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name:'tab-bar',
    components: {

    },
    methods: {

    }
  }

</script>

<style lang="scss">
.x-tab-panels{
  position: relative;
    width: 100%;
    height:100%;
    display: flex;
    flex-flow:column;
}
.x-tab-panel{
  // position: absolute;
  // bottom:60px;
  // top:0;
  // width: 100%;
  overflow: auto;
  flex:1;
  display: flex;
  flex-direction: column;
}
  .x-tab-bar {
    border-top: 1px solid #eee;
    display: flex;
    background: #fafafa;
    width: 100%;
    text-align: center;
    padding:6px 0;
    color: #555555;
  }

  .x-tab-bar_item {
    flex: 1;
  }

  .x-tab-bar_icon {
    font-size: 28px;
  }

  .x-tab-bar_title {
    padding-top:5px;
    font-size:14px;
  }
</style>
