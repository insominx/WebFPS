/**
 * @author insominx - Michael Guerrero
 */

THREE.TerrainGeometryBasic = function( heightScale, width, length, widthSegs, lengthSegs ) {

    this.heightScale = heightScale;

    var heightData = null;
    var mapWidth = 0;
    var mapWidth = 0;
    var channels = 0;

    THREE.PlaneGeometry.call( this, width, length, widthSegs, lengthSegs );

    // -------------------------------------------------------------------------
    this.createGeometry = function( heightImageUrl, finishedCallback) {

       function bind( scope, fn ) {
            return function () {
                fn.apply( scope, arguments );
                if (finishedCallback != null) {
                    finishedCallback();
                }
            };
        };

        this.terrainHeight = THREE.ImageUtils.loadTexture( heightImageUrl,
            undefined, bind( this, this.onTerrainHeightmapLoaded ));

        this.terrainHeight.magFilter = THREE.NearestFilter;
        this.terrainHeight.minFilter = THREE.NearestFilter;

        switch ( this.terrainHeight.format ) {
            case THREE.AlphaFormat:
            case THREE.LuminanceFormat:
                channels = 1;
                break;
            case THREE.RGBFormat:
                channels = 3;
                break;
            case THREE.RGBAFormat:
                channels = 4;
                break;
            default:
                alert( 'invalid height texture' );
        }
    };

    // -------------------------------------------------------------------------
    this.onTerrainHeightmapLoaded = function() {

        heightData = this.getHeightImageData().data;

        mapWidth = this.terrainHeight.image.width;
        mapHeight = this.terrainHeight.image.height;

        this.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

        var gridX = this.parameters.widthSegments + 1;
        var gridZ = this.parameters.heightSegments + 1;

        for ( iz = 0; iz < gridZ; iz ++ ) {

            var percentHeight = iz / this.parameters.heightSegments;

            for ( ix = 0; ix < gridX; ix ++ ) {

                var percentWidth = ix / this.parameters.widthSegments;

                var row = Math.round( percentHeight * ( mapHeight - 1 ) );
                var column = Math.round( percentWidth * ( mapWidth - 1 ) );

                var rowPixel = row * mapWidth * channels;
                var columnPixel = column * channels;

                var index = rowPixel + columnPixel;

                var vertIndex = iz * gridX + ix;
                this.vertices[ vertIndex ].y = heightData[index] * this.heightScale / 255.0;
            }
        };

        this.computeFaceNormals();
        this.computeVertexNormals();
        this.verticesNeedUpdate = true;
        this.buffersNeedUpdate = true;
    };

    // -------------------------------------------------------------------------
    this.getHeightImageData = function () {

        var canvas = document.createElement('canvas');

        //var canvas = document.getElementById('mycanvas');
        var mapWidth = this.terrainHeight.image.width;
        var mapHeight = this.terrainHeight.image.height;

        canvas.width = mapWidth;
        canvas.height = mapHeight;

        var context = canvas.getContext("2d");
        context.drawImage(this.terrainHeight.image, 0, 0);

        return context.getImageData(0, 0, mapWidth, mapHeight);
    };

    // -------------------------------------------------------------------------
    this.getTerrainHeight = function( x, y ) {

        var halfWidth = width / 2;
        var halfLength = length / 2;

        var percentWidth = (x + halfWidth) / width;
        var percentLength = (y + halfLength) / length;

        var preciseRow = percentLength * (mapHeight - 1);
        var preciseCol = percentWidth * (mapWidth - 1);

        var row = Math.round(preciseRow);
        var col = Math.round(preciseCol);

        var rowPixel = row * mapWidth * channels;
        var columnPixel = col * channels;

        var index = rowPixel + columnPixel;

        var dx = preciseRow - row;
        var dy = preciseCol - col;

        // bilinear filter the result
        var q11 = heightData[index];
        var q12 = heightData[index + channels];
        var q21 = heightData[index + mapWidth * channels];
        var q22 = heightData[index + (mapWidth + 1) * channels];

        var result =  q11 * (1.0 - dx) * (1.0 - dy) +
                      q21 * dx * (1.0 - dy) +
                      q12 * (1.0 - dx) * dy +
                      q22 * dx * dy;

        return result * this.heightScale / 255.0;
    };

};

THREE.TerrainGeometryBasic.prototype = Object.create( THREE.PlaneGeometry.prototype );
