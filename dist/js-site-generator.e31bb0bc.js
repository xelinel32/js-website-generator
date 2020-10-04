// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
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
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"style/style.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"assets/image1.png":[function(require,module,exports) {
module.exports = "/image1.cf2cab8e.png";
},{}],"utils/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.row = row;
exports.col = col;
exports.css = css;
exports.block = block;

function row(content, styles) {
  return "<div style=".concat(styles, " class=\"row\">").concat(content, "</div>");
}

function col(content) {
  return "<div class=\"col-sm\">".concat(content, "</div>");
}

function css() {
  var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (typeof styles === 'string') return styles;

  var toStringStyle = function toStringStyle(key) {
    return "".concat(key, ":").concat(styles[key]);
  };

  return Object.keys(styles).map(toStringStyle).join(';');
}

function block(type) {
  return "\n    <form name=\"".concat(type, "\">\n      <h5>").concat(type, "</h5>\n      <div class=\"form-group\">\n        <input class=\"form-control form-control-sm\" name=\"value\" placeholder=\"value\" />\n      </div>\n      <div class=\"form-group\">\n        <input class=\"form-control form-control-sm\" name=\"styles\" placeholder=\"styles\" />\n      </div>\n      <button type=\"submit\" class=\"btn btn-primary btn-sm\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button>\n    </form>\n    <hr />\n  ");
}
},{}],"model/classModels.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageBlock = exports.ColumnsBlock = exports.TextBlock = exports.TitleBlock = exports.Block = void 0;

var _utils = require("../utils/utils");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Block = /*#__PURE__*/function () {
  function Block(value, options) {
    _classCallCheck(this, Block);

    ;
    this.value = value, this.options = options;
  }

  _createClass(Block, [{
    key: "toHTML",
    value: function toHTML() {
      throw new Error('Method toHTML should be implemented');
    }
  }]);

  return Block;
}();

exports.Block = Block;

var TitleBlock = /*#__PURE__*/function (_Block) {
  _inherits(TitleBlock, _Block);

  var _super = _createSuper(TitleBlock);

  function TitleBlock(value, options) {
    _classCallCheck(this, TitleBlock);

    return _super.call(this, value, options);
  }

  _createClass(TitleBlock, [{
    key: "toHTML",
    value: function toHTML() {
      var _this$options = this.options,
          _this$options$tag = _this$options.tag,
          tag = _this$options$tag === void 0 ? 'h1' : _this$options$tag,
          styles = _this$options.styles;
      return (0, _utils.row)((0, _utils.col)("<".concat(tag, ">").concat(this.value, "</").concat(tag, ">")), (0, _utils.css)(styles));
    }
  }]);

  return TitleBlock;
}(Block);

exports.TitleBlock = TitleBlock;

var TextBlock = /*#__PURE__*/function (_Block2) {
  _inherits(TextBlock, _Block2);

  var _super2 = _createSuper(TextBlock);

  function TextBlock(value, options) {
    _classCallCheck(this, TextBlock);

    return _super2.call(this, value, options);
  }

  _createClass(TextBlock, [{
    key: "toHTML",
    value: function toHTML() {
      var _this$options2 = this.options,
          _this$options2$tag = _this$options2.tag,
          tag = _this$options2$tag === void 0 ? 'p' : _this$options2$tag,
          styles = _this$options2.styles;
      return (0, _utils.row)((0, _utils.col)("<".concat(tag, ">").concat(this.value, "</").concat(tag, ">")), (0, _utils.css)(styles));
    }
  }]);

  return TextBlock;
}(Block);

exports.TextBlock = TextBlock;

var ColumnsBlock = /*#__PURE__*/function (_Block3) {
  _inherits(ColumnsBlock, _Block3);

  var _super3 = _createSuper(ColumnsBlock);

  function ColumnsBlock(value, options) {
    _classCallCheck(this, ColumnsBlock);

    return _super3.call(this, value, options);
  }

  _createClass(ColumnsBlock, [{
    key: "toHTML",
    value: function toHTML() {
      var styles = this.options.styles;
      var html = this.value.map(function (item) {
        return (0, _utils.col)(item);
      });
      return (0, _utils.row)(html.join(''), (0, _utils.css)(styles));
    }
  }]);

  return ColumnsBlock;
}(Block);

exports.ColumnsBlock = ColumnsBlock;

var ImageBlock = /*#__PURE__*/function (_Block4) {
  _inherits(ImageBlock, _Block4);

  var _super4 = _createSuper(ImageBlock);

  function ImageBlock(value, options) {
    _classCallCheck(this, ImageBlock);

    return _super4.call(this, value, options);
  }

  _createClass(ImageBlock, [{
    key: "toHTML",
    value: function toHTML() {
      var styles = this.options.styles;
      return (0, _utils.row)("<img style=\"".concat((0, _utils.css)(styles), "\" src=\"").concat(this.value, "\" alt=\"").concat(this.type, "\" />"));
    }
  }]);

  return ImageBlock;
}(Block);

exports.ImageBlock = ImageBlock;
},{"../utils/utils":"utils/utils.js"}],"model/model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _image = _interopRequireDefault(require("../assets/image1.png"));

var _classModels = require("./classModels");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// нужно создать сущность модель и описать блок
var title = new _classModels.TitleBlock('Генератор для сайта на JS', {
  tag: 'h2',
  styles: {
    background: '#ccc',
    color: '#fff',
    'text-align': 'center',
    'font-family': 'Consolas',
    display: 'block'
  }
});
var text = new _classModels.TextBlock('Подзаголовок для конструктора', {
  tag: 'p',
  styles: {
    background: '#fff',
    color: 'red',
    'text-align': 'left',
    'margin-left': 'auto',
    padding: '1rem',
    display: 'block'
  }
});
var columns = new _classModels.ColumnsBlock(['Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum?', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum?', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum?'], {
  styles: {
    background: '#000',
    color: 'green',
    padding: '2rem'
  }
});
var img = new _classModels.ImageBlock(_image.default, {
  styles: {
    'max-width': '500px',
    margin: '20px auto 0',
    height: 'auto'
  }
});
var _default = [title, text, columns, img];
exports.default = _default;
},{"../assets/image1.png":"assets/image1.png","./classModels":"model/classModels.js"}],"model/point.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Point = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Point = /*#__PURE__*/function () {
  function Point(selector) {
    _classCallCheck(this, Point);

    this.$el = document.getElementById(selector);
  }

  _createClass(Point, [{
    key: "$render",
    value: function $render(model) {
      var _this = this;

      this.$el.innerHTML = '';
      model.forEach(function (element) {
        _this.$el.insertAdjacentHTML('beforeend', element.toHTML());
      });
    }
  }]);

  return Point;
}();

exports.Point = Point;
},{}],"model/classSidebar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sidebar = void 0;

var _utils = require("../utils/utils");

var _classModels = require("./classModels");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Sidebar = /*#__PURE__*/function () {
  function Sidebar(selector, updCallback) {
    _classCallCheck(this, Sidebar);

    this.$el = document.getElementById('panel');
    this.update = updCallback;
    this.initSidebar();
  }

  _createClass(Sidebar, [{
    key: "initSidebar",
    value: function initSidebar() {
      this.$el.insertAdjacentHTML('afterbegin', this.template);
      this.$el.addEventListener('submit', this.addBlock.bind(this));
    }
  }, {
    key: "addBlock",
    value: function addBlock(e) {
      e.preventDefault();
      var type = e.target.name;
      var value = e.target.value.value;
      var styles = e.target.styles.value;
      var newBlock = type === 'text' ? new _classModels.TextBlock(value, {
        styles: styles
      }) : new _classModels.TitleBlock(value, {
        styles: styles
      });
      this.update(newBlock);
      e.target.styles.value = '';
      e.target.value.value = '';
    } // getter

  }, {
    key: "template",
    get: function get() {
      return [(0, _utils.block)('text'), (0, _utils.block)('title')].join('');
    }
  }]);

  return Sidebar;
}();

exports.Sidebar = Sidebar;
},{"../utils/utils":"utils/utils.js","./classModels":"model/classModels.js"}],"model/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;

var _point = require("./point");

var _classSidebar = require("./classSidebar");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var App = /*#__PURE__*/function () {
  function App(model) {
    _classCallCheck(this, App);

    this.model = model;
  }

  _createClass(App, [{
    key: "init",
    value: function init() {
      var _this = this;

      // $ - dom element
      var main = new _point.Point('main');
      main.$render(this.model);
      new _classSidebar.Sidebar('panel', function (newBlock) {
        _this.model.push(newBlock);

        main.$render(_this.model);
      });
    }
  }]);

  return App;
}();

exports.App = App;
},{"./point":"model/point.js","./classSidebar":"model/classSidebar.js"}],"index.js":[function(require,module,exports) {
"use strict";

require("./style/style.scss");

var _model = _interopRequireDefault(require("./model/model"));

var _app = require("./model/app");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _app.App(_model.default).init();
},{"./style/style.scss":"style/style.scss","./model/model":"model/model.js","./model/app":"model/app.js"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56819" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/js-site-generator.e31bb0bc.js.map