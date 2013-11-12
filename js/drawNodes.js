/**************************
Map: Draw nodes
**************************/

function drawNodes() {
	for (var n in nodes) {
	
		// If node is shared, draw arcs behind
		if ((nodes[n].lineIDs).length > 1) {
			drawSharedArcs(nodes[n]);
		}
		
		drawPlainNode(nodes[n]);
		
		// update currentSelectedNode so it has the whole node data structure
		// and not just the id
		if (nodes[n].id == currentSelectedNode) {
			currentSelectedNode = nodes[n];
			var circleShape = currentSelectedNode.circleShape;
			darkenColor(circleShape);
		}
	}
}

function drawPlainNode(nodeData) {
	var node = new Kinetic.Circle({
		radius: nodeData.radius,
		fill: nodeData.color,
		x: nodeData.x,
		y: nodeData.y
	});

	var label = new Kinetic.Text({
		x: nodeData.x - nodeData.radius*.75,
		y: nodeData.y - nodeData.radius*.75,
		text: nodeData.displayText,
		fontSize: nodeData.importance*5 + 3,
		fontFamily: 'Calibri',
		width: nodeData.radius*1.5,
		height: nodeData.radius*1.5,
		fill: 'white',
		align: 'center'
	});

	nodeData.circleShape = node;
	nodeData.labelShape = label;

	// Add event handlers
	hoverCursor(node, nodeData);
	hoverCursor(label, nodeData);
	nodeClick(node, nodeData);
	nodeClick(label, nodeData);

	layer.add(node);
	layer.add(label);
}

function drawSharedArcs(nodeData) {
	var lines = nodeData.lineIDs;
			
	var stroke = new Kinetic.Circle({
		radius: nodeData.radius + 2,
		x: nodeData.x,
		y: nodeData.y,
		stroke: colors[lines[1]],
		strokeWidth: 5
	});
	
	layer.add(stroke);
}
