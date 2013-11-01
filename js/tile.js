// http://masonry.desandro.com/masonry.pkgd.js added as external resource

// http://masonry.desandro.com/components/classie/classie.js added as external resource

docReady( function() {

	var nodeId = 0;
	var articlesObj = getArticles(nodeId);
	var articles = articlesObj.articles;
	var container = document.querySelector('.masonry');
	container.style.width = "100%";

	var msnry = new Masonry( container, {
		columnWidth: 2
	});

	// draw dynamically all the articles
	function drawArticles() {
		console.log(articles.length);

		// draw each article box
		for (var i = 0; i < articles.length; i++)  {
			
			// create div with article+i ID
			var article = document.createElement('div');
			article.id ='article'+i;	
			article.className = "item";
			container.appendChild( article );
			article.style.width = 250 +"px";
			article.style.height = 250 +"px";
				
			// add text to articleDiv
			var articleText = document.createElement('div');
			articleText.className = "item-content";
			articleText.innerHTML = '<h4>'+  articles[i].title + '</h4>' ;
			articleText.style.width = article.style.width;
			articleText.style.height = article.style.height;
			article.appendChild(articleText);

			// add backGround picture to articleDiv
			var articleBackground = document.createElement('div');
			articleBackground.className = "article-background-pic";

			// CSS of this div
			articleBackground.style.position = "absolute";
			articleBackground.style.backgroundImage = 'url(' + articles[i].image + ')';
			articleBackground.style.top =  articleText.style.top;
			console.log(article.offsetLeft);
			articleBackground.style.left = articleText.offsetLeft + "px";
			articleBackground.style.top = articleText.offsetTop + "px";
			articleBackground.style.opacity = "0.3";
			articleBackground.style.width = article.style.width;
			articleBackground.style.height = article.style.height;
			article.appendChild(articleBackground);

			//makes visual,appearing effects
			msnry.appended( article );
			msnry.layout();
		}
		


	}

	//Binds event listener to window resize, so layout is triggered when the browser window is resized.
	msnry.bindResize()

	$('#addTileButton').bind('click', function() {
			drawArticles();
		
	});
	
	// request server and get articles for respective nodeID
 	function getArticles(nodeId) {
 		return articlesObject;
 	}
	




});