var Kinetic = require('kinetic');
//var Events = require('minivents');

//var pubsub = new Events();

var windowWidth = window.innerWidth; //this is used to determine player velocity
window.addEventListener('resize', resizeStage, false);
var stage = new Kinetic.Stage({
	container: 'container',
	width: windowWidth,
	height: window.innerHeight 
});
var layer = new Kinetic.Layer();


var resizeStage = function() {
	windowWidth = window.innerWidth;
	stage.setWidth(windowWidth);
	stage.setHeight(window.innerHeight);
};

var background = new Kinetic.Rect({
	x: 0,
	y: 0,
	width: stage.getWidth(),
	height: stage.getHeight(),
	fill: '#F0F',
});
layer.add(background);
var comp = new Kinetic.Rect({
    name: 'comp',
    x: 50,
    y: 50,
    width: 25,
    height: 25,
    fill: 'blue',
    draggable: true
});
layer.add(comp);
var player = new Kinetic.Rect({
    name: 'player',
    x: 50,
    y: 50,
    width: 25,
    height: 25,
    fill: 'green',
    draggable: true
});
layer.add(player);

stage.add(layer);

var velMag = windowWidth / 8;
var xVel;
var yVel;
var anim = new Kinetic.Animation(function(frame) {
	var xDist;
	var yDist;
	var stageWidth = stage.getWidth();
	var absPos = player.getAbsolutePosition();
	
	if (xVel) {
		xDist = xVel * (frame.timeDiff / 1000);
	}
	if (yVel) {
		yDist = yVel * (frame.timeDiff / 1000);
	}

	player.move({
		x: xDist,
		y: yDist
	});
}, layer);

anim.start();

//controls
(function () {
	var keyCodes = [];

	keyCodes[37] = keyCodes[65] = {
		down: function() {
			xVel = -velMag;
		},
		up: function() {
			xVel = 0;
		},
	};
	keyCodes[38] = keyCodes[87] = {
		down: function() {
			yVel = -velMag;
		},
		up: function() {
			yVel = 0;
		}
	};
	keyCodes[39] = keyCodes[68] = {
		down: function() {
			xVel = velMag;
		},
		up: function() {
			xVel = 0;
		}
	}
	keyCodes[40] = keyCodes[83] = {
		down: function() {
			yVel = velMag;
		},
		up: function() {
			yVel = 0;
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
	
}());
