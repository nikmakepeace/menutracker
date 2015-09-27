TagDrawer = function (tagContainer, ingredientsParser) {
	this.ingredientsContainer = tagContainer;
	this.ingredientsContainer.empty();

	this.ingredients = ingredientsParser;
	this.ingredients.parse();		
	
	this.drawTags = function () {
		this.ingredients.getMaterials().forEach(function(material) {
			this.addTag(material);
		}, this.ingredientsContainer);
	}
}