/**************************
Map: Helpers
**************************/

function setNodeProperties() {
	for (var n in nodes) {
		var xspacing = getWindowWidth()/(nodes.length);
		var yspacing = 400/lines.length;
		nodes[n].x = xspacing * n + xspacing/2;
		nodes[n].y = yspacing * nodes[n].lineIDs[0] + Math.random(); // add a small random variation to prevent perfectly horizontal lines
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

function getWindowWidth() {
	return $(window).width();
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

function initializeColors(numColors){
	colors = {};
	for (var i = 1; i <= numColors; i++) {
		colors[i] = get_random_color();
	}
}

function get_random_color() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
			color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}

