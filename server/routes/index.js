'use strict'
module.exports = function(app, mongoConnection){

	var Student = require('../controllers/students');
	var student = new Student(mongoConnection);
	var Task = require('../controllers/tasks');
	var task = new Task(mongoConnection);

	app.get('/', function(req, res) {
		res.render('index.ejs');
	});

	app.get('/student', function(req, res) {
		student.list(req, res);
	});

	app.post('/student', function(req, res) {
		student.create(req, res);
	});

	app.get('/student/:idx', function(req, res) {
		console.log('got get :idx');
		student.read(req, res);
	});

	app.put('/student/:idx', function(req, res) {
		console.log('got put :idx');
		student.update(req, res);
	});

	app.delete('/student/:idx', function(req, res) {
		console.log('got delete :idx');
		student.delete(req, res);
	});

};
