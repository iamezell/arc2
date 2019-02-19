import Player from './worldobjects/Player';

export default class App {
    constructor() {
        this.socket = {}
        this.testBtn = document.getElementById( 'speak' );
        this.scene = document.querySelector('a-scene');
        this.thePlayer = {};
        this.players = [];
        this.init();
        this.otherPlayers;
    }

    init() {
        let socket = io.connect('https://10.0.0.165/');
        this.socket = socket;
        let self = this;
        let realAudioInput = {};
        let dest = {};
        let recorder = {}
        let bufferSize = 4096;
        self.playerArray = [];
        socket.emit('join', 'Hello World from client');
        

        this.testBtn.addEventListener('click', (e)=>{
            self.audioContext.resume().then(() => {
                console.log('Playback resumed successfully');
              });
        })
        self.playerArray = [];

    socket.on ('playerData', function (data) {
        console.log('Connected.!!!!!', data);
        // add id to player
        self.thePlayer.id = data.id;
        self.peer = Peer(self.thePlayer.id, {host: '10.0.0.165',  port: 443, path:'/peerjs' });
        // add yourself ?
        // self.addPlayer(data);
        //if there are other players add them
        self.initializePlayers (data);
        self.playerArray.push(self.thePlayer.id)
        self.audioContext = new AudioContext()
    navigator.mediaDevices.getUserMedia({audio: true, video: false})
    .then((stream)=>{
      console.log('this is the stream', stream)
      self.peer.on('call', (call)=>{
        console.log('sending stream')
        call.answer(stream)
      })
    })
    .catch((err)=>{
      console.log('we got an error: ', err)
    })
       // socket.emit('joinGroup');
    });

    socket.on('playerJoined', function (data) 
    {
        console.log('adding player', data)
        self.addPlayer(data);
    });

    socket.on('otherPlayerJoined', function (data) {
        console.log('other player joined', data)
        // self.initializePlayers (data);
        self.addPlayers(data)
        console.log('the new player id is', data.id)
        // connect to player
        let audioContext = new AudioContext()
        let devices = []
        navigator.mediaDevices.getUserMedia({audio:true})
        .then((stream)=>{
        let call = self.peer.call(data.id, stream).on('stream', function(remoteStream) {
           // const audio = document.querySelector('audio');
            // check if context is in suspended state (autoplay policy)
          if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
            // Show stream in some <video> element.
            console.log('getting remote stream', remoteStream)
            var source = audioContext.createMediaStreamSource(remoteStream);
            var panner = audioContext.createPanner();
            panner.setPosition(0, 0, 0);
            source.connect(panner);
            var dest = audioContext.createMediaStreamDestination();
            panner.connect(audioContext.destination)
            var audioObj = document.createElement("AUDIO");
            document.body.appendChild(audioObj)
            audioObj.srcObject = remoteStream;
            audioObj = null;
          });
        })
        .catch((err)=>{
          console.log('we got an error: ', err)
        })
    });

    
}
initializePlayers (data) {
    let that = this
  // loop through all the users and creating in game objects to represent them
  console.log('initialized', data.players);
  console.log('initialized', this.thePlayer);
  // add ourselves to scene
  this.otherPlayers = data.players.filter( (item) => item.id !== this.thePlayer.id ).forEach(function(obj) {
      that.addPlayers(obj)
  });
 };

 addPlayers (data) {
  // add to player array
  let player = new Player()
  player.id = data.id;
  let mesh = document.createElement('a-box');
  player.mesh = mesh;
  player.mesh.object3D.position.set(1, 1, -2 );
  let scene = document.querySelector('a-scene');
  scene.appendChild(player.mesh);
  this.players.push(player);


  console.log(this.players);
};

    
    
}
let app = new App();