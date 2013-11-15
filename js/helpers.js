/**************************
Map: Helpers
**************************/

function setLineProperties() {
	for (var l in lines) {
		var nodeIDs = lines[l].nodeIDs;
		var nodeData = [];
		for (var n in nodeIDs) {
			var node = getNodeByID(nodeIDs[n]);
			nodeData.push(node);
		}
		nodeData = sortByDate(nodeData);
		var sortedNodeIDs = [];
		for (var n in nodeData) {
			sortedNodeIDs.push(nodeData[n].id);
		}
		lines[l].nodeIDs = sortedNodeIDs;
	}
}

function setNodeProperties() {
	nodes = sortByDate(nodes);
	
	var dateSortedNodes = sortByDate(nodes);
	
	var xspacing = getPanelWidth()/(nodes.length);
	var yspacing = getPanelHeight()/(lines.length);
	
	for (var n in nodes) {
		nodes[n].x = xspacing * n + xspacing/2;
		nodes[n].y = yspacing * (nodes[n].lineIDs[0]-1) + yspacing/2 + Math.random(); // add a small random variation to prevent perfectly horizontal lines
		nodes[n].radius = nodes[n].importance * 23;
		nodes[n].color = colors[nodes[n].lineIDs[0]];
		
		if (nodes[n].importance == 1) {
			nodes[n].displayText = "...";
		}
		else {
			nodes[n].displayText = nodes[n].label;
		}
	}
}

function sortByDate(nodes) {
	var sortedNodes = nodes.sort(function(a,b){
		return (Date.parse(a.time) - Date.parse(b.time));
	});
	return sortedNodes;
}

function getPanelWidth() {
	//return $(window).width()*0.85;
	return 2000;
}

function getPanelHeight() {
	return 400;
}

function getNodeByID(id) {
	for (var n in nodes) {
		if (nodes[n].id == id) {
			return nodes[n];
		}
	}
	return null;
}

function getLineById(lineId) {
	for (var l in lines) {
		if (lines[l].id == lineId) {
			return lines[l];
		}
	}
}

function initializeColors() {
	var colorBank = ["#D50096", "#22C3C3", "#48E470", "#9c6eff", "#FF9900"];
	var colors = sample_range(colorBank, lines.length);
}

function sample_range(range, n) {
  console.log(range);
  var sample = [];
  for(var i=0; i<n; i++) {
    sample.push(range.splice(Math.random()*range.length,1));
  }
  console.log(sample);
  return sample;
}