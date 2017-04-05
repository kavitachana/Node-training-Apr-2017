"use strict";

function joinList(items) {
	return items.join(", ");
}

function doubleList(numbers) {
	return numbers.map(function (number) {
		return number * 2;
	});
}

var originalNumbers = [1, 2, 3];
var doubledNumbers = doubleList(originalNumbers);

console.log("Some doubled numbers: (" + joinList(originalNumbers) + ") -> (" + joinList(doubledNumbers) + ")");
