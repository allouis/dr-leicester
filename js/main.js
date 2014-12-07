var Kinetic = require('kinetic');
var Events = require('minivents');
var backgroundView = require('./lib/backgroundView.js');
var groundView = require('./lib/groundView.js');
var playerView = require('./lib/playerView.js');
var Layer = require('./lib/layer.js');

var layer = Layer.layer;
var stageView = require('./lib/stageView.js');

var pubsub = new Events();

var stage = stageView.stage;

var background = backgroundView.background;
var ground = groundView.ground;
var player = playerView.player;

console.log(ground);

layer.add(background);
layer.add(ground);
layer.add(player);

stage.add(layer);
