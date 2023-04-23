// Function that returns a number with 2 digits after . every time
export function displayNum(num, force) {
	let rounded = (Math.floor(parseFloat(num) * 100) / 100).toString()
	const dot_index = rounded.indexOf('.');
	if (dot_index !== -1) {
		const digits_after = rounded.length - dot_index;
		if (digits_after === 2) {
			rounded += '0';
		}
	} else if (force) {
		rounded += '.00';
	}
	return rounded;
}