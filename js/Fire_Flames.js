
function Fire_Flames() {

  // Create particle group
  this.particleGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture("textures/fx_flame.png"),
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
  this.sparksEmitter = new SPE.Emitter( {
    type: 'cube',
    particleCount: 100,
    position: new THREE.Vector3( 0, 0, 0 ),
    positionSpread: new THREE.Vector3( 20, 20, 20 ),
    acceleration: new THREE.Vector3( 0, -2.6666666666666643, 0 ),
    accelerationSpread: new THREE.Vector3( 0, 0, 0 ),
    velocity: new THREE.Vector3( 0, 4.222222222222221, 0 ),
    velocitySpread: new THREE.Vector3( 7, 7.222222222222222, 7 ),
    sizeStart: 1,
    sizeStartSpread: 0,
    sizeMiddle: 1,
    sizeMiddleSpread: 0,
    sizeEnd: 1,
    sizeEndSpread: 0,
    angleStart: 0,
    angleStartSpread: 0,
    angleMiddle: 0,
    angleMiddleSpread: 0,
    angleEnd: 0,
    angleEndSpread: 0,
    angleAlignVelocity: false,
    colorStart: new THREE.Color( 0xf88b00 ),
    colorStartSpread: new THREE.Vector3( 0, 0, 0 ),
    colorMiddle: new THREE.Color( 0xff790e ),
    colorMiddleSpread: new THREE.Vector3( 0, 0, 0 ),
    colorEnd: new THREE.Color( 0xddd100 ),
    colorEndSpread: new THREE.Vector3( 0, 0, 0 ),
    opacityStart: 1,
    opacityStartSpread: 0.3,
    opacityMiddle: 0.5,
    opacityMiddleSpread: 0.35555555555555557,
    opacityEnd: 0,
    opacityEndSpread: 1,
    duration: null,
    alive: 1,
    isStatic: 0
  } );  

  this.particleGroup.addEmitter( this.sparksEmitter );

  // Create particle emitter 0
  this.flamesEmitter = new SPE.Emitter( {
    type: 'cube',
    particleCount: 200,
    position: new THREE.Vector3( 0, 0, 0 ),
    positionSpread: new THREE.Vector3( 20, 0, 20 ),
    sizeStart: 22.666666666666664,
    sizeStartSpread: 0,
    sizeMiddle: 1,
    sizeMiddleSpread: 0,
    sizeEnd: 1,
    sizeEndSpread: 0,
    angleStart: 0,
    angleStartSpread: 0,
    angleMiddle: 0,
    angleMiddleSpread: 0,
    angleEnd: 0,
    angleEndSpread: 0,
    angleAlignVelocity: false,
    colorStart: new THREE.Color( 0xf03f00 ),
    colorStartSpread: new THREE.Vector3( 0, 0, 0 ),
    colorMiddle: new THREE.Color( 0xff8911 ),
    colorMiddleSpread: new THREE.Vector3( 0, 0, 0 ),
    colorEnd: new THREE.Color( 0xffdf3b ),
    colorEndSpread: new THREE.Vector3( 0, 0, 0 ),
    opacityStart: 1,
    opacityStartSpread: 0,
    opacityMiddle: 0.16111111111111112,
    opacityMiddleSpread: 0,
    opacityEnd: 0,
    opacityEndSpread: 0,
    duration: null,
    alive: 1,
    isStatic: 0,
    acceleration: new THREE.Vector3( 0, 0, 0 ),
    accelerationSpread: new THREE.Vector3( 0, 0, 0 ),
    velocity: new THREE.Vector3( 1, 9.11111111111111, 1 ),
    velocitySpread: new THREE.Vector3( 0, 0, 0 )
  } );

  this.particleGroup.addEmitter( this.flamesEmitter );

}

