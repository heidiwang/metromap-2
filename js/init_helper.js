function updateJSON(newData) {

	nodes = [];
	lines = [];
	currentSelectedNode = null;
	
	console.log('in updateJSON');
	console.log(newData);
	var nodeObjs = newData.nodes;
	var lineObjs = newData.lines;

	for (var n in nodeObjs) {
		var node = nodeObjs[n];
		nodes.push(node);
	}

	for (var l in lineObjs) {
		var line = lineObjs[l];
		lines.push(line);
	}

	// for now, set selected node to be first node
	for (var k in nodeObjs) {
		break;
	}
	currentSelectedNode = k;
	
	initialize();
	drawMap();
}