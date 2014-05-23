/**
 * @author Michael Guerrero / http://realitymeltdown.com
 */

function FpsGui( controller, mesh, options ) {

  this.controls = {

    gui: null,
    'height': 0

  };


  // -------------------------------------------------------------------------
  var init = function() {

    this.controls.gui = new dat.GUI();

    var folder = this.controls.gui.addFolder( 'options' );

    folder.add( controller, 'isGrounded' ).listen();
    folder.add( this.controls, 'height' ).step( 0.01 ).listen();

    for ( var i in options ) {
      folder.add( options, i ).listen();
    }

    folder.open();

  }

  // ---------------------------------------------------------------------------
  this.controls.lockPointer = function() {

    var stopEvent = new CustomEvent( 'lock-pointer' );
    window.dispatchEvent( stopEvent );

  }


  init.call(this);

}