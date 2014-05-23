

function AmmoMesh( geometry, material, x, y, z, makeStatic ) {

  this.rigidBody = null;
  this.renderMesh = null;

  makeStatic = ( makeStatic != undefined ) ? makeStatic: true;

  // ---------------------------------------------------------------------------
  this.update = function() {

    // WARNING - this may cause problems if called on a static object (mass == 0)
    var trans = this.rigidBody.getWorldTransform();
    var mat = this.renderMesh.matrixWorld;
    Ammo.Utils.b2three( trans, mat );

  }

  // ---------------------------------------------------------------------------
  var init = function() {

    if ( geometry instanceof THREE.SphereGeometry ) {

      this.rigidBody = Ammo.Utils.createDynamicSphere( geometry.parameters.radius, x, y, z );

    }
    else if ( geometry instanceof THREE.BoxGeometry ) {

      if ( makeStatic ) {

        this.rigidBody = Ammo.Utils.createStaticBox(
        geometry.parameters.width,
        geometry.parameters.height,
        geometry.parameters.depth,
        x, y, z );

      } else {
        alert( 'dynamic box in implemented' );
      }

    } else {

      var points = [];

      for ( var i = 0; i < geometry.vertices.length; ++i ) {

        points.push( geometry.vertices[ i ].x );
        points.push( geometry.vertices[ i ].y );
        points.push( geometry.vertices[ i ].z );

      }

      this.rigidBody = Ammo.Utils.createStaticConvexHull( points, x, y, z );

    }

    this.renderMesh = new THREE.Mesh( geometry, material );
    this.renderMesh.position.set( x, y, z );
    this.renderMesh.matrixWorld.setPosition( this.renderMesh.position );

    this.renderMesh.castShadow = true;
    this.renderMesh.receiveShadow = true;
    this.renderMesh.matrixAutoUpdate = false;

  }

  init.call( this );

}