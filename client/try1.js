import Visualizer from './classes/visualizer'
import * as THREE from 'three'

import { makeGrids } from './fraviz/grid'

var scene, camera, renderer, exporter, mesh, cameraRotationX, cameraRotationY;
var PLANE_SIZE = 10000;

let NO_SHAPES = false;
let NUMBER_OF_GRIDS = 2;
let GRID_ROTATION = 1;


// DEFAULT VALUES
let BACKGROUND_COLOR = 0x000000;
let PLANE_COLOR = 0x000000;
let GRID_COLOR = 0x00ffff;
let selectedValue = 10;
let WIERD_CAMERA = false
let MOVING_CAMERA = true;

var volumeMaterial = new THREE.MeshPhongMaterial( { color: 0xfc0303, side: THREE.DoubleSide } );
var tatumMaterial = new THREE.MeshPhongMaterial( { color: 0xfcf403, side: THREE.DoubleSide } );
var segmentMaterial = new THREE.MeshPhongMaterial( { color: 0x03fc0f, side: THREE.DoubleSide } );
var beatMaterial = new THREE.MeshPhongMaterial( { color: 0x03fcf0, side: THREE.DoubleSide } );
var barMaterial = new THREE.MeshPhongMaterial( { color: 0x0320fc, side: THREE.DoubleSide } );
var sectionMaterial = new THREE.MeshPhongMaterial( { color: 0xfc03fc, side: THREE.DoubleSide } );

let volumeObject;
let tatumObject;
let segmentObject;
let beatObject;
let barObject;
let sectionObject;

var textGeo;

let volumeText;
let tatumText;
let segmentText;
let beatText;
let barText;
let sectionText;

let gridObject;

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

// ( left-right, up-down, front-behind )
// (x, y, z)

function createObjects() {

  let x_position = -600;
  let y_position = 0;
  let z_position = -1000;

  const fontJson = require( "fonts/gentilis_regular.typeface.json" );
  const font = new THREE.Font( fontJson );

  var volumeGeo  = new THREE.TextGeometry( 'volume', { font: font,size: 55,height: 5,curveSegments: 12,bevelEnabled: true,bevelThickness: 10,bevelSize: 8,bevelOffset: 0,bevelSegments: 5} );
  volumeGeo.computeBoundingBox();
  volumeGeo.computeVertexNormals()
  var tatumGeo  = new THREE.TextGeometry( 'tatum', { font: font,size: 55,height: 5,curveSegments: 12,bevelEnabled: true,bevelThickness: 10,bevelSize: 8,bevelOffset: 0,bevelSegments: 5} );
  tatumGeo.computeBoundingBox();
  tatumGeo.computeVertexNormals()
  var segmentGeo  = new THREE.TextGeometry( 'segment', { font: font,size: 55,height: 5,curveSegments: 12,bevelEnabled: true,bevelThickness: 10,bevelSize: 8,bevelOffset: 0,bevelSegments: 5} );
  segmentGeo.computeBoundingBox();
  segmentGeo.computeVertexNormals()
  var beatGeo  = new THREE.TextGeometry( 'beat', { font: font,size: 55,height: 5,curveSegments: 12,bevelEnabled: true,bevelThickness: 10,bevelSize: 8,bevelOffset: 0,bevelSegments: 5} );
  beatGeo.computeBoundingBox();
  beatGeo.computeVertexNormals()
  var barGeo  = new THREE.TextGeometry( 'bar', { font: font,size: 55,height: 5,curveSegments: 12,bevelEnabled: true,bevelThickness: 10,bevelSize: 8,bevelOffset: 0,bevelSegments: 5} );
  barGeo.computeBoundingBox();
  barGeo.computeVertexNormals()
  var sectionGeo  = new THREE.TextGeometry( 'section', { font: font,size: 55,height: 5,curveSegments: 12,bevelEnabled: true,bevelThickness: 10,bevelSize: 8,bevelOffset: 0,bevelSegments: 5} );
  sectionGeo.computeBoundingBox();
  sectionGeo.computeVertexNormals()

  volumeObject = new THREE.Mesh( new THREE.SphereBufferGeometry( 10 ), volumeMaterial );
  tatumObject = new THREE.Mesh( new THREE.SphereBufferGeometry( 10 ), tatumMaterial );
  segmentObject = new THREE.Mesh( new THREE.SphereBufferGeometry( 10 ), segmentMaterial );
  beatObject = new THREE.Mesh( new THREE.SphereBufferGeometry( 10 ), beatMaterial );
  barObject = new THREE.Mesh( new THREE.SphereBufferGeometry( 10 ), barMaterial );
  sectionObject = new THREE.Mesh( new THREE.SphereBufferGeometry( 10 ), sectionMaterial );

  volumeText = new THREE.Mesh( new THREE.BufferGeometry().fromGeometry( volumeGeo ), volumeMaterial );
  tatumText = new THREE.Mesh( new THREE.BufferGeometry().fromGeometry( tatumGeo ), tatumMaterial );
  segmentText = new THREE.Mesh( new THREE.BufferGeometry().fromGeometry( segmentGeo ), segmentMaterial );
  beatText = new THREE.Mesh( new THREE.BufferGeometry().fromGeometry( beatGeo ), beatMaterial );
  barText = new THREE.Mesh( new THREE.BufferGeometry().fromGeometry( barGeo ), barMaterial );
  sectionText = new THREE.Mesh( new THREE.BufferGeometry().fromGeometry( sectionGeo ), sectionMaterial );


  scene.add(volumeObject)
  scene.add(tatumObject)
  scene.add(segmentObject)
  scene.add(beatObject)
  scene.add(barObject)
  scene.add(sectionObject)

  scene.add(volumeText)
  scene.add(tatumText)
  scene.add(segmentText)
  scene.add(beatText)
  scene.add(barText)
  scene.add(sectionText)

}

export default class Try1 extends Visualizer {
  constructor () {
    super({ volumeSmoothing: 100 })

    let canvas = document.getElementsByTagName('canvas')
    for (let element of canvas) {
      element.parentNode.removeChild(element);
    }

     // CAMERA
     camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight , 1, 10000 );
     camera.position.set( -100, 100, 1000 );
     camera.lookAt( -100, 100, 0 );


     // SCENE
     scene = new THREE.Scene();
     scene.background = new THREE.Color( BACKGROUND_COLOR );

     // FOG
    //  scene.fog = new THREE.Fog( BACKGROUND_COLOR, 700, 1500 );

     // LIGHTS
     var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
     hemiLight.position.set( 0, 400, 0 );
     scene.add( hemiLight );
     var directionalLight = new THREE.DirectionalLight( 0xffffff );
     directionalLight.position.set( 0, 200, 100 );
     directionalLight.castShadow = true;
     directionalLight.shadow.camera.top = 180;
     directionalLight.shadow.camera.bottom = - 100;
     directionalLight.shadow.camera.left = - 120;
     directionalLight.shadow.camera.right = 120;
     scene.add( directionalLight );

     // RENDERER
     renderer = new THREE.WebGLRenderer( { antialias: true } );
     renderer.setPixelRatio( window.devicePixelRatio );
     renderer.setSize( window.innerWidth, window.innerHeight );
     renderer.shadowMap.enabled = true;

     document.body.appendChild( renderer.domElement );
     window.addEventListener( 'resize', onWindowResize, false );
     cameraRotationX = true;
     cameraRotationY = true;

     makeGrids(scene, 2, 4700, 1);
     createObjects();
  }
  hooks () {
    this.sync.on('tatum', tatum => {

    })

    this.sync.on('segment', segment => {

    })

    this.sync.on('beat', beat => {

    })

    this.sync.on('bar', bar => {

    })

    this.sync.on('section', section => {

    })
  }

  paint ({ ctx, height, width, now }) {


    renderer.render( scene, camera );

    let speed = (this.sync.volume * 10) * (this.sync.volume * 10) * (this.sync.volume * 10)
    speed = speed / 50

    camera.position.z -= speed;
    // console.log(speed)

    if(camera.position.z < -1000){
      camera.position.z = 1000;
    }

    // this.sync.volume
    // this.sync.tatum
    // this.sync.segment
    // this.sync.beat
    // this.sync.bar
    // this.sync.section

    let camZ = camera.position.z;

    let volume = this.sync.volume * 10;
    // console.log(volume)
    let tatum = this.sync.tatum.confidence * 10;
    // console.log(tatum)
    let segment = this.sync.segment.confidence * 10;
    // console.log(segment)
    console.log(this.sync.segment)
    let beat = this.sync.beat.confidence * 10;
    // console.log(beat)
    let bar = this.sync.bar.confidence * 10;
    // console.log(bar)
    let section = this.sync.section.tempo * 0.1;
    // console.log(section)
    // console.log(this.sync.section)


    volumeObject.scale.set(volume, volume, volume)
    tatumObject.scale.set(tatum, tatum, tatum)
    segmentObject.scale.set(segment, segment, segment)
    beatObject.scale.set(beat, beat, beat)
    barObject.scale.set(bar, bar, bar)
    sectionObject.scale.set(section, section, section)

    let x_position = -900;
    let spacing = 300;
    let y_position = -300;


    volumeObject.position.set(x_position, 0, -1000 + camZ);
    volumeText.position.set(x_position - 70, y_position, -1000 + camZ);
    x_position += spacing;

    tatumObject.position.set(x_position, 0, -1000 + camZ);
    tatumText.position.set(x_position - 70, y_position, -1000 + camZ);
    x_position += spacing;

    segmentObject.position.set(x_position, 0, -1000 + camZ);
    segmentText.position.set(x_position - 70, y_position, -1000 + camZ);
    x_position += spacing;

    beatObject.position.set(x_position, 0, -1000 + camZ);
    beatText.position.set(x_position - 50, y_position, -1000 + camZ);
    x_position += spacing;

    barObject.position.set(x_position, 0, -1000 + camZ);
    barText.position.set(x_position - 50, y_position, -1000 + camZ);
    x_position += spacing;

    sectionObject.position.set(x_position, 0, -1000 + camZ);
    sectionText.position.set(x_position - 70, y_position, -1000 + camZ);
    x_position += spacing;


  }
}