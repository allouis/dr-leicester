var PhysicsEngine = function() {
	this.objects = [];
	this.gravity = 1024;
	this.dragCoefficient = 1 / 16384;
	this.frictionCoefficient = 1 / 4;
};
PhysicsEngine.prototype = {
	addObject: function(obj) {
		this.objects.push(obj);
	},
	compute: function(dt) {
		this.objects.forEach(function(obj, i, objects) {
			if (obj.velocity === undefined) {
				return;
			}
			if (obj.mass) {
				this.collisionDetection(obj, i, objects);
				this.resolveForces(obj);
			}
			this.computeVelAndPos(obj, dt / 1024);
		}, this);
	},
	collisionDetection: function(obj1, i, objects) {
		if (obj1.touching) {
			obj1.touching = obj1.touching.map(function () {
				return false;
			});
		}
		objects.slice(i + 1, objects.length).forEach(function(obj2) {
			var checkForCollisionOnAxis = this.checkForCollision.bind(this, obj1, obj2);
			if (checkForCollisionOnAxis('x') && checkForCollisionOnAxis('y')) {
				this.resolveCollision(obj1, obj2);
			}
		}, this);
	},
	checkForCollision: function(obj1, obj2, axis) {
		if (obj1.position[axis] + obj1.dimensions[axis] < obj2.position[axis]) {
			return false;
		}
		if (obj1.position[axis] > obj2.position[axis] + obj2.dimensions[axis]) {
			return false;
		}
		return true;
	},
	_computeOverlap: function (obj1, obj2, axis) {
		if (obj1.position[axis] > obj2.position[axis]) {
			//does not return 0 because this would count as touching
			return -Number.MIN_VALUE;
		}
		return obj1.position[axis] + obj1.dimensions[axis] - obj2.position[axis];
	},
	_noCollisionOnAxis: function (obj1, obj2, axis) {
		return obj1.position[axis] > obj2.position[axis] &&
		obj1.position[axis] + obj1.dimensions[axis] < obj2.position[axis] + obj2.dimensions[axis];
	},
	_resolveCollisionHelper: function (obj1, obj2, axis) {
		var dimension = obj1.velocity[axis] >= 0 ? -obj1.dimensions[axis] : obj2.dimensions[axis];
		obj1.position[axis] = obj2.position[axis] + dimension;
		obj1.velocity[axis] *= -obj1.restitution;
	},
	resolveCollision: function(obj1, obj2, collision) {
		//[top, right, bottom, left]
		var overlap = [
			this._computeOverlap(obj2, obj1, 'y'),
			this._computeOverlap(obj1, obj2, 'x'),
			this._computeOverlap(obj1, obj2, 'y'),
			this._computeOverlap(obj2, obj1, 'x')
		];

		if (obj1.touching) {
			obj1.touching = obj1.touching.map(function (element, index) {
				return overlap[index] >= 0;
			});
		}
		if (this._noCollisionOnAxis(obj1, obj2, 'x')) {
			this._resolveCollisionHelper(obj1, obj2, 'y');
			return;
		}
		if (this._noCollisionOnAxis(obj1, obj2, 'y')) {
			this._resolveCollisionHelper(obj1, obj2, 'x');
			return;
		}

		var yOverlap = overlap[0] + overlap[2];
		var xOverlap = overlap[1] + overlap[3];

		if (yOverlap < xOverlap) {
			this._resolveCollisionHelper(obj1, obj2, 'y');
			return;
		}
		if (xOverlap < yOverlap) {
			this._resolveCollisionHelper(obj1, obj2, 'x');
			return;
		}
	},
	resolveForces: function(obj) {
		//gravity
		Math.min(obj.acceleration.y += this.gravity, this.gravity);
		//drag
		if (obj.velocity.x > 0) {
			obj.acceleration.x -= Math.pow(obj.velocity.x, 2) *
				this.dragCoefficient * obj.dimensions.y;
		} else if (obj.velocity.x < 0) {
			obj.acceleration.x += Math.pow(obj.velocity.x, 2) *
				this.dragCoefficient * obj.dimensions.y;
		}
		if (obj.velocity.y > 0) {
			obj.acceleration.y -= Math.pow(obj.velocity.y, 2) *
				this.dragCoefficient * obj.dimensions.x;
		} else if (obj.velocity.x < 0) {
			obj.acceleration.y += Math.pow(obj.velocity.y, 2) *
				this.dragCoefficient * obj.dimensions.x;
		}
		//friction
		//only on x-axis, need to work out component of force
		//along x-axis to calculate friction on the y-axis
		if (obj.touching) {
			if (obj.touching[0] || obj.touching[2]) {
				if (obj.velocity.x > 0) {
					obj.acceleration.x -= this.frictionCoefficient * obj.mass * 1024;
				} else if (obj.velocity.x < 0) {
					obj.acceleration.x += this.frictionCoefficient * obj.mass * 1024;
				}
				return;
			}
		}
	},
	computeVelAndPos: function(obj, dt) {
		obj.velocity.x += obj.acceleration.x * dt;
		obj.velocity.y += obj.acceleration.y * dt;
		obj.position.x += obj.velocity.x * dt;
		obj.position.y += obj.velocity.y * dt;
		//reset acceleration
		obj.acceleration.x = 0;
		obj.acceleration.y = 0;
	}
};

module.exports = PhysicsEngine;
