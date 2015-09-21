Recipes = new Mongo.Collection('recipes');


var addNewRecipeForm = {
    name: 'addNewRecipeF',
    template: 'addNewRecipe',
    method: 'addNewRecipeM',
    fields: {
        recipeName: {
            required: true,
            requiredMessage: 'You have to name your recipe'
        },
        ingredients: {
            required: true,
            requiredMessage: 'You have to tell us what is in your recipe'
        },
        method: {
            required: true,
            requiredMessage: 'You have to tell us how to make your recipe'
        }
    }
};

Shower(addNewRecipeForm);