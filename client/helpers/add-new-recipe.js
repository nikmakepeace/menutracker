 Template['addNewRecipe-outer'].events({
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