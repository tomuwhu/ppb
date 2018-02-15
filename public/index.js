angular
  .module( 'a', ['ngRoute'] )
  .config($routeProvider => {
      $routeProvider.when('/0', { templateUrl : "/backend/0" })
      $routeProvider.when("/", { templateUrl : "/backend" })
  })
  .controller( 'c', ($scope,$http,$interval) => {
      $scope.keresomezo=''
      $scope.ujkonyvmenteve = 0
      $scope.konyvek = []
      $scope.k = {}
      $interval( () => {
          d = new Date()
        //  d.setDate(d.getDate()+65)
          $scope.time = d
      } , 100)
      $scope.x = 2
      $scope.kkuld = () => {
          $http
            .post("ujkonyv",$scope.k)
            .then( res => {
                $scope.ujkonyvmenteve = res.data.ok
            })
      }
      $scope.keres = () => {
        $scope.k = {}
        $http
          .post("keres",{mitkeres: $scope.keresomezo})
          .then( res => {
              $scope.konyvek=res.data.konyvek
              $scope.konyvek.forEach( (v,k) => {
                    if ( typeof $scope.konyvek[k].mikojonvissza !== 'undefined') {
                        $scope.konyvek[k].mikojonvissza = new Date($scope.konyvek[k].mikojonvissza)
                    }
              })

          })
      }
      $scope.uj = () => {
          $scope.k = { }
      }
      $scope.edit = key => {
          $scope.k = $scope.konyvek[key]
      }
      $scope.del = key => {

      }
      $interval($scope.keres,100,1)
  } )
