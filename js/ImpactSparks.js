
function ImpactSparks() {

    // apply velocity in the direction of the normal
  this.setNormal = function( x, y, z ) {
    this.emitter.velocity.set( x, y, z );
  };

  // Create particle group
  this.particleGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture("textures/star.png"),
    maxAge: 0.4444444444444445,
    hasPerspective: 1,
    colorize: 1,
    transparent: 1,
    alphaTest: 0.5,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending

  });

  // Create particle emitter 0
  this.emitter = new SPE.Emitter( {
    type: 'sphere',
    particleCount: 60,
    position: new THREE.Vector3( 0, 0, 0 ),
    positionSpread: new THREE.Vector3( 0, 0, 0 ),
    radius: 0.1,
    radiusSpread: 0,
    radiusSpreadClamp: 0,
    radiusScale: new THREE.Vector3( 1, 1, 1 ),
    speed: 25,
    speedSpread: 5,
    sizeStart: 0.5,
    sizeStartSpread: 0,
    sizeMiddle: 0.5,
    sizeMiddleSpread: 0,
    sizeEnd: 0,
    sizeEndSpread: 0,
    angleStart: 0,
    angleStartSpread: 0,
    angleMiddle: 0,
    angleMiddleSpread: 0,
    angleEnd: 0,
    angleEndSpread: 0,
    angleAlignVelocity: false,
    velocity: new THREE.Vector3( 0, 0, 0 ),
    acceleration: new THREE.Vector3( 0, -50.0, 0 ),
    colorStart: new THREE.Color( 0xf99501 ),
    colorStartSpread: new THREE.Vector3( 0.17777777777777778, 0.17777777777777778, 0.17777777777777778 ),
    colorMiddle: new THREE.Color( 0xffffff ),
    colorMiddleSpread: new THREE.Vector3( 0, 0, 0 ),
    colorEnd: new THREE.Color( 0xffffff ),
    colorEndSpread: new THREE.Vector3( 0, 0, 0 ),
    opacityStart: 1,
    opacityStartSpread: 0,
    opacityMiddle: 0.36666666666666664,
    opacityMiddleSpread: 0,
    opacityEnd: 0,
    opacityEndSpread: 0,
    duration: 0.16,
    alive: 1,
    isStatic: 0
  } );

  this.particleGroup.addEmitter( this.emitter );

}

