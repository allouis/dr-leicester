var PhysicsEngine = function() {
	this.objects = [];
	this.gravity = 128;
};
PhysicsEngine.prototype = {
	addObject: function(obj) {
		this.objects.push(obj);
	},
	compute: function(dt) {
		this.resolveForces(dt / 1024);
		this.resolveCollisions();
	},
	resolveForces: function(dt) {
		this.objects.forEach(function(obj) {
			Math.min(obj.acceleration.y += this.gravity, this.gravity);
			obj.velocity.x += obj.acceleration.x * dt;
			obj.velocity.y += obj.acceleration.y * dt;
			obj.position.x += obj.velocity.x * dt;
			obj.position.y += obj.velocity.y * dt;
		}.bind(this));
	},
	resolveCollisions: function() {
		this.objects.forEach(function(obj1, i) {
			this.objects.slice(i + 1, this.objects.length).forEach(function(obj2) {
				var collision = this.checkForCollision(obj1, obj2)
				if (collision) {
					this.resolveCollision(obj1, obj2);
				}
			}.bind(this));
		}.bind(this));
	},
	checkForCollision: function(obj1, obj2) {
		if (obj1 === obj2) {
			return false;
		}
		var collision = {
			x: false,
			y: false
		};
		if (obj1.position.x + obj1.width < obj2.position.x) {
			return false;
		} else {
			if (obj1.position.x > obj2.position.x + obj2.width) {
				return false;
			} else {
				collision.x = true;
			}
		}
		if (obj1.position.y + obj1.height < obj2.position.y) {
			return false;
		} else {
			if (obj1.position.y > obj2.position.y + obj2.height) {
				return false;
			} else {
				collision.y = true;
			}
		}

		return collision.x && collision.y
	},
	//this is not a generalised solution as it assumes that
	//obj1 is coliding with obj2 and not vice versa
	//requires further development
	resolveCollision: function(obj1, obj2, collision) {
		var topOverlap = 0;
		var bottomOverlap = 0;
		var diffBetweenObjTops = obj2.position.y - obj1.position.y;
		if (diffBetweenObjTops > 0) {
			topOverlap = obj1.height - diffBetweenObjTops;
		}
		var diffBetweenObjBottoms = obj1.position.y + obj1.height - (obj2.position.y + obj2.height);
		if (diffBetweenObjBottoms > 0) {
			bottomOverlap =  obj1.height - diffBetweenObjBottoms;
		}
		var yOverlap = topOverlap + bottomOverlap;

		var leftOverlap = 0;
		var rightOverlap = 0;
		var diffBetweenObjLefts = obj2.position.x - obj1.position.x;
		if (diffBetweenObjLefts > 0) {
			leftOverlap = obj1.width - diffBetweenObjLefts;
		}
		var diffBetweenObjRights = obj1.position.x + obj1.width - (obj2.position.x + obj2.width);
		if (diffBetweenObjRights > 0) {
			rightOverlap =  obj1.width - diffBetweenObjRights;
		}
		var xOverlap = leftOverlap + rightOverlap;

		var resolveCollisionX = function() {
			var width = obj1.velocity.x >= 0 ? -obj1.width : obj2.width;
			obj1.position.x = obj2.position.x + width;
			obj1.velocity.x *= -obj1.restitution;
		};
		var resolveCollisionY = function() {
			var height = obj1.velocity.y >= 0 ? -obj1.height : obj2.height;
			obj1.position.y = obj2.position.y + height;
			obj1.velocity.y *= -obj1.restitution;
		};
		if (obj1.position.y > obj2.position.y && obj1.position.y + obj1.height < obj2.position.y + obj2.height) {
			//this is definitely a collision on the x-axis
			resolveCollisionX();
			return;
		}
		if (obj1.position.x > obj2.position.x && obj1.position.x + obj1.width < obj2.position.x + obj2.width) {
			//this is definitely a collision on the y-axis
			resolveCollisionY();
			return;
		}
		if (yOverlap > xOverlap) {
			resolveCollisionX();
			return;
		}
		if (xOverlap > yOverlap) {
			resolveCollisionY();
			return;
		}
	}
};

module.exports = PhysicsEngine
