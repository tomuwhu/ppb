angular
  .module( 'a', ['ngRoute'] )
  .config($routeProvider => {
      $routeProvider.when("/", { templateUrl : "/backend" })
      $routeProvider.when("/main", { templateUrl : "/backend" })
  })
  .controller( 'c', ($scope,$http,$interval) => {
      $interval( () => $scope.time = new Date(), 100)
  } )
