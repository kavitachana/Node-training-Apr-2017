const events = require("events");

function createDoorbell(sound) {
	function ring() {
		this.emit("ring", sound);
	}

	return Object.assign(new events.EventEmitter(), {
		ring: ring
	});
}

let doorbell = createDoorbell("RRRRRRING!");

doorbellHandler = function(sound) {
    console.log("The doorbell rang!", sound);
}

console.log("Ringing multiple times:");

doorbell.on("ring", doorbellHandler);

doorbell.ring(); // Prints: The doorbell rang! RRRRRRING!
doorbell.ring(); // Prints: The doorbell rang! RRRRRRING!

console.log("Removing listener");

doorbell.removeListener("ring", doorbellHandler);

doorbell.ring(); // Nothing happens, because the handler was removed

console.log("Ringing multiple times, but only adding a single-use event listener:");

doorbell.once("ring", doorbellHandler);

doorbell.ring(); // Prints: The doorbell rang! RRRRRRING!
doorbell.ring(); // Nothing happens, because the handler was added using `.once` instead of `.on`, and therefore automatically removed after the first ring
