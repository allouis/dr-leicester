var playerController = require('./playerController.js');
var stageView = require('../stageView');
var stage = stageView.stage;

var accelerationMod = 512;
var xVector = 0;
var yVector = 0;

var player = {
	//below: physics engine data
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
	//[top, right, bottom, left]
	touching: [
		false,
		false,
		false,
		false
	],
	restitution: 0.25,
	//above: physics engine data
	color: '#00F',
	move: function() {
		this.acceleration.x = xVector * accelerationMod;
		this.acceleration.y = yVector * accelerationMod;
	},
	jump: function() {
		if (this.touching[2]) {
			this.velocity.y = 4 * accelerationMod;
			this.touching[2] = false;
		}
	}
};

playerController.on('move', function (vector) {
	if (vector.x !== undefined) {
		xVector = vector.x;
	}
	if (vector.y !== undefined) {
		yVector = vector.y;
	}
});
playerController.on('jump', function() {
	player.jump();
});

playerController.on('timeDiff', function() {
	player.move();
});

exports.player = player;
