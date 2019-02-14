import Main from './Main'
import Peer from 'peerjs';

self.peer = new Peer("player", {host: '10.0.0.165', port:443, path:'/peerjs' });

console.log("this is self", self)
