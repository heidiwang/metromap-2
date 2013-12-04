/**************************
Map: Initialize variables and stage/canvas
**************************/

var serverURL = "ilws19.stanford.edu:8089"
var searchQuery = "tennis";
var dateString = "W06142013";
var url = serverURL + "/" + searchQuery + "/" + dateString;

//eventhandlers.js
addEventHandlersToButton();

initialize();


function initialize() {
	$.getJSON( url, function( data ) {
	  console.log(data);
	});

	var nodes = data.nodes;
	var lines = data.lines;
	// console.log(data);

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

	stagePan(stage);

	layer = new Kinetic.Layer({width: getPanelWidth(), height: getPanelHeight()});
	initializeColors();
	setLineProperties();
	setNodeProperties();
	setLayout();
	populateArticles(getNodeByID(currentSelectedNode));

}