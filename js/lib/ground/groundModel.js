var groundModel = function(posX, posY, width, height) {
	return {
		position:{
			x: posX,
			y: posY
		},
		width: width,
		height: height,
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
