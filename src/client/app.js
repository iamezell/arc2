// import Player from './worldobjects/Player';
// import 'ws-audio-api'
import workletUrl from '../../public/js/audio-processor';

export default class App {
  constructor () {
    this.init()
  }

  init () {
    
//     let player = new WSAudioAPI.Player({
//       server: {
//           host: window.location.hostname, //websockets server addres. In this example - localhost
//           port: 80 //websockets server port
//   }});

//   let streamer = new WSAudioAPI.Streamer({
//     server: {
//         host: window.location.hostname, //websockets server addres. In this example - localhost
//         port: 80 //websockets server port
// }});

  let streamerStartBtn = document.getElementById("streamerStartBtn")
//   let streamerStopBtn = document.getElementById("streamerStopBtn")

  // streamerStartBtn.addEventListener("click", ()=>{
  //   streamer.start()
  // }, this)

//   streamerStopBtn.addEventListener("click", ()=>{
//     streamer.stop()
//   }, this)


  //   let soundController = {}
  //   soundController.recording = false

  // let makeStream = (socket) => {
  //   navigator.getUserMedia({ audio: true }, function(stream) {
  //     let stream = stream;
  //     let audioInput = audioContext.createMediaStreamSource(stream);
  //     let gainNode = audioContext.createGain();
  //     let recorder = audioContext.createScriptProcessor(_this.config.codec.bufferSize, 1, 1);
  //     recorder.onaudioprocess = function(e) {
  //       var resampled = _this.sampler.resampler(e.inputBuffer.getChannelData(0));
  //       var packets = _this.encoder.encode_float(resampled);
  //       for (var i = 0; i < packets.length; i++) {
  //         if (socket.readyState == 1) socket.send(packets[i]);
  //       }
  //     };
  //     audioInput.connect(gainNode);
  //     gainNode.connect(recorder);
  //     recorder.connect(audioContext.destination);
  //   }, (err)=>{console.log("error", err)});
  // }
  //   let exampleSocket = new WebSocket("wss://localhost", "protocolOne")

  // //   // audioWorkletContext.connect(context.destination)
  // //   // for legacy browsers
  //   exampleSocket.onopen = function (event) {
  //     // exampleSocket.send("Here's some text that the server is urgently awaiting!");
  //     makeStream( exampleSocket)
  //     exampleSocket.close() 
  //   };

      //  const AudioContext = new window.AudioContext() || window.webkitAudioContext

      //  AudioContext.audioWorklet.addModule(workletUrl).then(() => {
      //   navigator.mediaDevices.getUserMedia({ audio: true }, stream => {
      //     let microphone = AudioContext.createMediaStreamSource(stream);
      //     let oggEncoder = new AudioWorkletNode(context, 'ogg');
          
      //     microphone.connect(oggEncoder).connect(AudioContext.destination);
      //   });
      // });

      // var person = prompt("Please enter your name", "Harry Potter");

      // if (person != null) {
      //   touchStarted()
      // }
      streamerStartBtn.addEventListener("click", ()=>{
        touchStarted()
      }, this)

      
      const touchStarted = async ()=> {
        const AudioContext = new window.AudioContext() || window.webkitAudioContext

        await AudioContext.audioWorklet.addModule(workletUrl)
         navigator.mediaDevices.getUserMedia({ audio: true }, stream => {
           let microphone = AudioContext.createMediaStreamSource(stream);
           let oggEncoder = new AudioWorkletNode(context, 'ogg');
           
           microphone.connect(oggEncoder).connect(AudioContext.destination);
         });
       
      }
      

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
