<template>
    <div class="x-btn" :class="{'x-btn-pressed' : pressed}"
    @click="onClick"
     @touchstart="onTouch" @touchend="onTouchEnd">
     <template v-if="icon">
       <i class="x-btn_icon iconfont" :class="['icon-'+icon]"></i>
     </template>
     <span class="x-btn_text"> <slot></slot></span>

    </div>
</template>

<script>
  export default {
    props: [
      'icon'
    ],
    data() {
      return {
        pressed: false
      }
    },
    methods: {
      onTouch() {
        this.pressed = true
      },
      onTouchEnd() {
        this.pressed = false
      },
      onClick() {
        this.$emit('click')
      }
    }
  }

</script>
<style lang="scss">
$btn-color:#333;

.x-btn{
  color:$btn-color;
  padding:8px;
  display: inline-block;


}
.x-btn.x-btn-pressed{
  color:lighten($btn-color, 30%);
}
.x-btn_icon{
    font-size: 20px;

  &.icon-back{
    // position: relative;
    // top: 2px;
  }
}
.x-btn_text{
    display: inline-block;
    font-size:18px;
    position: relative;
    top: -1px;
}
</style>
