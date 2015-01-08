var mongoose = require('mongoose');

var Schema = {
	taskName  	: String,
	completed  	: Boolean
};

exports.model = function(mongoConnection){
	return mongoConnection.model('Task', taskSchema, 'tasks');
};