'use strict';
module.exports = function(mongoConnection){

	var Todo = require('../models/').model(mongoConnection);

	this.list = function(req, res){
		console.log('list');

		Todo.find( { } , function(err, doc){
			console.log('Todo list callback');
			console.log(doc);
			res.send(doc);
		});
	};

	this.create = function(req, res){
		var newTodo					= new Todo();
	
		newTodo.item 	 			= req.body.item;
		newTodo.date			= new Date();

		newTodo.save(function(err, doc) {
			if(err)
				throw err;

			console.log('Todo create callback');
			res.send(doc);
		});
	};

	this.read = function(req, res){
		console.log('read');
		Todo.find( { _id : req.params.idx } , function(err, doc){
			console.log(doc);
			res.send(doc);
		});
	};

	this.update = function(req, res){
		var newTodo					= {};
	
		newTodo.item 	 			= req.body.item;
		newTodo.date				= new Date();

		console.log('update');
		console.log(req.body);

		Todo.findOneAndUpdate( { _id : req.params.idx }, 
			newTodo,
			{ new: true },
			function(err, doc){
				if(err){
					console.log('err ' + err);
					res.send(403);
				}
				else{
					console.log('Todo list returned ' + doc );
					res.send(doc);
				}
			}
		);
	};

	this.delete = function(req, res){
		Todo.findOneAndRemove( { _id : req.params.idx } , 
			function(err, doc){
				console.log('Delete Todo.');
				res.send(doc);
		});
	};
};