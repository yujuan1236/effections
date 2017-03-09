// 自动获取焦点
(function(angular){
    // 创建模块 
    var app = angular.module('moviecat.auto-active',[]);

    // 创建指令
    app.directive('autoActive',['$location',function($location){
        return {
            link:function(scope,element,attributes){
                // element.on('click',function(){
                //    element.parent().children().removeClass('active');
                //    element.addClass('active'); 
                // }); 
                // 监听锚点值的变化
                scope.location=$location;
                scope.$watch('location.url()',function(now,old){
                    var aLink = element.children().attr('href').substr(1);
                    // startsWith判断一个字符串是否包含另一个字符串
                    if(now.startsWith(aLink)){
                    element.parent().children().removeClass('active');
                    element.addClass('active'); 
                    }
                })
            }
        };
    }]);
})(angular)