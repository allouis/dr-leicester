var Minivents = require('minivents');
var keyControls = require('./keyControls.js');

var minivents = new Minivents();

var map = {
	up: {
		pressed: false,
		down: function() {
			this.pressed = true;
			minivents.emit('move', {y: -1});
		},
		up: function() {
			this.pressed = false;
			if (!map.down.pressed) {
				minivents.emit('move', {y: 0});
			} else {
				map.down.down();
			}
		}
	},
	down: {
		pressed: false,
		down: function() {
			this.pressed = true;
			minivents.emit('move', {y: 1});
		},
		up: function() {
			this.pressed = false;
			if (!map.up.pressed) {
				minivents.emit('move', {y: 0});
			} else {
				map.up.down();
			}
		}
	},
	left: {
		pressed: false,
		down: function() {
			this.pressed = true;
			minivents.emit('move', {x: -1});
		},
		up: function() {
			this.pressed = false;
			if (!map.right.pressed) {
				minivents.emit('move', {x: 0});
			} else {
				map.right.down();
			}
		}
	},
	right: {
		pressed: false,
		down: function() {
			this.pressed = true;
			minivents.emit('move', {x: 1});
		},
		up: function() {
			this.pressed = false;
			if (!map.left.pressed) {
				minivents.emit('move', {x: 0});
			} else {
				map.left.down();
			}
		}
	}
};

keyControls.on('keyDown', function(direction) {
	if (map[direction]) {
		map[direction].down();
	}
});
keyControls.on('keyUp', function(direction) {
	if (map[direction]) {
		map[direction].up();
	}
});

exports.on = minivents.on;
exports.emit = minivents.emit;
