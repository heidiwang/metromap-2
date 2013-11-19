/**************************
Map: Initialize variables and stage/canvas
**************************/

var nodes = data.nodes;
var lines = data.lines;

// Global variables
var stage;
var layer;
var colors;
var currentSelectedNode = 11;

stage = new Kinetic.Stage({
	container: 'map-container',
		width: getPanelWidth(),
		height: getPanelHeight(),
		draggable: true
});

stage.on('mouseover', function() {
	document.body.style.cursor = '-webkit-grab';
});

stage.on('dragmove', function() {
	stage.setY(0);
	stage.draw();
});

layer = new Kinetic.Layer({width: getPanelWidth(), height: getPanelHeight()});
initializeColors();
setLineProperties();
setNodeProperties();
setLayout();
populateArticles(getNodeByID(currentSelectedNode));