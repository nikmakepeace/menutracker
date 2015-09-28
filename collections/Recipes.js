Recipes = new Mongo.Collection('recipes');
Recipes.timestampable();
Recipes.trackable(['recipeName', 'method', 'ingredients', 'notes', 'updatedBy', 'updatedByName', 'updatedAt']);
Recipes.softRemovable();

Recipes.before.insert(function (userId, doc) {
	doc.createdByName = Meteor.user().profile.name;
});

Recipes.before.update(function (userId, doc) {
	doc.updatedByName = Meteor.user().profile.name;
});


Meteor.users.after.update(function (userId, userDoc, fieldNames, modifier) {
	if(userDoc.profile.name !== this.previous.profile.name) {
		Recipes.update({createdBy: userId}, {createdByName: userDoc.profile.name}, {multi: true});
	}
});