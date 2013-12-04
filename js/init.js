/**************************
Map: Initialize variables and stage/canvas
**************************/

/*var serverURL = "ilws19.stanford.edu:8089"
var searchQuery = "tennis";
var dateString = "W06142013";
var url = serverURL + "/" + searchQuery + "/" + dateString;

var data;
$.getJSON( url, function( data ) {
  console.log(data);
});*/

var nodes = [];
var lines = [];
var nodeObjs = finalJson.nodes;
var lineObjs = finalJson.lines;

for (var n in nodeObjs) {
	var node = nodeObjs[n];
	nodes.push(node);
}

for (var l in lineObjs) {
	var line = lineObjs[l];
	lines.push(line);
}

for (var k in nodeObjs) {
	break;
}
var currentSelectedNode = k;

// Global variables
var stage;
var layer;
var colors;

stage = new Kinetic.Stage({
	container: 'map-container',
		width: getPanelWidth(),
		height: getPanelHeight(),
		draggable: true
});

stagePan(stage);

layer = new Kinetic.Layer({width: getPanelWidth(), height: getPanelHeight()});
initializeColors();
setLineProperties();
setNodeProperties();
setLayout();
populateArticles(getNodeByID(currentSelectedNode));

function populateArticles(node) {
	console.log("populate articles for " + node.id);
}