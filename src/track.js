
// Translate buttons to "notes" in a scale
var NOTES = {};
NOTES[BUTTONS.X] = 0;
NOTES[BUTTONS.SQUARE] = 1;
NOTES[BUTTONS.CIRCLE] = 2;
NOTES[BUTTONS.TRIANGLE] = 3;
NOTES[BUTTONS.DPAD_DOWN] = 4;
NOTES[BUTTONS.DPAD_LEFT] = 5;
NOTES[BUTTONS.DPAD_RIGHT] = 6;
NOTES[BUTTONS.DPAD_UP] = 7;

// Translate notes played to appropriate notes in scale
var SCALES = {
	BLUES: [0, 3, 5, 6, 7, 10, 11, 12]
}

// Collection of pre-made riffs
var RIFFS = {
	BLUES: []
}

var TRACKS = [
	new Track('blues', SCALES.BLUES, RIFFS.BLUES, 0.15)
];

function Track(name, scale, riffs, volume) {
	var self = this;
	self.name = name;
	self.scale = scale;
	self.riffs = riffs;
	self.volume = volume;
	self.audio = null;

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
		if (self.audio) fadeOut(self.audio);
	}

	self.translate = function(button) {
		// Translate a button to a note in the appropriate scale
		var index = NOTES[button];
		return self.scale[index];
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