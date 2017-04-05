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

doorbell.on("ring", (sound) => {
	console.log("The doorbell rang!", sound);
});

doorbell.ring(); // Prints: The doorbell rang! RRRRRRING!