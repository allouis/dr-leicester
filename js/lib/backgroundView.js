var Kinetic = require('kinetic');
var stageView = require('./stageView');

var stage = stageView.stage;

var background = new Kinetic.Rect({
	x: 0,
	y: 0,
	width: stage.getWidth(),
	height: stage.getHeight(),
	fill: '#F0F',
});

exports.background = background;
