

Template['editRecipe-outer'].events({
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
        var uploader = new Uploader(new HtmlImgurUploadStateNotifier($, 'editRecipeF'));

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

Template.editRecipe.helpers({
	showIngredients: function (params) {
		var output = '';
		params.hash.src.lines.forEach( function (line) {
			if(line && line.originalText) {
				output += line.originalText + '\r\n';
			}
		});
		return output;
	},
	getStringifiedImages: function () {
		var stringifiedImages = [];
		console.log(this);
		this.images.forEach(function (image) {
			stringifiedImages.push(JSON.stringify(image));
		});
		console.log(stringifiedImages);
		return stringifiedImages;
	}
});

Template['editRecipe-outer'].onRendered(function() { 
	var tagDrawer = new TagDrawer(
		new TagContainer('split-ingredients', $), 
		new IngredientsParser($('#ingredients').val())
	);
	tagDrawer.drawTags();
});

Template['editRecipe-outer'].helpers({

	getThumbnail: function () {
		var imgurTool = new ImgurTool();
		return imgurTool.getThumbnailFromLinkAndId(this.link, this.id);
	},


});
