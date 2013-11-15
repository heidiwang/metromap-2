function setLayout() {
	var xspacing = getPanelWidth()/(nodes.length);
	var yspacing = getPanelHeight()/(lines.length);
	
	for (var n in nodes) {
		nodes[n].x = xspacing * n + xspacing/2;
		nodes[n].y = yspacing * (nodes[n].lineIDs[0]-1) + yspacing/2 + Math.random(); // add a small random variation to prevent perfectly horizontal lines
	}
}