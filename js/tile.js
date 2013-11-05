	// http://masonry.desandro.com/masonry.pkgd.js added as external resource

	// http://masonry.desandro.com/components/classie/classie.js added as external resource

	function populateArticles(node) {

	console.log("GET ARTICLES FOR NODE " + node.id);
	var node = node;
	console.log(node);	
	//console.log(colorArray[0]);
	var container = document.getElementById("container");
	
	while (container.hasChildNodes()) {
		console.log("in remov");
		container.removeChild(container.lastChild);
	}


	var container = document.querySelector('.masonry');
	container.style.width = "100%";
	// Masonry library
	var msnry = new Masonry( container, {
		columnWidth: 1
	});

	// here should be the query to the server... articlesObject is fetched from example javascript israel-data.js file
	var articlesObj = articlesObject;
	var articles = articlesObj.articles;
	

	startingIndex = Math.floor(Math.random()*articles.length);
	if (startingIndex == articles.length-1){
		startingIndex = articles.length-2;
	}
	console.log('end of poupsjdf');
	drawArticles(startingIndex, articles.length-1, articles, msnry, node);		

	//Binds event listener to window resize, so layout is triggered when the browser window is resized.
	msnry.bindResize()

}

function getWidth(article, widthReference, importanceUnit){
	var result = widthReference+(article.importance*importanceUnit);
	return result;
}


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
		
		//  given data
		var colorArray = ["#3fb8e8", "#e86f3f", "#3f63e8", "#e83f63", "#b8e83f"];
		var nodeId = 0;
		//var articleColor = colorArray[0];
		var articleColor = node.color;
		var widthReference = 200;
		var heightReference = 200;
		var importanceUnit = 50;
		var heightImportance = false;

		// draw each article box
		for (var i = startingArtInd; i < endArtInd; i++)  {
			
			// create div with article+i ID
			var article = document.createElement('div');
			article.id ='article'+i;	
			article.className = "item";
			container.appendChild( article );
			article.style.width = getWidth(articles[i], widthReference, importanceUnit) +"px";
			article.style.height = getHeigth(articles[i], heightReference, heightImportance, importanceUnit)  +"px";
			// article.style.width = "250px";
			// article.style.height = "250px";
			addClickListener(articles, article, i);


			// add text to articleDiv
			var articleText = document.createElement('div');
			articleText.className = "item-content";
			articleText.innerHTML = '<h4>'+  articles[i].title + '</h4>' ;
			$(articleText).append("<div class='previewText'>" + articles[i].timestamp + ": " + articles[i].previewText.substring(0,170) + "... </br> Read on: " + articles[i].publisher + "</div>");
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


			//makes visual,appearing effects
			msnry.appended( article );
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


	// function changeColorListener(articleColor, colorArray){
	// 	$('#changeColorButton').bind('click', function() {

	// 		var index =  colorArray.indexOf(articleColor);
	// 		if (index == colorArray.length-1) {
	// 			index = -1
	// 		}
	// 		articleColor = colorArray[index+1];	 
	// 	});
	// }

