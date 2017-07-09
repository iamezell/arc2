import Main from './Main'

export default class App {

  constructor () {
    this.player = {}
    this.players = []
    this.other = {}
    this.initialized = false
    this.socket = {}
    this.network = {}
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

  }

 initializePlayers (data) {
   let self = this
   setTimeout(()=>{
     console.log('test', window.pc.app.root.findByName('Player'))
     self.player = window.pc.app.root.findByName('Player');
     self.other = window.pc.app.root.findByName('Other');

     let network = {}
     self.players = data.players;
     self.network.id = data.id;

     for (let i = 0; i < self.players.length; i++) {
         if (i !== self.network.id && !self.players[i].deleted) {
             self.players[i].entity = self.createPlayerEntity(data.players[i]);
             console.log('Found player.');
         }
         console.log(data);
     }

     self.initialized = true;
     console.log('initialized');
     this.loop();
   }, 3000)

  };

addPlayer (data) {
    this.players.push(data);
    this.players[this.players.length - 1].entity = this.createPlayerEntity();
};

movePlayer (data) {
    if (this.initialized && !this.players[data.id].deleted) {
        this.players[data.id].entity.rigidbody.teleport(data.x, data.y, data.z);
    }
};

removePlayer (data) {
    if (this.players[data].entity) {
        this.players[data].entity.destroy ();
        this.players[data].deleted = true;
    }
};

createPlayerEntity (data) {
    var newPlayer = this.other.clone();
    newPlayer.enabled = true;

    this.other.getParent().addChild(newPlayer);

    if (data)
        newPlayer.rigidbody.teleport(data.x, data.y, data.z);

    return newPlayer;
};

// update code called every frame
update (dt) {
    this.updatePosition();
     window.requestAnimationFrame(this.update);
};

updatePosition () {
    if (this.initialized) {
        var pos = this.player.getPosition();
        this.socket.emit('positionUpdate', {id: this.network.id, x: pos.x, y: pos.y, z: pos.z});
    }
};

loop() {
  let self = this
  function frame() {
    if (self.initialized) {
        var pos = self.player.getPosition();
        self.socket.emit('positionUpdate', {id: self.network.id, x: pos.x, y: pos.y, z: pos.z});
    }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

}

let app = new App();
