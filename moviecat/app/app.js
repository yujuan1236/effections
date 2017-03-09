(function (angular) {
    // "use strict";

    // start your ride
   // 1.创建一个主模块
   var app = angular.module('moviecat',[
     'moviecat.details',// 先引入就会优先匹配相应的路由规则
    'moviecat.home_page',
    'moviecat.movie_list',
    'moviecat.auto-active',


    // 'moviecat.in_theaters',
    // 'moviecat.coming_soon',
    // 'moviecat.top250'
    ]);
   app.controller('mainController',['$scope','$location'
    ,function($scope,$location){
       $scope.query='';
       $scope.search=function(){
            // 改变的url中的锚点，不用再去发请求.
           $location.url('/search/?q='+$scope.query);
       }
   }]);
})(angular);