var app = angular.module("app",["firebase", "chart.js"]);

app.constant('FIREBASE_URI', 'https://fw13students.firebaseio.com/');


app.controller("MainCtrl", ["$scope", "ItemsService", "$firebase", "FIREBASE_URI",
	function($scope, ItemsService, $firebase, FIREBASE_URI) {
		var ref = new Firebase(FIREBASE_URI);
		var snapshot;

		$scope.labels = ["Completed Tasks", "Incomplete Tasks"];

		$scope.currentItem = null;

		$scope.items = ItemsService.getItems();

		updateChart();

		ref.on('value', function(snapshot){
			updateChart();
		});

		$scope.taskNames = [
			{name: "Turn in cards", 	completed: false},
			{name: "Download cards", 	completed: false},
			{name: "Cull images",		completed: false},
			{name: "Backup HD1",		completed: false},
			{name: "Backup HD2",		completed: false},
			{name: "Deliver HD to team",completed: false},
			{name: "Get HD from team",	completed: false},
			{name: "Drink Whisky", 		completed: false}
		];

		function resetNewItem() {
			$scope.newItem = {
				name: '',
				description: '',
				tasks: [
					{name: "Turn in cards", 	completed: false},
					{name: "Download cards", 	completed: false},
					{name: "Cull images",		completed: false},
					{name: "Backup HD1",		completed: false},
					{name: "Backup HD2",		completed: false},
					{name: "Deliver HD to team",completed: false},
					{name: "Get HD from team",	completed: false},
					{name: "Drink Whisky", 		completed: false}
				],
				percent: 0
			};
		}

		function updateChart(){
			ref.once('value', function(dataSnapshot) {
				// store dataSnapshot for use in below examples.
				snapshot = dataSnapshot;

				var sumAll = 0;
				var total = 0;

				snapshot.forEach(function(item){
					for(var i=0; i<item.val().tasks.length; i++)
						if(item.val().tasks[i].completed)
							sumAll++;
				});
				$scope.complete = sumAll;
				console.log(sumAll);

				snapshot.forEach(function(item){total += item.val().tasks.length});

				console.log(total);

				$scope.complete = sumAll;
				$scope.incomplete = total-sumAll;

				$scope.data = [$scope.complete, $scope.incomplete];
			});
		}

		$scope.addItem = function () {
			ItemsService.addItem(angular.copy($scope.newItem));
			resetNewItem();
		};

		$scope.updateItem = function (id) {
			var sum = 0;
			for(var i=0; i<$scope.items[id].tasks.length; i++)
				if($scope.items[id].tasks[i].completed)
					sum++;

			$scope.items[id].percent = sum / $scope.items[id].tasks.length * 100;

			ItemsService.updateItem(id);

			updateChart();

		};

		$scope.removeItem = function (id) {
			ItemsService.removeItem(id);
		};
	}
]);


app.factory('ItemsService', ['$firebase', 'FIREBASE_URI', function ($firebase, FIREBASE_URI) {
	var ref = new Firebase(FIREBASE_URI);
	var items = $firebase(ref);

	var getItems = function () {
		return items;
	};

	var addItem = function (item) {
		items.$add(item);
	};

	var updateItem = function (id) {
		items.$save(id);
	};

	var removeItem = function (id) {
		items.$remove(id);
	};

	return {
		getItems: getItems,
		addItem: addItem,
		updateItem: updateItem,
		removeItem: removeItem
	}
}]);