var myApp = angular.module('myApp', []);

// myApp.controller('HomeController', function($scope) {

// 	$scope.message = "Hello AngularJS";

// });



myApp.controller('HomeController', function($scope,$http) { //name call function by ng-controller
  // $scope.username = 'mycrmdemo';
	// $scope.password = '1234';
	
	$scope.login = function () {
        $scope.message = "";
            var request = $http({
                method: "post",
                url: base_url + "HomeController/checkLogin",
                data: {
                    username: $scope.username,
					          password: $scope.password
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            request.success(function (data) {
                $scope.message = "Console : "+data;
            });
    }
});



// $scope.Login_init = function(username, password)  //name for receive parameter.
// {
//   $scope.Username = username;
//   $scope.Password = password; 

//   $scope.login = function () {
//       $scope.message = "";
//           var request = $http({
//               method: "post",
//               url: base_url + "HomeController/CheckLogin",
//               data: {
//                   Username: $scope.Username,
//                   Pasword: $scope.Password
//               },
//               header: { 'Content-Type': 'application/x-www-form-urlencoded' }
//           });
//           request.success(function (e) {
//              $scope.message = "Console : " + data; 
//           });
//   }
// };