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
        
        var fileIndex = 0;
        var fileList = event.originalEvent.dataTransfer.files;
        var uploader = new Uploader(new HtmlImgurUploadStateNotifier($, 'addNewRecipeF'));

        do {
            try {
                uploader.upload(fileList.item(fileIndex));
            } catch (err) {
                FlashMessages.sendError(err, {autohide: true});
            }
            fileIndex++;
        } while (fileList.item(fileIndex));
        

        
    }
});