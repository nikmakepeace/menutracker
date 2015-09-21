//  Set up the template's variables
Template.listRecipes.onCreated(function(){
    this.maxRecipes = 50;
})

Template.listRecipes.helpers({
    recipes: function () {
        var maxRecipes = Template.instance().maxRecipes;
        return Recipes.find({}, {'limit': maxRecipes, 'sort': {'updatedDate': -1}, name: 1});
    },

    recipeCount: function () {
        return Recipes.find().count();
    },

    numRecipesShowing: function () {
        var maxRecipes = Template.instance().maxRecipes;
        return Math.min(maxRecentRecipes, Recipes.find().count());
    }
});