var PhysicsEngine = function() {
	this.objects = [];
	this.gravity = 1024;
	this.dragCoefficient = 1 / 16384;
};
PhysicsEngine.prototype = {
	addObject: function(obj) {
		this.objects.push(obj);
	},
	compute: function(dt) {
		this.objects.forEach(function(obj, i) {
			this.collisionDetection(obj, i);
			this.resolveForces(obj);
			this.computeVelAndPos(obj, dt / 1024);
		}.bind(this));
	},
	collisionDetection: function(obj1, i) {
		if (obj1.touching) {
			obj1.touching.left = false;
			obj1.touching.right = false;
			obj1.touching.top = false;
			obj1.touching.bottom = false;
		}
		this.objects.slice(i + 1, this.objects.length).forEach(function(obj2) {
			if (!obj1.mass) {
				return;
			}
			var checkForCollisionOnAxis = this.checkForCollision.bind(this, obj1, obj2);
			if (checkForCollisionOnAxis('x') && checkForCollisionOnAxis('y')) {
				this.resolveCollision(obj1, obj2);
			}
		}.bind(this));
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
	//this is not a generalised solution as it assumes that
	//obj1 is coliding with obj2 and not vice versa
	//requires further development
	resolveCollision: function(obj1, obj2, collision) {
		var topOverlap = obj1.position.y + obj1.dimensions.y - obj2.position.y;
		var bottomOverlap = obj2.position.y + obj2.dimensions.y - obj1.position.y;
		var yOverlap = topOverlap + bottomOverlap;
		var leftOverlap = obj1.position.x + obj1.dimensions.x - obj2.position.x;
		var rightOverlap = obj2.position.x + obj2.dimensions.x - obj1.position.x;
		var xOverlap = leftOverlap + rightOverlap;

		var resolveCollision = function(axis) {
			var dimension = obj1.velocity[axis] >= 0 ? -obj1.dimensions[axis] : obj2.dimensions[axis];
			obj1.position[axis] = obj2.position[axis] + dimension;
			obj1.velocity[axis] *= -obj1.restitution;
		};

		if (obj1.position.x > obj2.position.x &&
			obj1.position.x + obj1.dimensions.x < obj2.position.x + obj2.dimensions.x) {
			//this is definitely a collision on the y-axis
			//hack to allow jumping
			if (obj1.position.y + obj1.dimensions.y >= obj2.position.y) {
				//should be touching the bottom
				if (obj1.touching) {
					obj1.touching.bottom = true;
				}
			}
			resolveCollision('y');
			return;
		}
		if (obj1.position.y > obj2.position.y && obj1.position.y + obj1.dimensions.y < obj2.position.y + obj2.dimensions.y) {
			//this is definitely a collision on the x-axis
			resolveCollision('x');
			return;
		}

		if (yOverlap > xOverlap) {
			resolveCollision('x');
			return;
		}
		if (xOverlap > yOverlap) {
			resolveCollision('y');
			return;
		}
	},
	resolveForces: function(obj) {
		//gravity
		if (obj.mass) {
			Math.min(obj.acceleration.y += this.gravity, this.gravity);
		}

		//air resistance
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
	},
	computeVelAndPos: function(obj, dt) {
		obj.velocity.x += obj.acceleration.x * dt;
		obj.velocity.y += obj.acceleration.y * dt;
		obj.position.x += obj.velocity.x * dt;
		obj.position.y += obj.velocity.y * dt;
	}
};

module.exports = PhysicsEngine;
