//  Set up the template's variables
Template.listMyRecipes.onCreated(function(){
    this.maxRecipes = 50;
});

Template.listMyRecipes.helpers({
    recipes: function () {
        var maxRecipes = Template.instance().maxRecipes;
        var recipes = Recipes.find({createdBy: Meteor.userId()}, {'limit': maxRecipes, 'sort': {'updatedDate': -1}, name: 1});
        var recipesData = recipes.map(function(recipe) {
            return {
                'recipeName': recipe.recipeName,
                'createdDate': recipe.createdDate,
                '_id': recipe._id
            }
        });
        return recipesData;
    },

    recipeCount: function () {
        return Recipes.find({createdBy: Meteor.userId()}).count();
    },

    numRecipesShowing: function () {
        var maxRecipes = Template.instance().maxRecipes;
        return Math.min(maxRecipes, Recipes.find({createdBy: Meteor.userId()}).count());
    }
});