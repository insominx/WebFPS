
function ImpactBall() {

  var velocityMagnitude = 2.5;
  var velocitySpread = new THREE.Vector3( 3.6666666666666665, 2.5555555555555554, 3.2222222222222223 );

  // apply velocity in the direction of the normal
  this.setNormal = function( x, y, z ) {
    var v = velocityMagnitude;
    this.emitter.velocity.set( x * v, y * v, z * v );
  };

  // Create particle group
  this.particleGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture("textures/fx_ball.png"),
    maxAge: 2,
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
    type: 'cube',
    particleCount: 41,
    position: new THREE.Vector3( 0, 0, 0 ),
    positionSpread: new THREE.Vector3( 0, 0, 0 ),
    acceleration: new THREE.Vector3( 0, -6.888888888888889, 0 ),
    accelerationSpread: new THREE.Vector3( 0, 0, 0 ),
    velocity: new THREE.Vector3( 0, 6.444444444444443, 0 ),
    velocitySpread: new THREE.Vector3( 15, 15, 15 ),
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
    colorStart: new THREE.Color( 0xffffff ),
    colorStartSpread: new THREE.Vector3( 0, 0, 0 ),
    colorMiddle: new THREE.Color( 0xffffff ),
    colorMiddleSpread: new THREE.Vector3( 0, 0, 0 ),
    colorEnd: new THREE.Color( 0xffffff ),
    colorEndSpread: new THREE.Vector3( 0, 0, 0 ),
    opacityStart: 1,
    opacityStartSpread: 0,
    opacityMiddle: 1,
    opacityMiddleSpread: 0,
    opacityEnd: 1,
    opacityEndSpread: 0,
    duration: 0.16,
    alive: 1,
    isStatic: 0
  } );

  this.particleGroup.addEmitter( this.emitter );

}

