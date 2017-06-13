import Main from './Main'
import {Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, PlaneGeometry} from 'three';
let scene
let camera
let renderer
let cube
let playerData
let player
let objects = []
let otherPlayers = []
let otherPlayersId = []
let moveSpeed = 0
let turnSpeed = 0.01
let keyState = {}
let socket = {}
let meshFloor = {}

function test() {
    socket = io.connect('http://172.20.10.8:3000/');

    socket.on('connect', function(data) {
        socket.emit('join', 'Hello World from client');
    });

    socket.on('messages', (data) => {
        console.log(data)
    })

    socket.on('createPlayer', (data) => {
        console.log('creating player!', data)
        createPlayer(data, socket)
    })

    socket.on('addOtherPlayer', (data) => {
        console.log('adding another player', data)
        addOtherPlayer(data)
    })
}

function init(){
    scene = new Scene()
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000)
   
    renderer = new WebGLRenderer()
    renderer.setSize(window.innerWidth,window.innerHeight)
    document.body.appendChild(renderer.domElement)

    //Events------------------------------------------
    // document.addEventListener('click', onMouseClick, false );
    // document.addEventListener('mousedown', onMouseDown, false);
    // document.addEventListener('mouseup', onMouseUp, false);
    // document.addEventListener('mousemove', onMouseMove, false);
    // document.addEventListener('mouseout', onMouseOut, false);
    document.addEventListener('keydown', onKeyDown, false );
    document.addEventListener('keyup', onKeyUp, false );

    // window.addEventListener( 'resize', onWindowResize, false );
   
    var geometry = new PlaneGeometry(10, 10, 10,10)
    var material = new MeshBasicMaterial({color: 0x00ff00, wireframe: true})
    // cube = new Mesh(geometry, material)
    meshFloor = new Mesh(geometry, material)
    meshFloor.rotation.x += Math.PI  * -0.5
    // scene.add(cube)
    scene.add(meshFloor)
}

function createPlayer (data, socket){

    playerData = data;

    let cube_geometry = new BoxGeometry(data.sizeX, data.sizeY, data.sizeZ);
    let cube_material = new MeshBasicMaterial({color: 0x7777ff, wireframe: true});
    player = new Mesh(cube_geometry, cube_material);

    player.rotation.set(0,0,0);

    player.position.x = data.x;
    player.position.y = data.y;
    player.position.z = data.z;

    player.playerId = data.playerId;
    player.moveSpeed = data.speed;
    player.turnSpeed = data.turnSpeed;

    updateCameraPosition();

    objects.push( player );
    scene.add( player );

    camera.lookAt( player.position )
    console.log('player created')
    socket.emit('playerCreated', data)
}

function addOtherPlayer (data){
    let cube_geometry = new BoxGeometry(data.sizeX, data.sizeY, data.sizeZ);
    let cube_material = new MeshBasicMaterial({color: 0xffffff, wireframe: false});
    let otherPlayer = new Mesh(cube_geometry, cube_material);

    otherPlayer.position.x = data.x;
    otherPlayer.position.y = data.y;
    otherPlayer.position.z = data.z;

    otherPlayersId.push( data.playerId );
    otherPlayers.push( otherPlayer );
    objects.push( otherPlayer );
    scene.add( otherPlayer );
    console.log('other player added')

};

function updateCameraPosition(){

    camera.position.x = player.position.x + 1 * Math.sin( player.rotation.y );
    camera.position.y = player.position.y + 1;
    camera.position.z = player.position.z + 1 * Math.cos( player.rotation.y );

};

function onKeyDown( event ){

    //event = event || window.event;

    keyState[event.keyCode || event.which] = true;

}

function onKeyUp( event ){

    //event = event || window.event;

    keyState[event.keyCode || event.which] = false;

}

var checkKeyStates = function(){

    if (keyState[38] || keyState[87]) {
        // up arrow or 'w' - move forward
        console.log('using up arrow or w to move forward')
        player.position.x -= moveSpeed * Math.sin(player.rotation.y);
        player.position.z -= moveSpeed * Math.cos(player.rotation.y);
        updatePlayerData();
        socket.emit('updatePosition', playerData);
    }
    if (keyState[40] || keyState[83]) {
        // down arrow or 's' - move backward
        console.log('using down arrow or s to move backward')
        player.position.x += moveSpeed * Math.sin(player.rotation.y);
        player.position.z += moveSpeed * Math.cos(player.rotation.y);
        updatePlayerData();
        socket.emit('updatePosition', playerData);
    }
    if (keyState[37] || keyState[65]) {
        // left arrow or 'a' - rotate left
        console.log('left arrow or a - rotate left')
        player.rotation.y += turnSpeed;
        updatePlayerData();
        socket.emit('updatePosition', playerData);
    }
    if (keyState[39] || keyState[68]) {
        // right arrow or 'd' - rotate right
        player.rotation.y -= turnSpeed;
        updatePlayerData();
        socket.emit('updatePosition', playerData);
    }
    if (keyState[81]) {
        // 'q' - strafe left
        player.position.x -= moveSpeed * Math.cos(player.rotation.y);
        player.position.z += moveSpeed * Math.sin(player.rotation.y);
        updatePlayerData();
        socket.emit('updatePosition', playerData);
    }
    if (keyState[69]) {
        // 'e' - strage right
        player.position.x += moveSpeed * Math.cos(player.rotation.y);
        player.position.z -= moveSpeed * Math.sin(player.rotation.y);
        updatePlayerData();
        socket.emit('updatePosition', playerData);
    }

};

var updatePlayerPosition = function(data){

    var somePlayer = playerForId(data.playerId);

    somePlayer.position.x = data.x;
    somePlayer.position.y = data.y;
    somePlayer.position.z = data.z;

    somePlayer.rotation.x = data.r_x;
    somePlayer.rotation.y = data.r_y;
    somePlayer.rotation.z = data.r_z;

};

var updatePlayerData = function(){
    playerData.x = player.position.x;
    playerData.y = player.position.y;
    playerData.z = player.position.z;

    playerData.r_x = player.rotation.x;
    playerData.r_y = player.rotation.y;
    playerData.r_z = player.rotation.z;

};

 
function animate(){
    requestAnimationFrame(animate)
    update()
    render()
}
 
function update(){
    // cube.rotation.x += 0.1
    // cube.rotation.y += 0.1
}
 
function render(){
    if ( player ){

        updateCameraPosition();

        checkKeyStates();

        // camera.lookAt( player.position );
    }
    //Render Scene---------------------------------------
    renderer.clear();
    renderer.render( scene , camera );
}
 
init()
animate()
test()
