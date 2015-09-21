Meteor.methods({
    addNewRecipeM: function (rawFormData, templateData) {
        //Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }
        var valdationObject = Shower.addNewRecipeF.validate(rawFormData, function(errors, formFieldsObject) {
            if(!errors) {
                var rightNow = new Date();
                Recipes.insert({
                    recipeName: formFieldsObject.recipeName,
                    ingredients: formFieldsObject.ingredients,
                    method: formFieldsObject.method,
                    createdBy: Meteor.userId(),
                    createdDate: rightNow,
                    updatedDate: rightNow
                });
            
            }
        });
        
    },

    updateRecipe: function (userId, recipeId, recipeName, ingredients, method) {

    },
    deleteRecipe: function (userid, recipeId, comment) {

    },
    publishRecipe: function (userId, recipeId, comment) {

    }

});