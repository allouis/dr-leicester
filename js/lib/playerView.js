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

playerController.on('render', function (coords) {
	var stageWidth = stage.width();
	player.position({
		x: coords.x,
		y: coords.y
	});
	layer.draw();
});

	
//dev send time between frames to model to calc dist from vel
var anim = new Kinetic.Animation(function(frame) {
	var xDist;
	var yDist;
	var distRatio = frame.timeDiff * stage.getWidth() / 4096;

	xDist = xVel * distRatio;
	yDist = yVel * distRatio;
}, layer);

//anim.start();

exports.player = player;


