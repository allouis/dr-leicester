var playerController = require('./playerController.js');
var stageView = require('../stageView');
var stage = stageView.stage;

var player = {
	mass: 1,
	dimensions: {
		x: stage.getWidth() * .02,
		y: stage.getWidth() * .02
	},
	position: {
		x: stage.getWidth() * .25,
		y: stage.getHeight() * .25
	},
	velocity: {
		x: 0,
		y: 0
	},
	acceleration: {
		x: 0,
		y: 0
	},
	touchingGround: false,
	restitution: 0.25,
	color: '#00F'
};

var accelerationMod = 512;
var xVector = 0;
var yVector = 0;

playerController.on('move', function (vector) {
	if (vector.x !== undefined) {
		xVector = vector.x;
	}
	if (vector.y !== undefined) {
		yVector = vector.y;
	}
});
playerController.on('jump', function () {
	if (player.touchingGround) {
		player.velocity.y = -accelerationMod / 2;
		player.touchingGround = false;
	}
});

playerController.on('timeDiff', function() {
	player.acceleration.x = xVector * accelerationMod;
	player.acceleration.y = yVector * accelerationMod;
});

exports.player = player;
