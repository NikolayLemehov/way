!function(t){var r={};function o(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=r,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(n,e){if(1&e&&(n=o(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var r in n)o.d(t,r,function(e){return n[e]}.bind(null,r));return t},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="",o(o.s="./js/main.js")}({"./js/country-tab.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CountryTab; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar CountryTab =\n/*#__PURE__*/\nfunction () {\n  function CountryTab(bookmarkItem) {\n    _classCallCheck(this, CountryTab);\n\n    this.bookmarkItem = bookmarkItem;\n    this.tab = bookmarkItem ? bookmarkItem.querySelector("a") : null;\n    this.isActive = null;\n    this.country = null;\n    this.descriptionItem = null;\n    this.isAllExisting = this._active();\n  }\n\n  _createClass(CountryTab, [{\n    key: "uncheck",\n    value: function uncheck() {\n      this.bookmarkItem.classList.remove("country__bookmark-item--active");\n      this.tab.removeAttribute("tabindex");\n      this.descriptionItem.classList.remove("country__description-item--active");\n      this.isActive = false;\n    }\n  }, {\n    key: "check",\n    value: function check() {\n      this.bookmarkItem.classList.add("country__bookmark-item--active");\n      this.tab.tabIndex = "-1";\n      this.descriptionItem.classList.add("country__description-item--active");\n      this.isActive = true;\n    }\n  }, {\n    key: "_active",\n    value: function _active() {\n      this.isAllExisting = this.bookmarkItem && this.tab;\n\n      if (!(this.bookmarkItem && this.tab)) {\n        return false;\n      }\n\n      this.isActive = this.bookmarkItem.classList.contains("country__bookmark-item--active");\n      this.country = this.bookmarkItem.dataset.country;\n      this.descriptionItem = document.querySelector(".country__description-item--".concat(this.country));\n      return !!this.descriptionItem;\n    }\n  }]);\n\n  return CountryTab;\n}();\n\n\n\n//# sourceURL=webpack:///./js/country-tab.js?')},"./js/country.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Country; });\n/* harmony import */ var _country_tab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./country-tab */ "./js/country-tab.js");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar Country =\n/*#__PURE__*/\nfunction () {\n  function Country(element) {\n    _classCallCheck(this, Country);\n\n    this.element = element;\n    this.bookmarkItems = element.querySelectorAll(".country__bookmark-item");\n    this.isAllExisting = !!this.element && this.bookmarkItems.length > 0;\n    this.countryTabs = null;\n    this.currentTab = null;\n  }\n\n  _createClass(Country, [{\n    key: "active",\n    value: function active() {\n      var _this = this;\n\n      if (!this.isAllExisting) {\n        return;\n      }\n\n      this.countryTabs = Array.from(this.bookmarkItems).map(function (it) {\n        return new _country_tab__WEBPACK_IMPORTED_MODULE_0__["default"](it);\n      });\n      var isAllCountryTabExisting = this.countryTabs.some(function (it) {\n        return it.isAllExisting;\n      });\n\n      if (!isAllCountryTabExisting) {\n        return;\n      }\n\n      if (this.element.classList.contains("country--nojs")) {\n        this.element.classList.remove("country--nojs");\n      }\n\n      this._onViewChange();\n\n      this.countryTabs[0].check();\n      this.currentTab = this.countryTabs[0];\n      this.countryTabs.forEach(function (it) {\n        it.tab.addEventListener("click", function (evt) {\n          evt.preventDefault();\n\n          if (it.bookmarkItem.classList.contains("country__bookmark-item--active")) {\n            return;\n          }\n\n          var oldTab = _this.currentTab;\n          oldTab.uncheck();\n          _this.currentTab = it;\n          it.check();\n        });\n      });\n    }\n  }, {\n    key: "_onViewChange",\n    value: function _onViewChange() {\n      this.countryTabs.forEach(function (it) {\n        if (it.isActive) {\n          it.uncheck();\n        }\n      });\n    }\n  }]);\n\n  return Country;\n}();\n\n\n\n//# sourceURL=webpack:///./js/country.js?')},"./js/debounce.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return debounce; });\nvar debounce = function debounce(cb, delay) {\n  var lastTimeout = null;\n  return function () {\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    if (lastTimeout) {\n      clearTimeout(lastTimeout);\n    }\n\n    lastTimeout = setTimeout(function () {\n      cb.apply(void 0, args);\n    }, delay);\n  };\n};\n\n\n\n//# sourceURL=webpack:///./js/debounce.js?')},"./js/main.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./js/utils.js");\n/* harmony import */ var _smooth_scroll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./smooth-scroll */ "./js/smooth-scroll.js");\n/* harmony import */ var _page_header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-header */ "./js/page-header.js");\n/* harmony import */ var _country__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./country */ "./js/country.js");\n\n\n\n\nObject(_utils__WEBPACK_IMPORTED_MODULE_0__["activeForEeachNodeListForIE"])();\nObject(_smooth_scroll__WEBPACK_IMPORTED_MODULE_1__["activeSmoothScroll"])();\nvar pageHeader = new _page_header__WEBPACK_IMPORTED_MODULE_2__["default"](document.querySelector(".page-header"));\npageHeader.active();\nvar country = new _country__WEBPACK_IMPORTED_MODULE_3__["default"](document.querySelector(".country"));\ncountry.active();\n\n//# sourceURL=webpack:///./js/main.js?')},"./js/page-header.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PageHeader; });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./js/utils.js");\n/* harmony import */ var _debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debounce */ "./js/debounce.js");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar KEY_CODE_ESC = 27;\nvar DELAY_DEL_ATTRIBUTE = 300;\n\nvar PageHeader =\n/*#__PURE__*/\nfunction () {\n  function PageHeader(element) {\n    _classCallCheck(this, PageHeader);\n\n    this.element = element;\n    this.btn = element ? element.querySelector(".page-header__menu > button") : null;\n    this.menu = element ? element.querySelector(".page-header__menu ul") : null;\n    this.menuItems = element ? element.querySelectorAll(".page-header__menu .scroll-to") : null;\n    this.isAllExisting = element && this.btn && this.menu && this.menuItems.length > 0;\n    this._onDocumentMenuEscKeyDown = this._onDocumentMenuEscKeyDown.bind(this);\n  }\n\n  _createClass(PageHeader, [{\n    key: "active",\n    value: function active() {\n      var _this = this;\n\n      if (!this.isAllExisting) {\n        return;\n      }\n\n      if (this.element.classList.contains("page-header--nojs")) {\n        this.element.classList.remove("page-header--nojs");\n      }\n\n      this.btn.removeAttribute("style");\n\n      this._closeMenu();\n\n      this.menuItems.forEach(function (it) {\n        it.addEventListener("click", function () {\n          _this._closeMenu();\n        });\n      });\n      this.btn.addEventListener("click", function (evt) {\n        evt.preventDefault();\n\n        if (_this.element.classList.contains("page-header--close")) {\n          _this._openMenu();\n        } else {\n          _this._closeMenu();\n        }\n      });\n\n      var delAttribute = function delAttribute() {\n        _this.menu.removeAttribute("style");\n      };\n\n      var debounceDelAttribute = Object(_debounce__WEBPACK_IMPORTED_MODULE_1__["debounce"])(delAttribute, DELAY_DEL_ATTRIBUTE);\n      window.addEventListener("resize", function () {\n        if (_this.element.classList.contains("page-header--close")) {\n          _this.menu.style.display = "none";\n        }\n\n        debounceDelAttribute();\n      });\n    }\n  }, {\n    key: "_closeMenu",\n    value: function _closeMenu() {\n      document.documentElement.style.overflow = "";\n      document.documentElement.style.paddingRight = "";\n\n      if (!this.element.classList.contains("page-header--close")) {\n        this.element.classList.add("page-header--close");\n      }\n\n      document.removeEventListener("keydown", this._onDocumentMenuEscKeyDown);\n      this.menuItems.forEach(function (it) {\n        it.tabIndex = "-1";\n      });\n    }\n  }, {\n    key: "_openMenu",\n    value: function _openMenu() {\n      document.documentElement.style.overflow = "hidden";\n      document.documentElement.style.paddingRight = "".concat(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getScrollbarWidth"])(), "px");\n\n      if (this.element.classList.contains("page-header--close")) {\n        this.element.classList.remove("page-header--close");\n      }\n\n      document.addEventListener("keydown", this._onDocumentMenuEscKeyDown);\n      this.menuItems.forEach(function (it) {\n        it.removeAttribute("tabindex");\n      });\n    }\n  }, {\n    key: "_onDocumentMenuEscKeyDown",\n    value: function _onDocumentMenuEscKeyDown(evt) {\n      if (evt.keyCode === KEY_CODE_ESC) {\n        this._closeMenu();\n      }\n    }\n  }]);\n\n  return PageHeader;\n}();\n\n\n\n//# sourceURL=webpack:///./js/page-header.js?')},"./js/smooth-scroll.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "activeSmoothScroll", function() { return activeSmoothScroll; });\nvar activeSmoothScroll = function activeSmoothScroll() {\n  var anchors = document.querySelectorAll("a.scroll-to");\n  anchors.forEach(function (anchor) {\n    anchor.addEventListener("click", function (evt) {\n      evt.preventDefault();\n      var blockID = anchor.getAttribute("href");\n      var target = null;\n\n      try {\n        target = document.querySelector(blockID);\n      } catch (error) {\n        return;\n      }\n\n      if (target) {\n        doScrolling(target.getBoundingClientRect().top, 800);\n      }\n    });\n  });\n};\n\nvar doScrolling = function doScrolling(elementY, duration) {\n  var startingY = window.pageYOffset;\n  var diff = elementY - startingY;\n  var start; // Bootstrap our animation - it will get called right before next frame shall be rendered.\n\n  window.requestAnimationFrame(function step(timestamp) {\n    if (!start) {\n      start = timestamp;\n    } // Elapsed milliseconds since start of scrolling.\n\n\n    var time = timestamp - start; // Get percent of completion in range [0, 1].\n\n    var percent = Math.min(time / duration, 1);\n    window.scrollTo(0, startingY + diff * percent); // Proceed with animation as long as we wanted it to.\n\n    if (time < duration) {\n      window.requestAnimationFrame(step);\n    }\n  });\n};\n\n\n\n//# sourceURL=webpack:///./js/smooth-scroll.js?')},"./js/utils.js":function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "activeForEeachNodeListForIE", function() { return activeForEeachNodeListForIE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScrollbarWidth", function() { return getScrollbarWidth; });\nvar activeForEeachNodeListForIE = function activeForEeachNodeListForIE() {\n  if (typeof NodeList.prototype.forEach !== "function") {\n    NodeList.prototype.forEach = Array.prototype.forEach;\n  }\n};\n\nvar getScrollbarWidth = function getScrollbarWidth() {\n  var outer = document.createElement("div");\n  outer.style.visibility = "hidden";\n  outer.style.overflow = "scroll";\n  outer.style.msOverflowStyle = "scrollbar";\n  document.body.appendChild(outer);\n  var inner = document.createElement("div");\n  outer.appendChild(inner);\n  var scrollbarWidth = outer.offsetWidth - inner.offsetWidth;\n  outer.parentNode.removeChild(outer);\n  return scrollbarWidth;\n};\n\n\n\n//# sourceURL=webpack:///./js/utils.js?')}});