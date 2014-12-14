var Kinetic = require('kinetic');
var stageView = require('./stageView');

var stage = stageView.stage;

var stageHeight = stage.getHeight();

var ground = new Kinetic.Rect({
	x: 0,
	y: 300,
	width: stage.getWidth(),
	height: stageHeight / 2,
	fill: '#0F0',
});

exports.ground = ground;
