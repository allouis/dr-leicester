var Kinetic = require('kinetic');

var stage = new Kinetic.Stage({
	container: 'container',
	width: 512,
	height: 512 
});
var layer = new Kinetic.Layer();

var rect = new Kinetic.Rect({
    name: 'rect',
    x: 50,
    y: 50,
    width: 25,
    height: 25,
    fill: 'black',
    draggable: true
});
var circ = new Kinetic.Circle({
    id: 'circ',
    x: 100,
    y: 100,
    radius: 5,
    fill: 'red'
});

layer.add(rect);
layer.add(circ);
stage.add(layer);

var velMag = 256;
var vel = velMag;
var anim = new Kinetic.Animation(function(frame) {
	var stageWidth = stage.getWidth();
	var absPos = circ.getAbsolutePosition();
	if (absPos.x >= stageWidth) {
		vel = -velMag;
	} else if (absPos.x <= 0) {
		vel = velMag;
	}
	var xDist = vel * (frame.timeDiff / 1000);
	var yDist = 0;

	circ.move({
		x: xDist,
		y: yDist
	});
}, layer);

anim.start();
