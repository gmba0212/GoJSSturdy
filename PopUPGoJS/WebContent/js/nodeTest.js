var $$=null;

function init() {
	if (window.goSamples)
		goSamples(); // init for these samples -- you don't need to call this
	$$ = go.GraphObject.make; // for conciseness in defining templates
	myDiagram = $$(go.Diagram, "myDiagramDiv", // create a Diagram for the DIV
												// HTML element
	{
		initialContentAlignment : go.Spot.Center, // center the content
		"undoManager.isEnabled" : true
	// enable undo & redo
	});
	// define a simple Node template
	myDiagram.nodeTemplate = $$(go.Node, "Auto", // the Shape will go around
													// the TextBlock
	$$(go.Shape, "RoundedRectangle", {
		strokeWidth : 1
	},
	// Shape.fill is bound to Node.data.color
	new go.Binding("fill", "color")), $$(go.TextBlock, {
		margin : 8
	}, // some room around the text
	// TextBlock.text is bound to Node.data.key
	new go.Binding("text", "key")));
	function showMessage(s) {
		document.getElementById("diagramEventsMsg").textContent = s;
	}
	myDiagram.addDiagramListener("objectSingleClicked",
			function(e) {
		alert("node Click");
				var part = e.subject.part;
				var j = "";
				j = '{"key":"' + part.data.key + '","color":"'
						+ part.data.color + '"}';
				var newObj = new Object();
				newObj.key = part.data.key;
				newObj.color = part.data.color;
				
				var jsonData = JSON.stringify(newObj);
				$.ajax({
					type : "POST",
					dataType : "json",
					url : "../pop.do",
					data : {
						obj : jsonData,
						command :  document.frm.command.value
					}

				});

			});

	// but use the default Link template, by not setting Diagram.linkTemplate
	// create the model data that will be represented by Nodes and Links
	myDiagram.model = new go.GraphLinksModel([ {
		key : "Alpha",
		color : "lightblue"
	}, {
		key : "",
		color : "white"
	}, ], []);
}

function popUPdata(){
	
}