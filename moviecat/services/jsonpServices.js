(function(angular){
  // 1.创建模块
  var app = angular.module('myJsonpService', [])

  // 2.创建服务
  app.service('MyService',['$window',function($window){
    this.jsonp = function(url, arg, fn){
        // 1.创建script标签
        var scrip = $window.document.createElement('script')
        // 2.设置src属性值
        // 2.1 拼接url及arg
        // arg {}  ?a=b&c=22
        var querystring = ''
        for(var key in arg){
          querystring += key+'='+ arg[key] +'&'
        }
        var funcName = 'myJsonp'+ $window.Math.random().toString().substr(2)    // 0.232
        url += '?' + querystring +'callback='+funcName
        

        $window[funcName] = function(data){
          fn(data)
        }
        // window.testFunc = function(data){
        //    // 2.5 当前数据返回时，调用 fn
        //   fn(data)
        // }

        scrip.src = url
       
        // 3.把script标签添加到dom上去
        $window.document.body.appendChild(scrip)
    }
  }])
})(angular)