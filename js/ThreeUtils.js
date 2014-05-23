
window.THREEx = window.THREEx || { };

THREEx.Utils = {

// -----------------------------------------------------------------------------
createSkybox: function( directoryUrl, format, size ) {

  size = ( size != undefined ) ? size: 5000;

  var urls = [
    directoryUrl + 'px' + format, directoryUrl + 'nx' + format,
    directoryUrl + 'py' + format, directoryUrl + 'ny' + format,
    directoryUrl + 'pz' + format, directoryUrl + 'nz' + format
   ];

  var textureCube = THREE.ImageUtils.loadTextureCube(urls);

  var shader = THREE.ShaderLib["cube"];
  shader.uniforms["tCube"].value = textureCube;

  // We're inside the box, so make sure to render the backsides
  // It will typically be rendered first in the scene and without depth so anything else will be drawn in front
  var material = new THREE.ShaderMaterial({
    fragmentShader : shader.fragmentShader,
    vertexShader   : shader.vertexShader,
    uniforms       : shader.uniforms,
    depthWrite     : false,
    side           : THREE.BackSide
  });

  // The box dimension size doesn't matter that much when the camera is in the center.  Experiment with the values.
  skyMesh = new THREE.Mesh( new THREE.BoxGeometry( size, size, size, 1, 1, 1 ), material );
  skyMesh.renderDepth = -10;

  return skyMesh;

},

// -----------------------------------------------------------------------------
createNoisePlaneData: function( seed, width, height, scale ) {

  var data = new Uint8Array( 3 * width * height );
  noise.seed( seed );

  for ( var y = 0; y < height; ++y ) {

    for ( var x = 0; x < width; ++x ) {

      var i = 3 * ( y * width + x );
      var value =( noise.simplex2( y * scale, x * scale ) + 1 ) / 2;
      data[ i ] = data[ i + 1] = data[ i + 2] = value * 255;

    }

  }

  return data;

},

// -----------------------------------------------------------------------------
createHeightPlane: function( heightData, width, length, widthSegs, lengthSegs ) {

  var plane = new THREE.PlaneGeometry( width, length, widthSegs, lengthSegs );
  plane.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

  var gridX = widthSegs + 1;
  var gridZ = lengthSegs + 1;

  for ( var iz = 0; iz < gridZ; iz ++ ) {

    var percentHeight = iz / lengthSegs;

    for ( var ix = 0; ix < gridX; ix ++ ) {

        var percentWidth = ix / widthSegs;

        var row = Math.round( percentHeight * ( 512 - 1) );
        var column = Math.round( percentWidth * ( 512 - 1) );

        var rowPixel = row * 512 * 3;
        var columnPixel = column * 3;

        var index = rowPixel + columnPixel;

        var vertIndex = iz * gridX + ix;
        plane.vertices[ vertIndex ].y = heightData[index] * 5 / 255;
    }

  }

  // Not sure how much of this (if any) is needed
  plane.computeFaceNormals();
  plane.computeVertexNormals();
  plane.normalsNeedUpdate = true;
  plane.buffersNeedUpdate = true;

  return plane;

},

// -----------------------------------------------------------------------------
createHeightPlaneFromTexture: function( texture, width, length, widthSegs, lengthSegs ) {

  var plane = new THREE.PlaneGeometry( width, length, widthSegs, lengthSegs );
  plane.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

  var gridX = widthSegs + 1;
  var gridZ = lengthSegs + 1;

  for ( var iz = 0; iz < gridZ; iz ++ ) {

    var percentHeight = iz / lengthSegs;

    for ( var ix = 0; ix < gridX; ix ++ ) {

        var percentWidth = ix / widthSegs;

        var row = Math.round( percentHeight * ( 512 - 1) );
        var column = Math.round( percentWidth * ( 512 - 1) );

        var rowPixel = row * 512 * 3;
        var columnPixel = column * 3;

        var index = rowPixel + columnPixel;

        var vertIndex = iz * gridX + ix;
        plane.vertices[ vertIndex ].y = 0;
    }

  }

  // Not sure how much of this (if any) is needed
  plane.computeFaceNormals();
  plane.computeVertexNormals();
  plane.normalsNeedUpdate = true;
  plane.buffersNeedUpdate = true;

  return plane;

},

// -----------------------------------------------------------------------------
createHeatMapTexture: function( heightData, width, height ) {

  var heatColor = new THREE.Color();
  var heatData = new Uint8Array( 3 * width * height );

  for ( var y = 0; y < height; ++y ) {

    for ( var x = 0; x < width; ++x ) {

      var i = 3 * ( y * width + x );
      var value = heightData[ i ] / 255;
      heatColor.setHSL( 0.66 - value * 0.66, 1, 0.5 );
      heatData[ i ] = heatColor.r * 255;
      heatData[ i + 1] = heatColor.g * 255;
      heatData[ i + 2] = heatColor.b * 255;

    }

  }

  var heatTexture = new THREE.DataTexture( heatData, width, height, THREE.RGBFormat );
  heatTexture.needsUpdate = true;

  return heatTexture;

},

// -----------------------------------------------------------------------------
createCapsuleGeometry: function( radius, height ) {

  var cylinderHeight = height - radius * 2;
  var cylinder = new THREE.CylinderGeometry( radius, radius, cylinderHeight, 20, 10, true );
  var cap = new THREE.SphereGeometry( radius, 10, 10, 0, Math.PI * 2, 0, Math.PI );

  cylinder.merge( cap, new THREE.Matrix4().makeTranslation( 0, -cylinderHeight / 2, 0 ) );
  cylinder.merge( cap, new THREE.Matrix4().compose(
    new THREE.Vector3(0, cylinderHeight / 2, 0 ),
    new THREE.Quaternion().setFromEuler( new THREE.Euler( Math.PI, 0, 0 ) ),
    new THREE.Vector3( 1, 1, 1 )
  ) );

  return cylinder;

},

// -----------------------------------------------------------------------------
createCharacterTestCapsule: function( radius, height ) {

  var character = new THREE.Mesh(
    THREEx.Utils.createCapsuleGeometry( radius, height ),
    new THREE.MeshLambertMaterial( { color: 0x00FF00, ambient: 0x00FF00 } )
  );

  // helps indicate which direction is forward
  var directionMesh = new THREE.Mesh(
    new THREE.BoxGeometry( 0.2, 0.2, 1, 1, 1, 1 ),
    new THREE.MeshLambertMaterial( { color: 0x0000FF, ambient: 0x0000FF, transparent: true, opacity: 0.25 } )
  );

  character.castShadow = directionMesh.castShadow = true;

  character.add( directionMesh );
  directionMesh.position.set( 0, 0, -1.5 );

  return character;

},

// -----------------------------------------------------------------------------
batchLoadJSON: function( list, completeCB ) {

  var results = {};
  var loadCount = 0;

  for ( var i = 0; i < list.length; ++i ) {
    var loader = new THREE.JSONLoader();
    loader.load( list[ i ].url, bindLoad( list[ i ].name ) );
  }

  function bindLoad( name ) {

    var thisName = name;

    return function onLoaded( geometry, materials ) {
      results[ thisName ] = {};
      results[ thisName ].geometry = geometry;
      results[ thisName ].materials = materials;

      if ( ++loadCount === list.length ) {
        completeCB && completeCB( results );
      }
    }

  }


}


} // end of ThreeUtils

