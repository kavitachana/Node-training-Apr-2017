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
