/*jshint esversion: 6 */
var Network = pc.createScript('network');

// initialize code called once per entity
Network.prototype.initialize = function() {
    this.socket = io.connect('http://localhost:3000/');
    
     this.socket.on('connect', function(data) {
        socket.emit('join', 'Hello World from client');
    });

    this.socket.on('messages', (data) => {
        console.log(data);
    });

//     this.socket.on('createPlayer', (data) => {
//         console.log('creating player!', data)
//         createPlayer(data, socket)
//     })

//     this.socket.on('addOtherPlayer', (data) => {
//         console.log('adding another player', data)
//         addOtherPlayer(data)
//     })
};

// update code called every frame
Network.prototype.update = function(dt) {
    
};

// swap method called for script hot-reloading
// inherit your script state here
// Network.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/