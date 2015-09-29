HtmlImgurUploadStateNotifier = function (jQuery) {
    this.hasUploaded = function() {
        jQuery('body').addClass("uploaded");
        jQuery('body').removeClass("uploading");
    }
    
    this.isFile = function () {
        jQuery('body').addClass("uploading");
    }

    this.handleResponse = function (result) {
        var getThumbnail = function(link, id) {
            var start = link.slice(0, link.indexOf(id) + id.length);
            var end = link.slice(link.indexOf(id) + id.length);
            return start + 's' + end;
        }
        jQuery('#images-upload-results').removeClass('hidden'); 
        jQuery('#images-upload-thumbnails').prepend('<img src="' + getThumbnail(result.data.link, result.data.id) + '" class="img-thumbnail">');
        
        jQuery('#addNewRecipeF').append('<input type="hidden" name="uploaded-image" value="' + result.data.link + '">');
    }
}