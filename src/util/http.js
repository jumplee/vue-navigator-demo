if (typeof Promise === 'undefined'){
  require.ensure('es6-promise', function(require){
    require('es6-promise').polyfill()
  })
}

if (typeof fetch === 'undefined' || true){
  require.ensure([], function(require){
    require('whatwg-fetch')
  })
} else {

}
export default class http{
  constructor(baseUrl){
    this.baseUrl = baseUrl
  }
  getUrl(url){
    return this.baseUrl + url
  }
  fetch(url, options){
    var defaultOptions = {
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }
    var param = options.param
    var method = options.method
    url = this.getUrl(url)
    if (method === 'GET' || !method){
      var tmpArray = []
      for (var key in param){
        // tmpArray.push(key + '=' + param[key])
        tmpArray.push(encodeURIComponent(key) + '=' + encodeURIComponent(param[key]))
      }
      url = url + '?' + tmpArray.join('&')
    }
    if (method === 'POST'){
      var formData = new FormData()
      for (key in param){
        formData.append(key, param[key])
      }
      options.body = formData
    }
    var opts = Object.assign(defaultOptions, options)
    return fetch(url, opts).then(function(response){
      if (response.status === 200){

      }
      return response.json()
    }, function(error){
      console.log(error)
    })
  }
  get(url, param = {}){
    return this.fetch(url, {
      method: 'GET',
      param: param
    })
  }
  post(url, param = {}){
    return this.fetch(url, {
      method: 'POST',
      param: param
    })
  }
}
