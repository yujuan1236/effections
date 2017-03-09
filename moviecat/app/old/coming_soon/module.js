(function(angular){
// 创建正在热模块
 var app = angular.module('moviecat.coming_soon',[
    'ngRoute',
    'moviecat.myjsonp']);

 // 配置路由
 app.config(['$routeProvider',function($routeProvider){
     $routeProvider.when('/coming_soon/:page?',{
        templateUrl:'coming_soon/view.html',
        controller:'coming_soonController'
     });
 }]);

 // 创建控制器
 app.controller('coming_soonController',[
    '$scope','$http','$routeParams','$route','MyJsonp',
    function($scope,$http,$routeParams,$route,MyJsonp){
        console.log($routeParams);
     // $scope.data=
     // 比较推荐使用相对于网站根目录的路径
     // $http.get('/day4/moviecat/app/coming_soon/coming_soon.json').then(function(res){
     //     // 成功的回调函数
     //     console.log(res);
     //     $scope.data=res.data;
     // },function(){
     //     // 失败的回调数据
     // })
     // angular jsonp跨域
     // angular.callbacks._0
     // $http.jsonp('xxx?callback=JSON_CALLBACK').then()
     // 
     // window.angular=angular;
     // console.log(MyJsonp);
     // 使用自己封装的jsonp进行跨域请求

     $scope.pageSize=5;// 每页请求的数据
     $scope.nowPage= ($routeParams.page||"1") - 0;// 当前的页码
     // nowPage 1  ,start 0 ,0,1,2,3,4
     // nowPage 2  ,start 5  ,5,6,7,8,9
     // nowPage 3  ,start 10
    var start = ($scope.nowPage - 1)*$scope.pageSize;
    // console.log(start);
     MyJsonp.jsonp('http://api.douban.com/v2/movie/coming_soon',
        {start:start,count:$scope.pageSize},function(data){
            // angular不能够监视异步操作中对数据模型的改变
            $scope.data=data;  // 10/5, 9/5 ,11/5
            $scope.total=data.total;
            $scope.totalPage=  Math.ceil(data.total/$scope.pageSize);
            $scope.$apply();//在改变数据模型之后调用,强制angular监视数据模型的改变
        });

     $scope.goPage=function(newPage){
        // 防止用户恶意点击
         if(newPage<1||newPage>$scope.totalPage){
            return ;
         }
         $route.updateParams({page:newPage})
     }
 }]);

})(angular)