// http://masonry.desandro.com/masonry.pkgd.js added as external resource
// http://masonry.desandro.com/components/classie/classie.js added as external resource


//global variables
var node;
var articles;
var container = document.querySelector('.masonry');

//  given data for article tiles
// var colorArray = getColorArray(5);
var nodeId = 0;
var widthReference = 200;
var heightReference = 200;
var importanceUnit = 50;
var heightImportance = false;


// Masonry library
var msnry = new Masonry( container, {
	columnWidth: 1
});


// articlesObject should be fetched from server in the future and not from example javascript israel-data.js file
function getArticlesObj(node) {
	return articlesObject;
}

// is called when clicked on node
function populateArticles(node) {
	
	var node = node;

	// here should be the query to the server... articlesObject is fetched from example javascript israel-data.js file
	var articlesObj = getArticlesObj(node);
	articles = articlesObj.articles;

	// remove current articles 
	while (container.hasChildNodes()) {
		//console.log("in remov");
		msnry.remove(container.lastChild);
		container.removeChild(container.lastChild);
	}

	
	// random # articles are shown -
	// startingIndex = Math.floor(Math.random()*articles.length);
	var startingIndex = 0;
	if (startingIndex == articles.length-1){
		startingIndex = articles.length-2;
	}
	drawArticles(startingIndex, articles.length-1, articles, msnry, node);		

	
	//Binds event listener to window resize, so layout is triggered when the browser window is resized.
	msnry.bindResize()

}

// getWidth of respective article  based on importance
function getWidth(article, widthReference, importanceUnit){
	var result = widthReference+(article.importance*importanceUnit);
	var id = "article" + article.id;
	return result;
}


// gets Height of respective article
function getHeigth(article, heightReference, heightImportance, importanceUnit){
	var result = heightReference+(article.importance*importanceUnit);
	if (heightImportance) {
		return result;
	}
	else 
		return heightReference;
}


// draw dynamically all the articles
function drawArticles(startingArtInd, endArtInd, articles, msnry, node) {

	// var articleColor = colorArray[0];
	var articleColor = getHighlightedColor(node.color, node);
	// var articleColor = node.color;

	var currentWidthInLine = 0;
	var maxWidth = container.clientWidth - 15;
	
	// draw each article box
	for (var i = startingArtInd; i < endArtInd; i++)  {
		/// create div with article+i ID
		var article = document.createElement('div');
		article.id ='article'+i;	
		article.className = "item";
		

		var articleWidth = getWidth(articles[i], widthReference, importanceUnit)
		// console.log('article width: ' + articleWidth);
		currentWidthInLine += articleWidth;
		// console.log("currentWidthInLine: " + currentWidthInLine);

		// get the right width of each element: the last item in the row gets expanded to the maxSize of the container
		// if not last item
		if (i < endArtInd - 1 ){
			var nextArticleWidth = getWidth(articles[i+1], widthReference, importanceUnit)
			// if last item in row
			if (nextArticleWidth + currentWidthInLine > maxWidth) {
				article.style.width = articleWidth + (maxWidth - currentWidthInLine) +"px";
				// console.log("in last item , next ArticleWIdth;" + nextArticleWidth );
				// console.log("in last item ;" + article.style.width );
				// console.log('currentWidthInLine:' + currentWidthInLine);
				// console.log('maxWidth:' + maxWidth);
				currentWidthInLine = 0;
			}
			else {
				// console.log('else');
				article.style.width = articleWidth +"px";
			}
		}
		else {
			// console.log('in last element else');
			article.style.width = articleWidth +"px";
		}		

			
		// console.log("after the loop :" + article.style.width);
		// console.log("-----next Tile");
		article.style.height = getHeigth(articles[i], heightReference, heightImportance, importanceUnit)  +"px";
		// article.style.width = "250px";
		// article.style.height = "250px";
		container.appendChild( article );

		addClickListener(articles, article, i);


		/// add text to articleDiv
		var articleText = document.createElement('div');
		articleText.className = "item-content";
		articleText.innerHTML = '<div class="title">'+  articles[i].title + '</div>' ;
		$(articleText).append("<div class='previewText'>" + articles[i].previewText.substring(0,100) + "... </br></div>");
		// $(articleText).append("<div class='timestamp'>"	 + articles[i].timestamp + "</div>");
		// $(articleText).append("<div class='publisher'> By: " + articles[i].publisher + " --> </div>");
		//document.getElementById('display-date').style.fontSize = '2em';
		articleText.style.width = article.style.width;
		articleText.style.height = article.style.height;
		articleText.style.background = articleColor;
		article.appendChild(articleText);

		// add backGround picture to articleDiv
		var articleBackground = document.createElement('div');
		articleBackground.className = "article-background-pic";
		// CSS of this div
		articleBackground.style.backgroundImage = 'url(' + articles[i].image + ')';
		articleBackground.style.top =  articleText.style.top;
		articleBackground.style.left = articleText.offsetLeft + "px";
		articleBackground.style.top = articleText.offsetTop + "px";
		articleBackground.style.width = article.style.width;
		articleBackground.style.height = article.style.height;
		article.appendChild(articleBackground);

		msnry.appended( article );
		//makes visual,appearing effects
		msnry.layout();


	}



}

// forwards to respective article URL on a click
function addClickListener(articles, article, i) {	
	$(article).bind('click', function(event){

		
		var win=window.open(articles[i].url, '_blank');
		win.focus();
	});
}

function getHighlightedColor(hexColor, node) {
	var articleColorRGB = hexToRgb(node.color);
	var articleColor = rgbToHex(Math.max(articleColorRGB.r - 50,0),Math.max(articleColorRGB.g - 50,0) , Math.max(articleColorRGB.b - 50,0));
	return articleColor;
	// console.log(node.color);
	// console.log(articleColor);
	
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getColorArray(nrOfColors) {
	var result = new Array();
	var colorArrayOverview = new Array();

	var colorArray =  ["#FF4900", "#FF9200", "#0B61A4", "#00AF64", "#FFFF00"];
	colorArrayOverview.push(colorArray);
	
	var	colorArray2 = ["#FF0000", "#FF7400", "#009999", "#00CC00", "#3914AF"];
	colorArrayOverview.push(colorArray2);
 	
 	// // yellow, green, pink, purple
	var colorArray3 = ["#FFFF00", "#9FEE00", "#CD0074", "#7109AA", "#0A67A3"];
	colorArrayOverview.push(colorArray3);

	var colorArray4 = ["#3fb8e8", "#e86f3f", "#3f63e8", "#e83f63", "#b8e83f"];
	colorArrayOverview.push(colorArray4);
	
	var colorArrayIndex = Math.floor(Math.random()*colorArrayOverview.length);
	console.log(colorArrayIndex);
	for (var i = 0; i < nrOfColors; i++) {
		result.push(colorArrayOverview[colorArrayIndex][i]);
	}
	console.log(result);
	return result;
		
}

