
function Controller() {
	var self = this;
	self.buttonListener = function() {};
	self.joystickListener = function() {};
	self.lastButtonState = {};
	self.lastAxisState = {};

	// Public functions

	self.setButtonListener = function(callback) {
		self.buttonListener = callback;
	}

	self.setJoystickListener = function(callback) {
		self.joystickListener = callback;
	}

	self.listen = function(delay) {
		setInterval(function() {
			var gamepad = getRefreshedGamepad();
			if (gamepad == null) return;

			// Listen to buttons
			for (var buttonIndex = 0; buttonIndex < gamepad.buttons.length; buttonIndex++) {
				var button = gamepad.buttons[buttonIndex];
				if (button.pressed != self.lastButtonState[buttonIndex]) {
					var event = button.pressed ? EVENTS.BUTTON_PRESSED : EVENTS.BUTTON_RELEASED;
					self.buttonListener(event, buttonIndex, button.pressed);
				}

				self.lastButtonState[buttonIndex] = button.pressed;
			}

			// Listen to axes
			for (var axisIndex = 0; axisIndex < gamepad.axes.length; axisIndex++) {
				var axis = gamepad.axes[axisIndex];
				var differential = Math.abs(axis - self.lastAxisState[axisIndex]);
				if (differential > JOYSTICK_DIFFERENTIAL_THRESHOLD) {
					self.joystickListener(EVENTS.JOYSTICK_CHANGED, axisIndex, axis);
				}

				self.lastAxisState[axisIndex] = axis;
			}
		}, delay);
	}

	// Private functions

	function getRefreshedGamepad() {
		// Return a refreshed version of the current connected gamepad
		return navigator.getGamepads()[0];
	}
}