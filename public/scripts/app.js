var app = angular.module("app",[ ]);

app.controller("todoController", function($scope, $http){ 

	$scope.greeting = "Hello World. This is my todo app";

	updateTodoList();

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

});