menu = [ 'Madár', 'Kutya' ]
angular
  .module( 'a', ['ngRoute'] )
  .config($routeProvider => {
      menu.forEach( (v, k) => {
        $routeProvider.when('/'+k, { templateUrl : "/backend/"+k})
      })
      $routeProvider.when("/", { templateUrl : "/backend" })
  })
  .controller( 'c', ($scope,$http,$interval) => {
      $interval( () => $scope.time = new Date(), 100)
      $scope.menu = menu
  } )
