Template.registerHelper("debug", function(something) {
	console.log(something);
});

Template.browseIngredients.helpers({
	allIngredients: function () {
		
		// find all ingredienttags, sorted
		// foreach tags
		//	get the first letter. if it's not the same as the current letter, set the current letter and produce a heading
		//  store the ingredient
		//	count the recipes with that ingredient. store it
		var ingredientLookup = { };
		Template.instance().data.forEach(function (recipe) {
			recipe.ingredientTags.forEach( function (tag) {
				if(ingredientLookup[tag]) {
					ingredientLookup[tag]++;
				} else {
					ingredientLookup[tag] = 1;
				}
			});
		});
		
		var ingredients = Object.keys(ingredientLookup).sort();
		var output = [], currentLetter = '';
		ingredients.forEach( function (ingredient) {
			var thisLetter = ingredient.substr(0, 1);
			if(thisLetter != currentLetter) {
				var heading = {};
				currentLetter = thisLetter;
				heading.heading = thisLetter;

				output.push(heading);
			} 

			var line = {};
		
			line.count = ingredientLookup[ingredient];
			line.ingredient = ingredient;
			
			output.push(line);
		});
		//console.log(output)
		return output;
	}
});