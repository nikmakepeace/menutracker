Meteor.methods({
    mayEditRecipe: function (userId, recipeId) {
        return Recipes.findOne({_id: recipeId}).createdBy == userId;
    },

    addNewRecipeM: function (rawFormData, templateData) {
        //Make sure the user is logged in before inserting a recipe
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        var valdationObject = Shower.addNewRecipeF.validate(rawFormData, function(errors, formFieldsObject) {
            if(!errors) {
                var ingredients = new IngredientsParser(formFieldsObject.ingredients);
                ingredients.parse();
                //  gather images
                var images = [];
                rawFormData.forEach(function (kv) {
                    if(kv.name == 'uploaded-image') {
                        images.push(JSON.parse(kv.value));
                    }
                });
                Recipes.insert({
                    recipeName: formFieldsObject.recipeName,
                    ingredients: ingredients.getParsedIngredients(),
                    ingredientTags: ingredients.getMaterials(),
                    method: formFieldsObject.method,
                    notes: formFieldsObject.notes,
                    images: images,
                    createdBy: Meteor.userId()
                });
            
            }
        });
    },

    editRecipe: function (rawFormData, templateData) {
        //Make sure the user is logged in before updating a recipe

        if (! Meteor.call('mayEditRecipe', Meteor.userId(), templateData._id)) {
            throw new Meteor.Error("not-authorized");
        }
        var valdationObject = Shower.editRecipeF.validate(rawFormData, function(errors, formFieldsObject) {
            if(!errors) {
                var ingredients = new IngredientsParser(formFieldsObject.ingredients);
                ingredients.parse();
                var rightNow = new Date();
                
                var images = [];
                rawFormData.forEach(function (kv) {
                    if(kv.name == 'uploaded-image') {
                        images.push(JSON.parse(kv.value));
                    }
                });                
                Recipes.update(
                    {_id: templateData._id},
                    {$set: {
                        recipeName: formFieldsObject.recipeName,
                        ingredients: ingredients.getParsedIngredients(),
                        ingredientTags: ingredients.getMaterials(),
                        method: formFieldsObject.method,
                        notes: formFieldsObject.notes,
                        images: images,
                        updatedBy: Meteor.userId(),
                        updatedAt: rightNow
                        }
                    }
                );
            }
        });

    },
    deleteRecipe: function (userid, recipeId, comment) {}

});