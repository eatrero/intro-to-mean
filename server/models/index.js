var mongoose = require('mongoose');

var todoSchema = {
	item  : String,
	date  : Date
};

exports.model = function(mongoConnection){
	return mongoConnection.model('Todo', todoSchema, 'todos');
};