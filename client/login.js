var app=angular.module("app",["lbServices"]);

 app.controller("login",function($scope,$q, $filter,$interval, Login, Employee ){

 	$q.all([
 		Login.find().$promise,
 		Employee.find().$promise
 	])
 	.then(function(data){
 		$scope.logins = data[0];
 		$scope.employees = data[1];

 	

 	$scope.login = function() {
        $scope.authError = null;
        Employee.login({
                username: $scope.post.username,
                password: $scope.post.password
            })
            .$promise
            .then(function(cb) {
                console.log(cb);
                console.log('login cuy');
            })
            .catch(function(error) {
                console.log(error);
                $scope.authError = error;
            });
    }


 
 		
 	// $scope.login = function(){

 	// 	if ($scope.post.username == "admin" & $scope.post.password == "admin") {
 	// 		console.log('Selamat anda sudah login');
 	// 	}
 	// 	else{
 	// 		console.log('TES AJALAH');
 	// 	}

 	// 	// console.log($scope.post.username);
 		
 	// }

 	 // $scope.register = function() {
   //      $scope.newUser.password = $scope.password;
   //      Employee.create($scope.newUser)
   //          .$promise
   //          .then(function(success) {
   //              $scope.user = {};
   //              $state.reload();
   //              alert('User ' + success.username + ' created!')
   //          })
   //          .catch(function(error) {
   //              alert(error.data.error.message);
   //          });
   //  }







       })

 })