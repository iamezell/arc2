import Main from './Main'
function test() {
  let myApp = new Main()
    var socket = io.connect('http://localhost:3000');
        socket.on('connect', function(data) {
                    socket.emit('join', 'Hello World from client');
                });
}
test()
