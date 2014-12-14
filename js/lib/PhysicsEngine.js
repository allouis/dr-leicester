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
		// debugger;
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
					console.log('we must have hit the ground');
					this.resolveCollision(obj1, obj2);
				}
			}.bind(this));
		}.bind(this));
	},
	checkForCollision: function(obj1, obj2) {
		// debugger;
		if (obj1 === obj2) {
			return false;
		}
		var collision = {
			x: false,
			y: false
		};
		if (obj1.position.x + obj1.width < obj2.position.x) {
			console.log(1);
			return false;
		} else {
			if (obj1.position.x > obj2.position.x + obj2.width) {
				console.log(2);
				return false;
			} else {
				collision.x = true;
				//console.log('colliding on x');
			}
		}
		if (obj1.position.y + obj1.height < obj2.position.y) {
			//console.log(3);
			return false;
		} else {
			if (obj1.position.y > obj2.position.y + obj2.height) {
				console.log(4);
				return false;
			} else {
				collision.y = true;
				console.log('colliding on y');
			}
		}
		
		return collision.x && collision.y
	},
	//this is not a generalised solution as it assumes that
	//obj1 is coliding with obj2 and not vice versa
	//requires further development
	resolveCollision: function(obj1, obj2, collision) {
		/*
		if (collision.x) {
			var width = obj1.velocity.x > 0 ? -obj1.width : obj2.width;
			obj1.position.x = obj2.position.x + width;
		}
		*/
		//if (collision.y) {
		console.log('resolving collison mothefuker');

			var height = obj1.velocity.y >= 0 ? -obj1.height : obj2.height;
			
			obj1.position.y = obj2.position.y + height;
			obj1.velocity.y *= -obj1.restitution;
			console.log(obj1.position.y);
			debugger;
		// }
	}
};

module.exports = PhysicsEngine
