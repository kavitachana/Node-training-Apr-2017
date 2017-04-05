let timeInterval, duration = 0;

let clock = document.getElementById('clockdiv');
let timeSpan = clock.querySelector('.timer');
let timer = duration, minutes, seconds;

function startTimer(time) {
	if (time == 0) {
		timer = 0;
		duration = 0;
		clearInterval(timeInterval);
		timeSpan.innerHTML = "00:00";
	} else {
		clearInterval(timeInterval);

		if (duration == 0) {
			duration = (60 * time);
		}

		if (duration != 0) {
			timer += (60 * time);
		}

		function updateClock() {
			minutes = parseInt(timer / 60, 10);
			seconds = parseInt(timer % 60, 10);

			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;

			timeSpan.innerHTML = minutes + ":" + seconds;

			if (--timer <= 0) {
				timer = duration;
				clearInterval(timeInterval);
				timeSpan.innerHTML = "00:00";
			}
		}

		updateClock();
		timeInterval = setInterval(updateClock, 1000);
	}
}