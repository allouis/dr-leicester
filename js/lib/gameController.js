var PhysicsEngine = require('./PhysicsEngine.js');
var tinytic = require('tinytic');
var playerController = require('./player/playerController.js');
var player = require('./player/playerModel.js').player;

var physics = new PhysicsEngine();
var ground = {
	position: {
		x: 0,
		y: 300
	},
	width: 900,
	height: 600,
	velocity: {
		x: 0,
		y: 0
	},
	acceleration: {
		x: 0,
		y: 0
	}
};
Object.freeze(ground.position);
physics.addObject(player);
physics.addObject(ground);


var draw = function() {
	
	//~ debugger;
	console.log(ground.position);
	playerController.emit('render', player.position);
}

var loop = function loop() {
	window.requestAnimationFrame(loop);
	var dt = tinytic.toc();
	playerController.emit('timeDiff', dt);
	physics.compute(dt);
	draw();
};
loop();
