
var INSTRUMENTS = [
	new Instrument('guitar'),
	new Instrument('saxophone'),
	new Instrument('piano')
];

function Instrument(name) {
	var self = this;
	self.name = name;
	self.volume = 1;
	self.audio = null;
	self.lastNote = null;

	// Public functions

	self.playRiff = function(button, track) {
		// Fade out last note
		if (self.audio) fadeOut(self.audio);
	}

	self.playNote = function(button, track) {
		// Fade out last note
		if (self.audio) fadeOut(self.audio);

		// Play new note
		var note = track.translate(button);
		var src = sprintf("audio/notes/%s/%02d.mp3", self.name, note + 1);
		console.log(src);
		self.audio = new Audio(src);
		self.audio.volume = self.volume;
		self.audio.play();
		self.lastNote = note;
	}

	// Private functions

	function fadeOut(audio) {
		var fadeInterval = setInterval(function() {
			if (audio.volume == 0.0) {
				clearInterval(fadeInterval);
				self.audio.stop();
			} else if (audio.volume <= 0.05) audio.volume = 0;
			else audio.volume -= 0.05;
		}, 10);
	}
}