var Kinetic = require('kinetic');

var Layer = require('./lib/layer.js');
var stageView = require('./lib/stageView.js');

var layer = Layer.layer;
var stage = stageView.stage;

var playerModel = require('./lib/player/playerModel.js');
var playerView = require('./lib/player/playerView.js');
var player = playerView.player;
layer.add(player);

stage.add(layer);
