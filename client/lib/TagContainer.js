TagContainer = function (htmlId, jQuery) {
 	this.htmlId = htmlId;
 	this.tags = [];
 	this.jQuery = jQuery('#' + htmlId);
 	this.empty = function() {
 		return this.jQuery.empty();
 	}
 	
 	this.addTag = function(tagValue) {
 		if(-1 == $.inArray(tagValue, this.tags)) {
	 		var tagHtml = '<span class="badge">' + tagValue + '</span> ';
	 		if (this.jQuery.append(tagHtml)) {
	 			this.tags.push(tagValue);
	 		}
 		}
 	};
}