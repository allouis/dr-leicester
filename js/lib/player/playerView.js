var Kinetic = require('kinetic');
var playerController = require('./playerController.js');
var stageView = require('../stageView');
var Layer = require('../layer.js');

var layer = Layer.layer;
var stage = stageView.stage;

var player = new Kinetic.Rect({
	name: 'player',
	x: 50,
	y: 50,
	width: 25,
	height: 25,
	fill: '#00F',
});

playerController.on('render', function (coords) {
	player.position({
		x: coords.x,
		y: coords.y
	});
	layer.draw();
});

exports.player = player;
