OvenTemperatureConverter = function(jQuery, ovenTemperatureMarkupGenerator, ovenTemperatureConverter) {
    this.$ = jQuery;
	
	var hasTemperature = { celsius: false, fahrenheit: false, gasmark: false};
	var overMinimumGasMarkTemp = false;

	this.hasAnyTemperature = function () {
		return hasTemperature.celsius || hasTemperature.fahrenheit || hasTemperature.gasmark;
	}

	this.hasOvenTemperature = function () {
		return overMinimumGasMarkTemp;
	}

	// Called on template rendered event
	// Finds all the oven temperatures in text and marks them up so a button can transform them
	this.initialMarkUp = function (text) {
		
		var celsius = /(\-?\d+)(?:°?|\s?degrees?)\s?(?:c|celsius|centigrade)\b/gi
		var replacer = function(fullMatch, amount) {
			//	track whether a conversion has exceeded the lowest gas mark, so that later on we can not show the gas mark button if the recipe only has low temperatures
			if(amount >= (ovenTemperatureConverter.getLowestGasMarkInCelsius() -0)) {
				overMinimumGasMarkTemp = true;
			}
			hasTemperature.celsius = true;
			return ovenTemperatureMarkupGenerator.generateCMarkup(amount, {scale: 'C', amount: amount});
		};
		text = text.replace(celsius, replacer);

		var fahrenheit = /(\-?\d+)(?:°?|\s?degrees?)\s?(?:f|fahrenheit)\b/gi
		replacer = function(fullMatch, amount) {
			if(ovenTemperatureConverter.fromFToC(amount) >= ovenTemperatureConverter.getLowestGasMarkInCelsius()) {
				overMinimumGasMarkTemp = true;
			}
			hasTemperature.fahrenheit = true;
			return ovenTemperatureMarkupGenerator.generateFMarkup(amount, {scale: 'F', amount: amount})
		};
		text = text.replace(fahrenheit, replacer);

		var gasmark = /gas mark (\d+)\b/gi
		replacer = function(fullMatch, amount) {
			overMinimumGasMarkTemp = true;
			hasTemperature.gasmark = true;
			return ovenTemperatureMarkupGenerator.generateGasMarkMarkup(amount, {scale: 'GasMark', amount: amount});
		};
		return text.replace(gasmark, replacer);
	}

	this.replace = function (rootId) {
		this.$('#' + rootId).html(this.initialMarkUp(this.$('#' + rootId).html()));
		return this.hasAnyTemperature();
	}

	this.switchTo = function (toScale) {
		
		this.$('.oven-temperature').each(function (index) {
			var fromScale = this.getAttribute('data-original-scale');
			var fromAmount = this.getAttribute('data-original-amount');
			var toAmount = ovenTemperatureConverter.convert(fromScale, toScale, fromAmount);
			var method = 'generate' + toScale + 'Markup';
			$(this).replaceWith(
				ovenTemperatureMarkupGenerator[method](toAmount, {scale: fromScale, amount: fromAmount})
			);
		});
	}
}