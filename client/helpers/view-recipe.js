Template.viewRecipe.helpers({
	show: function (params) {
		var output = [], lines = [];
		var lines = params.hash.src.split(/[\r\n]+/);
		lines.forEach(function (line) {
			this.push({line: line});
		}, output);
		return output;
	},
});