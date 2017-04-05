(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = function arrayToText(array) {
	return array.join(", ");
}

},{}],2:[function(require,module,exports){
'use strict';

var arrUnion = require("arr-union");
var arrayToText = require("./array-to-text");

document.addEventListener("DOMContentLoaded", function() {
	var arrayOne = [1, 2, 3, 4, 5, 6, 7];
	var arrayTwo = [3, 4, 5, 6, 7, 8, 9];

	var combinedArray = arrUnion(arrayOne, arrayTwo);
	var text = arrayToText(combinedArray);

	document.getElementById("text").innerHTML = text;
});

},{"./array-to-text":1,"arr-union":3}],3:[function(require,module,exports){
'use strict';

module.exports = function union(init) {
  if (!Array.isArray(init)) {
    throw new TypeError('arr-union expects the first argument to be an array.');
  }

  var len = arguments.length;
  var i = 0;

  while (++i < len) {
    var arg = arguments[i];
    if (!arg) continue;

    if (!Array.isArray(arg)) {
      arg = [arg];
    }

    for (var j = 0; j < arg.length; j++) {
      var ele = arg[j];

      if (init.indexOf(ele) >= 0) {
        continue;
      }
      init.push(ele);
    }
  }
  return init;
};

},{}]},{},[2]);
