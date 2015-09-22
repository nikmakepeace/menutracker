Router.configure({
	layoutTemplate: 'main'
});

Router.route('/new-recipe', {
	name: 'addNewRecipe',
	template: 'addNewRecipe-outer'
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
	}
});