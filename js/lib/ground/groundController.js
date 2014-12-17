var groundModel = require('./groundModel');
var groundView = require('./groundView');
var stageView = require('../stageView');
var stage = stageView.stage;

//initial parameters
var params = {
	dimensions: {
		x: stage.getWidth() / 2,
		y: stage.getHeight() / 8
	},
	position: {
		x: stage.getWidth() * .2,
		y: stage.getHeight() * .4
	},
};

var models = [];
var views = [];

models[0] = groundModel(params);
views[0] = groundView(params);




params = {
	dimensions: {
		x: stage.getWidth() * .1,
		y: stage.getHeight() * .3
	},
	position: {
		x: stage.getWidth() * .4,
		y: stage.getHeight() * .1
	},
};

models[1] = groundModel(params);
views[1] = groundView(params);

exports.models = models;
exports.views = views;
