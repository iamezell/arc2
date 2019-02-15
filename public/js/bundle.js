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
          path: '/'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC93b3JsZG9iamVjdHMvUGxheWVyLmpzIl0sIm5hbWVzIjpbIkFwcCIsInNvY2tldCIsInRlc3RCdG4iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic2NlbmUiLCJxdWVyeVNlbGVjdG9yIiwidGhlUGxheWVyIiwicGxheWVycyIsImluaXQiLCJvdGhlclBsYXllcnMiLCJpbyIsImNvbm5lY3QiLCJzZWxmIiwicmVhbEF1ZGlvSW5wdXQiLCJkZXN0IiwicmVjb3JkZXIiLCJidWZmZXJTaXplIiwicGxheWVyQXJyYXkiLCJlbWl0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJhdWRpb0NvbnRleHQiLCJyZXN1bWUiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsIm9uIiwiZGF0YSIsImlkIiwicGVlciIsIlBlZXIiLCJob3N0IiwicGF0aCIsImluaXRpYWxpemVQbGF5ZXJzIiwicHVzaCIsIkF1ZGlvQ29udGV4dCIsIm5hdmlnYXRvciIsIm1lZGlhRGV2aWNlcyIsImdldFVzZXJNZWRpYSIsImF1ZGlvIiwidmlkZW8iLCJzdHJlYW0iLCJjYWxsIiwiYW5zd2VyIiwiY2F0Y2giLCJlcnIiLCJhZGRQbGF5ZXIiLCJhZGRQbGF5ZXJzIiwiZGV2aWNlcyIsInJlbW90ZVN0cmVhbSIsInN0YXRlIiwic291cmNlIiwiY3JlYXRlTWVkaWFTdHJlYW1Tb3VyY2UiLCJwYW5uZXIiLCJjcmVhdGVQYW5uZXIiLCJzZXRQb3NpdGlvbiIsImNyZWF0ZU1lZGlhU3RyZWFtRGVzdGluYXRpb24iLCJkZXN0aW5hdGlvbiIsImF1ZGlvT2JqIiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInNyY09iamVjdCIsInRoYXQiLCJmaWx0ZXIiLCJpdGVtIiwiZm9yRWFjaCIsIm9iaiIsInBsYXllciIsIlBs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YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jbGllbnQvYXBwLmpzXCIpO1xuIiwiaW1wb3J0IFBsYXllciBmcm9tICcuL3dvcmxkb2JqZWN0cy9QbGF5ZXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0ID0ge31cclxuICAgICAgICB0aGlzLnRlc3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3NwZWFrJyApO1xyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdhLXNjZW5lJyk7XHJcbiAgICAgICAgdGhpcy50aGVQbGF5ZXIgPSB7fTtcclxuICAgICAgICB0aGlzLnBsYXllcnMgPSBbXTtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB0aGlzLm90aGVyUGxheWVycztcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIGxldCBzb2NrZXQgPSBpby5jb25uZWN0KCdodHRwczovLzEwLjAuMC4xNjUvJyk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBzb2NrZXQ7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCByZWFsQXVkaW9JbnB1dCA9IHt9O1xyXG4gICAgICAgIGxldCBkZXN0ID0ge307XHJcbiAgICAgICAgbGV0IHJlY29yZGVyID0ge31cclxuICAgICAgICBsZXQgYnVmZmVyU2l6ZSA9IDQwOTY7XHJcbiAgICAgICAgc2VsZi5wbGF5ZXJBcnJheSA9IFtdO1xyXG4gICAgICAgIHNvY2tldC5lbWl0KCdqb2luJywgJ0hlbGxvIFdvcmxkIGZyb20gY2xpZW50Jyk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMudGVzdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xyXG4gICAgICAgICAgICBzZWxmLmF1ZGlvQ29udGV4dC5yZXN1bWUoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQbGF5YmFjayByZXN1bWVkIHN1Y2Nlc3NmdWxseScpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgc2VsZi5wbGF5ZXJBcnJheSA9IFtdO1xyXG5cclxuICAgIHNvY2tldC5vbiAoJ3BsYXllckRhdGEnLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdDb25uZWN0ZWQuISEhISEnLCBkYXRhKTtcclxuICAgICAgICAvLyBhZGQgaWQgdG8gcGxheWVyXHJcbiAgICAgICAgc2VsZi50aGVQbGF5ZXIuaWQgPSBkYXRhLmlkO1xyXG4gICAgICAgIHNlbGYucGVlciA9IFBlZXIoc2VsZi50aGVQbGF5ZXIuaWQsIHtob3N0OiAnMTAuMC4wLjE2NScsIHBhdGg6Jy8nIH0pO1xyXG4gICAgICAgIC8vIGFkZCB5b3Vyc2VsZiA/XHJcbiAgICAgICAgLy8gc2VsZi5hZGRQbGF5ZXIoZGF0YSk7XHJcbiAgICAgICAgLy9pZiB0aGVyZSBhcmUgb3RoZXIgcGxheWVycyBhZGQgdGhlbVxyXG4gICAgICAgIHNlbGYuaW5pdGlhbGl6ZVBsYXllcnMgKGRhdGEpO1xyXG4gICAgICAgIHNlbGYucGxheWVyQXJyYXkucHVzaChzZWxmLnRoZVBsYXllci5pZClcclxuICAgICAgICBzZWxmLmF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKVxyXG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoe2F1ZGlvOiB0cnVlLCB2aWRlbzogZmFsc2V9KVxyXG4gICAgLnRoZW4oKHN0cmVhbSk9PntcclxuICAgICAgY29uc29sZS5sb2coJ3RoaXMgaXMgdGhlIHN0cmVhbScsIHN0cmVhbSlcclxuICAgICAgc2VsZi5wZWVyLm9uKCdjYWxsJywgKGNhbGwpPT57XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3NlbmRpbmcgc3RyZWFtJylcclxuICAgICAgICBjYWxsLmFuc3dlcihzdHJlYW0pXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKChlcnIpPT57XHJcbiAgICAgIGNvbnNvbGUubG9nKCd3ZSBnb3QgYW4gZXJyb3I6ICcsIGVycilcclxuICAgIH0pXHJcbiAgICAgICAvLyBzb2NrZXQuZW1pdCgnam9pbkdyb3VwJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzb2NrZXQub24oJ3BsYXllckpvaW5lZCcsIGZ1bmN0aW9uIChkYXRhKSBcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnYWRkaW5nIHBsYXllcicsIGRhdGEpXHJcbiAgICAgICAgc2VsZi5hZGRQbGF5ZXIoZGF0YSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBzb2NrZXQub24oJ290aGVyUGxheWVySm9pbmVkJywgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnb3RoZXIgcGxheWVyIGpvaW5lZCcsIGRhdGEpXHJcbiAgICAgICAgLy8gc2VsZi5pbml0aWFsaXplUGxheWVycyAoZGF0YSk7XHJcbiAgICAgICAgc2VsZi5hZGRQbGF5ZXJzKGRhdGEpXHJcbiAgICAgICAgY29uc29sZS5sb2coJ3RoZSBuZXcgcGxheWVyIGlkIGlzJywgZGF0YS5pZClcclxuICAgICAgICAvLyBjb25uZWN0IHRvIHBsYXllclxyXG4gICAgICAgIGxldCBhdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KClcclxuICAgICAgICBsZXQgZGV2aWNlcyA9IFtdXHJcbiAgICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoe2F1ZGlvOnRydWV9KVxyXG4gICAgICAgIC50aGVuKChzdHJlYW0pPT57XHJcbiAgICAgICAgbGV0IGNhbGwgPSBzZWxmLnBlZXIuY2FsbChkYXRhLmlkLCBzdHJlYW0pLm9uKCdzdHJlYW0nLCBmdW5jdGlvbihyZW1vdGVTdHJlYW0pIHtcclxuICAgICAgICAgICAvLyBjb25zdCBhdWRpbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2F1ZGlvJyk7XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIGNvbnRleHQgaXMgaW4gc3VzcGVuZGVkIHN0YXRlIChhdXRvcGxheSBwb2xpY3kpXHJcbiAgICAgICAgICBpZiAoYXVkaW9Db250ZXh0LnN0YXRlID09PSAnc3VzcGVuZGVkJykge1xyXG4gICAgICAgICAgICBhdWRpb0NvbnRleHQucmVzdW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBTaG93IHN0cmVhbSBpbiBzb21lIDx2aWRlbz4gZWxlbWVudC5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldHRpbmcgcmVtb3RlIHN0cmVhbScsIHJlbW90ZVN0cmVhbSlcclxuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVNZWRpYVN0cmVhbVNvdXJjZShyZW1vdGVTdHJlYW0pO1xyXG4gICAgICAgICAgICB2YXIgcGFubmVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZVBhbm5lcigpO1xyXG4gICAgICAgICAgICBwYW5uZXIuc2V0UG9zaXRpb24oMCwgMCwgMCk7XHJcbiAgICAgICAgICAgIHNvdXJjZS5jb25uZWN0KHBhbm5lcik7XHJcbiAgICAgICAgICAgIHZhciBkZXN0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtRGVzdGluYXRpb24oKTtcclxuICAgICAgICAgICAgcGFubmVyLmNvbm5lY3QoYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKVxyXG4gICAgICAgICAgICB2YXIgYXVkaW9PYmogPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiQVVESU9cIik7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXVkaW9PYmopXHJcbiAgICAgICAgICAgIGF1ZGlvT2JqLnNyY09iamVjdCA9IHJlbW90ZVN0cmVhbTtcclxuICAgICAgICAgICAgYXVkaW9PYmogPSBudWxsO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycik9PntcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCd3ZSBnb3QgYW4gZXJyb3I6ICcsIGVycilcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcbn1cclxuaW5pdGlhbGl6ZVBsYXllcnMgKGRhdGEpIHtcclxuICAgIGxldCB0aGF0ID0gdGhpc1xyXG4gIC8vIGxvb3AgdGhyb3VnaCBhbGwgdGhlIHVzZXJzIGFuZCBjcmVhdGluZyBpbiBnYW1lIG9iamVjdHMgdG8gcmVwcmVzZW50IHRoZW1cclxuICBjb25zb2xlLmxvZygnaW5pdGlhbGl6ZWQnLCBkYXRhLnBsYXllcnMpO1xyXG4gIGNvbnNvbGUubG9nKCdpbml0aWFsaXplZCcsIHRoaXMudGhlUGxheWVyKTtcclxuICAvLyBhZGQgb3Vyc2VsdmVzIHRvIHNjZW5lXHJcbiAgdGhpcy5vdGhlclBsYXllcnMgPSBkYXRhLnBsYXllcnMuZmlsdGVyKCAoaXRlbSkgPT4gaXRlbS5pZCAhPT0gdGhpcy50aGVQbGF5ZXIuaWQgKVxyXG4gIHRoaXMub3RoZXJQbGF5ZXJzLmZvckVhY2goZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgIHRoYXQuYWRkUGxheWVycyhvYmopXHJcbiAgfSk7XHJcbiB9O1xyXG5cclxuIGFkZFBsYXllcnMgKGRhdGEpIHtcclxuICAgIC8vIGFkZCB0byBwbGF5ZXIgYXJyYXlcclxuICAgIGxldCBwbGF5ZXIgPSBuZXcgUGxheWVyKClcclxuICAgIHBsYXllci5pZCA9IGRhdGEuaWQ7XHJcbiAgICB0aGlzLnBsYXllcnMucHVzaChwbGF5ZXIpXHJcblxyXG4gICAgY29uc29sZS5sb2coJ2FkZGVkIG90aGVyIHBsYXllciB0byBzY2VuZScpXHJcbn07XHJcblxyXG4gICAgXHJcbiAgICBcclxufVxyXG5sZXQgYXBwID0gbmV3IEFwcCgpOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciB7XHJcbiAgICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICAgICAgdGhpcy5tZXNoID0ge31cclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0=