


settings = {

	visualization : {
		frames_per_second : 100,	
		ticks_per_frame : 1,
		number_of_steps : 100000000
	},

	experiment : {
		number_of_monomers : 200,
		radius_of_monomers : 1,
		mass_of_monomers : 1,
		charge_of_monomers :0,
		step_size : 1,
		start_at_position : [0,0,0],
		starting_max_x : 50,
		starting_max_y : 50,
		starting_max_z : 50
	},
	options : [
		{
			name : "radius",
			type : "float",
			value : 1.0,
			editable : true,
   	      	min : 0.1 ,
   	       	max : 10,
   	       	slider : true,
           	has_text_box : true,
           	step : 0.01
		}
	] 
}


var randomWalk = new Flory.Options(settings,"options");


var random = new Flory.RandomGen();
var calculator = new Flory.DataProcessor();
var monomers = [];
var randomWalk = new Flory.RandomWalk(1);


var exp = settings.experiment;










for(var i = 0; i < exp.number_of_monomers;i++){
	if(exp.start_at_position == undefined){
		monomers.push(
				getNonOverlappingMonomer(monomers,
										exp.radius_of_monomers,
										exp.mass_of_monomers,
										exp.charge_of_monomers,
										exp.min_starting_distance_apart,
										exp.starting_max_x,
										exp.starting_max_y,
										exp.starting_max_z)
				);

	} else {
		
		var pos = new Flory.Vector(exp.start_at_position);

		monomers.push(new Flory.Monomer(exp.radius_of_monomers,exp.charge_of_monomers,exp.mass_of_monomers,{position : pos }) );
	}

	randomWalk.add(monomers[i]);
}


randomWalk.enableVisualization({segments : 20, color : 0x00FF00});

var k = 0;
var fps = 0;
var msd = 0;
var total_steps = 0;
var viz = settings.visualization;
var m = setInterval(
	function(){
		if(total_steps < viz.number_of_steps){
			randomWalk.update({
				 "number_of_steps" : viz.ticks_per_frame
				});
			total_steps += viz.ticks_per_frame;
			k++;
		} else {
			randomWalk.renderer.render();
			k++;
		}	

	}
	,
	1000/viz.frames_per_second);


setInterval(function(){fps = k;k=0;},1000);
