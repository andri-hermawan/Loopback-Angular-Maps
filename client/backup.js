app.controller("ctrl",function($scope,Barang){
	$scope.barangs=Barang.find();	
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

	$scope.save=function(){
		switch($scope.action){
			case "insert":
				Barang.create($scope.post)
				.$promise.then(function(data){
					$scope.barangs.push(data);
				})
			break;

			case "update":
				Barang.replaceById({id:$scope.post.id},{
					name    : $scope.post.name,
				    prince  : $scope.post.prince,
				    stock   : $scope.post.stock
				})
			break;

			case "delete":
				Barang.deleteById({id:$scope.post.id});
				for(var i=0;i<$scope.barangs.length;i++){
					if($scope.post.id==$scope.barangs[i].id){
						$scope.barangs.splice(i,1);
					}
				}
			break;
		}
	}