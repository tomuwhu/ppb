menu = [ 'Delfin', 'Kutya','Farkas', 'Pingvin','Hello világ!', 'Krokodil' ].sort()
angular
  .module( 'a', ['ngRoute'] )
  .config($routeProvider => {
      menu.forEach( (v, k) => $routeProvider.when('/'+k, { templateUrl : "/backend/"+k}) )
      $routeProvider.when("/", { templateUrl : "/backend" })
  })
  .controller( 'c', ($scope,$http,$interval) => {
      $interval( () => $scope.time = new Date(), 100)
      $scope.menu = menu
  } )
