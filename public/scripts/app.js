var app = angular.module("app",["firebase", "chart.js"]);

app.constant('FIREBASE_URI1', 'https://fw13students.firebaseio.com/');
app.constant('FIREBASE_URI2', 'https://fw13students2.firebaseio.com/');

app.controller("MainCtrl", ["$scope", "$location", "ItemsService", "$firebase", "FIREBASE_URI1", "FIREBASE_URI2",
	function($scope, $location, ItemsService, FIREBASE_URI1, FIREBASE_URI2) {
		var ref1 = new Firebase('https://fw13students.firebaseio.com/');
        var ref2 = new Firebase('https://fw13students2.firebaseio.com/');
		var snapshot1, snapshot2;

        var url = $location.absUrl();
        console.log(url);
        var day1 = /day1/gi;
        var day1match = url.match(day1);
        console.log(url.match(day1match));

		$scope.labels = ["Completed Tasks", "Incomplete Tasks"];

		$scope.currentItem = null;

		$scope.items1 = ItemsService.getItems1();
        $scope.items2 = ItemsService.getItems2();

        resetNewItem();

		updateChart();

		ref1.on('value', function(snapshot1){
			updateChart();
		});
        ref2.on('value', function(snapshot2){
            updateChart();
        });



		$scope.taskNames = [
			{name: "Turn in cards", 	completed: false},
			{name: "Ingest", 	        completed: false},
			{name: "Cull",		        completed: false},
			{name: "Post",		        completed: false},
			{name: "Export",		    completed: false},
			{name: "Deliver HD",        completed: false},
			{name: "Get HD",	        completed: false},
            {name: "Print",	            completed: false}
		];

		function resetNewItem() {
			$scope.newItem = {
				name: '',
				description: '',
				tasks: [
					{name: "Turn in cards", 	completed: false},
                    {name: "Ingest", 	        completed: false},
                    {name: "Cull",		        completed: false},
                    {name: "Post",		        completed: false},
                    {name: "Export",		    completed: false},
                    {name: "Deliver HD",        completed: false},
                    {name: "Get HD",	        completed: false},
                    {name: "Print",	            completed: false}
				],
				percent: 0
			};
		}

		function updateChart(){
			ref1.once('value', function(dataSnapshot) {
				// store dataSnapshot for use in below examples.
				snapshot1 = dataSnapshot;

				var sumAll = 0;
				var total = 0;

				snapshot1.forEach(function(item){
					for(var i=0; i<item.val().tasks.length; i++)
						if(item.val().tasks[i].completed)
							sumAll++;
				});
				$scope.complete1 = sumAll;
				console.log(sumAll);

				snapshot1.forEach(function(item){total += item.val().tasks.length});

				console.log(total);

				$scope.incomplete1 = total-sumAll;

				$scope.data1 = [$scope.complete1, $scope.incomplete1];
			});

            ref2.once('value', function(dataSnapshot) {
                // store dataSnapshot for use in below examples.
                snapshot2 = dataSnapshot;

                var sumAll = 0;
                var total = 0;

                snapshot2.forEach(function(item){
                    for(var i=0; i<item.val().tasks.length; i++)
                        if(item.val().tasks[i].completed)
                            sumAll++;
                });
                $scope.complete2 = sumAll;
				console.log(sumAll);

                snapshot2.forEach(function(item){total += item.val().tasks.length});

				console.log(total);

                $scope.incomplete2 = total-sumAll;

                $scope.data2 = [$scope.complete2, $scope.incomplete2];
            });
		}

		$scope.addItem = function () {
            if(day1match)
    			ItemsService.addItem1(angular.copy($scope.newItem));
            else
                ItemsService.addItem2(angular.copy($scope.newItem));

			resetNewItem();
		};

		$scope.updateItem = function (id) {
			var i=0, sum = 0;
            if(day1match){
                for(i=0; i<$scope.items1[id].tasks.length; i++)
                    if($scope.items1[id].tasks[i].completed)
                        sum++;

                $scope.items1[id].percent = sum / $scope.items1[id].tasks.length * 100;
                ItemsService.updateItem1(id);

            } else {
                for(i=0; i<$scope.items2[id].tasks.length; i++)
                    if($scope.items2[id].tasks[i].completed)
                        sum++;

                $scope.items2[id].percent = sum / $scope.items2[id].tasks.length * 100;
                ItemsService.updateItem2(id);
            }

			updateChart();

		};

		$scope.removeItem = function (id) {
            if(day1match)
    			ItemsService.removeItem1(id);
            else
                ItemsService.removeItem2(id);

		};
	}
]);


app.factory('ItemsService', ['$firebase', 'FIREBASE_URI1', 'FIREBASE_URI2', function ($firebase, FIREBASE_URI1, FIREBASE_URI2 ) {
    var ref1= new Firebase(FIREBASE_URI1);
    var ref2 = new Firebase(FIREBASE_URI2);
	var items1 = $firebase(ref1);
    var items2 = $firebase(ref2);

	var getItems1 = function () {
		return items1;
	};

	var addItem1 = function (item) {
		items1.$add(item);
	};

	var updateItem1 = function (id) {
		items1.$save(id);
	};

	var removeItem1 = function (id) {
		items1.$remove(id);
	};

    var getItems2 = function () {
        return items2;
    };

    var addItem2 = function (item) {
        items2.$add(item);
    };

    var updateItem2 = function (id) {
        items2.$save(id);
    };

    var removeItem2 = function (id) {
        items2.$remove(id);
    };

	return {
		getItems1: getItems1,
		addItem1: addItem1,
		updateItem1: updateItem1,
		removeItem1: removeItem1,
        getItems2: getItems2,
        addItem2: addItem2,
        updateItem2: updateItem2,
        removeItem2: removeItem2
	}
}]);