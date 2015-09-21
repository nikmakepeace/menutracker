Router.configure({
    layoutTemplate: 'main'
});

Router.route('/new-recipe', {
	name: 'addNewRecipe',
	template: 'addNewRecipe-outer'
});

Router.route('/', {
	name: 'home',
	template: 'homePage'
});