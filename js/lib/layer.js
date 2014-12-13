var Kinetic = require('kinetic');

var backgroundView = require('./backgroundView.js');
var groundView = require('./groundView.js');

var layer = new Kinetic.Layer();

var ground = groundView.ground;
var background = backgroundView.background;

layer.add(background);
layer.add(ground);


exports.layer = layer;
