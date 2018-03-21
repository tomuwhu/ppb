angular
  .module( 'a', ['ngRoute','ngMaterial','ngMessages'] )
  .config($routeProvider => {
      $routeProvider.when("/", { templateUrl : "/be" })
      $routeProvider.when("/pr", { templateUrl : "/pr" })
      $routeProvider.when("/reg", { templateUrl : "/regform" })
  })
  .controller( 'c', ($scope, $http, $interval) => {
      $interval( () => $scope.time = new Date(), 100)
      $scope.vm = {
            formData: {
              email: '',
             	password: ''
            },
            submit: () => {
              $http
                .post('/be',$scope.vm.formData)
            }
        }
  } )
