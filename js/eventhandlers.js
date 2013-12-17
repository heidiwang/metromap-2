/**************************
Map: Event handling
**************************/

function addEventHandlersToButton(){

	$('.exampleFilesHidden').on('click', function(event){
		$(this).hide();
		$('.exampleFilesShown').show();
		$('.exampleFiles').show();
	});

	$('.exampleFilesShown').on('click', function(event){
		$(this).hide();
		$('.exampleFilesHidden').show();
		$('.exampleFiles').hide();
	});

	$("#searchQuery-btn").on('click', function(event) {
		console.log($("#searchDiv input"));
	});

	$("#example1-btn").on('click', function(event){
		updateJSON(finalJson);
	});
	$("#example2-btn").on('click', function(event){
		updateJSON(finalJson2);

	});
	$("#example3-btn").on('click', function(event){
		updateJSON(finalJson3);
	});
	$("#example4-btn").on('click', function(event){
		updateJSON(finalJson4);
	});
	$("#example5-btn").on('click', function(event){
		console.log(finalJson5);
		updateJSON(finalJson5);
	});

	//upload Javascript example file
	$("#uploadFile").on('click', function(event){
		$("#uploadFileHelper").click();
	})
	//upload Javascript example file
	$("#uploadFileHelper").on("change", function(event) { 
		
		$uploadErrorMessage = $("#uploadErrorMessage");
		$uploadErrorMessage.hide();

		var file = this.files[0];
		var name = file.name;
		var size = file.size;
		var type = file.type;

		// check it data ends with .json, if it doesnt return
		if (name.substr(name.length-5) !== ".json") {
			$uploadErrorMessage.html("Wrong file type. JSON type in specific format is required: ");
			$uploadErrorMessage.show();
			return;
		}

		var fileReader = new FileReader();
		fileReader.addEventListener("load", function(event) {
			var textFile = event.target;
			console.log(textFile.result);
			// = jQuery.parseJSON(textFile.result);
			var jsObj = JSON.parse(textFile.result);
			// var jsObj = JSON.parse(jsonObj);
			// console.log(JSON.stringify(jsObj));
			// console.log(jsObj);
			//UpdateJSON file for site with uploaded json
			updateJSON(jsObj);

		});

        //Read the text file - triggers the load function of the fileReader
        fileReader.readAsText(file);
    });
}



function stagePan(object) {
	object.on('mouseover', function() {
		document.body.style.cursor = '-webkit-grab';
	});
	object.on('dragmove', function() {
		//only allow horizontal scrolling
		object.setY(0);
		
		// constrain left and right panning
		if (object.getX() > 0) {
			object.setX(0);
		}
		var offset = (-1) * (getPanelWidth() - $('#map-container').width());
		if (object.getX() < offset) {
			object.setX(offset);
		}
		
		object.draw();
	});
}

function nodeHover(object, node) {
	var nodeLabel = node.labelShape;
	var nodeCircle = node.circleShape;
	
	object.on('mouseenter', function() {
		// highlight color
		if (node.id != currentSelectedNode) {
			darkenColor(node);
		}
		// magnify small nodes
		if (node.importance == 1) {
			magnify(node);
		}
		// change cursor to pointer
		document.body.style.cursor = 'pointer';
		// bring to front
		nodeCircle.moveToTop();
		nodeLabel.moveToTop();
		
		layer.draw();
	});
	object.on('mouseleave', function() {
		if (node.id != currentSelectedNode) {
			lightenColor(node);
		}
		if (node.importance == 1) {
			collapse(node);
		}
		document.body.style.cursor = '-webkit-grab';
		layer.draw();
	});
}

function nodeClick(object, node) {
	object.on('click', function() {
		lightenColor(getNodeByID(currentSelectedNode));
		currentSelectedNode = node.id;
		layer.draw();
		console.log(node);
		populateArticles(node);
	});
}

function magnify(node) {
	var circleShape = node.circleShape;
	circleShape.setRadius(23*3);
	
	var labelShape = node.labelShape;
	labelShape.setText(node.label);
	labelShape.setWidth(23*3*1.5);
	labelShape.setHeight(23*3*1.5);
	labelShape.setFontSize(18);
	labelShape.setPosition(node.x - 23*3*.75, node.y - 23*3*.75);
}

function collapse(node) {
	var circleShape = node.circleShape;
	circleShape.setRadius(23);
	
	var labelShape = node.labelShape;
	labelShape.setText("...");
	labelShape.setWidth(23*1.5);
	labelShape.setHeight(23*1.5);
	labelShape.setFontSize(20);
	labelShape.setPosition(node.x - 23*.75, node.y - 23*.75);
}

function changeSelectedNode(node) {
	// make the previously selected node back to normal
	lightenColor(currentSelectedNode);
	
	// darken the new selected node
	currentSelectedNode = node;
	darkenColor(currentSelectedNode);
	layer.draw();
}

function darkenColor(nodeData) {
	var firstLine = nodeData.lineIDs[0];
	var circleShape = nodeData.circleShape;
	circleShape.setFill(Util.getHighlightedColor(colors[firstLine]));
}

function lightenColor(nodeData) {
	var firstLine = nodeData.lineIDs[0];
	var circleShape = nodeData.circleShape;
	circleShape.setFill(colors[firstLine]);
}