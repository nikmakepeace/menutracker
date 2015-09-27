/**
 {
	lines: [
		 {
			type: 'heading',
			text: 'for the sauce'
		},
		{
			type: 'ingredient',
			measure: '50g',
			material: 'butter',
		},
		{
			type: 'ingredient',
			measure: '150g',
			material: 'white flour',
		}
	]	
 }
 */
IngredientsParser = function (ingredients) {
	this.parsedIngredients = { lines: []};
 	this.ingredients = ingredients;

 	this.parse = function () {
	 	var lines = this.ingredients.trim().split(/[\r\n]+/);
	 	lines.forEach(function(line) {
	 		this.add(this.parseIngredient(line));
	 	}, this);
	}

	this.add = function(parsedIngredientLine) {
		this.parsedIngredients.lines.push(parsedIngredientLine);
	}

	this.getParsedIngredientLines = function () {
		return this.parsedIngredients.lines;
	}

	this.getParsedIngredients = function () {
		return this.parsedIngredients;
	}

	this.getMaterials = function () {
		var materials = this.getParsedIngredientLines().filter(function(line) {
			if('material' in line) {
				return true;
			}
		}).map(function (line) {
			return line.material;
		}).sort();

		var elem, i = 0, j = 0, duplicates = [];
        while ((elem = materials[i++])) {
            if (elem === materials[i]) {
                j = duplicates.push(i);
            }
        }
        while (j--) {
            materials.splice(duplicates[j], 1);
        }
		return materials;
	}

	this.parseIngredient = function (line) {
	 	if(line.indexOf('#') === 0) {
	 		return {
	 			type: 'heading',
	 			text: line.substr(1),
	 			originalText: line
	 		};
	 	}

	 	var ingredientLine;
	 	if(ingredientLine = this.parseOfToIngredient(line) || this.parseMeasuresToIngredient(line) || this.parseNumbersToIngredient(line)) {
	 		return ingredientLine;
	 	} else {
	 		return this.cannotParse(line);
	 	}

	}

	this.parseOfToIngredient = function (line) {
		if(matches = line.match(/(.+) of (.{2,})/i)) {
	 		return this.createIngredient(line, matches[1], matches[2])
	 	} else {
	 		return false;
	 	}
	}
	/**
	 * Matching
	 * 250ml white wine 
	 * 2 teaspoons oregano 
	 * .5 cups
	 * 1.5 pints boozy mushroom liquor
	 */
	this.parseMeasuresToIngredient = function (line) {
		if( (matches = line.match(
				/(\d*\.?\d+\s?(l|ml|g|kg|oz|ounces?|lb|fl\.?\s?oz|fluid ounces?|teaspoons?|tablespoons?|sticks?|pints?|cups?)) (.{2,})/i ) ) 
			&& matches[3] != 'of') {
			return this.createIngredient(line, matches[1], matches[3]);
		} else {
			return false;
		}
	}

	this.parseNumbersToIngredient = function (line) {
		if(matches = line.match(/(a|\d+) (.{2,})/i)) {
			return this.createIngredient(line, matches[1], matches[2])
		} else {
			return false;
		}
	}

	this.cannotParse = function (line) {
		return {
 			type: 'ingredient',
 			originalText: line
 		}
	}

	this.createIngredient = function (line, measure, material) {
 		return {
 			type: 'ingredient',
 			measure: measure,
 			material: material,
 			originalText: line
 		}
	}
}