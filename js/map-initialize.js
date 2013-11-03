// Temporarily use dummy data:
data = {"nodes": [
	{"id": "1", 
	"label": "gaza palestinians fire united leaders",
	"time": "2009-01-05",
	"importance": "3",
	"lineIDs": ["1"]
	},
	{"id": "2",
	"label": "gaza palestinians leaders president war",
	"time": "2009-01-27",
	"importance": "2",
	"lineIDs": ["3"]
	},
	{"id": "3",
	"label": "gaza palestinians united president minister",
	"time": "2009-02-13",
	"importance": "2",
	"lineIDs": ["2"]
	},
	{"id": "4", 
	"label": "egypt united war cross palestinians",
	"time": "2009-02-23",
	"importance": "2",
	"lineIDs": ["1"]
	},
	{"id": "5",
	"label": "regional settlements solutions netanyahu coalition",
	"time": "2009-03-03",
	"importance": "2",
	"lineIDs": ["3"]
	},
	{"id": "6",
	"label": "muslim jordan trip speech john",
	"time": "2009-05-08",
	"importance": "2",
	"lineIDs": ["4"]
	},
	{"id": "7", 
	"label": "iranian obama american policies iran",
	"time": "2009-05-14",
	"importance": "2",
	"lineIDs": ["2"]
	},
	{"id": "8",
	"label": "power senior striking capabilities russia",
	"time": "2009-07-06",
	"importance": "2",
	"lineIDs": ["2"]
	},
	{"id": "9",
	"label": "power white george construction advisers",
	"time": "2009-08-18",
	"importance": "2",
	"lineIDs": ["1", "3"]
	},
	{"id": "10", 
	"label": "accusations committed action evidence civilian",
	"time": "2009-10-15",
	"importance": "2",
	"lineIDs": ["1"]
	},
	{"id": "11",
	"label": "produced bombs facilities secret planting",
	"time": "2009-10-26",
	"importance": "2",
	"lineIDs": ["2"]
	},
	{"id": "12",
	"label": "mahmoud prison abbas council fatah",
	"time": "2009-11-06",
	"importance": "2",
	"lineIDs": ["3"]
	},
	{"id": "13", 
	"label": "family visiting jewish jerusalem city",
	"time": "2010-01-16",
	"importance": "2",
	"lineIDs": ["4"]
	},
	{"id": "14",
	"label": "hillary clinton agency washington american",
	"time": "2010-02-10",
	"importance": "4",
	"lineIDs": ["2"]
	},
	{"id": "15",
	"label": "move capitalizing projects neighborhoods vice",
	"time": "2010-03-15",
	"importance": "5",
	"lineIDs": ["3"]
	},
	{"id": "16", 
	"label": "according spokesman claim killed clinton",
	"time": "2010-03-22",
	"importance": "2",
	"lineIDs": ["1"]
	},
	{"id": "17",
	"label": "starting policies gaza abbas obama",
	"time": "2010-04-25",
	"importance": "4",
	"lineIDs": ["3"]
	},
	{"id": "18",
	"label": "dealing materials conference proposal treaty",
	"time": "2010-05-03",
	"importance": "2",
	"lineIDs": ["2"]
	},
	{"id": "19",
	"label": "home blockades militants gaza fire",
	"time": "2010-06-01",
	"importance": "2",
	"lineIDs": ["1", "5"]
	},
	{"id": "20", 
	"label": "ships turkish nine water boards",
	"time": "2010-06-03",
	"importance": "2",
	"lineIDs": ["5"]
	},
	{"id": "21",
	"label": "palestinians tries gaza activist turkish",
	"time": "2010-08-09",
	"importance": "5",
	"lineIDs": ["5"]
	},
	{"id": "22",
	"label": "moratorium extend extensively expire clinton",
	"time": "2010-09-26",
	"importance": "1",
	"lineIDs": ["3"]
	},
	{"id": "23", 
	"label": "power planting computer enrich united",
	"time": "2010-09-26",
	"importance": "3",
	"lineIDs": ["2"]
	},
	{"id": "24",
	"label": "peacefully border bank militants war",
	"time": "2010-10-18",
	"importance": "2",
	"lineIDs": ["1"]
	}
],
"lines": [
	{"id": "1",
	"label": "attack, military, hamas, palestinians, killed",
	"nodeIDs": ["1", "4", "9", "10", "16", "19", "24"]
	},
	{"id": "2",
	"label": "nuclear, iranian, weapons, sanctions, programs",
	"nodeIDs": ["3", "7", "8", "11", "14", "18", "23"]
	},
	{"id": "3",
	"label": "obama, diplomat, indirectly, moratorium, neighborhoods",
	"nodeIDs": ["2", "5", "9", "12", "15", "17", "22"]
	},
	{"id": "4",
	"label": "catholic, jews, christians, trip, expected",
	"nodeIDs": ["6", "13"]
	},
	{"id": "5",
	"label": "turkey, flotilla, turkish, nine, boat",
	"nodeIDs": ["19", "20", "21"]
	}
]
}
nodes = data.nodes;
lines = data.lines;

// Global variables
var stage;
var layer;
var colors; //for now, it's random; later we can add logic to select it from a pre-defined palette

init();

function init() {
	initializeColors(data.lines.length);
	stage = new Kinetic.Stage({
		container: 'map-container',
	    width: getWindowWidth(),
	    height: 400
	});

	layer = new Kinetic.Layer();
	setNodeProperties();
	drawLines();
	drawNodes();
	stage.add(layer);
}

function drawNodes() {
	for (var n in nodes) {
		var node = new Kinetic.Circle({
			radius: nodes[n].radius,
			fill: nodes[n].color,
			x: nodes[n].x,
			y: nodes[n].y
		});
		
		var label = new Kinetic.Text({
			x: nodes[n].x - nodes[n].radius*.75,
			y: nodes[n].y - nodes[n].radius*.75,
			text: nodes[n].label,
			fontSize: nodes[n].importance * 5,
			fontFamily: 'Calibri',
			width: nodes[n].radius*1.5,
			height: nodes[n].radius*1.5,
			fill: 'black',
			align: 'center'
		});
		
		// Add event handlers
		hoverCursor(node);
		hoverCursor(label);
		nodeClick(node, nodes[n]);
		nodeClick(label, nodes[n]);
		
		layer.add(node);
		layer.add(label);
	}
}

function drawLines() {
	for (var l in lines) {
		var currentNodeSet = lines[l].nodeIDs;
		for (var n = 0; n < currentNodeSet.length - 1; n++) {
			var startNode = getNodeByID(currentNodeSet[n]);
			var endNode = getNodeByID(currentNodeSet[n+1]);
			
			var segment = new Kinetic.Line({
				points: [startNode.x, startNode.y, endNode.x, endNode.y],
				stroke: colors[lines[l].id],
				strokeWidth: 20
			});
		
			layer.add(segment);
		}
	}
}

function setNodeProperties() {
	for (var n in nodes) {
		var xspacing = getWindowWidth()/(nodes.length);
		var yspacing = 400/lines.length;
		nodes[n].x = xspacing * n + xspacing/2;
		nodes[n].y = yspacing * nodes[n].lineIDs[0];
		nodes[n].radius = nodes[n].importance * 20;
		
		if (nodes[n].lineIDs.length == 1) {	//singleton node
			nodes[n].color = colors[nodes[n].lineIDs[0]];
		}
		else {	//shared node
			nodes[n].color = "#aaaaaa";
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

/*****
Event handlers
*****/

function hoverCursor(object) {
	object.on('mouseenter', function() {
		document.body.style.cursor = 'pointer';
	});
	object.on('mouseleave', function() {
		document.body.style.cursor = 'default';
	});
}

function nodeClick(object, node) {
	object.on('click', function() {
		populateArticles(node.id);
	});
}