(function(angular){
  // 1.创建模块
  var app = angular.module('details', ['ngRoute','myJsonpService'])

  // 2.配置规则
  app.config(['$routeProvider'
    ,function($routeProvider){
    $routeProvider.when('/details/:id',{
      templateUrl:'./details/details.html',
      controller: 'detailsController'
    })
  }])

  // 3.创建控制器
  app.controller('detailsController',[
    '$scope',
    '$routeParams',
    'MyService'
    ,function($scope,$routeParams,MyService){
    // 获取数据
    MyService.jsonp('http://api.douban.com/v2/movie/subject/'+$routeParams.id,{},function(data){
      $scope.data = data
      $scope.$apply()
    })
  }])
})(angular)