/**
 * @author sabidib
 */


/**
 * Creates  an arbitrary dimension Monomer. The dimension is defined by the
 * number of components in kinematics.position.
 * @constructor
 * @param {[Float]} radius     [The radius of the Monomer]
 * @param {[Float]} charge     [The charge of the Monomer, default 0]
 * @param {[Float]} mass       [The mass of the Monomer, default 0]
 * @param {[Object]} kinematics [An object with propeties : position , velocity, acceleration, force]
 */

Flory.Monomer = function(radius,charge,mass,kinematics){
    if(kinematics == undefined){
        console.log("Flory: Flory.Monomer needs at least the kinematics.position to know what the dimension of the monomer is.");
        return undefined;
    }
    if(kinematics.position == undefined){
        console.log("Flory: Flory.Monomer needs at least the kinematics.position to know what the dimension of the monomer is.");
        return undefined;
    }

    Flory.Particle.call(this);
    
    var position = undefined;
    var velocity = undefined;
    var acceleration = undefined;
    var force = undefined;
    
    if(kinematics != undefined){
        position = kinematics.position;
        velocity = kinematics.velocity;
        acceleration = kinematics.acceleration;
        force = kinematics.force;
    }
    
    this.radius = (radius != undefined ? radius : Flory.Monomer.defaultRadius);
    this.charge = (charge != undefined ? charge : 0);
    this.mass = (mass != undefined ? mass : 0);

    if(position.components == undefined && position instanceof Array){
        this.position = new Flory.Vector(position);    
    } else {
        this.position = position.clone();        
    }

    if(velocity == undefined){
        this.velocity = new Flory.Vector([].slice.apply(new Uint8Array(this.position.dimension())));
    }else if(velocity.components == undefined && velocity instanceof Array){
        this.velocity = new Flory.Vector(velocity);
    } else {
        this.velocity = velocity.clone();
    }

    if(acceleration == undefined){
        this.acceleration = new Flory.Vector([].slice.apply(new Uint8Array(this.position.dimension())));
    }else if(acceleration.components == undefined && acceleration instanceof Array){
        this.acceleration = new Flory.Vector(acceleration);
    } else {
        this.acceleration = acceleration.clone();
    }

    if(force == undefined){
        this.force = new Flory.Vector([].slice.apply(new Uint8Array(this.position.dimension())));
    } else if(force.components == undefined && force instanceof Array){
        this.force = new Flory.Vector(force);
    } else {
        this.force = force.clone();
    }
}


Flory.Monomer.prototype = Object.create(Flory.Particle.prototype);



Flory.Monomer.prototype.applyForce = function(force,time){
    for(var i = 0; i < this.acceleration.components.length;i++){
        this.acceleration.components[i] += (force.components[i]/this.mass)*time;
    }
}


    /**
     * Given the dimension index, will increment
     * the component by amount
     * @param  {Integer} dimension the dimension to increment.
     * @param  {Float} amount    the amount to increment the dimension by [-inf,+inf];
     * @return {Flory.Monomer}      returns itself.
     */
Flory.Monomer.prototype.incrementDimension = function(dimension,amount){
        this.position.components[dimension] += amount;
        return this;
    };

Flory.Monomer.prototype.distanceTo = function(a){
        return this.position.distanceTo(a.position);
    };

Flory.Monomer.prototype.distanceToSq =  function(a){
        return this.position.distanceToSq(a.position);
    };

Flory.Monomer.prototype.clone = function(){
        return new Flory.Monomer3D(this.radius,this.position);
    };
    




Flory.Monomer.defaultRadius = 1;