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
	var otc = new OvenTemperatureConverter($, new OvenTemperatureMarkupGenerator());
	//	replace oven temperatures in the #method element with markup to allow them to be changed
	otc.replace('method', $);
});

var OvenTemperatureConverter = function(jQuery, ovenTemperatureMarkupGenerator) {
    this.$ = jQuery;
	this.markupGen = ovenTemperatureMarkupGenerator;

	// Called on template rendered event
	// Finds all the oven temperatures in text and marks them up so a button can transform them
	this.initialMarkUp = function (text) {
		var markupGen = this.markupGen;

		var celsius = /(\-?\d+)(?:°?|\s?degrees?)\s?(?:c|celsius|centigrade)\b/gi
		var replacer = function(fullMatch, amount) {
			return markupGen.generateCMarkup(amount, {scale: 'C', amount: amount});
		};
		text = text.replace(celsius, replacer);

		var fahrenheit = /(\-?\d+)(?:°?|\s?degrees?)\s?(?:f|fahrenheit)\b/gi
		replacer = function(fullMatch, amount) {
			return markupGen.enerateFMarkup(amount, {scale: 'F', amount: amount})
		};
		text = text.replace(fahrenheit, replacer);

		var gasmark = /gas mark (\d+)\b/gi
		replacer = function(fullMatch, amount) {
			return markupGen.generateGasMarkMarkup(amount, {scale: 'GasMark', amount: amount});
		};

		return text.replace(gasmark, replacer);
	}

	this.replace = function (rootId) {
		this.$('#' + rootId).html(this.initialMarkUp(this.$('#' + rootId).html()));
	}

	this.switchTo = function (toScale, tempConverter) {
		var markupGen = this.markupGen;
		this.$('.oven-temperature').each(function (index) {
			var fromScale = this.getAttribute('data-original-scale');
			var fromAmount = this.getAttribute('data-original-amount');
			var toAmount = tempConverter.convert(fromScale, toScale, fromAmount);
			var method = 'generate' + toScale + 'Markup';
			$(this).replaceWith(
				markupGen[method](toAmount, {scale: fromScale, amount: fromAmount})
			);
		});
	}
}

var OvenTemperatureMarkupGenerator = function () {
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

Template.viewRecipe.events({
	'click .temp-converter': function (event) {
		var toScale = event.target.getAttribute('data-scale');
		var oTC = new OvenTemperatureConverter($, new OvenTemperatureMarkupGenerator());
		var tC = new TemperatureConverter();
		try {
			oTC.switchTo(toScale, tC);
		} catch (err) {
			alert(err)// do nothing
		}
	}
});