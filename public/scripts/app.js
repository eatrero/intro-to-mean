var app = angular.module("app",["firebase"]);

app.controller("todoController", ["$scope", "$http", "$firebase",
	function($scope, $http, $firebase){
		var obj = $firebase(new Firebase("https://glaring-heat-2011.firebaseio.com")).$asObject();

		obj.$loaded().then(function() {
			console.log("loaded record:", obj.$id, obj.someOtherKeyInData);

			// To iterate the key/value pairs of the object, use `angular.forEach()`
			angular.forEach(obj, function(value, key) {
				console.log(key, value);
			});

			$scope.students = obj.students;

			console.log($scope.students);
		});
//		updateTodoList();

		function updateTodoList(){
			$http.get('http://localhost:3245/item')
			.success(function(result){
				$scope.todos = result;
				console.log(result);
			});
		}

		$scope.postTodo = function(todo){
			console.log(todo.item);

			$http.post('http://localhost:3245/item',
			{item : todo.item})
			.success(function(result){
				// refresh list
				updateTodoList();
			});
		};

		$scope.deleteTodo = function(todo){

			$http.delete('http://localhost:3245/item/'+todo._id)
			.success(function(result){
				// refresh list
				updateTodoList();
			});
		};

	}
]);