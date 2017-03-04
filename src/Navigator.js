/*  global Modernizr */
import Vue from 'vue'
import Hammer from 'hammerjs'
require('./util/modernizr-custom')
Array.prototype.last = function() {
  return this[this.length - 1]
}

var animEndEventNames = {
  'WebkitAnimation': 'webkitAnimationEnd',
  'OAnimation': 'oAnimationEnd',
  'msAnimation': 'MSAnimationEnd',
  'animation': 'animationend'
}
var animEndEventName = animEndEventNames[Modernizr.prefixed('animation')]
export default class Navigator {

  constructor(el) {
    var self = this
    self.element = el
    self.views = []
    // vue组件列表
    self.vms = []
    self.panFromLeft = false
    self.isPanAnimationEnd = true
    self.holdTime = 500
    self._lastPopOrPushTime = 0
    var hammer = new Hammer.Manager(el)
    self.hammer = hammer
    hammer.add(new Hammer.Pan({
      direction: Hammer.DIRECTION_HORIZONTAL,
      threshold: 10
    }))
    hammer.on('panstart', Hammer.bindFn(this.onPanStart, this))
    hammer.on('panmove', Hammer.bindFn(this.onPan, this))
    hammer.on('panend pancancel', Hammer.bindFn(this.onPanEnd, this))
  }

  onPanStart(ev) {
    // 每一次panstart都初始化一次,保证panFromLeft默认是false
    this.panFromLeft = false
    // 如果不是单个手指操作，直接不响应
    if (ev.pointers.length !== 1) {
      return false
    }

    var x = ev.pointers[0].x || ev.pointers[0].screenX
    console.log('pan start---' + this.panFromLeft)
    // 如果动画没有执行完,不接受任何新的手势逻辑
    if (!this.isPanAnimationEnd) {
      console.log('pan动画没有执行完')
      return false
    }

    // 左侧小于50范围内可以拖拽，且第一屏页面不需要处理
    if (this.views.length > 1 && x < 50) {
      this.panFromLeft = true
      var beforeView = this.views[this.views.length - 2]
      beforeView.classList.add('x-page-current')
      beforeView.style.transform = 'translateX(-100px)'
    }
    console.log('pan start-end--' + this.panFromLeft)
  }
  onPan(ev) {
    console.log('paning --' + this.panFromLeft)
    if (this.panFromLeft) {
      var delta = ev.deltaX
      var beforeViewDelta = ((delta / 3) - 100)
      if (beforeViewDelta > 0) {
        beforeViewDelta = 0
      }
      var views = this.views
      var viewsLen = views.length
      var currentView = views.last()
      var beforeView = views[viewsLen - 2]
      currentView.style.transform = 'translateX(' + delta + 'px)'
      beforeView.style.transform = 'translateX(' + beforeViewDelta + 'px)'
    }
  }

  onPanEnd(ev) {
    var self = this
    console.log('panend --' + this.panFromLeft)
    if (self.panFromLeft) {
      var delta = ev.deltaX
      var percent = delta * 100 / document.body.clientWidth
      var views = self.views
      var viewsLen = views.length
      var currentView = views.last()
      var beforeView = views[viewsLen - 2]

      currentView.classList.add('anim')
      beforeView.classList.add('anim')
      self.isPanAnimationEnd = false

      function onEnd() {
        console.log('emit from pan end')
        currentView.classList.remove('anim')
        beforeView.classList.remove('anim')
        // 执行pop操作
        if (ev.type === 'panend' && percent > 30) {
          self.onPop()
        }
        self.isPanAnimationEnd = true
      }
      // --- 逻辑执行区域

      // 如果是panend且需要换页
      if (ev.type === 'panend' && percent > 30) {
        currentView.style.transform = 'translateX(100%)'
        beforeView.style.transform = 'translateX(0px)'
      } else {
        // 取消pan或者移动小于百分之30恢复原状
        currentView.style.transform = 'translateX(0)'
        beforeView.style.transform = 'translateX(-100px)'
      }
      setTimeout(onEnd, 500)
    }
  }
  // 避免重复处罚
  push(obj) {
    var now = new Date().getTime()
    if (now - this.holdTime > this._lastPopOrPushTime) {
      this._push.apply(this, arguments)
      this._lastPopOrPushTime = now
    } else {
      console.log('push间隔时间太短')
    }
  }
  pop(num) {
    var now = new Date().getTime()
    if (now - this.holdTime > this._lastPopOrPushTime) {
      this._pop.apply(this, arguments)
      this._lastPopOrPushTime = now
    } else {
      console.log('pop间隔时间太短，可以使用pop(n)来执行多个pop')
    }
  }
  _push(obj) {
    var self = this
    var views = self.views
    var vm = new Vue(obj)
    var className = 'x-page x-page-current'
    var newView = document.createElement('div')
    var preview = views[views.length - 1]
    newView.className = 'x-page'
    vm.$mount()

    newView.appendChild(vm.$el)

    var end = 0

    function onEnd() {
      if (end === 2) {
        newView.classList.remove('pt-page-moveFromRight')
        newView.removeChild(newView.querySelector('.x-mask'))
        preview.classList.remove('x-page-current')
        preview.classList.remove('pt-page-moveToLeft')
        self.isPanAnimationEnd = true
      }
    }

    function newViewAnimEnd() {
      newView.removeEventListener(animEndEventName, newViewAnimEnd)
      console.log('push1')
      end++
      onEnd()
    }

    function preViewAnimEnd() {
      preview.removeEventListener(animEndEventName, preViewAnimEnd)
      console.log('push2')
      end++
      onEnd()
    }

    // 如果是第一个view，就不增加动画也没有mask
    if (views.length > 0) {
      var mask = document.createElement('div')
      mask.className = 'x-mask'
      newView.appendChild(mask)
      newView.addEventListener(animEndEventName, newViewAnimEnd)
      preview.addEventListener(animEndEventName, preViewAnimEnd)
      // 解决safari上的白屏问题
      setTimeout(function() {
        newView.className = className + ' pt-page-moveFromRight'
        preview.classList.add('pt-page-moveToLeft')
      }, 10)
    } else {
      newView.className = className
    }
    // 需要在最后执行
    views.push(newView)
    this.vms.push(vm)
    this.element.appendChild(newView)
  }
  onPop() {
    var views = this.views
    var current = views.pop()
    var preView = views[views.length - 1]
    preView.classList.remove('pt-page-moveFromLeft')

    // 销毁老的组件,避免内存问题
    this.vms.pop().$destroy()
    this.element.removeChild(current)
  }
  _pop(num) {
    console.log(new Date().getTime())
    var views = this.views
    var ctrl = this
    var preView = views[views.length - 2]
    var current = views[views.length - 1]

    // 没有那么多view就不执行pop
    if (views.length < 2 || views.length <= num) {
      console.log('pop的数量过多')
      return false
    }
    var end = 0

    function onEnd() {
      if (end === 2) {
        ctrl.onPop()
      }
    }

    function currentAnimEnd() {
      console.log('pop1')
      current.removeEventListener(animEndEventName, currentAnimEnd)
      end++
      onEnd()
    }

    function preViewAnimEnd() {
      console.log('pop2')
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
    preView.classList.add('x-page-current')
    preView.classList.add('pt-page-moveFromLeft')
  }
}

