Meteor.publish('recipes', function () {
    return Recipes.find();
});

Meteor.startup(function () {
// code to run on server at startup
});


