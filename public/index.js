menu = [ 'Új könyv adatainak rögzítése','Új menüpont' ]
angular
  .module( 'a', ['ngRoute'] )
  .config($routeProvider => {
      menu.forEach( (v, k) => $routeProvider.when('/'+k, { templateUrl : "/backend/"+k}) )
      $routeProvider.when("/7", { templateUrl : "/backend/7" })
      $routeProvider.when("/", { templateUrl : "/backend" })
  })
  .controller( 'c', ($scope,$http,$interval) => {
      $scope.ujkonyvmenteve = 0
      $scope.konyvek = []
      $scope.k = {}
      $interval( () => $scope.time = new Date(), 100)
      $scope.menu = menu
      $scope.x = 2
      $scope.kkuld = () => {
          $http
            .post("ujkonyv",$scope.k)
            .then( res => {
                $scope.ujkonyvmenteve = res.data.ok
            })
      }
      $scope.keres = () => {
        $scope.ujkonyvmenteve = 0
        $http
          .post("keres",{mitkeres: $scope.keresomezo})
          .then( res => {
              $scope.konyvek=res.data.konyvek
          })
      }
  } )
