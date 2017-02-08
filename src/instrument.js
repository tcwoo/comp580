
var INSTRUMENTS = [
	new Instrument('guitar'),
	new Instrument('saxophone'),
	new Instrument('piano')
];

function Instrument(name) {
	var self = this;
	self.name = name;
	self.volume = 0.5;
	self.audio = null;
	self.lastNote = null;

	// Public functions

	self.playAutomaticNote = function() {
		// Fade out last note
		if (self.audio) fadeOut(self.audio);
	}

	self.playManualNote = function(button) {
		// Fade out last note
		if (self.audio) fadeOut(self.audio);

		// Play new note
		var src = sprintf("audio/%s-%d.mp3", self.name, note);
		self.audio = new Audio(src);
		self.audio.volume = self.volume;
		self.audio.play();
		self.lastNote = note;
	}

	// Private functions

	function fadeOut(audio) {
		var fadeInterval = setInterval(function() {
			audio.volume -= 0.05;
			if (audio.volume <= 0) clearInterval(fadeInterval);
		}, 10);
	}
}