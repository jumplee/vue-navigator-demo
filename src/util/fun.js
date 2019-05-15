export default {
  platform:function(){
    var u = navigator.userAgent
    var android = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
    var iOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
    return {
      android,
      iOS
    }
  }
}
