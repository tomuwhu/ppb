menu = [
  { menupont: 'Madár', link: 'csirke'},
  { menupont: 'Kutya', link: 'kutya'},
]
angular
  .module( 'a', ['ngRoute'] )
  .config($routeProvider => {
      menu.forEach( v => {
        $routeProvider.when('/'+v.link, { templateUrl : "/backend/"+v.link})
      })
      $routeProvider.when("/", { templateUrl : "/backend" })
  })
  .controller( 'c', ($scope,$http,$interval) => {
      $interval( () => $scope.time = new Date(), 100)
      $scope.menu = menu
  } )
