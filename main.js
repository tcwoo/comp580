
$(document).ready(function() {
	main();
});

function main() {
	// Instantiate controller
	var controller = new Controller();

	var pressed = {};

	// Listen to buttons
	controller.setButtonListener(function(event, button, value) {
		if (event == EVENTS.BUTTON_PRESSED) {
			if (INSTRUMENT_BUTTONS.indexOf(button) >= 0) {
				// Instrument button pressed
				$('body').append('<p>Instrument button pressed</p>');
			} else {
				$('body').append('<p>Button pressed</p>');
			}

			pressed[button] = true;
		} else {
			if (INSTRUMENT_BUTTONS.indexOf(button) >= 0) {
				// Instrument button released
				$('body').append('<p>Instrument button released</p>');
			} else {
				$('body').append('<p>Button released</p>');
			}

			pressed[button] = false;
		}
	});

	// Listen to joystick
	controller.setJoystickListener(function(event, axis, value) {
		$('body').append('<p>Joystick changed</p>');
	});

	// Listen with a delay of 5ms
	controller.listen(5);
}