'use strict'
module.exports = function(app){

	app.get('/', function(req, res) {
		res.render('index.ejs');
	});

    app.get('/day1', function(req, res) {
        res.render('index-day-1.ejs');
    });

    app.get('/day2', function(req, res) {
        res.render('index-day-2.ejs');
    });
};
