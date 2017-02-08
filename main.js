
// Constants
var LOCATIONS = { MENU: 0, JAMMING: 1 };
var MODES = { AUTOMATIC: 0, MANUAL: 1 };

function Game() {
	var self = this;
	self.instrument = INSTRUMENTS[0];
	self.track = TRACKS[0];
	self.location = LOCATIONS.MENU;
	self.mode = MODES.MANUAL;

	// Public functions

	self.start = function() {
		debug('Game started');
		// Initialize controller and bindings
		var controller = new Controller();
		controller.setButtonListener(function(event, button) {
			// We only care about buttons being pressed
			if (event != EVENTS.BUTTON_PRESSED) return;

			// Handle button depending on our location
			if (self.location == LOCATIONS.MENU) handleMenuEvent(button);
			else handleJammingEvent(button);
		});

		// Listen with a delay of 5ms
		controller.listen(5);

		// Speak instructions
		speak('Welcome to Synesthesia Maker. Press the left/right buttons to cycle through the available tracks, then press the bottom right button with your thumb to select a track.')
	}

	// Private functions

	function debug(msg) {
		var location = self.location == LOCATIONS.MENU ? 'MENU' : 'JAMMING';
		var instrument = self.instrument.name;
		var msg = sprintf('%s; location = %s; instrument = %s', msg, location, instrument);
		$('body').prepend('<p>' + msg + '</p>');
	}

	function speak(text, callback) {
		window.speechSynthesis.cancel();
		var msg = new SpeechSynthesisUtterance(text);
		msg.onend = callback;
		window.speechSynthesis.speak(msg);
	}

	function handleMenuEvent(button) {
		switch (button) {
			case BUTTONS.X:
				speak(sprintf('You selected "%s". Have fun jamming!', self.track.name), function() {
					self.location = LOCATIONS.JAMMING;
					self.track.play();
					debug('Selected track');
				});
				break;
			case BUTTONS.L1:
				// Previous track
				// TODO
				debug('Previous track');
				break;
			case BUTTONS.R1:
				// Next track
				// TODO
				debug('Next track');
				break;
		}
	}

	function handleJammingEvent(button) {
		switch (button) {
			case BUTTONS.X:
			case BUTTONS.CIRCLE:
			case BUTTONS.TRIANGLE:
			case BUTTONS.SQUARE:
			case BUTTONS.DPAD_UP:
			case BUTTONS.DPAD_DOWN:
			case BUTTONS.DPAD_LEFT:
			case BUTTONS.DPAD_RIGHT:
				// Play note
				debug('Playing note');
				if (self.mode == MODES.MANUAL) self.instrument.playManualNote(button);
				else self.instrument.playAutomaticNote();
				break;
			case BUTTONS.L1:
				// Previous instrument
				var index = INSTRUMENTS.indexOf(self.instrument);
				var newIndex = (index - 1 + INSTRUMENTS.length) % INSTRUMENTS.length;
				self.instrument = INSTRUMENTS[newIndex];
				debug('Switched to ' + self.instrument.name);
				break;
			case BUTTONS.R1:
				// Next instrument
				var index = INSTRUMENTS.indexOf(self.instrument);
				var newIndex = (index + 1) % INSTRUMENTS.length;
				self.instrument = INSTRUMENTS[newIndex];
				debug('Switched to ' + self.instrument.name);
				break;
			case BUTTONS.START:
				// Back to menu
				self.location = LOCATIONS.MENU;
				debug('Back to menu');
				break;
			case BUTTONS.SELECT:
				// Toggle manual/automatic mode
				self.mode ^= 1;
				break;
		}
	}
}

function main() {
	new Game().start();
}

// OLD FUNCTION
function old_main() {

	// Listen to joystick
	/*controller.setJoystickListener(function(event, axis, value) {
		switch (axis) {
			case JOYSTICK.LEFT_X:
				// Pan instrument
				if (controller.isPressed(BUTTONS.L1)) {
					$('body').prepend(sprintf('<p>Pan changed to %0.1f</p>', value));
					currentInstrument.pan = value;
				}

				break;
			case JOYSTICK.RIGHT_Y:
				// Adjust instrument volume
				if (controller.isPressed(BUTTONS.L1)) {
					var volume = (-value + 1) / 2;
					console.log(volume);
					$('body').prepend(sprintf('<p>Volume changed to %d</p>', volume * 100));
					currentInstrument.volume = volume;
				}

				break;
		}
	});*/
}