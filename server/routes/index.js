'use strict'
module.exports = function(app, mongoConnection){

	var Ctrl = require('../controllers');
	var ctrl = new Ctrl(mongoConnection);

	app.get('/', function(req, res) {
		res.render('index.ejs');
	});

	app.get('/item', function(req, res) {
		ctrl.list(req, res);
	});

	app.post('/item', function(req, res) {
		ctrl.create(req, res);
	});

	app.get('/item/:idx', function(req, res) {
		console.log('got get :idx');
		ctrl.read(req, res);
	});

	app.put('/item/:idx', function(req, res) {
		console.log('got put :idx');
		ctrl.update(req, res);
	});

	app.delete('/item/:idx', function(req, res) {
		console.log('got delete :idx');
		ctrl.delete(req, res);
	});


};
