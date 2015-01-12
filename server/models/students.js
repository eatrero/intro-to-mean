var mongoose = require('mongoose');

var Schema = {
	name		: String,
	tasks1  	: [Schema.Types.ObjectId],
	tasks2  	: [Schema.Types.ObjectId]
};

exports.model = function(mongoConnection){
	return mongoConnection.model('Student', taskSchema, 'students');
};