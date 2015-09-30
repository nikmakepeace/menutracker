ImgurTool = function () {

    var getSizedUrl = function (link, id, size) {
		var start = link.slice(0, link.indexOf(id) + id.length);
        var end = link.slice(link.indexOf(id) + id.length);
        return start + size + end;
    }
    this.getThumbnail = function(link, id) {
        return getSizedUrl(link, id, 's')
    }
    this.get320 = function(link, id) {
    	return getSizedUrl(link, id, 'm')
    }
    this.get640 = function(link, id) {
    	return getSizedUrl(link, id, 'l');
    }
}