HtmlImgurUploadStateNotifier = function (jQuery, formId) {
    this.hasUploaded = function() {
        jQuery('body').addClass("uploaded");
        jQuery('body').removeClass("uploading");
    }
    
    this.isFile = function () {
        jQuery('body').addClass("uploading");
    }

    this.handleResponse = function (result) {
        var imgurTool = new ImgurTool();
        jQuery('#images-upload-results').removeClass('hidden'); 
        jQuery('#images-upload-thumbnails').prepend('<img src="' + imgurTool.getThumbnailFromLinkAndId(result.data.link, result.data.id) + '" class="img-thumbnail">');
        var imageData = {
            src: 'imgur',
            id: result.data.id,
            link: result.data.link
        }
        appendElement(formId, imageData);
    }

    var appendElement = function(formId, imageData) {
        jQuery('#' + formId).append('<input type="hidden" name="uploaded-image" value="' + he.encode(JSON.stringify(imageData)) + '">');
    }
};

ImgurTool = function () {
    this.getThumbnailFromLinkAndId = function(link, id) {
        var start = link.slice(0, link.indexOf(id) + id.length);
        var end = link.slice(link.indexOf(id) + id.length);
        return start + 's' + end;
    }
}