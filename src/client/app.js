export default class App {
    constructor() {
        this.init();    
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
    
    
}