var groundModel = require('./groundModel');
var groundView = require('./groundView');
var stageView = require('../stageView');
var stage = stageView.stage;

var stageWidth = stage.getWidth();
var stageHeight = stage.getHeight();

var i;

var params = [];
var models = [];
var views = [];

params[0] = {
	dimensions: {
		x: stageWidth * .5,
		y: stageHeight * .125
	},
	position: {
		x: stageWidth * .2,
		y: stageHeight * .4
	},
};
params[1] = {
	dimensions: {
		x: stageWidth * .1,
		y: stageHeight * .3
	},
	position: {
		x: stageWidth * .4,
		y: stageHeight * .1
	},
};
params[2] = {
	dimensions: {
		x: stageWidth * .05,
		y: stageHeight * .1
	},
	position: {
		x: stageWidth * .1,
		y: stageHeight * .1
	},
};
for (i = 0; i < params.length; i++) {
	models[i] = groundModel(params[i]);
	views[i] = groundView(params[i]);
}

exports.models = models;
exports.views = views;
