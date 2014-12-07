var Kinetic = require('kinetic');
var playerController = require('./playerController.js');
var stageView = require('./stageView');
var Layer = require('./layer.js');

var layer = Layer.layer;
var stage = stageView.stage;

var player = new Kinetic.Rect({
	name: 'player',
	x: 50,
	y: 50,
	width: 25,
	height: 25,
	fill: '#00F',
	draggable: true
});

playerController.on('move', function (vector) {
	if (vector.x !== undefined) {
		xVel = vector.x;
	}
	if (vector.y !== undefined) {
		yVel = vector.y;
	}
});


var velMag = stage.getWidth() / 8;
var xVel = 0;
var yVel = 0;

var anim = new Kinetic.Animation(function(frame) {
	var xDist;
	var yDist;
	var distRatio = frame.timeDiff * stage.getWidth() / 4096;

	xDist = xVel * distRatio;
	yDist = yVel * distRatio;

	player.move({
		x: xDist,
		y: yDist
	});
}, layer);

anim.start();

exports.player = player;


