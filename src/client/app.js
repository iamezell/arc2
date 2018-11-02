import Main from './Main'
import * as THREE from 'three'
import Player from './worldobjects/Player'
const Chance = require('chance')
// import AbstractApplication from 'views/AbstractApplication'
// import shaderVert from './shaders/custom.vert'
// import shaderFrag from './shaders/custom.frag'


export default class App {

  constructor () {
    this.thePlayer = {}
    this.players = []
    this.other = {}
    this.initialized = false
    this.socket = {}
    this.network = {}
    this.renderer
    this.geometry
    this.material
    this.mesh
    this.light
    this.controls
    this.objects = [];
    this.otherPlayers
    this.raycaster;
    this.blocker = document.getElementById( 'blocker' );
    this.instructions = document.getElementById( 'instructions' );
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x000000 );
    this.scene.fog = new THREE.Fog( 0x000000, 0, 1000 );
    this.havePointerLock
    this.controlsEnabled = false
    this.moveForward = false
    this.moveBackward = false
    this.moveLeft = false
    this.moveRight = false
    this.canJump = false
    this.prevTime
    this.velocity
    this.last = 0
    this.audioContext
    this.init();
    this.fogIsActive = false
    this.chance = new Chance()
  }

  init() {
    let socket = io.connect('https://10.0.0.165/');
    this.socket = socket;
    let self = this;
    let realAudioInput = {};
    let dest = {};
    let recorder = {}
    let bufferSize = 4096;
    socket.on('connect', function(data) {
        socket.emit('join', 'Hello World from client');
    });
    console.log('this is the navigator', navigator)
    this.audioContext = new AudioContext()
    navigator.mediaDevices.getUserMedia({audio: true, video: false})
    .then((stream)=>{
      console.log('this is the stream', stream)
      realAudioInput = this.audioContext.createMediaStreamSource(stream);
      //dest = this.audioContext.createMediaStreamDestination();
      recorder = this.audioContext.createScriptProcessor(bufferSize, 1, 1);
      recorder.onaudioprocess = this.recorderProcess.bind(this);
      recorder.connect(this.audioContext.destination);
    })
    .catch((err)=>{
      console.log('we got an error: ', err)
    })

    socket.on ('playerData', function (data) {
        console.log('Connected.', data);
        // add id to player
        self.thePlayer.id = data.id;
        self.initializePlayers (data);
       // socket.emit('joinGroup');
    });

    socket.on('playerJoined', function (data) {
        self.addPlayer(data);
    });

    socket.on('otherPlayerJoined', function (data) {
        console.log('other player joined', data)
        self.addPlayer(data)
    });

    socket.on('playerMoved', function (data) {
      console.log('player moved', data)
        self.movePlayer(data);
    });

    socket.on('killPlayer', function (data) {
        self.removePlayer(data);
    });

    socket.on('toggleFog', function (data) {
        self.toggleFog(data);
    });

    socket.on('addOtherPlayer', (data) => {
        console.log('adding another player', data)
        self.addOtherPlayer(data)
    })

    socket.on('test', (data) => {
        console.log('just a test to see if things are working')
    })

    socket.on('audio', (data) => {
      console.log('got info froms server', data)
      self.playAudio(data);
    })


 // this.light = new THREE.HemisphereLight( 0x000000, 0x000000, 0 );
    // this.light.position.set( 0.5, 1, 0.75 );
    // this.light.groundColor = '#000000';
    // this.scene.add( this.light );
    this.prevTime = performance.now();
    this.velocity = new THREE.Vector3();
    let that = this;
    console.log('this is three:', THREE)

    THREE.PointerLockControls = function ( camera ) {
        var scope = this
        camera.rotation.set( 0, 0, 0 );
        var pitchObject = new THREE.Object3D();
                pitchObject.add( camera );

                var yawObject = new THREE.Object3D();
                yawObject.position.y = 10;
                yawObject.add( pitchObject );
                var PI_2 = Math.PI / 2;

                let onMouseMove = function ( event ) {
                    if ( scope.enabled === false ) return;

                    var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
                    var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

                    yawObject.rotation.y -= movementX * 0.002;
                    pitchObject.rotation.x -= movementY * 0.002;

                    pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );

                };

                this.dispose = function() {

                    document.removeEventListener( 'mousemove', onMouseMove, false );

                };

                document.addEventListener( 'mousemove', onMouseMove, false );

                this.enabled = false;

                this.getObject = function () {

                    return yawObject;

                };

                this.getDirection = function() {

                    // assumes the camera itself is not rotated

                    var direction = new THREE.Vector3( 0, 0, - 1 );
                    var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

                    return function( v ) {

                        rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );

                        v.copy( direction ).applyEuler( rotation );

                        return v;

                    };

                }();
    };

        this.controls = new THREE.PointerLockControls( this.camera );
        this.thePlayer.controls = this.controls;
        this.scene.add( this.controls.getObject() );
        this.havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

                        if ( this.havePointerLock ) {
                            let element = document.body;
                            let pointerlockchange = function ( event ) {
                                if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
                                    that.controlsEnabled = true;
                                    that.controls.enabled = true;
                                    blocker.style.display = 'none';
                                } else {
                                    that.controls.enabled = false;
                                    blocker.style.display = '-webkit-box';
                                    blocker.style.display = '-moz-box';
                                    blocker.style.display = 'box';
                                    instructions.style.display = '';
                                }
                            };
                            let pointerlockerror = function ( event ) {
                                instructions.style.display = '';
                            };
                            // Hook pointer lock state change events
                            document.addEventListener( 'pointerlockchange', pointerlockchange, false );
                            document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
                            document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
                            document.addEventListener( 'pointerlockerror', pointerlockerror, false );
                            document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
                            document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );
                            instructions.addEventListener( 'click', function ( event ) {
                                instructions.style.display = 'none';
                                // Ask the browser to lock the pointer
                                element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
                                element.requestPointerLock();
                            }, false );
                        } else {
                            instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
                        }


        let onKeyDown = function ( event ) {
            console.log(event.key)
            switch ( event.keyCode ) {
                case 38: // up
                case 87: // w
                    // that.fogIsActive ?
                    console.log('fog is active letting it work')
                    that.toggleFog();
                  
                    that.moveForward = true;
                    break;
                case 37: // left
                case 65: // a
                    that.moveLeft = true; break;
                case 40: // down
                case 83: // s
                    that.moveBackward = true;
                    break;
                case 39: // right
                case 68: // d
                that.moveRight = true;
                    break;
                case 32: // space
                    if ( that.canJump === true ) that.velocity.y += 350;
                    that.canJump = false;
                    break;
            }
        };

        let onKeyUp = function ( event ) {
            switch( event.keyCode ) {
                case 38: // up
                case 87: // w
                that.moveForward = false;
                    break;
                case 37: // left
                case 65: // a
                that.moveLeft = false;
                    break;
                case 40: // down
                case 83: // s
                that.moveBackward = false;
                    break;
                case 39: // right
                case 68: // d
                that.moveRight = false;
                    break;
            }
        };

        document.addEventListener( 'keydown', onKeyDown, false );
        document.addEventListener( 'keyup', onKeyUp, false );

        this.raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

        // floor
        this.geometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
        this.geometry.rotateX( - Math.PI / 2 );

        for ( let i = 0, l = this.geometry.vertices.length; i < l; i ++ ) {
                    let vertex = this.geometry.vertices[ i ];
                    vertex.x += Math.random() * 20 - 10;
                    vertex.y += Math.random() * 2;
                    vertex.z += Math.random() * 20 - 10;
                }
                for ( let i = 0, l = this.geometry.faces.length; i < l; i ++ ) {
                    let face = this.geometry.faces[ i ];
                    face.vertexColors[ 0 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
                    face.vertexColors[ 1 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
                    face.vertexColors[ 2 ] = new THREE.Color().setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
                }
                this.material = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } );
                this.mesh = new THREE.Mesh( this.geometry, this.material );
                this.scene.add( this.mesh );

                //
                this.renderer = new THREE.WebGLRenderer();
                this.renderer.setPixelRatio( window.devicePixelRatio );
                this.renderer.setSize( window.innerWidth, window.innerHeight );
                document.body.appendChild( this.renderer.domElement );
                //
                // window.addEventListener( 'resize', onWindowResize, false );
        this.animate()

  }

  toggleFog(data) {
     console.log('the cloud is there: ', data)
  }

  recorderProcess(e) {
         var left = e.inputBuffer.getChannelData(0);
         let outputBuffer = e.outputBuffer;
         console.log('this i sthe number od ', e.nmberOfChannels)
         this.socket.emit('audio-blod-send', this.convertFloat32ToInt16(left));
  }

  convertFloat32ToInt16(buffer) {
     let l = buffer.length;
     let buf = new Int16Array(l);
     while (l--) {
       buf[l] = Math.min(1, buffer[l])*0x7FFF;
     }
     return buf.buffer;
   }

 playAudio(buffer)
  {
    var audioCtx;
    var started = false;
    var gainNode =  this.audioContext.createGain();

    let source = this.audioContext.createBufferSource();
    let audioBuffer = this.audioContext.createBuffer( 1, 2048, this.audioContext.sampleRate );
    audioBuffer.getChannelData( 0 ).set( buffer );
    source.buffer = audioBuffer;
    source.connect(gainNode);
    gainNode.connect( this.audioContext.destination );
    source.start();
    console.log(buffer);
  }

  initializePlayers (data) {
      let that = this
    // loop through all the users and creating in game objects to represent them
    console.log('initialized', data);
    this.otherPlayers = data.players.filter( (item) => item.id !== 1 )
    this.otherPlayers.forEach(function(obj) {
        that.addPlayers(obj)
    });
   };

 addPlayer (data) {
     // add to player array
     let cube_geometry = new THREE.BoxGeometry(5,5,5);
     let cube_material = new THREE.MeshBasicMaterial({ color: 0x7777ff, wireframe: false})
     this.mesh = new THREE.Mesh(cube_geometry, cube_material);
     this.mesh.position.y = 3
     this.scene.add(this.mesh);
     console.log('added mesh to scene', this.mesh)
 };

 addPlayers (data) {
    // add to player array
    let player = new Player()
    player.id = data.id;
    let cube_geometry = new THREE.BoxGeometry(5,5,5);
    let cube_material = new THREE.MeshBasicMaterial({ color: 0x7777ff, wireframe: false})
    this.mesh = new THREE.Mesh(cube_geometry, cube_material);
    this.mesh.position.y = 3
    //give random x position
    this.mesh.position.x = chance.integer({min: 1, max: 10})
    // add mesh to player
    player.mesh = this.mesh;
    // add player to player aray
    this.players.push(player)
    this.scene.add(this.mesh);

    console.log('added mesh to scene', this.mesh)
};

 movePlayer (data) {
    // send player movement data to server
    console.log('this is player data coming back from server', data)
    this.players.map((item) => {
        if (item.id === data.id) {
            item.mesh.position.x = data.x
            item.mesh.position.y = data.y
            item.mesh.position.z = data.z
        }
    })
 };

 removePlayer (data) {
    // kill player
 };

 createPlayerEntity (data) {
     // make a new player from the data that came back from server

    // move player to position

    // return the player
 }
 fogToZero() {
     console.log('fog going to zero');
     console.log('this is the light f',  this.scene.fog.far)
     let fogFar = this.scene.fog.far

     if (this.fogIsActive && fogfar > 0) {
        this.fogIsActive = true
        this.scene.fog.far -= 2
     } else {
         this.fogIsActive = false
     }
 }

  animate (now) {
        window.requestAnimationFrame( this.animate.bind(this) );
        if ( this.controlsEnabled ) {
            this.raycaster.ray.origin.copy( this.controls.getObject().position );
            this.raycaster.ray.origin.y -= 10;
            var intersections = this.raycaster.intersectObjects( this.objects );
            var isOnObject = intersections.length > 0;
            var time = performance.now();
            var delta = ( time - this.prevTime ) / 1000;
            this.velocity.x -= this.velocity.x * 10.0 * delta;
            this.velocity.z -= this.velocity.z * 10.0 * delta;
            this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
            if ( this.moveForward ) {
                this.velocity.z -= 400.0 * delta;
            }
            if ( this.moveBackward ) this.velocity.z += 400.0 * delta;
            if ( this.moveLeft ) this.velocity.x -= 400.0 * delta;
            if ( this.moveRight ) this.velocity.x += 400.0 * delta;
            if ( isOnObject === true ) {
                this.velocity.y = Math.max( 0, this.velocity.y );
                canJump = true;
            }

            this.controls.getObject().translateX( this.velocity.x * delta );
            this.controls.getObject().translateY( this.velocity.y * delta );
            this.controls.getObject().translateZ( this.velocity.z * delta );
            if ( this.controls.getObject().position.y < 10 ) {
                this.velocity.y = 0;
                this.controls.getObject().position.y = 10;
                this.canJump = true;
            }
        //   console.log('emitting the player positions')

          if(!this.last || now - this.last >= 10) {
           this.last = now;
            // console.log('hello this should be every second')
           this.socket.emit('positionUpdate', {
              id: this.thePlayer.id,
              x: this.controls.getObject().position.x,
              y: this.controls.getObject().position.y,
              z: this.controls.getObject().position.z
            })
          }
            this.prevTime = time;
        }

        // update other player positions
        this.renderer.render( this.scene, this.camera );
    }
}

let app = new App();
