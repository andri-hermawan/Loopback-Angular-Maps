var app=angular.module("app",["lbServices"]);

 app.controller("ctrl",function($scope,$q, $filter, Universitas,Biodata,$interval){
 	$q.all([
 		Biodata.find({filter:{include:"universitas"}}).$promise,
 		Universitas.find().$promise
 		
 	]).then(function(data){
 		
 		$scope.biodatas=data[0];
 		$scope.univ = data[1];
 		console.log($scope.biodatas)
 		$scope.action;

 	$scope.insert=function(){
		$scope.action="insert";
		$scope.post="";
		$scope.form.$setPristine();
	}

	$scope.edit=function(data){
		$scope.action="update";
		$scope.post=data;
		$scope.form.$setPristine();
	}

	$scope.delete=function(data){
		$scope.action="delete";
		$scope.post=data;
	}
	console.log($scope.univ);
	$scope.save=function(){
		switch($scope.action){
			case "insert":
			var dateNow = $filter('date')(new Date(),"yyyy-MM-ddThh:mm:ss");
				Biodata.create({
					nama: $scope.post.nama,
					umur: $scope.post.umur,
					tgl				: dateNow,
					jk: $scope.post.jk,
					id_universitas:$scope.post.id_universitas
					
				})
				.$promise.then(function(data){
					for (var i = 0; i < $scope.univ.length; i++) {
					if ($scope.univ[i].id == $scope.post.id_universitas) {
							$scope.biodatas.push({
								nama: $scope.post.nama,
								umur: $scope.post.umur,
								tgl				: dateNow,
								jk: $scope.post.jk,
								id_universitas:$scope.post.id_universitas,
								
								universitas: $scope.univ[i]
							})
						}
					}
				})
				console.log('$scope.post.id_universitas');
			break;

			case "update":
			var dateNow = $filter('date')(new Date(),"yyyy-MM-ddThh:mm:ss");
				Biodata.replaceById({id:$scope.post.id},{
					nama: $scope.post.nama,
					umur: $scope.post.umur,
					tgl				: dateNow,
					jk: $scope.post.jk,
					id_universitas:$scope.post.id_universitas
				});
				for (var i = 0; i < $scope.univ.length; i++) {
					// cari id dulu
					if ($scope.univ[i].id == $scope.post.id_universitas) {  
						// $scope.post.universitas = $scope.univ[i]; bisa langsung pake ini 

						// di masukan ke array model yang akan di update
						for (var j = 0; j < $scope.biodatas.length; j++) {
							if ($scope.biodatas[j].id == $scope.post.id) {
								$scope.biodatas[j].universitas = $scope.univ[i];
							}
						}
					}
				}
				console.log('update');
			break;

			case "delete":
				Biodata.deleteById({id:$scope.post.id});
				for (var i = 0; i < $scope.biodatas.length; i++) {
					if ($scope.post.id == $scope.biodatas[i].id) {
						$scope.biodatas.splice(i,1)
					}
				}
				console.log('delete');
			break;
		}
	}
 		
 	})

 	// $scope.run = function(){
 	// 	console.log('tes aja');
 	// }

})