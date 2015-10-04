Router.route('/recipes', {
	name: 'listRecipes',
	template: 'listRecipes'
});

Router.route('/my-recipes', {
	name: 'listMyRecipes',
	template: 'listMyRecipes'
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
    },
    yieldTemplates: {
    	//recipeGallery: {to: 'bottom'}
    },
});