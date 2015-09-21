Template.numRecipes.helpers({
    numRecipes: function(src) {
        if(src=='my') {
        	return Recipes.find({createdBy: Meteor.userId()}).count();
        } else {
            return Recipes.find().count();
        }
    }
});