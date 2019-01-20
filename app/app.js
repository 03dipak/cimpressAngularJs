var movieApp = angular.module('movieApp',['ngRoute','ngAnimate']);

movieApp.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html'
    })
    .when('/addMovie', {
      templateUrl: 'views/addMovie.html'
    })
    .when('/listMovie',{
      templateUrl: 'views/movieListView.html',
      controller: 'movieList'
    })
    .when('/detailMovie/:movieId', {
      templateUrl: 'views/movieDetailView.html',
      controller: 'movieDetail'
    })
    .when('/deleteMovie/:movieId',{
      templateUrl : '/views/movieDeleteView.html',
      controller: 'deleteDetail'
    })
    .otherwise({
      redirectTo: '/listMovie'
    });
}]);

movieApp.factory('dataFactory', ['$http', function ($http) {
        var urlBase = 'https://backend-ygzsyibiue.now.sh/api/v1/movies/';
        var dataFactory = {};
        dataFactory.getMovies = function () {
            return $http.get(urlBase);
        };

        dataFactory.getMovie = function (movieId) {
          console.log(urlBase + '/' + movieId)
            return $http.get(urlBase + '/' + movieId);
        };

        dataFactory.deleteMovie = function(movieId) {
          return $http.delete(urlBase + '/' + movieId);
        }
        return dataFactory;
}])
.controller('movieList',['$scope','dataFactory',function($scope, dataFactory) {
   dataFactory.getMovies()
    .then(function (response) {
      $scope.movieDatas = response.data;
    });
}])
.controller('movieDetail',['$scope','dataFactory','$routeParams','$location',function($scope, dataFactory,$routeParams,$location) {
    $scope.removeMovie = function(){
      dataFactory.deleteMovie($routeParams.movieId)
       .then(function (response) {
         $scope.movieDeleteData = response.data;
         console.log($scope.movieDeleteData);
       });
      $location.path('/listMovie');
    }

   dataFactory.getMovie($routeParams.movieId)
    .then(function (response) {
      $scope.movieDetailData = response.data;
      console.log($scope.movieDetailData);
    });
}])
.controller('deleteDetail',['$scope','$routeParams',function($scope,$routeParams){
    console.log($scope);
}]);
