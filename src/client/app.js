import Main from './Main'
import {Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh} from 'three';
let scene
let camera
let renderer
let cube

function test() {
  let myApp = new Main()
    var socket = io.connect('http://localhost:3000');
        socket.on('connect', function(data) {
                    socket.emit('join', 'Hello World from client');
                });
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
