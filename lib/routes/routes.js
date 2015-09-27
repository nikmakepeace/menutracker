Router.configure({
	layoutTemplate: 'main'
});

Router.route('/new-recipe', {
	name: 'addNewRecipe',
	template: 'addNewRecipe-outer'
});

Router.route('/edit-recipe/:_id', {
	name: 'editRecipe',
	template: 'editRecipe-outer',
	data: function ()  {
		return Recipes.findOne({_id: this.params._id});
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

Router.route('/recipes', {
	name: 'listRecipes',
	template: 'listRecipes'
});

Router.route('/my-recipes', {
	name: 'listMyRecipes',
	template: 'listMyRecipes'
});

Router.route('/', {
	name: 'home',
	template: 'homePage'
});



Router.route('/recipe/:_id', {
	name: 'viewRecipe',
	template: 'viewRecipe',
	data: function ()  {
		return Recipes.findOne({_id: this.params._id});
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