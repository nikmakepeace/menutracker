Meteor.publish('recipes', function () {
	return Recipes.find();
});

Meteor.publish('recipeTags', function () {
	return Recipes.distinct('ingredientTags');
});

Meteor.publish("directory", function () {
  return Meteor.users.find({}, {fields: {profile: 1}});
});

Meteor.startup(function () {
// code to run on server at startup
});


