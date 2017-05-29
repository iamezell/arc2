import Main from './Main'
import {Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh} from 'three';
let scene
let camera
let renderer
let cube
let playerData
let player
let objects = []
let otherPlayers = []
let otherPlayersId = []

function test() {
    var socket = io.connect('http://10.0.0.197:3000');

    socket.on('connect', function(data) {
        socket.emit('join', 'Hello World from client');
    });

    socket.on('messages', (data) => {
        console.log(data)
    })

    socket.on('createPlayer', (data) => {
        console.log('creating player!', data)
        createPlayer(data)
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
   
    var geometry = new BoxGeometry(1, 1, 1)
    var material = new MeshBasicMaterial({color: 0x00ff00})
    cube = new Mesh(geometry, material)
    scene.add(cube)
   
    camera.position.z = 5
}

function createPlayer (data){

    playerData = data;

    let cube_geometry = new BoxGeometry(data.sizeX, data.sizeY, data.sizeZ);
    let cube_material = new MeshBasicMaterial({color: 0x7777ff, wireframe: false});
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

    camera.lookAt( player.position );
    console.log('player created')
}

function addOtherPlayer (data){
    let cube_geometry = new BoxGeometry(data.sizeX, data.sizeY, data.sizeZ);
    let cube_material = new MeshBasicMaterial({color: 0x7777ff, wireframe: false});
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

    camera.position.x = player.position.x + 6 * Math.sin( player.rotation.y );
    camera.position.y = player.position.y + 6;
    camera.position.z = player.position.z + 6 * Math.cos( player.rotation.y );

};

 
function animate(){
    requestAnimationFrame(animate)
    update()
    render()
}
 
function update(){
    cube.rotation.x += 0.1
    cube.rotation.y += 0.1
}
 
function render(){
    renderer.render(scene, camera)
}
 
init()
animate()
test()
