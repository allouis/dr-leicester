var stageView = require('../stageView');

var stage = stageView.stage;

var ground = {
	position: {
		x: 0,
		y: stage.getHeight() * .5
	},
	width: stage.getWidth() / 2,
	height: stage.getHeight() / 8,
	velocity: {
		x: 0,
		y: 0
	},
	acceleration: {
		x: 0,
		y: 0
	}
};

exports.ground = ground;
