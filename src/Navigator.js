/*  global Modernizr */
import Vue from 'vue'
import Hammer from 'hammerjs'
require('./util/modernizr-custom')

function last(array){
  return array[array.length - 1]
}

function log(){
  console.trace.apply(this, arguments)
}

var animEndEventNames = {
  'WebkitAnimation': 'webkitAnimationEnd',
  'OAnimation': 'oAnimationEnd',
  'msAnimation': 'MSAnimationEnd',
  'animation': 'animationend'
}
var animEndEventName = animEndEventNames[Modernizr.prefixed('animation')]
export default class Navigator{

  constructor(el, options = {}){
    var self = this
    self.element = el
    self.views = []
    // vue组件列表
    self.vms = []
    // 是否支持从左侧拖拽返回
    self.panFromLeft = false
    self.isPanAnimationEnd = true
    self.holdTime = 500
    self._lastPopOrPushTime = 0
    if (options.swipeBack){
      const hammer = new Hammer.Manager(el)
      self.hammer = hammer
      hammer.add(new Hammer.Pan({
        direction: Hammer.DIRECTION_HORIZONTAL,
        threshold: 10
      }))
      hammer.on('panstart', Hammer.bindFn(this.onPanStart, this))
      hammer.on('panmove', Hammer.bindFn(this.onPan, this))
      hammer.on('panend pancancel', Hammer.bindFn(this.onPanEnd, this))
    }
  }

  onPanStart(ev){
    // 每一次panstart都初始化一次,保证panFromLeft默认是false
    this.panFromLeft = false
    // 如果不是单个手指操作，直接不响应
    if (ev.pointers.length !== 1){
      return false
    }

    var x = ev.pointers[0].x || ev.pointers[0].screenX
    log('pan start---' + this.panFromLeft)
    // 如果动画没有执行完,不接受任何新的手势逻辑
    if (!this.isPanAnimationEnd){
      log('pan动画没有执行完')
      return false
    }

    // 第一屏页面不需要处理
    if (this.views.length > 1 &&
      // 左侧小于50范围内才可以拖拽
      x < 50){
      this.panFromLeft = true
    }
  }
  onPan(ev){
    if (!this.panFromLeft){
      return false
    }

    var delta = ev.deltaX
    var beforeViewDelta = 0

    if (delta < 0){
      return
    }
    var views = this.views
    var viewsLen = views.length
    var currentView = last(views)
    var beforeView = views[viewsLen - 2]
    currentView.style.transform = 'translateX(' + delta + 'px)'
    beforeView.style.transform = 'translateX(' + beforeViewDelta + 'px)'
  }

  onPanEnd(ev){
    var self = this
    if(!this.panFromLeft){
      return false
    }
    var delta = ev.deltaX
    var percent = delta * 100 / document.body.clientWidth
    var views = self.views
    var viewsLen = views.length
    var currentView = last(views)
    var beforeView = views[viewsLen - 2]

    if (!beforeView){
      return false
    }
    self.isPanAnimationEnd = false

    function onEnd(){
      log('emit from pan end')
      currentView.className = 'x-page x-page-current'
      beforeView.className = 'x-page'
      // 执行pop操作
      if (ev.type === 'panend' && percent > 30){
        self.onPop()
      }
      self.isPanAnimationEnd = true
    }

    currentView.style.transition = 'transform .3s ease'
    beforeView.style.transition = 'transform .3s ease'
    // 如果是panend且需要换页
    if (ev.type === 'panend' && percent > 30){
      currentView.style.transform = 'translateX(100%)'
      beforeView.style.transform = 'translateX(0px)'
    } else {
      // 取消pan或者移动小于百分之30恢复原状
      currentView.style.transform = 'translateX(0)'
      beforeView.style.transform = 'translateX(-100%)'
    }
    setTimeout(function(){
      onEnd()
    }, 100)
  }

  push(obj){
    // 避免重复触发
    var now = new Date().getTime()
    if (now - this.holdTime > this._lastPopOrPushTime){
      this._push.apply(this, arguments)
      this._lastPopOrPushTime = now
    }
  }
  pop(num){
    // 避免重复触发
    var now = new Date().getTime()
    if (now - this.holdTime > this._lastPopOrPushTime){
      this._pop.apply(this, arguments)
      this._lastPopOrPushTime = now
    }
  }
  _push(obj){
    var self = this
    var views = self.views
    var vm = new Vue(obj)
    var newView = document.createElement('div')
    var preview = views[views.length - 1]
    newView.className = 'x-page x-page-new'
    if (preview){
      preview.className = 'x-page x-page-pre'
    }

    vm.$mount()

    newView.appendChild(vm.$el)

    var end = 0

    function onEnd(){
      if (end === 2){
        newView.removeChild(newView.querySelector('.x-mask'))
        newView.className = 'x-page x-page-current'
        preview.className = 'x-page'
        self.isPanAnimationEnd = true
      }
    }

    function newViewAnimEnd(){
      newView.removeEventListener(animEndEventName, newViewAnimEnd)
      log('push1')
      end++
      onEnd()
    }

    function preViewAnimEnd(){
      preview.removeEventListener(animEndEventName, preViewAnimEnd)
      log('push2')
      end++
      onEnd()
    }

    // 如果是第一个view，就不增加动画也没有mask
    if (views.length > 0){
      var mask = document.createElement('div')
      mask.className = 'x-mask'
      newView.appendChild(mask)
      newView.addEventListener(animEndEventName, newViewAnimEnd)
      preview.addEventListener(animEndEventName, preViewAnimEnd)
      // 解决safari上的白屏问题
      setTimeout(function(){
        newView.classList.add('pt-page-moveFromRight')
        preview.classList.add('pt-page-moveToLeft')
      }, 10)
    } else {
      // 第一次push 只需要增加x-page-current class 就好
      newView.className = 'x-page x-page-current'
    }
    // 需要在最后执行
    views.push(newView)
    this.vms.push(vm)
    this.element.appendChild(newView)
  }
  onPop(){
    var views = this.views
    var current = views.pop()
    // 销毁老的组件,避免内存问题
    this.vms.pop().$destroy()
    this.element.removeChild(current)
  }
  _pop(num){
    log(new Date().getTime())
    var views = this.views
    var ctrl = this
    var preView = views[views.length - 2]
    var current = views[views.length - 1]

    // 没有那么多view就不执行pop
    if (views.length < 2 || views.length <= num){
      log('pop的数量过多')
      return false
    }
    var end = 0

    function onEnd(){
      if (end === 2){
        ctrl.onPop()
      }
    }

    function currentAnimEnd(){
      log('pop1')
      current.removeEventListener(animEndEventName, currentAnimEnd)
      end++
      onEnd()
    }

    function preViewAnimEnd(){
      log('pop2')
      preView.removeEventListener(animEndEventName, preViewAnimEnd)
      preView.removeChild(preView.querySelector('.x-mask'))
      end++
      onEnd()
    }
    current.addEventListener(animEndEventName, currentAnimEnd)
    preView.addEventListener(animEndEventName, preViewAnimEnd)
    current.classList.add('pt-page-moveToRight')

    var mask = document.createElement('div')
    mask.className = 'x-mask'
    preView.appendChild(mask)
    preView.classList.add('x-page-pre')
    preView.classList.add('pt-page-moveFromLeft')
  }
}
