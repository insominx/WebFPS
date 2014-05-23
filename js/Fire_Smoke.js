
function Fire_Smoke() {

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
    blending: THREE.NormalBlending
    
  });
  
// Create particle emitter 0
  this.emitter = new SPE.Emitter( {
    type: 'cube',
    particleCount: 100,
    position: new THREE.Vector3( 0, 0, 0 ),
    positionSpread: new THREE.Vector3( 20, 20, 20 ),
    acceleration: new THREE.Vector3( 0, 0, 0 ),
    accelerationSpread: new THREE.Vector3( 0, 0, 0 ),
    velocity: new THREE.Vector3( 3.3333333333333357, 11.333333333333332, 2.8888888888888857 ),
    velocitySpread: new THREE.Vector3( 0, 0, 0 ),
    sizeStart: 33.22222222222222,
    sizeStartSpread: 0,
    sizeMiddle: 29.333333333333332,
    sizeMiddleSpread: 0,
    sizeEnd: 27.111111111111107,
    sizeEndSpread: 0,
    angleStart: 1.0821041362364845,
    angleStartSpread: 0,
    angleMiddle: 1.9547687622336491,
    angleMiddleSpread: 0,
    angleEnd: 2.164208272472969,
    angleEndSpread: 0,
    angleAlignVelocity: false,
    colorStart: new THREE.Color( 0x222222 ),
    colorStartSpread: new THREE.Vector3( 0, 0, 0 ),
    colorMiddle: new THREE.Color( 0x444444 ),
    colorMiddleSpread: new THREE.Vector3( 0, 0, 0 ),
    colorEnd: new THREE.Color( 0x555555 ),
    colorEndSpread: new THREE.Vector3( 0, 0, 0 ),
    opacityStart: 1,
    opacityStartSpread: 0,
    opacityMiddle: 0.8611111111111112,
    opacityMiddleSpread: 0,
    opacityEnd: 0,
    opacityEndSpread: 0,
    duration: null,
    alive: 1,
    isStatic: 0
  } );  

  this.particleGroup.addEmitter( this.emitter );

}

