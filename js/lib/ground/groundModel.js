var stageView = require('../stageView');

var stage = stageView.stage;

var ground = {
	position: {
		x: stage.getHeight() * .2,
		y: stage.getHeight() * .4
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
