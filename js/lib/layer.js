var Kinetic = require('kinetic');

var backgroundView = require('./backgroundView.js');
var groundViews = require('./ground/groundController.js').views;

var layer = new Kinetic.Layer();

var background = backgroundView.background;
layer.add(background);
var i;
for (i = 0; i < groundViews.length; i++) {
	layer.add(groundViews[i]);
}


exports.layer = layer;
