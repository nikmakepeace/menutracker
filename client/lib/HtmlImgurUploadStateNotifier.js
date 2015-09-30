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
        jQuery('#images-upload-thumbnails').prepend('<img src="' + imgurTool.getThumbnail(result.data.link, result.data.id) + '" class="img-thumbnail">');
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

