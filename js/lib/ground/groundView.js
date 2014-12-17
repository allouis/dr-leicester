var Kinetic = require('kinetic');

var groundView = function(params) {
	var ground = new Kinetic.Rect({
		x: params.position.x,
		y: params.position.y,
		width: params.dimensions.x,
		height: params.dimensions.y,
		fill: params.color,
	});
	return ground;
};
module.exports = groundView;
