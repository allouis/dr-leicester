var Kinetic = require('kinetic');

var backgroundView = require('./backgroundView.js');
var groundView = require('./ground/groundController.js').view;

var layer = new Kinetic.Layer();

var background = backgroundView.background;

layer.add(background);
layer.add(groundView);


exports.layer = layer;
