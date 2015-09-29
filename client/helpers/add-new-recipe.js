 Template['addNewRecipe-outer'].events({
    "focus #ingredients": function (event) {
        Template.instance().ingredientsLoop = setInterval(function() {
            var tagDrawer = new TagDrawer(
                new TagContainer('split-ingredients', $), 
                new IngredientsParser(event.target.value)
                );
            tagDrawer.drawTags();   
        }, 500);
    },

    "blur #ingredients": function (event) {
        clearInterval(Template.instance().ingredientsLoop);
    },

    "dragover #image-upload-drop-target": function (event) {
        $('body').addClass("you-can-upload");
        event.preventDefault();
    },

    "dragleave #image-upload-drop-target": function (event) {
        event.preventDefault();
        $('body').removeClass("you-can-upload");
    },    

    "drop #image-upload-drop-target": function (event) {
        event.preventDefault(); 
        $('body').removeClass("you-can-upload");
        var Uploader = function () {

            /* Is the file an image? */
            this.upload = function (file) {
                if (!file || !file.type.match(/image.*/)) {
                    FlashMessages.sendError("That file wasn't an image.", {autoHide: true});
                    return;
                }
                /* It is! */
                $('body').addClass("uploading");
                /* Lets build a FormData object*/
                var fd = new FormData(); // I wrote about it: https://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
                fd.append("image", file); // Append the file
                var xhr = new XMLHttpRequest(); // Create the XHR (Cross-Domain XHR FTW!!!) Thank you sooooo much imgur.com
                xhr.open("POST", "https://api.imgur.com/3/image.json"); // Boooom!
                xhr.onload = function() {
                    if(xhr.status != 200) {
                        return xhr.onerror();
                    }
                    var getThumbnail = function(link, id) {
                        var start = link.slice(0, link.indexOf(id) + id.length);
                        var end = link.slice(link.indexOf(id) + id.length);
                        return start + 's' + end;
                    }


                    var result = JSON.parse(xhr.responseText);
                    $('body').addClass("uploaded");
                    $('body').removeClass("uploading");

                    $('#images-upload-results').removeClass('hidden');
                    $('#images-upload-thumbnails').prepend('<img src="' + getThumbnail(result.data.link, result.data.id) + '" class="img-thumbnail">');
                    
                    $('#addNewRecipeF').append('<input type="hidden" name="uploaded-image" value="' + result.data.link + '">');
                    

                }

                xhr.onerror = function () {
                    FlashMessages.sendError("Oh dear. That upload wasn't successful.", {autoHide: true});
                    console.log(xhr);
                    return;
                }
                
                xhr.setRequestHeader('Authorization', 'Client-ID ' + ApiKeys.imgur.key); // Get your own Client-ID at http://api.imgur.com/
                
                // Ok, I don't handle the errors. An exercise for the reader.
                /* And now, we send the formdata */
                xhr.send(fd);
            }
        }
        var fileIndex = 0;
        var fileList = event.originalEvent.dataTransfer.files;
        var uploader = new Uploader();
        do {
            uploader.upload(fileList.item(fileIndex));
            fileIndex++;
        } while (fileList.item(fileIndex));
        

        
    }
});