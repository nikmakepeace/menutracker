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
			this.push( {line: 

				function () {
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
					}
				}
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
	// Finds oven temperatures in text and marks them up
	this.markUp = function (text) {
		var celsius = /(\-?\d+)(?:°?|\s?degrees?)\s?(?:c|celsius|centigrade)\b/gi
		var replacer = function(fullMatch, amount) {
			return generateCMarkup(amount);
		};
		text = text.replace(celsius, replacer);

		var fahrenheit = /(\-?\d+)(?:°?|\s?degrees?)\s?(?:f|fahrenheit)\b/gi
		replacer = function(fullMatch, amount) {
			return generateFMarkup(amount)
		};
		text = text.replace(fahrenheit, replacer);

		var gasmark = /gas mark (\d+)\b/gi
		replacer = function(fullMatch, amount) {
			return generateGasMarkMarkup(amount);
		};
		text = text.replace(gasmark, replacer);

		return text;
	}



	this.replace = function (rootId) {
		this.$('#' + rootId).replaceWith(this.markUp(this.$('#' + rootId).html()));
	}

	this.switchTo = function (toScale, tempConverter) {

		this.$('.oven-temperature').each(function (index) {
			var fromScale = this.getAttribute('data-scale');
			var fromAmount = this.getAttribute('data-value');
			var toAmount = tempConverter.convert(fromScale, toScale, fromAmount);
			var method = 'generate' + toScale + 'Markup';
			$(this).replaceWith(window[method](toAmount));
		});
	}
}

generateCMarkup = function (amount) { 
	return '<span class="oven-temperature" data-scale="C" data-value="' + amount + '">' + amount + '°' + 'C' + '</span>';
}

generateFMarkup = function (amount) { 
	return '<span class="oven-temperature" data-scale="F" data-value="' + amount + '">' + amount + '°' + 'F' + '</span>';
}

generateGasMarkMarkup = function (amount) { 
	return '<span class="oven-temperature" data-scale="GasMark" data-value="' + amount + '">gas mark ' + amount + '</span>';
}

Template.viewRecipe.events({
	'click .temp-converter': function (event) {
		var toScale = event.target.getAttribute('data-scale');
		var oTC = new OvenTemperatureConverter($);
		var tC = new TemperatureConverter();
		oTC.switchTo(toScale, tC);
	}
});