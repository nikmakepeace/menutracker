//  Set up the template's variables
Template.listMyRecipes.onCreated(function(){
    this.maxRecipes = 50;
});

Template.listMyRecipes.helpers({
    recipes: function () {
        var maxRecipes = Template.instance().maxRecipes;
        return recipes = Recipes.find({createdBy: Meteor.userId()}, {'limit': maxRecipes, 'sort': {'updatedDate': -1}, recipeName: 1, createdDate: 1, _id: 1, tags: 1});
    },

    recipeCount: function () {
        return Recipes.find({createdBy: Meteor.userId()}).count();
    },

    numRecipesShowing: function () {
        var maxRecipes = Template.instance().maxRecipes;
        return Math.min(maxRecipes, Recipes.find({createdBy: Meteor.userId()}).count());
    },
});