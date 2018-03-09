angular
  .module( 'a', ['ngRoute'] )
  .config( $routeProvider => {
      $routeProvider.when( '/esrogz', { templateUrl : "/backend/esrogzurlap" } )
      $routeProvider.when( '/ujcsapat', { templateUrl : "/backend/ujcsapat" } )
      $routeProvider.when( '/', { templateUrl : "/backend" } )
  } )
  .controller( 'c', ($scope,$http,$interval) => {
      $interval( ( ) => $scope.time = new Date( ), 100)
      $scope.csapatok = []
      kezdomezszam = 1
      $scope.esemenyek = [ { } ]
      $scope.mitkeres = ""
      $scope.meccs = { esemenyek : [] }
      $scope.keress = ( ) => {
        $http
          .post( "/backend/csapatok", { csnsz: $scope.mitkeres } )
          .then( resp => {
                $scope.csapatok = resp.data.csapatok
          } )
      }
      $scope.keress( )
      $scope.uj = ( ) => {
            $scope.csapat.jatekosok.push( {
                mezszam: kezdomezszam++,
                nev: ''
            } )
      }
      $scope.kuld = ( ) => {
            $http
              .post("/backend/csapatment", $scope.csapat)
              .then( resp => {
                  $scope.csapat.jatekosok.sort( ( a, b ) => a.mezszam > b.mezszam ? -1 : 1 )
                  if ( resp.data.ok == 1 ) $scope.csapatok.push( $scope.csapat )
              } )
      }
      $scope.setcsap = ( x = { nev : '', jatekosok : [] } ) => {
          $scope.csapat = x
          if ( x.nev == '' ) {
              kezdomezszam = 1
              $scope.ujcsapat = true
          }
          else $scope.ujcsapat = false
      }
      $scope.setaktcsapat = ( x ) => {
         if ( $scope.aktcsapat != x ) $scope.aktcsapat = x
         else $scope.aktcsapat = null
      }
      $scope.meccsrogz = () => {
         console.log($scope.meccs)
         $http
            .post("/backend/savemeccs", $scope.meccs)
            .then( resp => {
                if (resp.data.ok!=2) {
                  $scope.meccs._id = resp.data._id
                  console.log( $scope.meccs._id )
                }  
            } )
      }
      $scope.setkezdtime = () => {
          $scope.meccs.kezdip = $scope.time
          $scope.meccs.esemenyek.push({})
      }
  } )
