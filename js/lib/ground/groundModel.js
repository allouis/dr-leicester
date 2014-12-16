var groundModel = function(posX, posY, width, height) {
	return {
		dimensions: {
			x: width,
			y: height
		},
		position: {
			x: posX,
			y: posY
		},
		velocity: {
			x: 0,
			y: 0
		},
		acceleration: {
			x: 0,
			y: 0
		}
	};
}

module.exports = groundModel;
