var Kinetic = require('kinetic');
var stageView = require('../stageView');

var stage = stageView.stage;

var ground = new Kinetic.Rect({
	x: stage.getHeight() * .2,
	y: stage.getHeight() * .4,
	width: stage.getWidth() / 2,
	height: stage.getHeight() / 8,
	fill: '#0F0',
});

exports.ground = ground;
