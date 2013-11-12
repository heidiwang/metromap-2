/*****
Event handlers
*****/

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