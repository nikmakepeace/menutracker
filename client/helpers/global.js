Template.registerHelper('isActiveRoute', function(params) {
	return params.hash.routeName == Router.current().route.getName() ? 'active' : 'inactive';
});

Template.registerHelper('lt', function(left, right) {
	return left < right;
});

Template.registerHelper('gt', function(left, right) {
	return left > right;
});

Template.registerHelper('eq', function(left, right) {
	return left == right;
});

Template.registerHelper('formatDate', function(date, format) {
	if(typeof format != "string") {
		format = 'relative';
	}
	return (format == 'relative') ? moment(date).fromNow() : moment(date).format(format);
});

FlashMessages.configure({
    autoHide: false,
    hideDelay: 2000,
    autoScroll: true
  });