var Kinetic = require('kinetic');

var backgroundView = require('./backgroundView.js');
var groundView = require('./ground/groundController.js').views;

var layer = new Kinetic.Layer();

var background = backgroundView.background;

layer.add(background);
layer.add(groundView[0]);
layer.add(groundView[1]);


exports.layer = layer;
