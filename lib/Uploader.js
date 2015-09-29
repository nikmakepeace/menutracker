Uploader = function (uploadStateNotifier) {
    // courtesy largely of https://github.com/paulrouget
    
    this.upload = function (file) {
        if (!file || !file.type.match(/image.*/)) {
            throw ("That file wasn't an image.");
        }
        
        uploadStateNotifier.isFile();
        
        /* Lets build a FormData object */
        var fd = new FormData(); // I wrote about it: https://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
        fd.append("image", file); // Append the file
        var xhr = new XMLHttpRequest(); // Create the XHR (Cross-Domain XHR FTW!!!) Thank you sooooo much imgur.com
        xhr.open("POST", "https://api.imgur.com/3/image.json"); // Boooom!
        
        xhr.onload = function() {
            if(xhr.status != 200) {
                return xhr.onerror();
            }

            var result = JSON.parse(xhr.responseText);

            uploadStateNotifier.hasUploaded();
            uploadStateNotifier.handleResponse(result);
        }

        xhr.onerror = function () {
            throw("Oh dear. That upload wasn't successful.");
            console.log(xhr);
            return;
        }
        
        xhr.setRequestHeader('Authorization', 'Client-ID ' + ApiKeys.imgur.key); // Get your own Client-ID at http://api.imgur.com/
        
        // Ok, I don't handle the errors. An exercise for the reader.
        /* And now, we send the formdata */
        xhr.send(fd);
    }
}

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