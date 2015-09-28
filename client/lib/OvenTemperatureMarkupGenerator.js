OvenTemperatureMarkupGenerator = function () {

	this.addOriginalValues = function(originalValue) {
		var markup = '';

		if(originalValue && originalValue.scale) {
			markup += ' data-original-scale="' + originalValue.scale + '"';
		} 
		if(originalValue && originalValue.amount) {
			markup += ' data-original-amount="' + originalValue.amount + '"';
		} 
		return markup;
	}

	this.generateNlTemperature = function(amount, scale) {
		if(scale == 'C') {
			return amount + '°C';
		}
		if(scale == 'F') {
			return amount + '°F';
		}
		if(scale == 'GasMark') {
			return 'gas mark ' + amount;
		}
	}

	this.generateOvenTempMarkup = function (amount, originalValue, scale) {
		var markup = '<span class="oven-temperature" data-scale="' + scale + '" data-value="' + amount + '"';
		markup += this.addOriginalValues(originalValue);
		markup += '>' + this.generateNlTemperature(amount, scale) + '</span>';
		this.markups++;

		return markup;
	}

	this.generateCMarkup = function (amount, originalValue) { 
		return this.generateOvenTempMarkup(amount, originalValue, 'C');
	}

	this.generateFMarkup = function (amount, originalValue) { 
		return this.generateOvenTempMarkup(amount, originalValue, 'F');
	}

	this.generateGasMarkMarkup = function (amount, originalValue) { 
		return this.generateOvenTempMarkup(amount, originalValue, 'GasMark');
	}
}