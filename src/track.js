
var SCALES = {
	BLUES: [0, 3, 5, 6, 7, 10, 11, 12]
}

var RIFFS = {
	BLUES: []
}

var TRACKS = [
	new Track('blues', SCALES.BLUES, RIFFS.BLUES)
];

function Track(name, scale, riffs) {
	var self = this;
	self.name = name;
	self.volume = 0.5;
	self.audio = null;
	self.scale = scale;
	self.riffs = riffs;

	// Public functions

	self.play = function() {
		// Loop track
		var src = sprintf("audio/tracks/%s.mp3", self.name);
		self.audio = new Audio(src);
		self.audio.volume = self.volume;
		self.audio.loop = true;
		self.audio.play();
	}

	self.stop = function() {
		fadeOut(self.audio);
	}

	self.translate = function(button) {
		// Translate a button to a note depending on scale
		var index = button == BUTTONS.R1 ? 8 : button % 8;
		return self.scale[index];
	}

	// Private functions

	function fadeOut(audio) {
		var fadeInterval = setInterval(function() {
			if (audio.volume == 0.0) clearInterval(fadeInterval);
			else if (audio.volume <= 0.05) audio.volume = 0;
			else audio.volume -= 0.05;
		}, 10);
	}
}