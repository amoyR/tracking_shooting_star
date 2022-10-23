import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import * as dat from 'dat.gui';

var parcelRequire = (function (init) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;
  var modules = {};

  function localRequire(name, jumped) {
    if (name in modules) {
      return modules[name];
    }

    // if we cannot find the module within our internal map or
    // cache jump to the current global require ie. the last bundle
    // that was added to the page.
    var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
    if (!jumped && currentRequire) {
      return currentRequire(name, true);
    }

    // If there are other bundles on this page the require from the
    // previous one is saved to 'previousRequire'. Repeat this as
    // many times as there are bundles until the module is found or
    // we exhaust the require chain.
    if (previousRequire) {
      return previousRequire(name, true);
    }

    // Try the node require function if it exists.
    
  }

  localRequire.register = function register(id, exports) {
    modules[id] = exports;
  };

  modules = init(localRequire);
  localRequire.modules = modules;
  return localRequire;
})(function (require) {
function $parcel$interopDefault(a) {
  return a && a.__esModule ? {
    d: a.default
  } : {
    d: a
  };
}

function $pTw7$var$_toConsumableArray(arr) {
  return $pTw7$var$_arrayWithoutHoles(arr) || $pTw7$var$_iterableToArray(arr) || $pTw7$var$_nonIterableSpread();
}


function $pTw7$var$_arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

function $pTw7$var$_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function $pTw7$var$_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function $pTw7$var$_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) $pTw7$var$_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) $pTw7$var$_defineProperties(Constructor, staticProps);
  return Constructor;
} // import * as THREE from 'three'
// import TrackballControls from 'three-trackballcontrols'
// import './three/postprocessing'
// THREE.TrackballControls = TrackballControls

/*!
 * Three.js Wrapper
 * forked from https://github.com/zadvorsky/three.bas/blob/86931253240abadf68b7c62edb934b994693ed4a/examples/_js/root.js
 */


var $pTw7$export$default =
/*#__PURE__*/
function () {
  function THREERoot(params) {
    var _this$camera$position,
        _this = this;

    $pTw7$var$_classCallCheck(this, THREERoot); // defaults

    var _params$container = params.container,
        container = _params$container === void 0 ? document.body : _params$container,
        _params$fov = params.fov,
        fov = _params$fov === void 0 ? 45 : _params$fov,
        zNear = params.zNear,
        zFar = params.zFar,
        _params$cameraPositio = params.cameraPosition,
        cameraPosition = _params$cameraPositio === void 0 ? [0, 0, 30] : _params$cameraPositio,
        _params$createCameraC = params.createCameraControls,
        createCameraControls = _params$createCameraC === void 0 ? false : _params$createCameraC,
        _params$isAutoStart = params.isAutoStart,
        isAutoStart = _params$isAutoStart === void 0 ? true : _params$isAutoStart,
        _params$pixelRatio = params.pixelRatio,
        pixelRatio = _params$pixelRatio === void 0 ? window.devicePixelRatio : _params$pixelRatio,
        _params$antialias = params.antialias,
        antialias = _params$antialias === void 0 ? window.devicePixelRatio === 1 : _params$antialias,
        _params$alpha = params.alpha,
        alpha = _params$alpha === void 0 ? false : _params$alpha,
        _params$clearColor = params.clearColor,
        clearColor = _params$clearColor === void 0 ? 0x000000 : _params$clearColor,
        aspect = params.aspect,
        _params$canvas = params.canvas,
        canvas = _params$canvas === void 0 ? document.createElement('canvas') : _params$canvas,
        _params$speed = params.speed,
        speed = _params$speed === void 0 ? 60 / 1000 : _params$speed,
        interval = params.interval,
        _params$firstTime = params.firstTime,
        firstTime = _params$firstTime === void 0 ? 0 : _params$firstTime,
        _params$isDev = params.isDev,
        isDev = _params$isDev === void 0 ? false : _params$isDev;
    this.speed = 60 / 1000 * 0.5;
    this.interval = 0;
    this.time = this.firstTime = firstTime;
    this.stopTime = 0; // maps and arrays

    this.updateCallbacks = [];
    this.resizeCallbacks = [];
    this.objects = {}; // renderer

    this.renderer = new THREE.WebGLRenderer({
      antialias: antialias,
      alpha: true,
      canvas: canvas
    });
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setClearColor(clearColor, 0);
    this.canvas = this.renderer.domElement; // container

    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    !params.canvas && this.container.appendChild(this.canvas);
    this.aspect = aspect || this.container.clientWidth / this.container.clientHeight;
    this.setSize(); // camera

    this.camera = new THREE.PerspectiveCamera(fov, this.width / this.height, zNear, zFar);

    (_this$camera$position = this.camera.position).set.apply(_this$camera$position, $pTw7$var$_toConsumableArray(cameraPosition));

    this.camera.updateProjectionMatrix(); // scene

    this.scene = new THREE.Scene(); // resize handling

    this.resize();
    window.addEventListener('resize', function () {
      _this.resize();
    }); // tick / update / render

    isAutoStart && this.start(); // optional camera controls

    createCameraControls && this.createOrbitControls(); // pointer

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2(); // developer mode
  }

  $pTw7$var$_createClass(THREERoot, [{
    key: "setSize",
    value: function setSize() {
      if (this.aspect) {
        if (this.container.clientWidth / this.container.clientHeight > this.aspect) {
          this.width = this.container.clientHeight * this.aspect;
          this.height = this.container.clientHeight;
        } else {
          this.width = this.container.clientWidth;
          this.height = this.container.clientWidth / this.aspect;
        }
      } else {
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;
      }
    }
  }, {
    key: "createOrbitControls",
    value: function createOrbitControls() {
      var _this2 = this;

      if (!THREE.TrackballControls) {
        console.error('TrackballControls.js file is not loaded.');
        return;
      }

      this.controls = new THREE.TrackballControls(this.camera, this.canvas);
      this.addUpdateCallback(function () {
        _this2.controls.update();
      });
    }
  }, {
    key: "start",
    value: function start() {
      var _this3 = this;

      var startTime = this.stopTime || this.firstTime;
      requestAnimationFrame(function (timestamp) {
        _this3.startTime = timestamp - startTime;
        _this3.time = timestamp - _this3.startTime;
      });
      this.tick();
    }
  }, {
    key: "tick",
    value: function tick() {
      var _this4 = this;

      this.update();
      this.render();
      this.animationFrameId = requestAnimationFrame(function (timestamp) {
        _this4.time = timestamp - _this4.startTime;

        _this4.tick();
      });
    }
  }, {
    key: "update",
    value: function update() {
      var time = this.time * this.speed;
      time = this.interval ? time % this.interval : time;
      this.updateCallbacks.forEach(function (fn) {
        fn(time);
      });
    }
  }, {
    key: "render",
    value: function render() {
      this.renderer.render(this.scene, this.camera);
    }
  }, {
    key: "draw",
    value: function draw() {
      this.update();
      this.render();
    }
  }, 
   {
    key: "addUpdateCallback",
    value: function addUpdateCallback(callback) {
      this.updateCallbacks.push(callback);
    }
  }, 
    
   {
    key: "add",
    value: function add(object, key) {
      key && (this.objects[key] = object);
      this.scene.add(object);
    }
  }, {
    key: "addTo",
    value: function addTo(object, parentKey, key) {
      key && (this.objects[key] = object);
      this.get(parentKey).add(object);
    }
  }, {
    key: "get",
    value: function get(key) {
      return this.objects[key];
    }
  }, 
  {
    key: "resize",
    value: function resize() {
      this.container.style.width = '';
      this.container.style.height = '';

      if (this.aspect) {
        this.aspect = this.container.clientWidth / this.container.clientHeight;
      }

      this.setSize();
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
      this.resizeCallbacks.forEach(function (callback) {
        callback();
      });
    }
  }, {
    key: "initPostProcessing",
    value: function initPostProcessing(passes) {
      var _this5 = this;

      var size = this.renderer.getSize();
      var pixelRatio = this.renderer.getPixelRatio();
      size.width *= pixelRatio;
      size.height *= pixelRatio;
      var composer = this.composer = new THREE.EffectComposer(this.renderer, new THREE.WebGLRenderTarget(size.width, size.height, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: false
      }));
      var renderPass = new THREE.RenderPass(this.scene, this.camera);
      composer.addPass(renderPass);

      for (var i = 0; i < passes.length; i++) {
        var pass = passes[i];
        pass.renderToScreen = i === passes.length - 1;
        composer.addPass(pass);
      }

      this.renderer.autoClear = false;

      this.render = function () {
        _this5.renderer.clear();

        composer.render();
      };

      this.addResizeCallback(function () {
        composer.setSize(_this5.canvas.clientWidth * pixelRatio, _this5.canvas.clientHeight * pixelRatio);
      });
    }
  }, {
    key: "checkPointer",
    value: function checkPointer(_ref2, meshs, handler, nohandler) {
      var x = _ref2.x,
          y = _ref2.y;
      this.pointer.x = x / this.canvas.clientWidth * 2 - 1;
      this.pointer.y = -(y / this.canvas.clientHeight) * 2 + 1;
      this.raycaster.setFromCamera(this.pointer, this.camera);
      var intersects = this.raycaster.intersectObjects(meshs);

      if (intersects.length > 0) {
        handler(intersects[0].object);
        return true;
      } else {
        nohandler && nohandler();
        return false;
      }
    }
  }]);
  return THREERoot;
}();

function $Moin$export$noop() {}

function $IDtB$var$_toConsumableArray(arr) {
  return $IDtB$var$_arrayWithoutHoles(arr) || $IDtB$var$_iterableToArray(arr) || $IDtB$var$_nonIterableSpread();
}

function $IDtB$var$_nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function $IDtB$var$_iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function $IDtB$var$_arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

function $IDtB$var$_typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    $IDtB$var$_typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    $IDtB$var$_typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return $IDtB$var$_typeof(obj);
}

function $IDtB$var$_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function $IDtB$var$_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function $IDtB$var$_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) $IDtB$var$_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) $IDtB$var$_defineProperties(Constructor, staticProps);
  return Constructor;
}

var $IDtB$export$default =
/*#__PURE__*/
function () {
  function Controller(options) {
    $IDtB$var$_classCallCheck(this, Controller);
    var closed = options.closed;
    this.gui = new dat.GUI(options);
    this.gui.closed = closed;
  }
  /**
   * addData
   *
   * @param {Object} data
   * @param {Object} [options={}]
   * @param {function} [options.callback=noop]
   * @param {function} [options.folder=gui]
   * @memberof Controller
   */


  $IDtB$var$_createClass(Controller, [{
    key: "addData",
    value: function addData(data) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _options$folder = options.folder,
          folder = _options$folder === void 0 ? this.gui : _options$folder,
          _options$callback = options.callback,
          callback = _options$callback === void 0 ? $Moin$export$noop : _options$callback,
          isUniform = options.isUniform;
      var dataKeys = Object.keys(data);
      var datData = {};
      dataKeys.forEach(function (key) {
        datData[key] = data[key].value;
      });
      dataKeys.forEach(function (key) {
        var _data$key = data[key],
            isColor = _data$key.isColor,
            value = _data$key.value,
            range = _data$key.range,
            onChange = _data$key.onChange,
            listen = _data$key.listen;
        var type;

        if (isUniform) {
          switch ($IDtB$var$_typeof(value)) {
            case 'boolean':
              type = '1i';
              break;

            case 'array':
              type = value.length + 'f';
              break;

            case 'object':
              type = 't';
              break;

            default:
              type = '1f';
              break;
          }
        }

        var controller;

        if (isColor) {
          controller = folder.addColor(datData, key);
        } else {
          var guiRange = [];

          if (range) {
            guiRange = range;
          } else if (key === 'frame') {
            guiRange = [0, 1];
          } else if (typeof value === 'number') {
            if (value < 1 && value >= 0) {
              guiRange = [0, 1];
            } else {
              var diff = Math.pow(10, String(Math.floor(value)).length - 1) * 2;
              guiRange = [value - diff, value + diff];
            }
          }

          controller = folder.add.apply(folder, [datData, key].concat($IDtB$var$_toConsumableArray(guiRange)));
        }

        onChange && controller.onChange(function (value) {
          onChange(value);
        });
        listen && controller.listen();
        callback(key, {
          type: type,
          value: value
        });
      });
      return datData;
    }
  }, {
    key: "addUniformData",
    value: function addUniformData(data) {
      var uniforms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.addData(data, {
        callback: function callback(key, obj) {
          uniforms[key] = obj;
        },
        folder: options.folder,
        isUniform: true
      });
    }
  }, {
    key: "addFolder",
    value: function addFolder(name, isClosed) {
      var folder = this.gui.addFolder(name);
      !isClosed && folder.open();
      return folder;
    }
  }]);
  return Controller;
}();


var $mrfc$export$default = {};
// ASSET: shaders/shooting-star.vert
var $puli$exports = {};
$puli$exports = "precision highp float;\nprecision highp int;\n#define GLSLIFY 1\nattribute vec3 position;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\n\nattribute vec4 mouse;\nattribute vec2 aFront;\nattribute float random;\n\n// uniform float uProgress;\nuniform vec2 resolution;\nuniform float pixelRatio;\nuniform float timestamp;\n\nuniform float size;\nuniform float minSize;\n// uniform float delay;\nuniform float speed;\nuniform float far;\nuniform float spread;\nuniform float maxSpread;\nuniform float maxZ;\nuniform float maxDiff;\nuniform float diffPow;\n\nvarying float vProgress;\nvarying float vRandom;\nvarying float vDiff;\nvarying float vSpreadLength;\nvarying float vPositionZ;\n\nfloat cubicOut(float t) {\n  float f = t - 1.0;\n  return f * f * f + 1.0;\n}\n\n// #pragma glslify: cubicBezier = require(../../modules/cubicBezier.glsl)\n\nconst float PI = 3.1415926;\nconst float PI2 = PI * 2.;\n\nvec2 cartesianToPolar (vec2 p) {\n  return vec2((atan(p.y, p.x) + PI) / PI2, length(p));\n}\n\nvec2 polarToCartesian (vec2 p) {\n  float r = p.x * PI2 - PI;\n  float l = p.y;\n  return vec2(cos(r) * l, sin(r) * l);\n}\n\nvoid main () {\n  // float progress = max(uProgress - random * delay, 0.);\n  float progress = clamp((timestamp - mouse.z) * speed, 0., 1.);\n  progress *= step(0., mouse.x);\n\n  float startX = mouse.x - resolution.x / 2.;\n  float startY = mouse.y - resolution.y / 2.;\n  vec3 startPosition = vec3(startX, startY, random);\n\n  float diff = clamp(mouse.w / maxDiff, 0., 1.);\n  diff = pow(diff, diffPow);\n\n  vec3 cPosition = position * 2. - 1.;\n\n  float radian = cPosition.x * PI2 - PI;\n  vec2 xySpread = vec2(cos(radian), sin(radian)) * spread * mix(1., maxSpread, diff) * cPosition.y;\n\n  vec3 endPosition = startPosition;\n  endPosition.xy += xySpread;\n  endPosition.xy -= aFront * far * random;\n  endPosition.z += cPosition.z * maxZ * (pixelRatio > 1. ? 1.2 : 1.);\n\n  float positionProgress = cubicOut(progress * random);\n  // float positionProgress = cubicBezier(.29, .16, .3, 1., progress);\n  vec3 currentPosition = mix(startPosition, endPosition, positionProgress);\n\n  vProgress = progress;\n  vRandom = random;\n  vDiff = diff;\n  vSpreadLength = cPosition.y;\n  vPositionZ = position.z;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(currentPosition, 1.);\n  gl_PointSize = max(currentPosition.z * size * diff * pixelRatio, minSize * (pixelRatio > 1. ? 1.3 : 1.));\n}\n";
// ASSET: shaders/shooting-star.frag
var $v3o$exports = {};
$v3o$exports = "precision highp float;\nprecision highp int;\n#define GLSLIFY 1\n\n// uniform float uProgress;\nuniform float fadeSpeed;\nuniform float shortRangeFadeSpeed;\nuniform float minFlashingSpeed;\nuniform float blur;\n\nvarying float vProgress;\nvarying float vRandom;\nvarying float vDiff;\nvarying float vSpreadLength;\nvarying float vPositionZ;\n\nhighp float random(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\nfloat quadraticIn(float t) {\n  return t * t;\n}\n\n#ifndef HALF_PI\n#define HALF_PI 1.5707963267948966\n#endif\n\nfloat sineOut(float t) {\n  return sin(t * HALF_PI);\n}\n\nconst vec3 baseColor = vec3(170., 133., 88.) / 255.;\n\nvoid main(){\n\tvec2 p = gl_PointCoord * 2. - 1.;\n\tfloat len = length(p);\n\n  float cRandom = random(vec2(vProgress * mix(minFlashingSpeed, 1., vRandom)));\n  cRandom = mix(0.3, 2., cRandom);\n\n  float cBlur = blur * mix(1., 0.3, vPositionZ);\n\tfloat shape = smoothstep(1. - cBlur, 1. + cBlur, (1. - cBlur) / len);\n  shape *= mix(0.5, 1., vRandom);\n\n  if (shape == 0.) discard;\n\n  float darkness = mix(0.1, 1., vPositionZ);\n\n  float alphaProgress = vProgress * fadeSpeed * mix(2.5, 1., pow(vDiff, 0.6));\n  alphaProgress *= mix(shortRangeFadeSpeed, 1., sineOut(vSpreadLength) * quadraticIn(vDiff));\n  float alpha = 1. - min(alphaProgress, 1.);\n  alpha *= cRandom * vDiff;\n\n\tgl_FragColor = vec4(baseColor * darkness * cRandom, shape * alpha);\n}\n";

function $a87C$var$_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function $a87C$var$_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function $a87C$var$_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) $a87C$var$_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) $a87C$var$_defineProperties(Constructor, staticProps);
  return Constructor;
}

var $a87C$var$PER_MOUSE = 5000;
var $a87C$var$COUNT = $a87C$var$PER_MOUSE * 800;
var $a87C$var$MOUSE_ATTRIBUTE_COUNT = 4;
var $a87C$var$FRONT_ATTRIBUTE_COUNT = 2;
var $a87C$var$data = {
  visible: {
    value: true
  }
};

var $a87C$var$uniformData = {
  size: {
    value: 0.05,
    range: [0, 1]
  },
  minSize: {
    value: 1,
    range: [0, 5]
  },
  speed: {
    value: 0.012,
    range: [0, 0.05]
  },
  fadeSpeed: {
    value: 1.1,
    range: [1, 2]
  },
  shortRangeFadeSpeed: {
    value: 1.3,
    range: [1, 5]
  },
  minFlashingSpeed: {
    value: 0.1,
    range: [0, 1]
  },
  spread: {
    value: 7,
    range: [0, 20]
  },
  maxSpread: {
    value: 5,
    range: [1, 20]
  },
  maxZ: {
    value: 100,
    range: [0, 500]
  },
  blur: {
    value: 1,
    range: [0, 1]
  },
  far: {
    value: 10,
    range: [0, 100]
  },
  maxDiff: {
    value: 100,
    range: [0, 1000]
  },
  diffPow: {
    value: 0.24,
    range: [0, 10]
  }
};
var $a87C$var$dataKeys = Object.keys($a87C$var$uniformData);

var $a87C$export$default =
/*#__PURE__*/
function () {
  function ShootingStar() {
    var _this = this;

    $a87C$var$_classCallCheck(this, ShootingStar);
    var root = $mrfc$export$default.root,
        controller = $mrfc$export$default.controller;
    this.root = root;
    this.rate = 1;
    this.setSize();
    var folder = controller.addFolder('Shooting Star');
    this.datData = controller.addData($a87C$var$data, {
      folder: folder
    });
    var front = new THREE.Vector2();
    var uniforms = {
      resolution: {
        value: $mrfc$export$default.resolution
      },
      pixelRatio: {
        value: root.renderer.getPixelRatio()
      },
      timestamp: {
        value: 0
      }
    };
    this.datUniformData = controller.addUniformData($a87C$var$uniformData, uniforms, {
      folder: folder
    });
    var geometry = this.geometry = new THREE.BufferGeometry();
    var positions = [];
    var mouse = [];
    var aFront = [];
    var random = [];

    for (var i = 0; i < $a87C$var$COUNT; i++) {
      positions.push(Math.random(), Math.random(), Math.random());
      mouse.push(-1, -1, 0, 0);
      aFront.push(front.x, front.y);
      random.push(Math.random());
    }

    geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.addAttribute('mouse', new THREE.Float32BufferAttribute(mouse, $a87C$var$MOUSE_ATTRIBUTE_COUNT));
    geometry.addAttribute('aFront', new THREE.Float32BufferAttribute(aFront, $a87C$var$FRONT_ATTRIBUTE_COUNT));
    geometry.addAttribute('random', new THREE.Float32BufferAttribute(random, 1));
    var $puli$$interop$default = $parcel$interopDefault($puli$exports);
    var $v3o$$interop$default = $parcel$interopDefault($v3o$exports);
    var material = this.material = new THREE.RawShaderMaterial({
      uniforms: uniforms,
      vertexShader: $puli$$interop$default.d,
      fragmentShader: $v3o$$interop$default.d,
      transparent: true,
      depthTest: false,
      blending: THREE.AdditiveBlending
    });
    var mesh = this.mesh = new THREE.Points(geometry, material);
    mesh.frustumCulled = false;
    mesh.visible = this.datData.visible;
    root.add(mesh); // root.initPostProcessing([
    //   new THREE.BloomPass(1.3, 25, 3.1, 256),
    //   new THREE.ShaderPass(THREE.CopyShader)
    // ])

    this.mouseI = 0;
    this.lineCoordinateList = [];
    this.enableSaveCoordinate = false;
    root.addUpdateCallback(function (timestamp) {
      _this.update(timestamp);
    });
  }

  $a87C$var$_createClass(ShootingStar, [{
    key: "setSize",
    value: function setSize() {
      this.rate = Math.min($mrfc$export$default.ratio > $mrfc$export$default.initialRatio ? $mrfc$export$default.clientHeight / $mrfc$export$default.initialClientHeight : $mrfc$export$default.clientWidth / $mrfc$export$default.initialClientWidth, 1);
      this.rate *= 1 / ($mrfc$export$default.clientHeight / $mrfc$export$default.initialClientHeight);
    }
  }, {
    key: "update",
    value: function update(timestamp) {
      var _this2 = this;

      this.timestamp = timestamp;
      this.material.uniforms['timestamp'].value = timestamp;
      this.mesh.visible = this.datData.visible;
      $a87C$var$dataKeys.forEach(function (key) {
        _this2.material.uniforms[key].value = _this2.datUniformData[key];
      });
    }
  }, {
    key: "draw",
    value: function draw(_ref) {
      var clientX = _ref.clientX,
          clientY = _ref.clientY;
      this.enableSaveCoordinate && this.lineCoordinateList.push({
        clientX: clientX,
        clientY: clientY
      }); // const x = clientX + store.clientHalfWidth
      // const y = store.clientHeight - (clientY + store.clientHalfHeight)

      var x = clientX * this.rate + $mrfc$export$default.clientHalfWidth;
      var y = $mrfc$export$default.clientHeight - (clientY * this.rate + $mrfc$export$default.clientHalfHeight);
      var newPosition = new THREE.Vector2(x, y);
      var diff = this.oldPosition ? newPosition.clone().sub(this.oldPosition) : new THREE.Vector2();
      var length = diff.length();
      var front = diff.clone().normalize();

      for (var i = 0; i < $a87C$var$PER_MOUSE; i++) {
        var ci = this.mouseI % ($a87C$var$COUNT * $a87C$var$MOUSE_ATTRIBUTE_COUNT) + i * $a87C$var$MOUSE_ATTRIBUTE_COUNT;
        var position = this.oldPosition ? this.oldPosition.clone().add(diff.clone().multiplyScalar(i / $a87C$var$PER_MOUSE)) : newPosition;
        this.geometry.attributes['mouse'].array[ci] = position.x;
        this.geometry.attributes['mouse'].array[ci + 1] = position.y;
        this.geometry.attributes['mouse'].array[ci + 2] = this.timestamp;
        this.geometry.attributes['mouse'].array[ci + 3] = length;
        this.geometry.attributes['aFront'].array[ci] = front.x;
        this.geometry.attributes['aFront'].array[ci + 1] = front.y;
      }

      this.oldPosition = newPosition;
      this.geometry.attributes['mouse'].needsUpdate = true;
      this.geometry.attributes['aFront'].needsUpdate = true;
      this.mouseI += $a87C$var$MOUSE_ATTRIBUTE_COUNT * $a87C$var$PER_MOUSE;
    }
  }, {
    key: "start",
    value: function start() {
      var _this3 = this;

      this.oldPosition = null;
      window.addEventListener('pointermove', function (e) {
        var clientX = e.clientX,
            clientY = e.clientY;

        _this3.draw({
          clientX: clientX - $mrfc$export$default.clientHalfWidth,
          clientY: clientY - $mrfc$export$default.clientHalfHeight
        });
      });

    }
  }]);
  return ShootingStar;
}();


// ASSET: shaders/general/three-raw-plain.vert
var $eAJ8$exports = {};
$eAJ8$exports = "precision highp float;\nprecision highp int;\n#define GLSLIFY 1\nattribute vec3 position;\nattribute vec2 uv;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\n\nvarying vec2 vUv;\n\nvoid main () {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);\n}\n";
// ASSET: shaders/text.frag
var $UNYd$exports = {};
$UNYd$exports = "precision highp float;\nprecision highp int;\n#define GLSLIFY 1\n\nuniform sampler2D map;\nuniform float uProgress;\nuniform float uStartX;\nuniform float uRatio;\nuniform float alpha;\n\nvarying vec2 vUv;\n\nvoid main(){\n\tvec4 textureColor = texture2D(map, vUv);\n\tfloat angle = uRatio / 3.;\n\tfloat isShow = step(1., 1. - vUv.x + (uProgress / uStartX * 0.5 + 0.5) - abs(vUv.y - 0.5) / angle);\n\tgl_FragColor = vec4(textureColor.rgb, textureColor.a * alpha * isShow);\n\t// gl_FragColor = vec4(isShow);\n}\n";


function $Focm$var$_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function $Focm$var$_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function $Focm$var$_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) $Focm$var$_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) $Focm$var$_defineProperties(Constructor, staticProps);
  return Constructor;
}

var $Focm$var$CAMERA_Z = 5000;
var $Focm$var$MAX_CAMERA_Z = 5000;
var $Focm$var$FIRST_DURATION = 1080;
var $Focm$var$DELAY = 30;
var $Focm$var$data = {
  play: {
    value: null
  }
};

var $Focm$var$WebGL =
/*#__PURE__*/
function () {
  function WebGL(_ref) {
    var _this = this;

    var canvas = _ref.canvas,
        _ref$container = _ref.container,
        container = _ref$container === void 0 ? document.body : _ref$container;
    $Focm$var$_classCallCheck(this, WebGL);
    var controller = new $IDtB$export$default({
      closed: true
    });
    $mrfc$export$default.controller = controller;
    var initialClientWidth = $mrfc$export$default.initialClientWidth = container.clientWidth;
    var initialClientHeight = $mrfc$export$default.initialClientHeight = container.clientHeight; // store.initialRatio = container.clientWidth / container.clientHeight

    $mrfc$export$default.initialRatio = 1;
    var root = this.root = $mrfc$export$default.root = new $pTw7$export$default({
      isDev: true,
      container: container,
      fov: Math.atan(initialClientHeight / 2 / $Focm$var$CAMERA_Z) * (180 / Math.PI) * 2,
      zFar: $Focm$var$MAX_CAMERA_Z,
      cameraPosition: [0, 0, $Focm$var$CAMERA_Z],
      aspect: window.innerWidth / window.innerHeight,
      canvas: canvas
    });
    this.setSize();
    this.shootingStar = new $a87C$export$default();

    $Focm$var$data['play'].value = function () {
    };

  }

  $Focm$var$_createClass(WebGL, [{
    key: "setSize",
    value: function setSize() {
      var clientWidth = $mrfc$export$default.clientWidth = this.root.canvas.clientWidth;
      var clientHeight = $mrfc$export$default.clientHeight = this.root.canvas.clientHeight;
      $mrfc$export$default.clientHalfWidth = clientWidth / 2;
      $mrfc$export$default.clientHalfHeight = clientHeight / 2;
      $mrfc$export$default.resolution = new THREE.Vector2(clientWidth, clientHeight);
      $mrfc$export$default.ratio = clientWidth / clientHeight;
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;
      _this2.shootingStar.start();
    }
  }]);
  return WebGL;
}();

var $Focm$var$webGL = new $Focm$var$WebGL({
  canvas: document.getElementById('canvas')
});
$Focm$var$webGL.start();
return {
  "Focm": {}
};
});

