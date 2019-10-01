// import Player from './worldobjects/Player';
import 'ws-audio-api'

export default class App {
  constructor () {
    this.init()
  }

  init () {
    
    var player = new WSAudioAPI.Player({
      server: {
          host: window.location.hostname, //websockets server addres. In this example - localhost
          port: 5000 //websockets server port
  }});
  console.log(player)
  //   let soundController = {}
  //   soundController.recording = false
  //   let exampleSocket = new WebSocket("wss://localhost", "protocolOne")

  //   // audioWorkletContext.connect(context.destination)
  //   // for legacy browsers
  //   exampleSocket.onopen = function (event) {
  //     exampleSocket.send("Here's some text that the server is urgently awaiting!");
  //     exampleSocket.close() 
  //   };
  //   const AudioContext = window.AudioContext || window.webkitAudioContext

  //   // const audioContext = new AudioContext()

  //   if (!navigator.mediaDevices) {
  //     console.log("getUserMedia() not supported.");
  //   }
  //   soundController.device = navigator.mediaDevices.getUserMedia({ audio: true, 
  //     video: false })
  //     soundController.device.then(function (stream) {
  //       const audioWorkletContext = new AudioContext()
  //       var audioInput = audioWorkletContext.createMediaStreamSource(stream)
        
  //       audioWorkletContext.audioWorklet.addModule('js/audio-processor.js').then(()=>{
  //         let mp3WorkletNode = new AudioWorkletNode(audioInput, 'audio-processor')
  //       })

  //     }); 
  }
  
}

const app = new App()
