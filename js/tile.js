// http://masonry.desandro.com/masonry.pkgd.js added as external resource

// http://masonry.desandro.com/components/classie/classie.js added as external resource

docReady( function() {

	var container = document.querySelector('.masonry');
	var msnry = new Masonry( container, {
		columnWidth: 2
	});



	msnry.bindResize()

	$('#addTileButton').bind('click', function() {
		var testClass = document.createElement('div');
		testClass.id ='test';	
		testClass.className = "item";
		
		var testClassItemContent = document.createElement('div');
		testClassItemContent.className = "item-content";
		
		testClass.appendChild(testClassItemContent);
		var rand = Math.random()*300;
		if (rand<=100) {
			rand = 100;
		} 
		console.log(rand);
		testClass.style.width=rand +"px";
		testClassItemContent.style.width=rand +"px";
		
		var rand = Math.random()*300;
		if (rand<=100) {
			rand = 100;
		} 
		
		testClass.style.height=rand +"px";
		testClassItemContent.style.height=rand +"px";


		container.appendChild( testClass );
		msnry.appended( testClass );
		msnry.layout();

	});



});