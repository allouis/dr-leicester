var Kinetic = require('kinetic');

var windowWidth = window.innerWidth;
window.addEventListener('resize', function() {
	windowWidth = window.innerWidth;
	stage.setWidth(windowWidth);
	stage.setHeight(window.innerHeight);
}, false);

var stage = new Kinetic.Stage({
	container: 'container',
	width: windowWidth,
	height: window.innerHeight 
});

exports.stage = stage;
