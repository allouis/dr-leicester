var PhysicsEngine = require('./PhysicsEngine.js');
var tinytic = require('tinytic');
var playerController = require('./player/playerController.js');
var player = require('./player/playerModel.js').player;
var GroundModel = require('./ground/groundModel.js');

var physics = new PhysicsEngine();
var ground = new GroundModel();

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
