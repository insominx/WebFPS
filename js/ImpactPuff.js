
function ImpactPuff() {

  var velocityMagnitude = 2.5;
  var velocitySpread = new THREE.Vector3( 3.6666666666666665, 2.5555555555555554, 3.2222222222222223 );

  // apply velocity in the direction of the normal
  this.setNormal = function( x, y, z ) {
    var v = velocityMagnitude;
    this.emitter.velocity.set( x * v, y * v, z * v );
  };

  // Create particle group
  this.particleGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture("textures/fx_smoke.png"),
    maxAge: 3,
    hasPerspective: 1,
    colorize: 1,
    transparent: 1,
    alphaTest: 0.1,
    depthWrite: false,
    depthTest: true,
    blending: THREE.NormalBlending
    // maxAge: 0.75,
    // hasPerspective: 1,
    // colorize: 0,
    // transparent: 1,
    // alphaTest: 0.5,
    // depthWrite: false,
    // depthTest: true,
    // blending: THREE.NormalBlending

  });

  // Create particle emitter 0
  this.emitter = new SPE.Emitter( {
    type: 'cube',
    particleCount: 50,
    position: new THREE.Vector3( 0, 0, 0 ),
    positionSpread: new THREE.Vector3( 0.1, 0.1, 0.1 ),
    acceleration: new THREE.Vector3( 0, -0.5, 0 ),
    accelerationSpread: new THREE.Vector3( 0, 0, 0 ),
    velocity: new THREE.Vector3( 0, velocityMagnitude, 0 ),
    velocitySpread: velocitySpread,
    sizeStart: 12,
    sizeStartSpread: 0,
    sizeMiddle: 13.666666666666666,
    sizeMiddleSpread: 0,
    sizeEnd: 15.333333333333332,
    sizeEndSpread: 0,
    angleStart: 0,
    angleStartSpread: 0,
    angleMiddle: 0,
    angleMiddleSpread: 0,
    angleEnd: 0,
    angleEndSpread: 0,
    angleAlignVelocity: false,
    colorStart: new THREE.Color( 0xc8bb93 ),
    colorStartSpread: new THREE.Vector3( 0, 0, 0 ),
    colorMiddle: new THREE.Color( 0xc8bb93 ),
    colorMiddleSpread: new THREE.Vector3( 0, 0, 0 ),
    colorEnd: new THREE.Color( 0xc8bb93 ),
    colorEndSpread: new THREE.Vector3( 0, 0, 0 ),
    opacityStart: 0.1,
    opacityStartSpread: 0.10555555555555556,
    opacityMiddle: 0.05,
    opacityMiddleSpread: 0.05,
    opacityEnd: 0,
    opacityEndSpread: 0,
    duration: 0.02,
    alive: 1,
    isStatic: 0

    // type: 'cube',
    // particleCount: 200,
    // position: new THREE.Vector3( 0, 0, 0 ),
    // positionSpread: new THREE.Vector3( 0, 0, 0 ),
    // acceleration: new THREE.Vector3( 0, -20, 0 ),
    // accelerationSpread: new THREE.Vector3( 0, 0, 0 ),
    // velocity: new THREE.Vector3( 0, 10, 0 ),
    // velocitySpread: new THREE.Vector3( 10, 10, 10 ),
    // sizeStart: 0,
    // sizeStartSpread: 0,
    // sizeMiddle: 0.1,
    // sizeMiddleSpread: 0,
    // sizeEnd: 0,
    // sizeEndSpread: 0,
    // angleStart: 0,
    // angleStartSpread: 1,
    // angleMiddle: 0,
    // angleMiddleSpread: 1,
    // angleEnd: 0,
    // angleEndSpread: 1,
    // angleAlignVelocity: false,
    // colorStart: new THREE.Color( 0xaaaa22 ),
    // colorStartSpread: new THREE.Vector3( 0, 0, 0 ),
    // colorMiddle: new THREE.Color( 0xaaaa22 ),
    // colorMiddleSpread: new THREE.Vector3( 0, 0, 0 ),
    // colorEnd: new THREE.Color( 0xaaaa22 ),
    // colorEndSpread: new THREE.Vector3( 0, 0, 0 ),
    // opacityStart: 0.1,
    // opacityStartSpread: 0,
    // opacityMiddle: 0.05,
    // opacityMiddleSpread: 0,
    // opacityEnd: 0,
    // opacityEndSpread: 0,
    // duration: null,
    // alive: 1,
    // duration: 0.1,
    // isStatic: 0
  } );

  this.particleGroup.addEmitter( this.emitter );

}

