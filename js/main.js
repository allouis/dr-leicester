var Kinetic = require('kinetic');
var Events = require('minivents');
var playerController = require('./lib/playerController.js');

var pubsub = new Events();

var windowWidth = window.innerWidth; //this is used to determine player velocity
window.addEventListener('resize', resizeStage, false);
var stage = new Kinetic.Stage({
	container: 'container',
	width: windowWidth,
	height: window.innerHeight 
});
var layer = new Kinetic.Layer();

var resizeStage = function() {
	windowWidth = window.innerWidth;
	stage.setWidth(windowWidth);
	stage.setHeight(window.innerHeight);
};

var background = new Kinetic.Rect({
	x: 0,
	y: 0,
	width: stage.getWidth(),
	height: stage.getHeight(),
	fill: '#F0F',
});
layer.add(background);
var player = new Kinetic.Rect({
    name: 'player',
    x: 50,
    y: 50,
    width: 25,
    height: 25,
    fill: 'green',
    draggable: true
});
layer.add(player);

stage.add(layer);

var velMag = windowWidth / 8;
var xVel = 0;
var yVel = 0;

playerController.on('move', function (vector) {
	if (vector.x !== undefined) {
		xVel = vector.x;
	}
	if (vector.y !== undefined) {
		yVel = vector.y;
	}
});

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

