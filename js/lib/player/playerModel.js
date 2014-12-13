var playerController = require('./playerController.js');

var player = {
	x: 50,
	y: 50,
	width: 25,
	height: 25,
	color: '#00F'
};

var speedMod = .5;
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

playerController.on('timeDiff', function(timeDiff) {
	player.x += xVector * timeDiff * speedMod;
	player.y += yVector * timeDiff * speedMod;
	playerController.emit('render', player);
});

exports.player = player;
