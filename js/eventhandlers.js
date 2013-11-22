/**************************
Map: Event handling
**************************/

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

function hoverCursor(object, node) {
	object.on('mouseenter', function() {
		if (node.id != currentSelectedNode) {
			darkenColor(node);
			layer.draw();
		}
		if (node.importance == 1) {
			magnify(node);
			layer.draw();
		}
		document.body.style.cursor = 'pointer';
	});
	object.on('mouseleave', function() {
		if (node.id != currentSelectedNode) {
			lightenColor(node);
			layer.draw();
		}
		if (node.importance == 1) {
			collapse(node);
			layer.draw();
		}
		document.body.style.cursor = '-webkit-grab';
	});
}

function nodeClick(object, node) {
	object.on('click', function() {
		lightenColor(getNodeByID(currentSelectedNode));
		currentSelectedNode = node.id;
		layer.draw();
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
	console.log(colors);
	circleShape.setFill(Util.getHighlightedColor(colors[firstLine]));
}

function lightenColor(nodeData) {
	var firstLine = nodeData.lineIDs[0];
	var circleShape = nodeData.circleShape;
	circleShape.setFill(colors[firstLine]);
}