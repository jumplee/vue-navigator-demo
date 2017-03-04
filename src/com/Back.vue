<template>
<div>
  <div :class="{'x-btn-pressed' : pressed,'x-btn-back':true}" @touchstart="onTouch" @touchend="onTouchEnd">
    <slot></slot>
  </div>
</div>
</template>

<script>
  export default {
    name: 'back',
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
      }
    }
  }
</script>
<style>

</style>
