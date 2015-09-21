Router.configure({
    layoutTemplate: 'main'
});

Router.route('/new-recipe', {
	name: 'addNewRecipe',
	template: 'addNewRecipe'
});

Router.route('/', {
	name: 'home',
	template: 'homePage'
});