var playerController = require('./playerController.js');

var player = {
	x: 50,
	y: 50,
	width: 25,
	height: 25,
	color: '#00F'
};

var xVel = 0;
var yVel = 0;

playerController.on('move', function (vector) {
	if (vector.x !== undefined) {
		xVel = vector.x;
	}
	if (vector.y !== undefined) {
		yVel = vector.y;
	}
	player.x += xVel;
	player.y += yVel;
	playerController.emit('render', player);
});

exports.player = player;
