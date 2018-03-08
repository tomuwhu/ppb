angular
  .module( 'a', ['ngRoute'] )
  .config($routeProvider => {
      $routeProvider.when('/ujcsapat', { templateUrl : "/backend/ujcsapat"})
      $routeProvider.when('/', { templateUrl : "/backend" })
  })
  .controller( 'c', ($scope,$http,$interval) => {
      $interval( () => $scope.time = new Date(), 100)
      $scope.csapatok = []
      $scope.mitkeres=""
      $scope.keress = () => {
        $http
          .post("/backend/csapatok", {csnsz: $scope.mitkeres})
          .then( resp => {
                $scope.csapatok = resp.data.csapatok
          })
      }
      $scope.keress()
      kezdomezszam = 1
      $scope.csapat = {
          nev : '',
          jatekosok : []
      }
      $scope.uj = () => {
            $scope.csapat.jatekosok.push({
                mezszam: kezdomezszam++,
                nev: ''
            })
      }
      $scope.kuld = () => {
            $http
              .post("/backend/csapatment", $scope.csapat)
      }
  } )
