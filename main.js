
$(document).ready(function() {
	main();
});

var INSTRUMENTS = [
	new Instrument('drums', true),
	new Instrument('acoustic-guitar'),
	new Instrument('electric-guitar'),
	new Instrument('overdrive-guitar'),
]

function main() {
	// Instantiate controller
	var controller = new Controller();
	var currentInstrument = INSTRUMENTS[0];

	// Listen to buttons
	controller.setButtonListener(function(event, button, value) {
		if (event == EVENTS.BUTTON_PRESSED) {
			switch (button) {
				case BUTTONS.X:
				case BUTTONS.CIRCLE:
				case BUTTONS.TRIANGLE:
				case BUTTONS.SQUARE:
				case BUTTONS.DPAD_UP:
				case BUTTONS.DPAD_DOWN:
				case BUTTONS.DPAD_LEFT:
				case BUTTONS.DPAD_RIGHT:
				case BUTTONS.R1:
					if (controller.isPressed(BUTTONS.L1)) {
						$('body').prepend('<p>Looping note</p>');
					}

					$('body').prepend(sprintf('<p>Playing note %d</p>', button % 8));
					currentInstrument.playNote(button);
					break;
				case BUTTONS.L1:
					break;
				case BUTTONS.L2:
					// Previous instrument
					var index = INSTRUMENTS.indexOf(currentInstrument);
					var newIndex = (index - 1 + INSTRUMENTS.length) % INSTRUMENTS.length;
					currentInstrument = INSTRUMENTS[newIndex];
					break;
				case BUTTONS.R2:
					// Next instrument
					var index = INSTRUMENTS.indexOf(currentInstrument);
					var newIndex = (index + 1) % INSTRUMENTS.length;
					currentInstrument = INSTRUMENTS[newIndex];
					break;
				case BUTTONS.L3:
					break;
				case BUTTONS.R3:
					break;
				case BUTTONS.START:
					break;
				case BUTTONS.SELECT:
					break;
			}
		} else {
			switch (button) {
				// TODO
			}
		}
	});

	// Listen to joystick
	controller.setJoystickListener(function(event, axis, value) {
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
	});

	// Listen with a delay of 5ms
	controller.listen(5);
}