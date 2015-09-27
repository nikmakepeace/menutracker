//  Set up the template's variables
Template.listRecipes.onCreated(function(){
    this.maxRecipes = 50;
});

Template.listRecipes.helpers({
    recipes: function () {
        var maxRecipes = Template.instance().maxRecipes;
        return recipes = Recipes.find({}, {'limit': maxRecipes, 'sort': {'updatedDate': -1}, recipeName: 1, createdDate: 1, _id: 1, tags: 1});
    },

    recipeCount: function () {
        return Recipes.find().count();
    },

    numRecipesShowing: function () {
        var maxRecipes = Template.instance().maxRecipes;
        return Math.min(maxRecipes, Recipes.find().count());
    }
});