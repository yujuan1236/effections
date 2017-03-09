// 创建一个jsonp服务
(function(angular){
    // 创建模块
    var app = angular.module('moviecat.myjsonp',[]);
    // 创建服务
    app.service('MyJsonp',['$window',function($window){
        this.jsonp=function crossDomain(url,arg,fn){
            //{name:1,age:2}
            // 1.拼接地址
            var queryString = '';
            //?name=1&age=2
            for(var key in arg){
                queryString+= key+'='+arg[key]+'&'
            }
            url +='?'+queryString;
            //创建一个有名字的回调函数
            var callbackName="jsonp_"+Math.random().toString().substr(2);
            $window[callbackName]=function(data){
                fn(data);
            }
            url +='callback='+callbackName;
            // 2.创建script标签，并设置src属性
            var scriptElement = $window.document.createElement('script');
            scriptElement.src=url;
            $window.document.body.appendChild(scriptElement);
        }
    }])
})(angular)