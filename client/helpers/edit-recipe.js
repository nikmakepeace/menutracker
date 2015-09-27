

Template['editRecipe-outer'].events({
	"focus #ingredients": function (event) {
		Template.instance().ingredientsLoop = setInterval(function() {
			var tagDrawer = new TagDrawer(
				new TagContainer('split-ingredients', $), 
				new IngredientsParser(event.target.value)
			);
			tagDrawer.drawTags();	
		}, 500);
	},

	"blur #ingredients": function (event) {
		clearInterval(Template.instance().ingredientsLoop);
	}
});

Template.editRecipe.helpers({
	showIngredients: function (params) {
		var output = '';
		params.hash.src.lines.forEach( function (line) {
			if(line && line.originalText) {
				output += line.originalText + '\r\n';
			}
		});
		return output;
	}
});

Template['editRecipe-outer'].onRendered(function() { 
	var tagDrawer = new TagDrawer(
		new TagContainer('split-ingredients', $), 
		new IngredientsParser($('#ingredients').val())
	);
	tagDrawer.drawTags();
});