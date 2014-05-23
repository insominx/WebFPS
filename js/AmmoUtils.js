
Ammo.Utils = {

  // -----------------------------------------------------------------------------
  b2three: function( trans, mat ) {

    var basis = trans.getBasis();
    var origin = trans.getOrigin();
    var m = mat.elements;
    var v = basis.getRow(0);
    m[0] = v.x(); m[4+0] = v.y(); m[8+0] = v.z(); m[12+0] = origin.x();
    v = basis.getRow(1);
    m[1] = v.x(); m[4+1] = v.y(); m[8+1] = v.z(); m[12+1] = origin.y();
    v = basis.getRow(2);
    m[2] = v.x(); m[4+2] = v.y(); m[8+2] = v.z(); m[12+2] = origin.z();
    m[3] = 0.0; m[4+3] = 0.0; m[8+3] = 0.0; m[12+3] = 1.0;

  },

  // -----------------------------------------------------------------------------
  createAmmoVector3FromThree: function( threeVector ) {

    return new Ammo.btVector3( threeVector.x, threeVector.y, threeVector.z );

  },

  // -----------------------------------------------------------------------------
  createWorld: function( gravity) {

    gravity = ( gravity != undefined ) ? gravity: -10;

    var collision_config = new Ammo.btDefaultCollisionConfiguration();
    var dispatcher = new Ammo.btCollisionDispatcher( collision_config );
    var overlappingPairCache =  new Ammo.btDbvtBroadphase();
    var solver = new Ammo.btSequentialImpulseConstraintSolver();
    var dynamicsWorld = new Ammo.btDiscreteDynamicsWorld( dispatcher, overlappingPairCache, solver, collision_config );
    dynamicsWorld.setGravity(new Ammo.btVector3(0, gravity, 0));
    return dynamicsWorld;

  },

  // -----------------------------------------------------------------------------
  createStaticBox: function( xdim, ydim, zdim, x, y, z ) {

    var shape = new Ammo.btBoxShape( new Ammo.btVector3( xdim / 2, ydim / 2, zdim / 2 ) );
    var transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( x, y, z ) );
    var localInertia = new Ammo.btVector3( 0, 0, 0 );
    var motionState = new Ammo.btDefaultMotionState( transform );
    var cInfo = new Ammo.btRigidBodyConstructionInfo( 0, motionState, shape, localInertia);
    var body = new Ammo.btRigidBody(cInfo);

    return body;

  },

  // -----------------------------------------------------------------------------
  createStaticCylinder: function( xdim, ydim, zdim, x, y, z ) {

    var shape = new Ammo.btCylinderShape( new Ammo.btVector3( xdim / 2, ydim, zdim / 2 ) );
    var transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( x, y, z ) );
    var localInertia = new Ammo.btVector3( 0, 0, 0 );
    var motionState = new Ammo.btDefaultMotionState( transform );
    var cInfo = new Ammo.btRigidBodyConstructionInfo( 0, motionState, shape, localInertia);
    var body = new Ammo.btRigidBody(cInfo);

    return body;

  },

  // -----------------------------------------------------------------------------
  createStaticConvexHull: function( points, x, y, z, yaw, pitch, roll ) {

    yaw = ( yaw != undefined ) ? yaw: 0;
    pitch = ( pitch != undefined ) ? pitch: 0;
    roll = ( roll != undefined ) ? roll: 0;

    var shape = new Ammo.btConvexHullShape();

    for ( var i = 0; i < points.length; i+= 3 ) {

      var point = new Ammo.btVector3( points[ i ], points[ i + 1 ], points[ i + 2 ] );
      shape.addPoint( point );
    }

    var rotation = new Ammo.btQuaternion( yaw, pitch, roll );

    var transform = new Ammo.btTransform();
    transform.setRotation( rotation );
    transform.setOrigin( new Ammo.btVector3( x, y, z ) );
    var localInertia = new Ammo.btVector3( 0, 0, 0 );
    var motionState = new Ammo.btDefaultMotionState( transform );
    var cInfo = new Ammo.btRigidBodyConstructionInfo( 0, motionState, shape, localInertia);
    var body = new Ammo.btRigidBody(cInfo);

    return body;

  },

  // -----------------------------------------------------------------------------
  createDynamicSphere: function( radius, x, y, z ) {

    var shape = new Ammo.btSphereShape( radius );
    var transform = new Ammo.btTransform();
    var mass = 1;
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( x, y, z ) );
    var localInertia = new Ammo.btVector3( 0, 0, 0 );
    shape.calculateLocalInertia( mass, localInertia );
    var motionState = new Ammo.btDefaultMotionState( transform );
    var cInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, shape, localInertia);
    var body = new Ammo.btRigidBody( cInfo );
    body.setDamping( 0.25, 0.25 );
    return body;

  },

  // -----------------------------------------------------------------------------
  createHeightfield: function( geometry, widthSegments, heightSegments ) {

    geometry.computeBoundingBox();

    var ptr = Ammo.allocate(4 * widthSegments * heightSegments, "float", Ammo.ALLOC_NORMAL);
    var bounds = geometry.boundingBox;

    var points = [];

    var gridX = widthSegments + 1;
    var gridZ = heightSegments + 1;
    var vertCount = gridX * gridZ - 1;
    var absMaxHeight = Math.max( geometry.boundingBox.max.y, Math.abs( geometry.boundingBox.min.y ) );

    for ( var iz = 0; iz < gridZ; iz ++ ) {

        for ( var ix = 0; ix < gridX; ix ++ ) {

            var vertIndex = ( vertCount - iz * gridX ) - ix;
            Ammo.setValue( ptr + vertIndex, geometry.vertices[ vertIndex ].y, 'float' );

        }
    };

    // var a, b;
    //   for ( var i = 0; i < geometry.vertices.length; i++ ) {

    //     a = i % gridX;
    //     b = Math.round( ( i / gridX ) - ( (i % gridX) / gridX ) );
    //     points[i] = geometry.vertices[ a + ( ( gridZ - b - 1 ) * gridZ ) ].y;

    //   }

    for (var f = 0; f < points.length; f++) {
      Ammo.setValue(ptr + f,  points[f]  , 'float');
    }

    var shape = new Ammo.btHeightfieldTerrainShape(
      gridX,
      gridZ,
      ptr,
      1, // has no effect?
      -absMaxHeight,
      absMaxHeight,
      1,
      0,
      true
    );

    var xsize = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    var zsize = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

    var scaling = new Ammo.btVector3( 0, 0, 0 );

    shape.setLocalScaling( new Ammo.btVector3( xsize / widthSegments, 1, zsize / heightSegments ) );

    var transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( 0, 0, 0) );
    var localInertia = new Ammo.btVector3( 0, 0, 0 );
    var motionState = new Ammo.btDefaultMotionState( transform );
    var cInfo = new Ammo.btRigidBodyConstructionInfo(0, motionState, shape, localInertia);
    var body = new Ammo.btRigidBody(cInfo);

    return body;

  },

  // -----------------------------------------------------------------------------
  body2world: function(body,v3B) {

    var trans = body.getWorldTransform();
    var result = trans.op_mul(v3B);
    return result;

  }

}


