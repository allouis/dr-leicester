var groundModel = require('./groundModel');
var groundView = require('./groundView');
var stageView = require('../stageView');
var stage = stageView.stage;

//initial parameters
var groundPosX = stage.getHeight() * .2;
var groundPosY = stage.getHeight() * .4;
var groundWidth = stage.getWidth() / 2;
var groundHeight = stage.getHeight() / 8;

var model = groundModel(
	groundPosX,
	groundPosY,
	groundWidth,
	groundHeight
);

var view = groundView(
	groundPosX,
	groundPosY,
	groundWidth,
	groundHeight
);

exports.model = model;
exports.view = view;
