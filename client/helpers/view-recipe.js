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
	var otc = new OvenTemperatureConverter($, new OvenTemperatureMarkupGenerator(), new TemperatureConverter());
	//	replace oven temperatures in the #method element with markup to allow them to be changed
	if (otc.replace('method', $)) {
		$('#temperature-conversion').removeClass('hidden');
	}
	if (otc.hasOvenTemperature()) {
		$('#gasmark-button').removeClass('hidden');
	}
});

Template.viewRecipe.events({
	'click .temp-converter': function (event) {
		var toScale = event.target.getAttribute('data-scale');
		var oTC = new OvenTemperatureConverter($, new OvenTemperatureMarkupGenerator(), new TemperatureConverter());
		try {
			oTC.switchTo(toScale);
		} catch (err) {
			alert(err)	// do nothing
		}
	}
});