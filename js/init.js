/**************************
Map: Initialize variables and stage/canvas
**************************/

var nodes = data.nodes;
var lines = data.lines;

// Global variables
var stage;
var layer;
var colors;// = {"1": "#D50096", "2": "#22C3C3", "3": "#48E470", "4": "#9c6eff", "5": "#FF9900"}; // still need to make this dynamic
var darkColors = {"1": "#940068", "2": "#188686", "3": "#3db65c", "4": "#694aad", "5": "#ac6700"};
var currentSelectedNode = 11;

stage = new Kinetic.Stage({
	container: 'map-container',
		width: getPanelWidth(),
		height: getPanelHeight()
});

layer = new Kinetic.Layer({width: getPanelWidth(), height: getPanelHeight()});
initializeColors();
setLineProperties();
setNodeProperties();
setLayout();