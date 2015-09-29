Router.route('/ingredients', {
	name: 'browseIngredients',
	template: 'browseIngredients-outer',

	data: function () {
		return Recipes.find({}, {ingredientTags: 1});
	},

	subscriptions: function () {
		return Meteor.subscribe('recipes');
	},

	action: function () {
    	if (this.ready()) {
      		this.render();
    	} else {
      		this.render('loadingWaiting');
    	}
    }
})

Router.route('/ingredient/:ingredient', {
	name: 'browseRecipesByIngredient',
	template: 'browseRecipesByIngredient-outer',
	data: function () {
		return {
			recipes: Recipes.find({ingredientTags: this.params.ingredient}, {sort: {recipeName: 1}}),
			ingredient: this.params.ingredient
		}
	},
	subscriptions: function () {
		return Meteor.subscribe('recipes');
	},
	action: function () {
		if (this.ready()) {
	  		this.render();
		} else {
	  		this.render('loadingWaiting');
		}
	}
});