var groundModel = function(params) {
	return {
		mass: 0,
		dimensions: {
			x: params.dimensions.x,
			y: params.dimensions.y
		},
		position: {
			x: params.position.x,
			y: params.position.y
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
