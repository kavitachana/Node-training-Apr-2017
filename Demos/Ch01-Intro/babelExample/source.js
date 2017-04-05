function joinList(items) {
	return items.join(", ");
}

function doubleList(numbers) {
	return numbers.map((number) => {
		return number * 2;
	});
}

let originalNumbers = [1, 2, 3];
let doubledNumbers = doubleList(originalNumbers);

console.log(`Some doubled numbers: (${joinList(originalNumbers)}) -> (${joinList(doubledNumbers)})`);
