

function AmmoFPSController( camera, threeObject, radius, height, eyeHeight, physics ) {

  var scope = this;

  this.world = physics;
  this.object = threeObject;
  this.body = null;

  // movement and rotation toggles
  this.forward = false;
  this.right = false;
  this.left = false;
  this.back = false;
  this.jump = false;
  this.pointerLockControls = null;

  this.movementSpeed = 10;
  this.jumpImpulse = 1000;

  this.isGrounded = false;
  this.groundPadding = height * 0.05;

  var currentGroundHeight = 0;
  var ammoUpVector = new Ammo.btVector3( 0, 1, 0 );
  var ammoVelocityVector = new Ammo.btVector3( 0, 0, 0 );

  // ---------------------------------------------------------------------------
  this.lockPointer = function() {

    var element = document.body;
    // element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
    // element.requestFullscreen();
    element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
    element.requestPointerLock();

  };

  // ---------------------------------------------------------------------------
  this.update = function( dt ) {

    updateRenderMatrix.call( this, dt );
    updateGrounding.call( this );

    if ( this.isGrounded ) {

        if ( !this.jump ) {

          // Clamp the threeObject to the terrain to prevent floating off hills
          var hat = this.object.matrixWorld.elements[ 13 ] - height / 2 - currentGroundHeight;
          this.body.translate( new Ammo.btVector3( 0, -hat, 0 ) );

          // get forward direction
          var meshForward = new THREE.Vector3();
          this.pointerLockControls.getDirection( meshForward );

          // convert to Ammo vector, project to plane
          var dir = new Ammo.btVector3( meshForward.x, 0, meshForward.z );
          dir.normalize();

          // right direction is dir X yUnit
          var right = dir.cross( ammoUpVector );

          ammoVelocityVector.setZero();

          if ( this.ahead )
            ammoVelocityVector.op_add( dir );
          if ( this.right )
            ammoVelocityVector.op_add( right );
          if ( this.left )
            ammoVelocityVector.op_sub( right );
          if ( this.back )
            ammoVelocityVector.op_sub( dir );

          // Only apply movement if we have a significant distance to cover
          if ( ammoVelocityVector.length2() > 0.001 ) {

            ammoVelocityVector.normalize();

            ammoVelocityVector.op_mul( this.movementSpeed );
            this.body.setLinearVelocity( ammoVelocityVector );

          } else {

            ammoVelocityVector.setZero();
            this.body.setLinearVelocity( ammoVelocityVector );
          }

        } else {

          this.body.applyCentralImpulse( new Ammo.btVector3( 0, this.jumpImpulse, 0 ) );

        }

      }

    this.jump = false;

  };

  // ---------------------------------------------------------------------------
  var updateRenderMatrix = (function() {

    var position = new THREE.Vector3();

    return function( dt ) {

      // copy the rigid body transform to the render object transform
      var trans = this.body.getWorldTransform();
      var mat = this.object.matrixWorld;
      Ammo.Utils.b2three( trans, mat );

      position.set( mat.elements[ 12 ], mat.elements[ 13 ], mat.elements[ 14 ] );

      // Wipe out any rotation that comes from the physics
      mat.identity();
      mat.setPosition( position );

    }

  })();

  // ---------------------------------------------------------------------------
  var updateGrounding = ( function() {

    var fromPoint = new Ammo.btVector3();
    var toPoint = new Ammo.btVector3();

    return function() {

      // allow jumps a chance to get off the ground
      if ( this.body.getLinearVelocity().getY() < 0 ) {

          fromPoint.setValue(
          this.object.matrixWorld.elements[ 12 ],
          this.object.matrixWorld.elements[ 13 ],
          this.object.matrixWorld.elements[ 14 ]
        );

        toPoint.setValue( fromPoint.x(), fromPoint.y() - height / 2 - this.groundPadding, fromPoint.z() );

        var rayCallback = new Ammo.ClosestRayResultCallback( fromPoint, toPoint );

        this.world.rayTest( fromPoint, toPoint, rayCallback );
        this.isGrounded = rayCallback.hasHit();

        if ( this.isGrounded ) {

          currentGroundHeight = rayCallback.get_m_hitPointWorld().getY();
        }

      } else {

        this.isGrounded = false;

      }

    }


  } )();

  // ---------------------------------------------------------------------------
  var init = function() {

    this.object.matrixAutoUpdate = false;

    // z value supposedly not used, but setting to radius just in case
    var shape = new Ammo.btCapsuleShape( radius, height / 2 );

    // slightly off the ground
    var transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( Ammo.Utils.createAmmoVector3FromThree( threeObject.position ) );

    localInertia = new Ammo.btVector3( 0, 0, 0 );

    var motionState = new Ammo.btDefaultMotionState( transform );
    var mass = 100;

    shape.calculateLocalInertia( mass, localInertia );

    var cInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, shape,localInertia );

    this.body = new Ammo.btRigidBody( cInfo );
    this.body.setWorldTransform( transform );
    this.body.setDamping( 0, 1.0 );

    // keeps physics from going to sleep (from bullet documentation)
    var DISABLE_DEACTIVATION = 4;
    this.body.setActivationState( DISABLE_DEACTIVATION );
    dynamicsWorld.addRigidBody( this.body );

    // turns off all rotation
    this.body.setAngularFactor( new Ammo.btVector3( 0, 1, 0 ) );

    this.pointerLockControls = new PointerLockAngleControls( camera, eyeHeight - height / 2 );
    threeObject.add( this.pointerLockControls.getObject() );

  }


  init.call( this );

}