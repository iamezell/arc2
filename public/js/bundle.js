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
      }).forEach(function (obj) {
        that.addPlayers(obj);
      });
    }
  }, {
    key: "addPlayers",
    value: function addPlayers(data) {
      // add to player array
      var player = new _worldobjects_Player__WEBPACK_IMPORTED_MODULE_0__["default"]();
      player.id = data.id;
      var mesh = document.createElement('a-box');
      player.mesh = mesh;
      player.mesh.object3D.position.set(1, 1, -2);
      var scene = document.querySelector('a-scene');
      scene.appendChild(player.mesh);
      this.players.push(player);
      console.log(this.players);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC93b3JsZG9iamVjdHMvUGxheWVyLmpzIl0sIm5hbWVzIjpbIkFwcCIsInNvY2tldCIsInRlc3RCdG4iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic2NlbmUiLCJxdWVyeVNlbGVjdG9yIiwidGhlUGxheWVyIiwicGxheWVycyIsImluaXQiLCJvdGhlclBsYXllcnMiLCJpbyIsImNvbm5lY3QiLCJzZWxmIiwicmVhbEF1ZGlvSW5wdXQiLCJkZXN0IiwicmVjb3JkZXIiLCJidWZmZXJTaXplIiwicGxheWVyQXJyYXkiLCJlbWl0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJhdWRpb0NvbnRleHQiLCJyZXN1bWUiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsIm9uIiwiZGF0YSIsImlkIiwicGVlciIsIlBlZXIiLCJob3N0IiwicG9ydCIsInBhdGgiLCJpbml0aWFsaXplUGxheWVycyIsInB1c2giLCJBdWRpb0NvbnRleHQiLCJuYXZpZ2F0b3IiLCJtZWRpYURldmljZXMiLCJnZXRVc2VyTWVkaWEiLCJhdWRpbyIsInZpZGVvIiwic3RyZWFtIiwiY2FsbCIsImFuc3dlciIsImNhdGNoIiwiZXJyIiwiYWRkUGxheWVyIiwiYWRkUGxheWVycyIsImRldmljZXMiLCJyZW1vdGVTdHJlYW0iLCJzdGF0ZSIsInNvdXJjZSIsImNyZWF0ZU1lZGlhU3RyZWFtU291cmNlIiwicGFubmVyIiwiY3JlYXRlUGFubmVyIiwic2V0UG9zaXRpb24iLCJjcmVhdGVNZWRpYVN0cmVhbURlc3RpbmF0aW9uIiwiZGVzdGluYXRpb24iLCJhdWRpb09iaiIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzcmNPYmplY3QiLCJ0aGF0IiwiZmlsdGVyIiwiaXRlbSIsImZvckVhY2giLCJvYmoiLCJwbGF5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VCxDQUF1QixTQUF2QixDQUFaO0FBQ0FELFdBQUssQ0FBQzBELFdBQU4sQ0FBa0JPLE1BQU0sQ0FBQ0UsSUFBekI7QUFDQSxXQUFLaEUsT0FBTCxDQUFhNEIsSUFBYixDQUFrQmtDLE1BQWxCO0FBRUE3QyxhQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLbEIsT0FBakI7QUFDRDs7Ozs7OztBQUtELElBQUlvRSxHQUFHLEdBQUcsSUFBSTVFLEdBQUosRUFBVixDOzs7Ozs7Ozs7Ozs7Ozs7O0lDaElxQnVFLE0sR0FDakIsa0JBQWU7QUFBQTs7QUFDWCxPQUFLQyxJQUFMLEdBQVksRUFBWjtBQUNILEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY2xpZW50L2FwcC5qc1wiKTtcbiIsImltcG9ydCBQbGF5ZXIgZnJvbSAnLi93b3JsZG9iamVjdHMvUGxheWVyJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnNvY2tldCA9IHt9XHJcbiAgICAgICAgdGhpcy50ZXN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdzcGVhaycgKTtcclxuICAgICAgICB0aGlzLnNjZW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYS1zY2VuZScpO1xyXG4gICAgICAgIHRoaXMudGhlUGxheWVyID0ge307XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5vdGhlclBsYXllcnM7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICBsZXQgc29ja2V0ID0gaW8uY29ubmVjdCgnaHR0cHM6Ly8xMC4wLjAuMTY1LycpO1xyXG4gICAgICAgIHRoaXMuc29ja2V0ID0gc29ja2V0O1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgcmVhbEF1ZGlvSW5wdXQgPSB7fTtcclxuICAgICAgICBsZXQgZGVzdCA9IHt9O1xyXG4gICAgICAgIGxldCByZWNvcmRlciA9IHt9XHJcbiAgICAgICAgbGV0IGJ1ZmZlclNpemUgPSA0MDk2O1xyXG4gICAgICAgIHNlbGYucGxheWVyQXJyYXkgPSBbXTtcclxuICAgICAgICBzb2NrZXQuZW1pdCgnam9pbicsICdIZWxsbyBXb3JsZCBmcm9tIGNsaWVudCcpO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICB0aGlzLnRlc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PntcclxuICAgICAgICAgICAgc2VsZi5hdWRpb0NvbnRleHQucmVzdW1lKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUGxheWJhY2sgcmVzdW1lZCBzdWNjZXNzZnVsbHknKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHNlbGYucGxheWVyQXJyYXkgPSBbXTtcclxuXHJcbiAgICBzb2NrZXQub24gKCdwbGF5ZXJEYXRhJywgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnQ29ubmVjdGVkLiEhISEhJywgZGF0YSk7XHJcbiAgICAgICAgLy8gYWRkIGlkIHRvIHBsYXllclxyXG4gICAgICAgIHNlbGYudGhlUGxheWVyLmlkID0gZGF0YS5pZDtcclxuICAgICAgICBzZWxmLnBlZXIgPSBQZWVyKHNlbGYudGhlUGxheWVyLmlkLCB7aG9zdDogJzEwLjAuMC4xNjUnLCAgcG9ydDogNDQzLCBwYXRoOicvcGVlcmpzJyB9KTtcclxuICAgICAgICAvLyBhZGQgeW91cnNlbGYgP1xyXG4gICAgICAgIC8vIHNlbGYuYWRkUGxheWVyKGRhdGEpO1xyXG4gICAgICAgIC8vaWYgdGhlcmUgYXJlIG90aGVyIHBsYXllcnMgYWRkIHRoZW1cclxuICAgICAgICBzZWxmLmluaXRpYWxpemVQbGF5ZXJzIChkYXRhKTtcclxuICAgICAgICBzZWxmLnBsYXllckFycmF5LnB1c2goc2VsZi50aGVQbGF5ZXIuaWQpXHJcbiAgICAgICAgc2VsZi5hdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KClcclxuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHthdWRpbzogdHJ1ZSwgdmlkZW86IGZhbHNlfSlcclxuICAgIC50aGVuKChzdHJlYW0pPT57XHJcbiAgICAgIGNvbnNvbGUubG9nKCd0aGlzIGlzIHRoZSBzdHJlYW0nLCBzdHJlYW0pXHJcbiAgICAgIHNlbGYucGVlci5vbignY2FsbCcsIChjYWxsKT0+e1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdzZW5kaW5nIHN0cmVhbScpXHJcbiAgICAgICAgY2FsbC5hbnN3ZXIoc3RyZWFtKVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICAgIC5jYXRjaCgoZXJyKT0+e1xyXG4gICAgICBjb25zb2xlLmxvZygnd2UgZ290IGFuIGVycm9yOiAnLCBlcnIpXHJcbiAgICB9KVxyXG4gICAgICAgLy8gc29ja2V0LmVtaXQoJ2pvaW5Hcm91cCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc29ja2V0Lm9uKCdwbGF5ZXJKb2luZWQnLCBmdW5jdGlvbiAoZGF0YSkgXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2FkZGluZyBwbGF5ZXInLCBkYXRhKVxyXG4gICAgICAgIHNlbGYuYWRkUGxheWVyKGRhdGEpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc29ja2V0Lm9uKCdvdGhlclBsYXllckpvaW5lZCcsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ290aGVyIHBsYXllciBqb2luZWQnLCBkYXRhKVxyXG4gICAgICAgIC8vIHNlbGYuaW5pdGlhbGl6ZVBsYXllcnMgKGRhdGEpO1xyXG4gICAgICAgIHNlbGYuYWRkUGxheWVycyhkYXRhKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGUgbmV3IHBsYXllciBpZCBpcycsIGRhdGEuaWQpXHJcbiAgICAgICAgLy8gY29ubmVjdCB0byBwbGF5ZXJcclxuICAgICAgICBsZXQgYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpXHJcbiAgICAgICAgbGV0IGRldmljZXMgPSBbXVxyXG4gICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHthdWRpbzp0cnVlfSlcclxuICAgICAgICAudGhlbigoc3RyZWFtKT0+e1xyXG4gICAgICAgIGxldCBjYWxsID0gc2VsZi5wZWVyLmNhbGwoZGF0YS5pZCwgc3RyZWFtKS5vbignc3RyZWFtJywgZnVuY3Rpb24ocmVtb3RlU3RyZWFtKSB7XHJcbiAgICAgICAgICAgLy8gY29uc3QgYXVkaW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhdWRpbycpO1xyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiBjb250ZXh0IGlzIGluIHN1c3BlbmRlZCBzdGF0ZSAoYXV0b3BsYXkgcG9saWN5KVxyXG4gICAgICAgICAgaWYgKGF1ZGlvQ29udGV4dC5zdGF0ZSA9PT0gJ3N1c3BlbmRlZCcpIHtcclxuICAgICAgICAgICAgYXVkaW9Db250ZXh0LnJlc3VtZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgLy8gU2hvdyBzdHJlYW0gaW4gc29tZSA8dmlkZW8+IGVsZW1lbnQuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXR0aW5nIHJlbW90ZSBzdHJlYW0nLCByZW1vdGVTdHJlYW0pXHJcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBhdWRpb0NvbnRleHQuY3JlYXRlTWVkaWFTdHJlYW1Tb3VyY2UocmVtb3RlU3RyZWFtKTtcclxuICAgICAgICAgICAgdmFyIHBhbm5lciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVQYW5uZXIoKTtcclxuICAgICAgICAgICAgcGFubmVyLnNldFBvc2l0aW9uKDAsIDAsIDApO1xyXG4gICAgICAgICAgICBzb3VyY2UuY29ubmVjdChwYW5uZXIpO1xyXG4gICAgICAgICAgICB2YXIgZGVzdCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVNZWRpYVN0cmVhbURlc3RpbmF0aW9uKCk7XHJcbiAgICAgICAgICAgIHBhbm5lci5jb25uZWN0KGF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbilcclxuICAgICAgICAgICAgdmFyIGF1ZGlvT2JqID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkFVRElPXCIpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGF1ZGlvT2JqKVxyXG4gICAgICAgICAgICBhdWRpb09iai5zcmNPYmplY3QgPSByZW1vdGVTdHJlYW07XHJcbiAgICAgICAgICAgIGF1ZGlvT2JqID0gbnVsbDtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnIpPT57XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnd2UgZ290IGFuIGVycm9yOiAnLCBlcnIpXHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG59XHJcbmluaXRpYWxpemVQbGF5ZXJzIChkYXRhKSB7XHJcbiAgICBsZXQgdGhhdCA9IHRoaXNcclxuICAvLyBsb29wIHRocm91Z2ggYWxsIHRoZSB1c2VycyBhbmQgY3JlYXRpbmcgaW4gZ2FtZSBvYmplY3RzIHRvIHJlcHJlc2VudCB0aGVtXHJcbiAgY29uc29sZS5sb2coJ2luaXRpYWxpemVkJywgZGF0YS5wbGF5ZXJzKTtcclxuICBjb25zb2xlLmxvZygnaW5pdGlhbGl6ZWQnLCB0aGlzLnRoZVBsYXllcik7XHJcbiAgLy8gYWRkIG91cnNlbHZlcyB0byBzY2VuZVxyXG4gIHRoaXMub3RoZXJQbGF5ZXJzID0gZGF0YS5wbGF5ZXJzLmZpbHRlciggKGl0ZW0pID0+IGl0ZW0uaWQgIT09IHRoaXMudGhlUGxheWVyLmlkICkuZm9yRWFjaChmdW5jdGlvbihvYmopIHtcclxuICAgICAgdGhhdC5hZGRQbGF5ZXJzKG9iailcclxuICB9KTtcclxuIH07XHJcblxyXG4gYWRkUGxheWVycyAoZGF0YSkge1xyXG4gIC8vIGFkZCB0byBwbGF5ZXIgYXJyYXlcclxuICBsZXQgcGxheWVyID0gbmV3IFBsYXllcigpXHJcbiAgcGxheWVyLmlkID0gZGF0YS5pZDtcclxuICBsZXQgbWVzaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EtYm94Jyk7XHJcbiAgcGxheWVyLm1lc2ggPSBtZXNoO1xyXG4gIHBsYXllci5tZXNoLm9iamVjdDNELnBvc2l0aW9uLnNldCgxLCAxLCAtMiApO1xyXG4gIGxldCBzY2VuZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Etc2NlbmUnKTtcclxuICBzY2VuZS5hcHBlbmRDaGlsZChwbGF5ZXIubWVzaCk7XHJcbiAgdGhpcy5wbGF5ZXJzLnB1c2gocGxheWVyKTtcclxuXHJcbiAgY29uc29sZS5sb2codGhpcy5wbGF5ZXJzKTtcclxufTtcclxuXHJcbiAgICBcclxuICAgIFxyXG59XHJcbmxldCBhcHAgPSBuZXcgQXBwKCk7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIHtcclxuICAgIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICB0aGlzLm1lc2ggPSB7fVxyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==