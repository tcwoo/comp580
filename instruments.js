
function Instrument(name, layer) {
	var self = this;
	self.name = name;
	self.volume = 0.5;
	self.pan = 0;
	self.layer = layer;
	self.audio = null;
	self.lastNote = null;

	// Public functions

	self.playNote = function(button) {
		// If layering is turned off, fade out sound
		var note = button == BUTTONS.R1 ? 8 : button % 8;
		if (! self.layer && self.audio) {
			// Play a little longer, then stop
			var audio = self.audio;
			fadeOut(audio);
		}

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