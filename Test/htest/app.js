'use strict';

var app = angular.module('HomeApp',['ui.bootstrap', 'ui.router', 'ngAnimate']);
app.controller('DsmAPICtrl',function($scope,$http){
   $scope.apiParams = {
      path : '/webapi/query.cgi',
      api : 'SYNO.API.Info',
      version : '1',
      method : 'query',
      query : ''
    };
  $scope.apiResp = {};
  $scope.query = function(){
    var params = {};
    var url = '';
    angular.forEach($scope.apiParams, function(val,key){
          if(val && val.length != 0){
            if(key == 'path'){
               url = val;
            }else{
               params[key] = val;
            }
          }
      });
    console.log(url);
    $http({ method: 'GET', url: url, params: params})
    .success(function(data, status, headers, config){
       $scope.apiResp = data.data;
       console.log(JSON.stringify(data));
      });
  };
});
app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise("/home");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "partials/home.html",
      controller: function($scope){
       }
    })
    .state('contact', {
      url: "/contact",
      templateUrl: "partials/contact.html",
    })
    .state('about', {
      url: "/about",
      templateUrl: "partials/about.html"
    });
  });
app.run(
      [ '$rootScope', '$state', '$stateParams',
      function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }]);
