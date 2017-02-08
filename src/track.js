
var TRACKS = [
	new Track('blues')
];

function Track(name) {
	var self = this;
	self.name = name;
	self.volume = 0.5;
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
		fadeOut(self.audio);
	}

	// Private functions

	function fadeOut(audio) {
		var fadeInterval = setInterval(function() {
			audio.volume -= 0.05;
			if (audio.volume <= 0) clearInterval(fadeInterval);
		}, 10);
	}
}