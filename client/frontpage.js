Meteor.subscribe('recipes');
Meteor.subscribe('directory');

Template.main.onCreated(function() {
	var scheme = 'https://';
	var host = 'api.flickr.com'
	var port = '';
	var path = '/services/rest/';
	var method = 'method=flickr.photos.search';
	var apiKey = 'api_key='+ApiKeys.flickr.key;
	var params = 'tags=recipe&sort=interestingness-desc&licenses=2,3,4,5,6,7,8&extras=url_k';
	var query = '?' + method + '&' + apiKey + '&' + params;
	var fragment = ''
	HTTP.get(
		scheme + host + (port ? ':' + port : '') + path + (query ? query : '') + (fragment ? '#' + fragment : ''), {},
		function(err, res) {
			if(err) {
				return;
			}
			var photos = new DOMParser().parseFromString(res.content, "text/xml");
			// pick one at random
			photos = photos.getElementsByTagName('photo');
			photos = Array.prototype.slice.call(photos);
			
			kUrls = [];
			photos.forEach(function (photo) {
				if(kUrl = photo.getAttribute('url_k')) {
					kUrls.push(kUrl);
				}
			});

			if(kUrls.length > 0) {
				kUrl = kUrls[Math.floor(Math.random() * (kUrls.length))];
				document.body.background = kUrl;
			}
		}
	);
});