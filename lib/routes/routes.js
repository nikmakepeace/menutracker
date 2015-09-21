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

Router.route('/', {
	name: 'home',
	template: 'homePage'
});