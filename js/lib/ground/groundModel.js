var stageView = require('../stageView');

var stage = stageView.stage;

var GroundModel = function() {
	this.position = {
		x: stage.getHeight() * .2,
		y: stage.getHeight() * .4
	};
	this.width = stage.getWidth() / 2;
	this.height = stage.getHeight() / 8;
	this.velocity = {
		x: 0,
		y: 0
	};
	this.acceleration = {
		x: 0,
		y: 0
	};
}

module.exports = GroundModel;
