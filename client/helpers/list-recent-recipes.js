//  Set up the template's variables
Template.listRecentRecipes.onCreated(function(){
    this.maxRecentRecipes = 5;
})

Template.listRecentRecipes.helpers({
    recipes: function () {
        var maxRecentRecipes = Template.instance().maxRecentRecipes;
        return Recipes.find({}, {'limit': maxRecentRecipes, 'sort': {'updatedDate': -1}, name: 1, createdAt: 1, creator: 1});
    },

    recipeCount: function () {
        return Recipes.find().count();
    },

    numRecipesShowing: function () {
        var maxRecentRecipes = Template.instance().maxRecentRecipes;
        return Math.min(maxRecentRecipes, Recipes.find().count());
    }
});