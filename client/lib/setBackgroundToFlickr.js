var setBackgroundToFlickr = function () {
	var scheme = 'https://';
	var host = 'api.flickr.com'
	var port = '';
	var path = '/services/rest/';
	var method = 'method=flickr.photos.search';
	var apiKey = 'api_key='+ApiKeys.flickr.key;
	var params = 'tags=food&sort=interestingness-desc&licenses=2,3,4,5,6,7,8&extras=url_h'; //	url_h is a 1600px photo
	var query = '?' + method + '&' + apiKey + '&' + params;
	var fragment = ''
	var flickrUrl = scheme + host + (port ? ':' + port : '') + path + (query ? query : '') + (fragment ? '#' + fragment : '');
	HTTP.get(
		flickrUrl, {},
		function(err, res) {
			if(err) {
				return;
			}
			var photos = new DOMParser().parseFromString(res.content, "text/xml");
			// pick one at random
			photos = photos.getElementsByTagName('photo');
			photos = Array.prototype.slice.call(photos);
			
			hUrls = [], hUrl = '';
			photos.forEach(function (photo) {
				if(hUrl = photo.getAttribute('url_h')) {
					hUrls.push(hUrl);
				}
			});

			if(hUrls.length > 0) {
				hUrl = hUrls[Math.floor(Math.random() * (hUrls.length))];
				document.body.background = hUrl;
			}
		}
	);
};
setBackgroundToFlickr();
setInterval(setBackgroundToFlickr, 120000);