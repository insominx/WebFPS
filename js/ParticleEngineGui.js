/**
 * @author Michael Guerrero / http://realitymeltdown.com
 */

function ParticleEngineGui( systems ) {

	var controls = {

		gui: null,
		"Total Particles": 0,

	};

	// -------------------------------------------------------------------------
	var init = function() {

		controls.gui = new dat.GUI();

		var particles = controls.gui.addFolder( 'Particles' );
		var systemNames = systems.map( function( current ) {
			return current.name;
		});

		controls[ "Total Particles" ] = systems.reduce( function(p, c) {
			return p.particleCount + c.particleCount;
		});

		particles.add( controls, "Total Particles" );

		// for ( var i = 0; i < systems.length; ++i ) {

		// 	particles.add( systems[ i ], "name" );

		// }


		//particles.add( controls, "Show Model" ).onChange( controls.showModelChanged );

		particles.open();

	}


	init.call(this);

}