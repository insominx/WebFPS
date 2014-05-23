/**
 * C. Darken based on PointerLockControl.js by mrdoob / http://mrdoob.com/ distributed with three.js r66
 */

var PointerLockAngleControls = function ( camera, heightOffset ) {

	var scope = this;

	camera.rotation.set( 0, 0, 0 );

	var pitchObject = new THREE.Object3D();
	pitchObject.add( camera );

	var yawObject = new THREE.Object3D();
	yawObject.position.y = 0;
	yawObject.add( pitchObject );

	var offsetObject = new THREE.Object3D();
	offsetObject.position.y = heightOffset;
	offsetObject.add( yawObject );

	var PI_2 = Math.PI / 2;

  var directionResult = new THREE.Vector3(  );

	var onMouseMove = function ( event ) {

		if ( scope.enabled === false ) return;

		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		yawObject.rotation.y -= movementX * 0.002;
		pitchObject.rotation.x -= movementY * 0.002;

		pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );

	};

	document.addEventListener( 'mousemove', onMouseMove, false );

	this.enabled = true;

	this.getObject = function () {

		return offsetObject;

	};

	this.getDirection = function() {

		// assumes the camera itself is not rotated

		var direction = new THREE.Vector3( 0, 0, -1 );
		var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

		return function( v ) {

			rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );

			v.copy( direction ).applyEuler( rotation );

			return v;

		}

	}();

};
