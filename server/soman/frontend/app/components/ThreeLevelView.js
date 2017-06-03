import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import { Row, Col, Card, CardTitle, CardBlock, Button, Form, FormGroup, Label, Input, ButtonGroup} from 'reactstrap';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import OrbitControls from './../../OrbitControls';

class ThreeLevelView extends PureComponent {

  constructor(props, context) {
    super(props, context);
    this.state = {
      toggles: {
        sensors: true,
        blueprint: true,
        zones: true
      },
      zones: props.zones,
      level: props.level,
      buildingModel: null
    };

    this.cameraPosition = new THREE.Vector3(0, 0, 5);

    this._onAnimate = () => {
      // we will get this callback every frame

      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      this.setState({
        cubeRotation: new THREE.Euler(
          this.state.cubeRotation.x + 0.1,
          this.state.cubeRotation.y + 0.1,
          0
        ),
      });
    };
  }

  componentDidMount() {
    let json = '/media/level1.json';
    var loader = new THREE.ObjectLoader();
    loader.load(
      // resource URL
      json,
      // Function when resource is loaded
      ( object ) => {
        var mesh = object;
        this.mesh = mesh;
        console.log(mesh);
        this.init();
      }
    );
  }

  componentWillReceiveProps(nextProps)
  {
  }

  init() {

    let scene = new THREE.Scene();

    let camera = new THREE.OrthographicCamera(
      window.innerWidth / - 2,
      window.innerWidth / 2, window.innerHeight / 2,
      window.innerHeight / - 2, 1, 10000
    );
    camera.position.x = -5180.600468983319;
    camera.position.y = 3861.408560741611;
    camera.position.z = -2995.9862505668293;
    camera.setRotationFromQuaternion(new THREE.Quaternion(
      0.14121425273875396,
      0.8308954769984029,
      0.2447933188688136,
      -0.4793198091173122
    ))
    camera.zoom = 0.819091054949432;
    scene.add( this.mesh );
    window.logCamera = () => console.log(camera);

    this.sprites = [];
    this.state.zones.forEach(zone => {
      zone.sensors.forEach(sensor => {
      let sensorLabel = this.makeTextSprite( sensor.name.toUpperCase(),
      { fontsize: 32, fontface: '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif', borderColor: {r:0, g:0, b:0, a:0.5} } );
    sensorLabel.position.set(55,105,55);
    scene.add( sensorLabel );
        this.sprites.push(sensorLabel);
      });
    });

    let renderer = new THREE.WebGLRenderer({
      canvas: this.refs.canvas,
      alpha: true
    });
    this.renderer = renderer;
    let rect = this.renderer.domElement.parentElement.getBoundingClientRect();
    renderer.setSize( rect.width, rect.height );
    this.scene = scene;
    this.camera = camera;

    this.controls = new THREE.OrbitControls( camera, renderer.domElement );

    this.update();

    window.addEventListener( 'resize', ::this.onWindowResize, false );
  }

  onWindowResize() {

				this.camera.aspect = window.innerWidth / window.innerHeight;
				this.camera.updateProjectionMatrix();

				let rect = this.renderer.domElement.parentElement.getBoundingClientRect();
				this.renderer.setSize( rect.width, rect.height );
  }

  makeTextSprite( message, parameters )
{
	if ( parameters === undefined ) parameters = {};

	var fontface = parameters.hasOwnProperty("fontface") ?
		parameters["fontface"] : "Arial";

	var fontsize = parameters.hasOwnProperty("fontsize") ?
		parameters["fontsize"] : 18;

	var borderThickness = parameters.hasOwnProperty("borderThickness") ?
		parameters["borderThickness"] : 4;

	var borderColor = parameters.hasOwnProperty("borderColor") ?
		parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };

	var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
		parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	context.font = "Bold " + fontsize + "px " + fontface;

	// get size data (height depends only on font size)
	var metrics = context.measureText( message );
	var textWidth = metrics.width;

	// background color
	context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
								  + backgroundColor.b + "," + backgroundColor.a + ")";
	// border color
	context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
								  + borderColor.b + "," + borderColor.a + ")";

	context.lineWidth = borderThickness;

	let paddingX = 15;
	let paddingY = 15;

	this.roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness + paddingX*2, fontsize * 1.4 + borderThickness + paddingY*2, 8);
	// 1.4 is extra height factor for text below baseline: g,j,p,q.

	// text color
	context.fillStyle = "rgba(0, 0, 0, 1.0)";

	context.fillText( message, borderThickness + paddingX, fontsize + borderThickness + paddingY);

	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas)
	texture.needsUpdate = true;

	var spriteMaterial = new THREE.SpriteMaterial(
		{ map: texture, useScreenCoordinates: false } );
	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.scale.set(100,50,1.0);
	return sprite;
}

// function for drawing rounded rectangles
roundRect(ctx, x, y, w, h, r)
{
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
	ctx.stroke();
}

  update() {
    requestAnimationFrame( ::this.update );
    this.controls.update();
    this.renderer.render( this.scene, this.camera );
  }

  shouldComponentUpdate() { return false; }

  render() {
    let width = 400;
    let height = 400;
    return <canvas width={width} height={height}
                   ref="canvas" />;
  }
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreeLevelView);
