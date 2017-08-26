import Main from './Main'
import * as THREE from 'three'
// import AbstractApplication from 'views/AbstractApplication'
// import shaderVert from './shaders/custom.vert'
// import shaderFrag from './shaders/custom.frag'


export default class App {

  constructor () {
    this.player = {}
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
         this.raycaster;
         this.blocker = document.getElementById( 'blocker' );
         this.instructions = document.getElementById( 'instructions' );
         this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
         this.scene = new THREE.Scene();
         this.scene.background = new THREE.Color( 0xffffff );
         this.scene.fog = new THREE.Fog( 0xffffff, 0, 750 );
         this.havePointerLock
         this.controlsEnabled = false
         this.moveForward = false
         this.moveBackward = false
         this.moveLeft = false
         this.moveRight = false
         this.canJump = false
         this.prevTime
         this.velocity
         this.init();
    this.init()
  }

  init() {
    let socket = io.connect('http://10.0.0.139:3000/');
    this.socket = socket;
    let self = this;
    socket.on('connect', function(data) {
        socket.emit('join', 'Hello World from client');
    });

    socket.on ('playerData', function (data) {
        console.log('Connected.', data);
        self.initializePlayers (data);
    });

    socket.on('playerJoined', function (data) {
        self.addPlayer(data);
    });

    socket.on('playerMoved', function (data) {
        self.movePlayer(data);
    });

    socket.on('killPlayer', function (data) {
        self.removePlayer(data);
    });

    socket.on('addOtherPlayer', (data) => {
        console.log('adding another player', data)
        self.addOtherPlayer(data)
    })

    setInterval (function () {
        if (self.initialized) {
            socket.emit('ping', network.id);
            console.log('pinged as #' + network.id);
        }
    }, 1000);

    this.light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
    this.light.position.set( 0.5, 1, 0.75 );
    this.scene.add( this.light );
    this.prevTime = performance.now();
    this.velocity = new THREE.Vector3();
    let that = this
    console.log('this is three:', THREE)

    THREE.PointerLockControls = function ( camera ) {
            
                var scope = this;
            
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

  animate () {
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
            this.prevTime = time;
        }
        this.renderer.render( this.scene, this.camera );
    }
}

let app = new App();
