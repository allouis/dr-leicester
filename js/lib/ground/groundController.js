var GroundModel = require('./groundModel');
var groundView = require('./groundView');
var stageView = require('../stageView');

var stage = stageView.stage;

var model = new GroundModel(
	stage.getHeight() * .2,
	stage.getHeight() * .4,
	stage.getWidth() / 2,
	stage.getHeight() / 8
);



exports.model = model;
exports.view = groundView.ground;
