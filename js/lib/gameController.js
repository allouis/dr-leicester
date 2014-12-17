var PhysicsEngine = require('./PhysicsEngine.js');
var tinytic = require('tinytic');
var playerController = require('./player/playerController.js');
var player = require('./player/playerModel.js').player;
var ground = require('./ground/groundController.js').models;

var physics = new PhysicsEngine();


window.ground = ground[0];
physics.addObject(player);
physics.addObject(ground[0]);


var draw = function() {
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
