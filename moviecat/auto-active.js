//创建自定义指令
(function(angular){
  // 1.创建模块
  var app = angular.module('auto-active',[])
  // 2.创建自定义指令

  app.directive('autoActive',['$location',function($location){
    return {
      link: function(scope, element, attributes){
        element.on('click',function(){
          // 让当前元素的兄弟元素失去样式
          element.parent().children().removeClass('active')

          // 让当前元素添加样式
          element.addClass('active')
        })

        scope.loca = $location
        // 监视锚点值变化
        scope.$watch('loca.url()', function(now, old){
          var hash = element.find('a').attr('href').substr(1)
          // startsWith表示一个字符是否以另一个字符开始
          if(now.startsWith(hash)){
           // 让当前元素的兄弟元素失去样式
          element.parent().children().removeClass('active')

          // 让当前元素添加样式
          element.addClass('active')
          }
        })
      }
    }
  }])
})(angular)