<template>
  <div class="x-nav-bar">
    <template v-if="title">
      <div class="x-nav-bar_title">{{title}}</div>
    </template>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'nav-bar',
    props: [
      'title'
    ]
  }
</script>
<style lang="scss">
$height:48px;
.x-nav-bar{
  border-bottom:1px solid #eee;
  background: #fafafa;
  height: $height;
  box-sizing:border-box;
  text-align: center;
  //padding-top:env(safe-area-inset-bottom);
  .x-btn{
    position: absolute;
    top:0px;
    height: $height;
    line-height: $height;
    padding: 0 8px;
  }
}
.x-nav-bar_title {
    line-height: $height;
    font-size: 18px;
    display: inline-block;
}
.x-nav-bar_inner{
  position: absolute;
  left:0;
  top:1px;
  width:100%;
}

</style>
