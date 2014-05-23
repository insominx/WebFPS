
function Explosion() {

  // no op
  this.setNormal = function( x, y, z ) {
    // nada
  };

  // Create particle group
  this.particleGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture("textures/fx_smoke.png"),
    maxAge: 5,
    hasPerspective: 1,
    colorize: 1,
    transparent: 1,
    alphaTest: 0.5,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending

  });

// Create particle emitter 0
  this.explosionEmitter = new SPE.Emitter( {
    type: 'cube',
    particleCount: 100,
    position: new THREE.Vector3( 0, 0, 0 ),
    positionSpread: new THREE.Vector3( 1, 1, 1 ),
    acceleration: new THREE.Vector3( 0, 0, 0 ),
    accelerationSpread: new THREE.Vector3( 0, 0, 0 ),
    velocity: new THREE.Vector3( 0, 0, 0 ),
    velocitySpread: new THREE.Vector3( 0, 0, 0 ),
    sizeStart: 41.66666666666667,
    sizeStartSpread: 0,
    sizeMiddle: 45.83333333333333,
    sizeMiddleSpread: 0,
    sizeEnd: 50,
    sizeEndSpread: 0,
    angleStart: 3.141592653589793,
    angleStartSpread: 0,
    angleMiddle: 3.141592653589793,
    angleMiddleSpread: 0,
    angleEnd: 3.141592653589793,
    angleEndSpread: 0,
    angleAlignVelocity: false,
    colorStart: new THREE.Color( 0xff3a10 ),
    colorStartSpread: new THREE.Vector3( 0, 0, 0 ),
    colorMiddle: new THREE.Color( 0xff9e43 ),
    colorMiddleSpread: new THREE.Vector3( 0, 0, 0 ),
    colorEnd: new THREE.Color( 0xffd932 ),
    colorEndSpread: new THREE.Vector3( 0, 0, 0 ),
    opacityStart: 0.5333333333333333,
    opacityStartSpread: 0,
    opacityMiddle: 0,
    opacityMiddleSpread: 0,
    opacityEnd: 0,
    opacityEndSpread: 0,
    duration: 0.16,
    alive: 0.06666666666666667,
    isStatic: 0
  } );



  // Create particle emitter 0
  this.projectileEmitter = new SPE.Emitter( {
    type: 'cube',
    particleCount: 100,
    position: new THREE.Vector3( 0, 0, 0 ),
    positionSpread: new THREE.Vector3( 0, 0.11111111111111112, 0 ),
    sizeStart: 4.8888888888888875,
    sizeStartSpread: 0,
    sizeMiddle: 5.166666666666661,
    sizeMiddleSpread: 0,
    sizeEnd: 4.61111111111111,
    sizeEndSpread: 0,
    angleStart: 3.141592653589793,
    angleStartSpread: 0,
    angleMiddle: 0,
    angleMiddleSpread: 0,
    angleEnd: 0,
    angleEndSpread: 0,
    angleAlignVelocity: false,
    colorStart: new THREE.Color( 0xfc6210 ),
    colorStartSpread: new THREE.Vector3( 0, 0, 0 ),
    colorMiddle: new THREE.Color( 0xffa461 ),
    colorMiddleSpread: new THREE.Vector3( 0, 0, 0 ),
    colorEnd: new THREE.Color( 0xffffff ),
    colorEndSpread: new THREE.Vector3( 0, 0, 0 ),
    opacityStart: 1,
    opacityStartSpread: 0,
    opacityMiddle: 0.5,
    opacityMiddleSpread: 0,
    opacityEnd: 0,
    opacityEndSpread: 0,
    duration: 0.16,
    alive: 0.2833333333333333,
    isStatic: 0,
    acceleration: new THREE.Vector3( 0, -6.666666666666668, 0 ),
    accelerationSpread: new THREE.Vector3( 0, 0, 0 ),
    velocity: new THREE.Vector3( 0, 16.888888888888893, 0 ),
    velocitySpread: new THREE.Vector3( 18.22222222222222, 18.555555555555557, 18.22222222222222 )
  } );

  this.particleGroup.addEmitter( this.explosionEmitter );
  this.particleGroup.addEmitter( this.projectileEmitter );

}

