/**************************
Map: Event handling
**************************/

function hoverCursor(object, node) {
	object.on('mouseenter', function() {
		if (node.id != currentSelectedNode) {
			darkenColor(node);
			layer.draw();
		}
		document.body.style.cursor = 'pointer';
	});
	object.on('mouseleave', function() {
		if (node.id != currentSelectedNode) {
			lightenColor(node);
			layer.draw();
		}
		document.body.style.cursor = 'default';
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
	var darkColors = {"1": "#940068", "2": "#188686", "3": "#3db65c", "4": "#694aad", "5": "#ac6700"};
	var circleShape = nodeData.circleShape;
	circleShape.setFill(darkColors[firstLine]);
}

function lightenColor(nodeData) {
	var firstLine = nodeData.lineIDs[0];
	var circleShape = nodeData.circleShape;
	circleShape.setFill(colors[firstLine]);
}