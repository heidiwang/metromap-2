(function(window, document, undefined) {
var TileLightbox = {};


TileLightbox.createLightbox = function(articleObj, divElement){
	// console.log('in createLightBox');
	// console.log(articleObj);

	//addEventClickListener
	$(divElement).bind('click', function(event){

		dynamicCreationOfLightbox(articleObj, divElement);
		var win=window.open(articleObj.url, '_blank');
		win.focus();
	});
};

// build the actual Lightbox dynamically
function dynamicCreationOfLightbox(articleObj, divElement) {
	
}

window.TileLightbox = TileLightbox;
})(this, this.document);