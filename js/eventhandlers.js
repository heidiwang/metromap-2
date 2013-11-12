/**************************
Map: Event handling
**************************/

function hoverCursor(object, node) {
	object.on('mouseenter', function() {
		if (node.id != currentSelectedNode.id) {
			darkenColor(node.circleShape);
			layer.draw();
		}
		document.body.style.cursor = 'pointer';
	});
	object.on('mouseleave', function() {
		if (node.id != currentSelectedNode.id) {
			lightenColor(node.circleShape);
			layer.draw();
		}
		document.body.style.cursor = 'default';
	});
}

function nodeClick(object, node) {
	object.on('click', function() {
		//changeSelectedNode(node);
		lightenColor(currentSelectedNode.circleShape);
		currentSelectedNode = node;
		layer.draw();
		populateArticles(node);
	});
}

function changeSelectedNode(node) {
	// make the previously selected node back to normal
	lightenColor(currentSelectedNode.circleShape);
	
	// darken the new selected node
	currentSelectedNode = node;
	darkenColor(currentSelectedNode.circleShape);
	layer.draw();
}

function darkenColor(circleShape) {
	circleShape.setFillR(Math.max(0, circleShape.getFillR() - 60));
	circleShape.setFillG(Math.max(0, circleShape.getFillG() - 60));
	circleShape.setFillB(Math.max(0, circleShape.getFillB() - 60));
}

function lightenColor(circleShape) {
	circleShape.setFillR(Math.min(255, circleShape.getFillR() + 60));
	circleShape.setFillG(Math.min(255, circleShape.getFillG() + 60));
	circleShape.setFillB(Math.min(255, circleShape.getFillB() + 60));
}