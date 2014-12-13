var backgroundView = require('./lib/backgroundView.js');
var groundView = require('./lib/groundView.js');
var Kinetic = require('kinetic');
var Layer = require('./lib/layer.js');
var playerModel = require('./lib/playerModel.js');
var playerView = require('./lib/playerView.js');
var stageView = require('./lib/stageView.js');

var layer = Layer.layer;
var stage = stageView.stage;
var background = backgroundView.background;
var ground = groundView.ground;
var player = playerView.player;

layer.add(background);
layer.add(ground);
layer.add(player);

stage.add(layer);
