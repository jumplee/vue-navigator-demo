// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './Home'
import $ from 'jquery'
import Hammer from 'hammerjs'
var counter = 1;
var getRandomColor = function () {
  var str = '#'
  for (var i = 0; i < 6; i++) {
    str += '0123456789abcdef' [Math.floor(Math.random() * 16)]
  }
  return str
}
Array.prototype.last = function () {
  return this[this.length - 1]
}
class Navigator {

  constructor(el) {
    var self = this
    self.element = el
    self.views = []
    self.panFromLeft = false
    self.isPanAnimationEnd=true
    var hammer = new Hammer.Manager(el)
    self.hammer = hammer
    hammer.add(new Hammer.Pan({
      direction: Hammer.DIRECTION_HORIZONTAL,
      threshold: 10
    }));
    hammer.on('panstart', Hammer.bindFn(this.onPanStart, this))
    hammer.on("panmove", Hammer.bindFn(this.onPan, this));
    hammer.on("panend pancancel", Hammer.bindFn(this.onPanEnd, this));
  }
  onPanStart(ev) {
    //每一次panstart都初始化一次,保证panFromLeft默认是false
    this.panFromLeft = false
    //如果不是单个手指操作，直接不响应
    if(ev.pointers.length !== 1 ){
      return false
    }

    var x = ev.pointers[0].x
    console.log('pan start---' + this.panFromLeft)
    //如果动画没有执行完,不接受任何新的手势逻辑
    if(!this.isPanAnimationEnd){
        console.log('pan动画没有执行完')
        return false
    }
    
    //左侧小于50范围内可以拖拽，且第一屏页面不需要处理
    if (this.views.length>1 && x < 50) {
        this.panFromLeft = true
        var beforeView = this.views[this.views.length - 2]
        $(beforeView).addClass('x-page-current')
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
    var self=this
    console.log('panend --' + this.panFromLeft)
    if (self.panFromLeft) {
      var delta = ev.deltaX
      var percent = delta * 100 / screen.width
      var views = self.views
      var viewsLen = views.length
      var currentView = views.last()
      var beforeView = views[viewsLen - 2]
      var $currentView = $(currentView)
      var $beforeView = $(beforeView)
      $currentView.addClass('anim')
      $beforeView.addClass('anim')
      self.isPanAnimationEnd=false
      var counter = 0
      function onEnd() {
        console.log('emit from pan end')
        $currentView.removeClass('anim')
        $beforeView.removeClass('anim')
        if (ev.type == 'panend' && percent > 30) {
          $currentView.remove()
          views.pop()
        }
        self.isPanAnimationEnd=true
      }
      //--- 逻辑执行区域

      //如果是panend且需要换页
      if (ev.type == 'panend' && percent > 30) {
        currentView.style.transform = 'translateX(100%)'
        beforeView.style.transform = 'translateX(0px)'
      } else {
        //取消pan或者移动小于百分之30恢复原状
        currentView.style.transform = 'translateX(0)'
        beforeView.style.transform = 'translateX(-100px)'
      }
      setTimeout(onEnd, 500)
    }
   
  }
  push(obj) {
    var self=this, views = self.views,vm = new Vue(obj),
    div = document.createElement('div')
    div.className = 'x-page x-page-current'
    vm.$mount()
    vm.msg = counter++
    vm.color = getRandomColor()
    div.appendChild(vm.$el)
    var $newView = $(div);
    self.isPanAnimationEnd=false
    var end = 0

    function onEnd() {
      if (end === 2) {
        $newView.removeClass('pt-page-moveFromRight')
        $newView.children('.x-mask').remove()
        preViews.removeClass('x-page-current')
        preViews.removeClass('pt-page-moveToLeft')
        self.isPanAnimationEnd=true
      }

    }

    //如果是第一个view就不增加动画也没有mask

    if (views.length > 0) {
      var mask = document.createElement('div')
      mask.className = 'x-mask'
      div.appendChild(mask)
      $newView.on('animationend', function () {
        console.log('push1')
        end++
        onEnd()
        $newView.off('animationend')

      })
      
      $newView.addClass('pt-page-moveFromRight')
      var preViews = $(views[views.length - 1])
      preViews.addClass('pt-page-moveToLeft')
      preViews.on('animationend', function () {
        console.log('push2')
        end++
        onEnd()
        preViews.off('animationend')
      })
    }
    //需要在最后执行
    views.push(div)
    this.element.appendChild(div)
  }
  pop(num) {
    var views = this.views
    //只有一个view就不能pop了
    if (views.length < 2) {
      return false;
    }
    var end = 0;

    function onEnd() {
      if (end === 2) {
        current.remove();
        preViews.removeClass('pt-page-moveFromLeft')

      }

    }
    var current = $(views.pop())
    current.on('animationend', function () {
      console.log('pop1')
      current.off('animationend')
      end++
      onEnd()
    })
    current.addClass('pt-page-moveToRight')
    var preViews = $(views[views.length - 1])
    preViews.addClass('x-page-current pt-page-moveFromLeft')
    preViews.on('animationend', function () {
      end++
      onEnd()
      console.log('pop2')
      preViews.off('animationend')
    })
  }
}
window.nav = new Navigator(document.getElementById('app'))
nav.push(App)
