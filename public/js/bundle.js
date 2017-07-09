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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function Main() {
    _classCallCheck(this, Main);

    console.log('in main constructor');
};

exports.default = Main;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Main = __webpack_require__(0);

var _Main2 = _interopRequireDefault(_Main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
    function App() {
        _classCallCheck(this, App);

        this.player = {};
        this.players = [];
        this.other = {};
        this.initialized = false;
        this.socket = {};
        this.network = {};
        this.init();
    }

    _createClass(App, [{
        key: 'init',
        value: function init() {
            var socket = io.connect('http://10.0.0.139:3000/');
            this.socket = socket;
            var self = this;
            socket.on('connect', function (data) {
                socket.emit('join', 'Hello World from client');
            });

            socket.on('playerData', function (data) {
                console.log('Connected.', data);
                self.initializePlayers(data);
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

            socket.on('addOtherPlayer', function (data) {
                console.log('adding another player', data);
                self.addOtherPlayer(data);
            });

            setInterval(function () {
                if (self.initialized) {
                    socket.emit('ping', Network.id);
                    console.log('pinged as #' + Network.id);
                }
            }, 1000);
        }
    }, {
        key: 'initializePlayers',
        value: function initializePlayers(data) {
            var _this = this;

            var self = this;
            setTimeout(function () {
                console.log('test', window.pc.app.root.findByName('Player'));
                self.player = window.pc.app.root.findByName('Player');
                self.other = window.pc.app.root.findByName('Other');

                var network = {};
                self.players = data.players;
                self.network.id = data.id;

                for (var i = 0; i < self.players.length; i++) {
                    if (i !== self.network.id && !self.players[i].deleted) {
                        self.players[i].entity = self.createPlayerEntity(data.players[i]);
                        console.log('Found player.');
                    }
                    console.log(data);
                }

                self.initialized = true;
                console.log('initialized');
                _this.loop();
            }, 3000);
        }
    }, {
        key: 'addPlayer',
        value: function addPlayer(data) {
            this.players.push(data);
            this.players[this.players.length - 1].entity = this.createPlayerEntity();
        }
    }, {
        key: 'movePlayer',
        value: function movePlayer(data) {
            if (this.initialized && !this.players[data.id].deleted) {
                this.players[data.id].entity.rigidbody.teleport(data.x, data.y, data.z);
            }
        }
    }, {
        key: 'removePlayer',
        value: function removePlayer(data) {
            if (this.players[data].entity) {
                this.players[data].entity.destroy();
                this.players[data].deleted = true;
            }
        }
    }, {
        key: 'createPlayerEntity',
        value: function createPlayerEntity(data) {
            var newPlayer = this.other.clone();
            newPlayer.enabled = true;

            this.other.getParent().addChild(newPlayer);

            if (data) newPlayer.rigidbody.teleport(data.x, data.y, data.z);

            return newPlayer;
        }
    }, {
        key: 'update',


        // update code called every frame
        value: function update(dt) {
            this.updatePosition();
            window.requestAnimationFrame(this.update);
        }
    }, {
        key: 'updatePosition',
        value: function updatePosition() {
            if (this.initialized) {
                var pos = this.player.getPosition();
                this.socket.emit('positionUpdate', { id: this.network.id, x: pos.x, y: pos.y, z: pos.z });
            }
        }
    }, {
        key: 'loop',
        value: function loop() {
            var self = this;
            function frame() {
                if (self.initialized) {
                    var pos = self.player.getPosition();
                    self.socket.emit('positionUpdate', { id: self.network.id, x: pos.x, y: pos.y, z: pos.z });
                }
                requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
        }
    }]);

    return App;
}();

exports.default = App;


var app = new App();

/***/ })
/******/ ]);