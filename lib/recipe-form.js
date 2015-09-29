
getRecipeFormFields = function (name, template, meteorMethod) {
    return {
        name: name,
        template: template,
        method: meteorMethod,
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
            },
            notes: {
                required: false
            },
            'uploaded-image': {
                required: false
            }
        }
    }
}

var addNewRecipeForm = getRecipeFormFields('addNewRecipeF', 'addNewRecipe', 'addNewRecipeM');
addNewRecipeForm.onSuccess = function(formData, formHandle) {
    FlashMessages.sendSuccess("Good job! Your recipe was successfully added.", {autoHide: true});
    Router.go('listMyRecipes');
};
Shower(addNewRecipeForm);

var editRecipeForm = getRecipeFormFields('editRecipeF', 'editRecipe', 'editRecipe');
var editSuccess = editRecipeForm.onSuccess;
editRecipeForm.onSuccess = function(formData, formHandle) {
    FlashMessages.sendSuccess("Good job! Your recipe was successfully updated.", {autoHide: true});
    Router.go('viewRecipe', {_id: Template.instance().data._id});
};
Shower(editRecipeForm);