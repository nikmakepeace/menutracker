randomRotate = function (jQueryElement, min, max) {
	if(typeof min == 'undefined') min = -15;
	if(typeof max == 'undefined') max = 15;
	if(!(jQueryElement instanceof jQuery)) {
		throw 'first parameter must be jQuery object';
	}
	var getRandomValue = function (min, max) {

		var rotation = Math.floor((Math.random() * (max-min)) - max);
		var rotateValue = 'rotate(_deg)'.replace('_', rotation);
		return rotateValue;
	}
		
	jQueryElement.each(function(i) {
		var rotateValue = getRandomValue(min, max);
		$(this).css({
			'-webkit-transform': rotateValue,
			'-moz-transform': rotateValue,
			'-ms-transform': rotateValue,
			'-o-transform': rotateValue,
			'transform': rotateValue
		})
	});
}