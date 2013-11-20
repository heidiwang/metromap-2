(function(window, document, undefined) {
var TileLightbox = {};

// wrap a <a> around divElement 
TileLightbox.createLightbox = function(articleObj, divElement){
    $('.fancybox').fancybox();

    var widthOfLightbox = 0.7*$(window).width();

    $(".fancybox").fancybox({
		'width'		:	widthOfLightbox
		
	});

	var a = '<a class="fancybox fancybox.iframe" href="'+articleObj.url +'"></a>';
	$divElement = $(divElement);
	$divElement.wrap(a);
	};

window.TileLightbox = TileLightbox;
})(this, this.document);