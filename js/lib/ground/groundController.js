var GroundModel = require('./groundModel');
var groundView = require('./groundView');

var ground = new GroundModel();

console.log(ground);

exports.model = ground;
exports.view = groundView.ground;
