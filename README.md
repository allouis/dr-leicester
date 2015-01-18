#Dr Leicester
##About
Platform game in development
##Physics Engine
###Some documentation on the physics engine to aid development
- PhysicsEngine is a class which currently takes no parameters
- Objects are added to the physics engine using addObject method
- Objects added to the physics engine must have the following properties:
 - Mass: Number
   - If set to 0 then immune to forces
 - Dimensions: Object with x and y properties
 - Position: Object with x and y properties
 - Velocity: Object with x and y properties
 - Acceleration: Object with x and y properties
- Physics engine currently models gravity, friction, air resistance and collisions for rectangular objects
- To compute physics use compute method and pass in the time difference since physics was last computed
