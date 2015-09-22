Template.registerHelper('isActiveRoute', function(params) {
	return params.hash.routeName == Router.current().route.getName() ? 'active' : 'inactive';
});

Template.registerHelper('lt', function(left, right) {
	return left < right;
});