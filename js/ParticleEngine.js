

THREE.ParticleEngineGeometry = function() {


  var setTriangle = function( vertArray, startIndex, centerX, centerY ) {

		vertArray[ startIndex + 0 ] = centerX - 1;
		vertArray[ startIndex + 1 ] = centerY - 1;
		vertArray[ startIndex + 2 ] = 0;
		vertArray[ startIndex + 3 ] = centerX + 1;
		vertArray[ startIndex + 4 ] = centerY - 1;
		vertArray[ startIndex + 5 ] = 0;
		vertArray[ startIndex + 6 ] = centerX - 1;
		vertArray[ startIndex + 7 ] = centerY + 1;
		vertArray[ startIndex + 8 ] = 0;

	}

	var setColor = function( colorArray, startIndex ) {

		colorArray[ startIndex + 0 ] = 1;
		colorArray[ startIndex + 1 ] = 1;
		colorArray[ startIndex + 2 ] = 0;

	}

  var init = function() {

    var width = 10;
    var numParticles = width * width;
    var numVerts = numParticles * 3;
    var numElements = numVerts * 3;

    THREE.BufferGeometry.call( this );

    var verts = new THREE.BufferAttribute( new Float32Array( numElements ), 3 );
    var colors = new THREE.BufferAttribute( new Float32Array( numElements ), 3 );
    var references = new THREE.BufferAttribute( new Float32Array( numElements * 2 ), 2 );

    this.addAttribute( 'position', verts );
    this.addAttribute( 'particleColor', colors );
    this.addAttribute( 'reference', references );

    var elementsPerParticle = numElements / numParticles;

    for ( var i = 0; i < numParticles; ++i ) {

      var v = i * elementsPerParticle;

      var x = i % width;
      var y = (i / width) | 0;

      setTriangle( verts.array, v, x, y );
      setColor( colors.array, v );
      setColor( colors.array, v + 3 );
      setColor( colors.array, v + 6 );

      references.array[ v + 0 ] = ( i % width ) / width;
      references.array[ v + 1 ] = ( i / width ) / width;

    }
  }

  init.call( this );

}

THREE.ParticleEngineGeometry.prototype = Object.create( THREE.BufferGeometry.prototype );

THREE.ParticleEngine = function() {

}

