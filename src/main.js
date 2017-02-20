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
class Navigator {

  constructor(el) {
    this.element = el
    this.views = []
    var hammertime = new Hammer(el, {})
    hammertime.on('panright', function (ev) {
      console.log(ev)
    });
  }
  push(obj) {
    var views = this.views
    var div = document.createElement('div')
    div.className = 'x-page x-page-current'
    var vm = new Vue(obj)
    vm.$mount()
    vm.msg = counter++
      vm.color = getRandomColor()
    div.appendChild(vm.$el)
    var $newView = $(div);

    var end = 0

    function onEnd() {
      if (end === 2) {
        $newView.removeClass('pt-page-moveFromRight')
        $newView.children('.x-mask').remove()
        preViews.removeClass('x-page-current')
        preViews.removeClass('pt-page-moveToLeft')
        // preViews.css('transform','translateX(-50%)')
      }

    }

    //如果是第一个view就不增加动画也没有mask

    if (views.length > 0) {
      var mask = document.createElement('div')
      mask.className = 'x-mask'
      div.appendChild(mask)
      $newView.on('animationend', function () {
        end++
        onEnd()
        $newView.off('animationend')

      })
      $newView.addClass('pt-page-moveFromRight')
      var preViews = $(views[views.length - 1])
      preViews.addClass('pt-page-moveToLeft')
      preViews.on('animationend', function () {
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
      current.off('animationend')
      end++
      onEnd()
    })
    current.addClass('pt-page-moveToRight')
    var preViews = $(views[views.length - 1])


    preViews.addClass('x-page-current pt-page-moveFromLeft')
    // preViews.addClass('x-page-current')
    preViews.on('animationend', function () {
      end++
      onEnd()
      //  preViews.css('transform','translateX(0%)')
      preViews.off('animationend')
    })
  }
}
window.nav = new Navigator(document.getElementById('app'))
nav.push(App)
