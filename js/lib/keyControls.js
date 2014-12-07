var Events = require('minivents');

var minivents = new Events();

var keyCodes = [];

keyCodes[37] = keyCodes[65] = {
	down: function() {
		minivents.emit('keyDown', 'left');
	},
	up: function() {
		minivents.emit('keyUp', 'left');
	}
};
keyCodes[38] = keyCodes[87] = {
	down: function() {
		minivents.emit('keyDown', 'up');
	},
	up: function() {
		minivents.emit('keyUp', 'up');
	}
};
keyCodes[39] = keyCodes[68] = {
	down: function() {
		minivents.emit('keyDown', 'right');
	},
	up: function() {
		minivents.emit('keyUp', 'right');
	}
}
keyCodes[40] = keyCodes[83] = {
	down: function() {
		minivents.emit('keyDown', 'down');
	},
	up: function() {
		minivents.emit('keyUp', 'down');
	}
}

document.onkeydown = function(e) {
	if (keyCodes[e.keyCode]) {
		keyCodes[e.keyCode].down();
	}
};

document.onkeyup = function(e) {
	if (keyCodes[e.keyCode]) {
		keyCodes[e.keyCode].up();
	}
}

exports.on = minivents.on;
