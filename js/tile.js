// http://masonry.desandro.com/masonry.pkgd.js added as external resource

// http://masonry.desandro.com/components/classie/classie.js added as external resource

docReady( function() {
	//  given data
	var colorArray = ["#3fb8e8", "#e86f3f", "#3f63e8", "#e83f63", "#b8e83f"];
	var nodeId = 0;
	var articleColor = colorArray[0];
	var widthReference = 200;
	var heightReference = 200;
	var importanceUnit = 50;
	var heightImportance = false;

	var articlesObj = getArticles(nodeId);
	var articles = articlesObj.articles;
	var container = document.querySelector('.masonry');
	container.style.width = "100%";

	var msnry = new Masonry( container, {
		columnWidth: 1
	});

	function getWidth(article){
		var result = widthReference+(article.importance*importanceUnit);
		return result;
	}


	function getHeigth(article){
		var result = heightReference+(article.importance*importanceUnit);
		if (heightImportance) {
			return result;
		}
		else 
			return heightReference;
	}

	// draw dynamically all the articles
	function drawArticles(startingArtInd, endArtInd) {
		// draw each article box
		for (var i = startingArtInd; i < endArtInd; i++)  {
			
			// create div with article+i ID
			var article = document.createElement('div');
			article.id ='article'+i;	
			article.className = "item";
			container.appendChild( article );
			article.style.width = getWidth(articles[i]) +"px";
			article.style.height = getHeigth(articles[i])  +"px";
			// article.style.width = "250px";
			// article.style.height = "250px";
			addClickListener(article, i);


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
	function addClickListener(article, i) {
		$(article).bind('click', function(event){
			var win=window.open(articles[i].url, '_blank');
			win.focus();
		});
	}

	//Binds event listener to window resize, so layout is triggered when the browser window is resized.
	msnry.bindResize()

	$('#addTileButton').bind('click', function() {

		var container = document.getElementById("container");
		console.log(container);
		while (container.hasChildNodes()) {
			console.log("in remov");
 	   		container.removeChild(container.lastChild);
		}
		
		startingIndex = Math.floor(Math.random()*articles.length);
		if (startingIndex == articles.length-1){
			startingIndex = articles.length-2;
		}
		drawArticles(startingIndex, articles.length-1);		
		
	});
	
	$('#changeColorButton').bind('click', function() {

		var index =  colorArray.indexOf(articleColor);
		if (index == colorArray.length-1) {
			index = -1
		}
		articleColor = colorArray[index+1];	 
	});
	
	// request server and get articles for respective nodeID
	function getArticles(nodeId) {
		return articlesObject;
	}

});

function populateArticles(nodeID) {
	console.log("GET ARTICLES FOR NODE " + nodeID);
	// logic to populate articles goes here
}