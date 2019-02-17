/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/client/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/client/app.js":
/*!***************************!*\
  !*** ./src/client/app.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var _worldobjects_Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./worldobjects/Player */ "./src/client/worldobjects/Player.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var App =
/*#__PURE__*/
function () {
  function App() {
    _classCallCheck(this, App);

    this.socket = {};
    this.testBtn = document.getElementById('speak');
    this.scene = document.querySelector('a-scene');
    this.thePlayer = {};
    this.players = [];
    this.init();
    this.otherPlayers;
  }

  _createClass(App, [{
    key: "init",
    value: function init() {
      var socket = io.connect('https://10.0.0.165/');
      this.socket = socket;
      var self = this;
      var realAudioInput = {};
      var dest = {};
      var recorder = {};
      var bufferSize = 4096;
      self.playerArray = [];
      socket.emit('join', 'Hello World from client');
      this.testBtn.addEventListener('click', function (e) {
        self.audioContext.resume().then(function () {
          console.log('Playback resumed successfully');
        });
      });
      self.playerArray = [];
      socket.on('playerData', function (data) {
        console.log('Connected.!!!!!', data); // add id to player

        self.thePlayer.id = data.id;
        self.peer = Peer(self.thePlayer.id, {
          host: '10.0.0.165',
          port: 443,
          path: '/peerjs'
        }); // add yourself ?
        // self.addPlayer(data);
        //if there are other players add them

        self.initializePlayers(data);
        self.playerArray.push(self.thePlayer.id);
        self.audioContext = new AudioContext();
        navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false
        }).then(function (stream) {
          console.log('this is the stream', stream);
          self.peer.on('call', function (call) {
            console.log('sending stream');
            call.answer(stream);
          });
        }).catch(function (err) {
          console.log('we got an error: ', err);
        }); // socket.emit('joinGroup');
      });
      socket.on('playerJoined', function (data) {
        console.log('adding player', data);
        self.addPlayer(data);
      });
      socket.on('otherPlayerJoined', function (data) {
        console.log('other player joined', data); // self.initializePlayers (data);

        self.addPlayers(data);
        console.log('the new player id is', data.id); // connect to player

        var audioContext = new AudioContext();
        var devices = [];
        navigator.mediaDevices.getUserMedia({
          audio: true
        }).then(function (stream) {
          var call = self.peer.call(data.id, stream).on('stream', function (remoteStream) {
            // const audio = document.querySelector('audio');
            // check if context is in suspended state (autoplay policy)
            if (audioContext.state === 'suspended') {
              audioContext.resume();
            } // Show stream in some <video> element.


            console.log('getting remote stream', remoteStream);
            var source = audioContext.createMediaStreamSource(remoteStream);
            var panner = audioContext.createPanner();
            panner.setPosition(0, 0, 0);
            source.connect(panner);
            var dest = audioContext.createMediaStreamDestination();
            panner.connect(audioContext.destination);
            var audioObj = document.createElement("AUDIO");
            document.body.appendChild(audioObj);
            audioObj.srcObject = remoteStream;
            audioObj = null;
          });
        }).catch(function (err) {
          console.log('we got an error: ', err);
        });
      });
    }
  }, {
    key: "initializePlayers",
    value: function initializePlayers(data) {
      var _this = this;

      var that = this; // loop through all the users and creating in game objects to represent them

      console.log('initialized', data.players);
      console.log('initialized', this.thePlayer); // add ourselves to scene

      this.otherPlayers = data.players.filter(function (item) {
        return item.id !== _this.thePlayer.id;
      });
      this.otherPlayers.forEach(function (obj) {
        that.addPlayers(obj);
      });
    }
  }, {
    key: "addPlayers",
    value: function addPlayers(data) {
      // add to player array
      var player = new _worldobjects_Player__WEBPACK_IMPORTED_MODULE_0__["default"]();
      player.id = data.id;
      this.players.push(player);
      console.log('added other player to scene');
    }
  }]);

  return App;
}();


var app = new App();

/***/ }),

/***/ "./src/client/worldobjects/Player.js":
/*!*******************************************!*\
  !*** ./src/client/worldobjects/Player.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Player; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function Player() {
  _classCallCheck(this, Player);

  this.mesh = {};
};



/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC93b3JsZG9iamVjdHMvUGxheWVyLmpzIl0sIm5hbWVzIjpbIkFwcCIsInNvY2tldCIsInRlc3RCdG4iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic2NlbmUiLCJxdWVyeVNlbGVjdG9yIiwidGhlUGxheWVyIiwicGxheWVycyIsImluaXQiLCJvdGhlclBsYXllcnMiLCJpbyIsImNvbm5lY3QiLCJzZWxmIiwicmVhbEF1ZGlvSW5wdXQiLCJkZXN0IiwicmVjb3JkZXIiLCJidWZmZXJTaXplIiwicGxheWVyQXJyYXkiLCJlbWl0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJhdWRpb0NvbnRleHQiLCJyZXN1bWUiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsIm9uIiwiZGF0YSIsImlkIiwicGVlciIsIlBlZXIiLCJob3N0IiwicG9ydCIsInBhdGgiLCJpbml0aWFsaXplUGxheWVycyIsInB1c2giLCJBdWRpb0NvbnRleHQiLCJuYXZpZ2F0b3IiLCJtZWRpYURldmljZXMiLCJnZXRVc2VyTWVkaWEiLCJhdWRpbyIsInZpZGVvIiwic3RyZWFtIiwiY2FsbCIsImFuc3dlciIsImNhdGNoIiwiZXJyIiwiYWRkUGxheWVyIiwiYWRkUGxheWVycyIsImRldmljZXMiLCJyZW1vdGVTdHJlYW0iLCJzdGF0ZSIsInNvdXJjZSIsImNyZWF0ZU1lZGlhU3RyZWFtU291cmNlIiwicGFubmVyIiwiY3JlYXRlUGFubmVyIiwic2V0UG9zaXRpb24iLCJjcmVhdGVNZWRpYVN0cmVhbURlc3RpbmF0aW9uIiwiZGVzdGluYXRpb24iLCJhdWRpb09iaiIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzcmNPYmplY3QiLCJ0aGF0IiwiZmlsdGVyIiwiaXRlbSIsImZvckVhY2giLCJvYmoiLCJwbGF5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IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2NsaWVudC9hcHAuanNcIik7XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gJy4vd29ybGRvYmplY3RzL1BsYXllcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQgPSB7fVxyXG4gICAgICAgIHRoaXMudGVzdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnc3BlYWsnICk7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Etc2NlbmUnKTtcclxuICAgICAgICB0aGlzLnRoZVBsYXllciA9IHt9O1xyXG4gICAgICAgIHRoaXMucGxheWVycyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMub3RoZXJQbGF5ZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgbGV0IHNvY2tldCA9IGlvLmNvbm5lY3QoJ2h0dHBzOi8vMTAuMC4wLjE2NS8nKTtcclxuICAgICAgICB0aGlzLnNvY2tldCA9IHNvY2tldDtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHJlYWxBdWRpb0lucHV0ID0ge307XHJcbiAgICAgICAgbGV0IGRlc3QgPSB7fTtcclxuICAgICAgICBsZXQgcmVjb3JkZXIgPSB7fVxyXG4gICAgICAgIGxldCBidWZmZXJTaXplID0gNDA5NjtcclxuICAgICAgICBzZWxmLnBsYXllckFycmF5ID0gW107XHJcbiAgICAgICAgc29ja2V0LmVtaXQoJ2pvaW4nLCAnSGVsbG8gV29ybGQgZnJvbSBjbGllbnQnKTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy50ZXN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT57XHJcbiAgICAgICAgICAgIHNlbGYuYXVkaW9Db250ZXh0LnJlc3VtZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1BsYXliYWNrIHJlc3VtZWQgc3VjY2Vzc2Z1bGx5Jyk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBzZWxmLnBsYXllckFycmF5ID0gW107XHJcblxyXG4gICAgc29ja2V0Lm9uICgncGxheWVyRGF0YScsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Nvbm5lY3RlZC4hISEhIScsIGRhdGEpO1xyXG4gICAgICAgIC8vIGFkZCBpZCB0byBwbGF5ZXJcclxuICAgICAgICBzZWxmLnRoZVBsYXllci5pZCA9IGRhdGEuaWQ7XHJcbiAgICAgICAgc2VsZi5wZWVyID0gUGVlcihzZWxmLnRoZVBsYXllci5pZCwge2hvc3Q6ICcxMC4wLjAuMTY1JywgIHBvcnQ6IDQ0MywgcGF0aDonL3BlZXJqcycgfSk7XHJcbiAgICAgICAgLy8gYWRkIHlvdXJzZWxmID9cclxuICAgICAgICAvLyBzZWxmLmFkZFBsYXllcihkYXRhKTtcclxuICAgICAgICAvL2lmIHRoZXJlIGFyZSBvdGhlciBwbGF5ZXJzIGFkZCB0aGVtXHJcbiAgICAgICAgc2VsZi5pbml0aWFsaXplUGxheWVycyAoZGF0YSk7XHJcbiAgICAgICAgc2VsZi5wbGF5ZXJBcnJheS5wdXNoKHNlbGYudGhlUGxheWVyLmlkKVxyXG4gICAgICAgIHNlbGYuYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpXHJcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7YXVkaW86IHRydWUsIHZpZGVvOiBmYWxzZX0pXHJcbiAgICAudGhlbigoc3RyZWFtKT0+e1xyXG4gICAgICBjb25zb2xlLmxvZygndGhpcyBpcyB0aGUgc3RyZWFtJywgc3RyZWFtKVxyXG4gICAgICBzZWxmLnBlZXIub24oJ2NhbGwnLCAoY2FsbCk9PntcclxuICAgICAgICBjb25zb2xlLmxvZygnc2VuZGluZyBzdHJlYW0nKVxyXG4gICAgICAgIGNhbGwuYW5zd2VyKHN0cmVhbSlcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goKGVycik9PntcclxuICAgICAgY29uc29sZS5sb2coJ3dlIGdvdCBhbiBlcnJvcjogJywgZXJyKVxyXG4gICAgfSlcclxuICAgICAgIC8vIHNvY2tldC5lbWl0KCdqb2luR3JvdXAnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNvY2tldC5vbigncGxheWVySm9pbmVkJywgZnVuY3Rpb24gKGRhdGEpIFxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdhZGRpbmcgcGxheWVyJywgZGF0YSlcclxuICAgICAgICBzZWxmLmFkZFBsYXllcihkYXRhKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHNvY2tldC5vbignb3RoZXJQbGF5ZXJKb2luZWQnLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdvdGhlciBwbGF5ZXIgam9pbmVkJywgZGF0YSlcclxuICAgICAgICAvLyBzZWxmLmluaXRpYWxpemVQbGF5ZXJzIChkYXRhKTtcclxuICAgICAgICBzZWxmLmFkZFBsYXllcnMoZGF0YSlcclxuICAgICAgICBjb25zb2xlLmxvZygndGhlIG5ldyBwbGF5ZXIgaWQgaXMnLCBkYXRhLmlkKVxyXG4gICAgICAgIC8vIGNvbm5lY3QgdG8gcGxheWVyXHJcbiAgICAgICAgbGV0IGF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKVxyXG4gICAgICAgIGxldCBkZXZpY2VzID0gW11cclxuICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7YXVkaW86dHJ1ZX0pXHJcbiAgICAgICAgLnRoZW4oKHN0cmVhbSk9PntcclxuICAgICAgICBsZXQgY2FsbCA9IHNlbGYucGVlci5jYWxsKGRhdGEuaWQsIHN0cmVhbSkub24oJ3N0cmVhbScsIGZ1bmN0aW9uKHJlbW90ZVN0cmVhbSkge1xyXG4gICAgICAgICAgIC8vIGNvbnN0IGF1ZGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYXVkaW8nKTtcclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgY29udGV4dCBpcyBpbiBzdXNwZW5kZWQgc3RhdGUgKGF1dG9wbGF5IHBvbGljeSlcclxuICAgICAgICAgIGlmIChhdWRpb0NvbnRleHQuc3RhdGUgPT09ICdzdXNwZW5kZWQnKSB7XHJcbiAgICAgICAgICAgIGF1ZGlvQ29udGV4dC5yZXN1bWUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFNob3cgc3RyZWFtIGluIHNvbWUgPHZpZGVvPiBlbGVtZW50LlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0dGluZyByZW1vdGUgc3RyZWFtJywgcmVtb3RlU3RyZWFtKVxyXG4gICAgICAgICAgICB2YXIgc291cmNlID0gYXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHJlbW90ZVN0cmVhbSk7XHJcbiAgICAgICAgICAgIHZhciBwYW5uZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlUGFubmVyKCk7XHJcbiAgICAgICAgICAgIHBhbm5lci5zZXRQb3NpdGlvbigwLCAwLCAwKTtcclxuICAgICAgICAgICAgc291cmNlLmNvbm5lY3QocGFubmVyKTtcclxuICAgICAgICAgICAgdmFyIGRlc3QgPSBhdWRpb0NvbnRleHQuY3JlYXRlTWVkaWFTdHJlYW1EZXN0aW5hdGlvbigpO1xyXG4gICAgICAgICAgICBwYW5uZXIuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pXHJcbiAgICAgICAgICAgIHZhciBhdWRpb09iaiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJBVURJT1wiKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhdWRpb09iailcclxuICAgICAgICAgICAgYXVkaW9PYmouc3JjT2JqZWN0ID0gcmVtb3RlU3RyZWFtO1xyXG4gICAgICAgICAgICBhdWRpb09iaiA9IG51bGw7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyKT0+e1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ3dlIGdvdCBhbiBlcnJvcjogJywgZXJyKVxyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxufVxyXG5pbml0aWFsaXplUGxheWVycyAoZGF0YSkge1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzXHJcbiAgLy8gbG9vcCB0aHJvdWdoIGFsbCB0aGUgdXNlcnMgYW5kIGNyZWF0aW5nIGluIGdhbWUgb2JqZWN0cyB0byByZXByZXNlbnQgdGhlbVxyXG4gIGNvbnNvbGUubG9nKCdpbml0aWFsaXplZCcsIGRhdGEucGxheWVycyk7XHJcbiAgY29uc29sZS5sb2coJ2luaXRpYWxpemVkJywgdGhpcy50aGVQbGF5ZXIpO1xyXG4gIC8vIGFkZCBvdXJzZWx2ZXMgdG8gc2NlbmVcclxuICB0aGlzLm90aGVyUGxheWVycyA9IGRhdGEucGxheWVycy5maWx0ZXIoIChpdGVtKSA9PiBpdGVtLmlkICE9PSB0aGlzLnRoZVBsYXllci5pZCApXHJcbiAgdGhpcy5vdGhlclBsYXllcnMuZm9yRWFjaChmdW5jdGlvbihvYmopIHtcclxuICAgICAgdGhhdC5hZGRQbGF5ZXJzKG9iailcclxuICB9KTtcclxuIH07XHJcblxyXG4gYWRkUGxheWVycyAoZGF0YSkge1xyXG4gICAgLy8gYWRkIHRvIHBsYXllciBhcnJheVxyXG4gICAgbGV0IHBsYXllciA9IG5ldyBQbGF5ZXIoKVxyXG4gICAgcGxheWVyLmlkID0gZGF0YS5pZDtcclxuICAgIHRoaXMucGxheWVycy5wdXNoKHBsYXllcilcclxuXHJcbiAgICBjb25zb2xlLmxvZygnYWRkZWQgb3RoZXIgcGxheWVyIHRvIHNjZW5lJylcclxufTtcclxuXHJcbiAgICBcclxuICAgIFxyXG59XHJcbmxldCBhcHAgPSBuZXcgQXBwKCk7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcclxuICAgIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICB0aGlzLm1lc2ggPSB7fVxyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==