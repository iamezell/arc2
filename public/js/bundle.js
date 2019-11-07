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

/***/ "./public/js/audio-processor.js":
/*!**************************************!*\
  !*** ./public/js/audio-processor.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var AudioProcessor =
/*#__PURE__*/
function (_AudioWorkletProcesso) {
  _inherits(AudioProcessor, _AudioWorkletProcesso);

  function AudioProcessor() {
    _classCallCheck(this, AudioProcessor);

    return _possibleConstructorReturn(this, _getPrototypeOf(AudioProcessor).apply(this, arguments));
  }

  _createClass(AudioProcessor, [{
    key: "process",
    value: function process(inputs, outputs, parameters) {
      var input = inputs[0];
      var output = outputs[0];
      console.log(input);
      return true;
    }
  }]);

  return AudioProcessor;
}(_wrapNativeSuper(AudioWorkletProcessor));

registerProcessor('audio-processor', AudioProcessor);

/***/ }),

/***/ "./src/client/app.js":
/*!***************************!*\
  !*** ./src/client/app.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var _public_js_audio_processor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/js/audio-processor */ "./public/js/audio-processor.js");
/* harmony import */ var _public_js_audio_processor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_public_js_audio_processor__WEBPACK_IMPORTED_MODULE_0__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import Player from './worldobjects/Player';
// import 'ws-audio-api'


var App =
/*#__PURE__*/
function () {
  function App() {
    _classCallCheck(this, App);

    this.init();
  }

  _createClass(App, [{
    key: "init",
    value: function init() {
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
      var streamerStartBtn = document.getElementById("streamerStartBtn"); //   let streamerStopBtn = document.getElementById("streamerStopBtn")
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

      streamerStartBtn.addEventListener("click", function () {
        touchStarted();
      }, this);

      var touchStarted =
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var AudioContext;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  AudioContext = new window.AudioContext() || window.webkitAudioContext;
                  _context.next = 3;
                  return AudioContext.audioWorklet.addModule(_public_js_audio_processor__WEBPACK_IMPORTED_MODULE_0___default.a);

                case 3:
                  navigator.mediaDevices.getUserMedia({
                    audio: true
                  }, function (stream) {
                    var microphone = AudioContext.createMediaStreamSource(stream);
                    var oggEncoder = new AudioWorkletNode(context, 'ogg');
                    microphone.connect(oggEncoder).connect(AudioContext.destination);
                  });

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function touchStarted() {
          return _ref.apply(this, arguments);
        };
      }(); //   // const audioContext = new AudioContext()
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
  }]);

  return App;
}();


var app = new App();

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcHVibGljL2pzL2F1ZGlvLXByb2Nlc3Nvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xpZW50L2FwcC5qcyJdLCJuYW1lcyI6WyJBdWRpb1Byb2Nlc3NvciIsImlucHV0cyIsIm91dHB1dHMiLCJwYXJhbWV0ZXJzIiwiaW5wdXQiLCJvdXRwdXQiLCJjb25zb2xlIiwibG9nIiwiQXVkaW9Xb3JrbGV0UHJvY2Vzc29yIiwicmVnaXN0ZXJQcm9jZXNzb3IiLCJBcHAiLCJpbml0Iiwic3RyZWFtZXJTdGFydEJ0biIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwidG91Y2hTdGFydGVkIiwiQXVkaW9Db250ZXh0Iiwid2luZG93Iiwid2Via2l0QXVkaW9Db250ZXh0IiwiYXVkaW9Xb3JrbGV0IiwiYWRkTW9kdWxlIiwid29ya2xldFVybCIsIm5hdmlnYXRvciIsIm1lZGlhRGV2aWNlcyIsImdldFVzZXJNZWRpYSIsImF1ZGlvIiwic3RyZWFtIiwibWljcm9waG9uZSIsImNyZWF0ZU1lZGlhU3RyZWFtU291cmNlIiwib2dnRW5jb2RlciIsIkF1ZGlvV29ya2xldE5vZGUiLCJjb250ZXh0IiwiY29ubmVjdCIsImRlc3RpbmF0aW9uIiwiYXBwIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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ZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY2xpZW50L2FwcC5qc1wiKTtcbiIsImNsYXNzIEF1ZGlvUHJvY2Vzc29yIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29yIHtcclxuICAgIHByb2Nlc3MoaW5wdXRzLCBvdXRwdXRzLCBwYXJhbWV0ZXJzKSB7XHJcbiAgICAgICAgY29uc3QgaW5wdXQgPSBpbnB1dHNbMF07XHJcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coaW5wdXQpXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbnJlZ2lzdGVyUHJvY2Vzc29yKCdhdWRpby1wcm9jZXNzb3InLCBBdWRpb1Byb2Nlc3Nvcik7IiwiLy8gaW1wb3J0IFBsYXllciBmcm9tICcuL3dvcmxkb2JqZWN0cy9QbGF5ZXInO1xyXG4vLyBpbXBvcnQgJ3dzLWF1ZGlvLWFwaSdcclxuaW1wb3J0IHdvcmtsZXRVcmwgZnJvbSAnLi4vLi4vcHVibGljL2pzL2F1ZGlvLXByb2Nlc3Nvcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAge1xyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHRoaXMuaW5pdCgpXHJcbiAgfVxyXG5cclxuICBpbml0ICgpIHtcclxuICAgIFxyXG4vLyAgICAgbGV0IHBsYXllciA9IG5ldyBXU0F1ZGlvQVBJLlBsYXllcih7XHJcbi8vICAgICAgIHNlcnZlcjoge1xyXG4vLyAgICAgICAgICAgaG9zdDogd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lLCAvL3dlYnNvY2tldHMgc2VydmVyIGFkZHJlcy4gSW4gdGhpcyBleGFtcGxlIC0gbG9jYWxob3N0XHJcbi8vICAgICAgICAgICBwb3J0OiA4MCAvL3dlYnNvY2tldHMgc2VydmVyIHBvcnRcclxuLy8gICB9fSk7XHJcblxyXG4vLyAgIGxldCBzdHJlYW1lciA9IG5ldyBXU0F1ZGlvQVBJLlN0cmVhbWVyKHtcclxuLy8gICAgIHNlcnZlcjoge1xyXG4vLyAgICAgICAgIGhvc3Q6IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSwgLy93ZWJzb2NrZXRzIHNlcnZlciBhZGRyZXMuIEluIHRoaXMgZXhhbXBsZSAtIGxvY2FsaG9zdFxyXG4vLyAgICAgICAgIHBvcnQ6IDgwIC8vd2Vic29ja2V0cyBzZXJ2ZXIgcG9ydFxyXG4vLyB9fSk7XHJcblxyXG4gIGxldCBzdHJlYW1lclN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdHJlYW1lclN0YXJ0QnRuXCIpXHJcbi8vICAgbGV0IHN0cmVhbWVyU3RvcEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RyZWFtZXJTdG9wQnRuXCIpXHJcblxyXG4gIC8vIHN0cmVhbWVyU3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XHJcbiAgLy8gICBzdHJlYW1lci5zdGFydCgpXHJcbiAgLy8gfSwgdGhpcylcclxuXHJcbi8vICAgc3RyZWFtZXJTdG9wQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xyXG4vLyAgICAgc3RyZWFtZXIuc3RvcCgpXHJcbi8vICAgfSwgdGhpcylcclxuXHJcblxyXG4gIC8vICAgbGV0IHNvdW5kQ29udHJvbGxlciA9IHt9XHJcbiAgLy8gICBzb3VuZENvbnRyb2xsZXIucmVjb3JkaW5nID0gZmFsc2VcclxuXHJcbiAgLy8gbGV0IG1ha2VTdHJlYW0gPSAoc29ja2V0KSA9PiB7XHJcbiAgLy8gICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKHsgYXVkaW86IHRydWUgfSwgZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgLy8gICAgIGxldCBzdHJlYW0gPSBzdHJlYW07XHJcbiAgLy8gICAgIGxldCBhdWRpb0lucHV0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0cmVhbSk7XHJcbiAgLy8gICAgIGxldCBnYWluTm9kZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XHJcbiAgLy8gICAgIGxldCByZWNvcmRlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVTY3JpcHRQcm9jZXNzb3IoX3RoaXMuY29uZmlnLmNvZGVjLmJ1ZmZlclNpemUsIDEsIDEpO1xyXG4gIC8vICAgICByZWNvcmRlci5vbmF1ZGlvcHJvY2VzcyA9IGZ1bmN0aW9uKGUpIHtcclxuICAvLyAgICAgICB2YXIgcmVzYW1wbGVkID0gX3RoaXMuc2FtcGxlci5yZXNhbXBsZXIoZS5pbnB1dEJ1ZmZlci5nZXRDaGFubmVsRGF0YSgwKSk7XHJcbiAgLy8gICAgICAgdmFyIHBhY2tldHMgPSBfdGhpcy5lbmNvZGVyLmVuY29kZV9mbG9hdChyZXNhbXBsZWQpO1xyXG4gIC8vICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFja2V0cy5sZW5ndGg7IGkrKykge1xyXG4gIC8vICAgICAgICAgaWYgKHNvY2tldC5yZWFkeVN0YXRlID09IDEpIHNvY2tldC5zZW5kKHBhY2tldHNbaV0pO1xyXG4gIC8vICAgICAgIH1cclxuICAvLyAgICAgfTtcclxuICAvLyAgICAgYXVkaW9JbnB1dC5jb25uZWN0KGdhaW5Ob2RlKTtcclxuICAvLyAgICAgZ2Fpbk5vZGUuY29ubmVjdChyZWNvcmRlcik7XHJcbiAgLy8gICAgIHJlY29yZGVyLmNvbm5lY3QoYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcclxuICAvLyAgIH0sIChlcnIpPT57Y29uc29sZS5sb2coXCJlcnJvclwiLCBlcnIpfSk7XHJcbiAgLy8gfVxyXG4gIC8vICAgbGV0IGV4YW1wbGVTb2NrZXQgPSBuZXcgV2ViU29ja2V0KFwid3NzOi8vbG9jYWxob3N0XCIsIFwicHJvdG9jb2xPbmVcIilcclxuXHJcbiAgLy8gLy8gICAvLyBhdWRpb1dvcmtsZXRDb250ZXh0LmNvbm5lY3QoY29udGV4dC5kZXN0aW5hdGlvbilcclxuICAvLyAvLyAgIC8vIGZvciBsZWdhY3kgYnJvd3NlcnNcclxuICAvLyAgIGV4YW1wbGVTb2NrZXQub25vcGVuID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgLy8gICAgIC8vIGV4YW1wbGVTb2NrZXQuc2VuZChcIkhlcmUncyBzb21lIHRleHQgdGhhdCB0aGUgc2VydmVyIGlzIHVyZ2VudGx5IGF3YWl0aW5nIVwiKTtcclxuICAvLyAgICAgbWFrZVN0cmVhbSggZXhhbXBsZVNvY2tldClcclxuICAvLyAgICAgZXhhbXBsZVNvY2tldC5jbG9zZSgpIFxyXG4gIC8vICAgfTtcclxuXHJcbiAgICAgIC8vICBjb25zdCBBdWRpb0NvbnRleHQgPSBuZXcgd2luZG93LkF1ZGlvQ29udGV4dCgpIHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHRcclxuXHJcbiAgICAgIC8vICBBdWRpb0NvbnRleHQuYXVkaW9Xb3JrbGV0LmFkZE1vZHVsZSh3b3JrbGV0VXJsKS50aGVuKCgpID0+IHtcclxuICAgICAgLy8gICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7IGF1ZGlvOiB0cnVlIH0sIHN0cmVhbSA9PiB7XHJcbiAgICAgIC8vICAgICBsZXQgbWljcm9waG9uZSA9IEF1ZGlvQ29udGV4dC5jcmVhdGVNZWRpYVN0cmVhbVNvdXJjZShzdHJlYW0pO1xyXG4gICAgICAvLyAgICAgbGV0IG9nZ0VuY29kZXIgPSBuZXcgQXVkaW9Xb3JrbGV0Tm9kZShjb250ZXh0LCAnb2dnJyk7XHJcbiAgICAgICAgICBcclxuICAgICAgLy8gICAgIG1pY3JvcGhvbmUuY29ubmVjdChvZ2dFbmNvZGVyKS5jb25uZWN0KEF1ZGlvQ29udGV4dC5kZXN0aW5hdGlvbik7XHJcbiAgICAgIC8vICAgfSk7XHJcbiAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgLy8gdmFyIHBlcnNvbiA9IHByb21wdChcIlBsZWFzZSBlbnRlciB5b3VyIG5hbWVcIiwgXCJIYXJyeSBQb3R0ZXJcIik7XHJcblxyXG4gICAgICAvLyBpZiAocGVyc29uICE9IG51bGwpIHtcclxuICAgICAgLy8gICB0b3VjaFN0YXJ0ZWQoKVxyXG4gICAgICAvLyB9XHJcbiAgICAgIHN0cmVhbWVyU3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XHJcbiAgICAgICAgdG91Y2hTdGFydGVkKClcclxuICAgICAgfSwgdGhpcylcclxuXHJcbiAgICAgIFxyXG4gICAgICBjb25zdCB0b3VjaFN0YXJ0ZWQgPSBhc3luYyAoKT0+IHtcclxuICAgICAgICBjb25zdCBBdWRpb0NvbnRleHQgPSBuZXcgd2luZG93LkF1ZGlvQ29udGV4dCgpIHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHRcclxuXHJcbiAgICAgICAgYXdhaXQgQXVkaW9Db250ZXh0LmF1ZGlvV29ya2xldC5hZGRNb2R1bGUod29ya2xldFVybClcclxuICAgICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoeyBhdWRpbzogdHJ1ZSB9LCBzdHJlYW0gPT4ge1xyXG4gICAgICAgICAgIGxldCBtaWNyb3Bob25lID0gQXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0cmVhbSk7XHJcbiAgICAgICAgICAgbGV0IG9nZ0VuY29kZXIgPSBuZXcgQXVkaW9Xb3JrbGV0Tm9kZShjb250ZXh0LCAnb2dnJyk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgbWljcm9waG9uZS5jb25uZWN0KG9nZ0VuY29kZXIpLmNvbm5lY3QoQXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcclxuICAgICAgICAgfSk7XHJcbiAgICAgICBcclxuICAgICAgfVxyXG4gICAgICBcclxuXHJcbiAgLy8gICAvLyBjb25zdCBhdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KClcclxuXHJcbiAgLy8gICBpZiAoIW5hdmlnYXRvci5tZWRpYURldmljZXMpIHtcclxuICAvLyAgICAgY29uc29sZS5sb2coXCJnZXRVc2VyTWVkaWEoKSBub3Qgc3VwcG9ydGVkLlwiKTtcclxuICAvLyAgIH1cclxuICAvLyAgIHNvdW5kQ29udHJvbGxlci5kZXZpY2UgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7IGF1ZGlvOiB0cnVlLCBcclxuICAvLyAgICAgdmlkZW86IGZhbHNlIH0pXHJcbiAgLy8gICAgIHNvdW5kQ29udHJvbGxlci5kZXZpY2UudGhlbihmdW5jdGlvbiAoc3RyZWFtKSB7XHJcbiAgLy8gICAgICAgY29uc3QgYXVkaW9Xb3JrbGV0Q29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKVxyXG4gIC8vICAgICAgIHZhciBhdWRpb0lucHV0ID0gYXVkaW9Xb3JrbGV0Q29udGV4dC5jcmVhdGVNZWRpYVN0cmVhbVNvdXJjZShzdHJlYW0pXHJcbiAgICAgICAgXHJcbiAgLy8gICAgICAgYXVkaW9Xb3JrbGV0Q29udGV4dC5hdWRpb1dvcmtsZXQuYWRkTW9kdWxlKCdqcy9hdWRpby1wcm9jZXNzb3IuanMnKS50aGVuKCgpPT57XHJcbiAgLy8gICAgICAgICBsZXQgbXAzV29ya2xldE5vZGUgPSBuZXcgQXVkaW9Xb3JrbGV0Tm9kZShhdWRpb0lucHV0LCAnYXVkaW8tcHJvY2Vzc29yJylcclxuICAvLyAgICAgICB9KVxyXG5cclxuICAvLyAgICAgfSk7IFxyXG4gIH1cclxuICBcclxufVxyXG5cclxuY29uc3QgYXBwID0gbmV3IEFwcCgpXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=