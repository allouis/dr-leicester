var PhysicsEngine = require('./PhysicsEngine.js');
var tinytic = require('tinytic');
var playerController = require('./player/playerController.js');
var player = require('./player/playerModel.js').player;
var groundModels = require('./ground/groundController.js').models;

var i;
var physics = new PhysicsEngine();

physics.addObject(player);
for (i = 0; i < groundModels.length; i++) {
	physics.addObject(groundModels[i]);
}

var draw = function() {
	playerController.emit('render', player.position);
};

var loop = function loop() {
	window.requestAnimationFrame(loop);
	var dt = tinytic.toc(500);
	playerController.emit('timeDiff', dt);
	physics.compute(dt);
	draw();
};
loop();
