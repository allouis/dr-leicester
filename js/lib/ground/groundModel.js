var stageView = require('../stageView');

var stage = stageView.stage;

var GroundModel = function(posX, posY, width, height) {
	this.position = {
		x: posX,
		y: posY
	};
	this.width = width;
	this.height = height;
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
