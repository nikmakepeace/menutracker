Template.viewRecipe.helpers({
	show: function (params) {
		var output = [], lines = [];
		var lines = params.hash.src.split(/[\r\n]+/);
		lines.forEach( function (line) {
			this.push( {line: line} );
		}, output);
		return output;
	},
	showIngredients: function (params) {
		var output = [];
		params.hash.src.lines.forEach( function (line) {
			this.push( {line: function () {
				if(line.type == 'heading') {
					return {
						heading: true,
						text: line.text
					};
				} else {
					return {
						ingredient: true,
						text: line.originalText
					}
				}}
			});
		}, output);
		return output;
	}
});

Template.viewRecipe.onRendered(function () {
	var otc = new OvenTemperatureConverter($);
	otc.replace('method', $);
});

var OvenTemperatureConverter = function(jQuery) {
    this.$ = jQuery;
	
	// Called on template rendered event
	// Finds all the oven temperatures in text and marks them up so a button can transform them
	this.initialMarkUp = function (text) {
		var celsius = /(\-?\d+)(?:°?|\s?degrees?)\s?(?:c|celsius|centigrade)\b/gi
		var replacer = function(fullMatch, amount) {
			return generateCMarkup(amount, {scale: 'C', amount: amount});
		};
		text = text.replace(celsius, replacer);

		var fahrenheit = /(\-?\d+)(?:°?|\s?degrees?)\s?(?:f|fahrenheit)\b/gi
		replacer = function(fullMatch, amount) {
			return generateFMarkup(amount, {scale: 'F', amount: amount})
		};
		text = text.replace(fahrenheit, replacer);

		var gasmark = /gas mark (\d+)\b/gi
		replacer = function(fullMatch, amount) {
			return generateGasMarkMarkup(amount, {scale: 'GasMark', amount: amount});
		};
		text = text.replace(gasmark, replacer);
		return text;
	}

	this.replace = function (rootId) {
		this.$('#' + rootId).replaceWith(this.initialMarkUp(this.$('#' + rootId).html()));
	}

	this.switchTo = function (toScale, tempConverter) {
		this.$('.oven-temperature').each(function (index) {
			var fromScale = this.getAttribute('data-original-scale');
			var fromAmount = this.getAttribute('data-original-amount');
			var toAmount = tempConverter.convert(fromScale, toScale, fromAmount);
			var method = 'generate' + toScale + 'Markup';
			$(this).replaceWith(window[method](toAmount, {scale: fromScale, amount: fromAmount}));
		});
	}
}

addOriginalValues = function(originalValue) {
	var markup = '';

	if(originalValue && originalValue.scale) {
		markup += ' data-original-scale="' + originalValue.scale + '"';
	} 
	if(originalValue && originalValue.amount) {
		markup += ' data-original-amount="' + originalValue.amount + '"';
	} 
	return markup;
}

generateNlTemperature = function(amount, scale) {
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

generateOvenTempMarkup = function (amount, originalValue, scale) {
	var markup = '<span class="oven-temperature" data-scale="' + scale + '" data-value="' + amount + '"';
	markup += addOriginalValues(originalValue);
	markup += '>' + generateNlTemperature(amount, scale) + '</span>';
	return markup;
}

generateCMarkup = function (amount, originalValue) { 
	return generateOvenTempMarkup(amount, originalValue, 'C');
}

generateFMarkup = function (amount, originalValue) { 
	return generateOvenTempMarkup(amount, originalValue, 'F');
}

generateGasMarkMarkup = function (amount, originalValue) { 
	return generateOvenTempMarkup(amount, originalValue, 'GasMark');
}

Template.viewRecipe.events({
	'click .temp-converter': function (event) {
		var toScale = event.target.getAttribute('data-scale');
		var oTC = new OvenTemperatureConverter($);
		var tC = new TemperatureConverter();
		try {
			oTC.switchTo(toScale, tC);
		} catch (err) {
			// do nothing
		}
	}
});