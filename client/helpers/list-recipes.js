//  Set up the template's variables
Template.listRecipes.onCreated(function(){
    this.maxRecipes = 50;
});

Template.listRecipes.helpers({
    recipes: function () {
        var maxRecipes = Template.instance().maxRecipes;
        var recipes = Recipes.find({}, {'limit': maxRecipes, 'sort': {'updatedDate': -1}, name: 1});
        var recipesData = recipes.map(function(recipe) {
            return {
                'recipeName': recipe.recipeName,
                'createdDate': recipe.createdDate,
                'createdBy': (function() { return Meteor.users.findOne({_id: recipe.createdBy}).profile.name })(),
                '_id': recipe._id
            }
        });
        return recipesData;
    },

    recipeCount: function () {
        return Recipes.find().count();
    },

    numRecipesShowing: function () {
        var maxRecipes = Template.instance().maxRecipes;
        return Math.min(maxRecipes, Recipes.find().count());
    }
});