var Kinetic = require('kinetic');

var groundView = function(posX, posY, width, height) {
	var ground = new Kinetic.Rect({
		x: posX,
		y: posY,
		width: width,
		height: height,
		fill: '#0F0',
	});
	return ground;
};
module.exports = groundView;
