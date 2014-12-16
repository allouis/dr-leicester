var playerController = require('./playerController.js');

var player = {
	dimensions: {
		x: 25,
		y: 25
	},
	position: {
		x: 250,
		y: 50
	},
	velocity: {
		x: 0,
		y: 0
	},
	acceleration: {
		x: 0,
		y: 0
	},
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

playerController.on('timeDiff', function() {
	player.acceleration.x = xVector * accelerationMod;
	player.acceleration.y = yVector * accelerationMod;
});

exports.player = player;
