var $$ = null;
var command=null;
var jsonData=null;

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
	myDiagram.addDiagramListener("objectSingleClicked", function(e) {
		command=null;
		jsonData=null;
		var part = e.subject.part;
		var newObj = new Object();
		newObj.key = part.data.key;
		newObj.color = part.data.color;
		
		jsonData = JSON.stringify(newObj);
		command = document.frm.command.value;
		
		
		
		if (command == "firstPage") {
			sendData(command , jsonData);
			myWindow = window.open('../jsp/secondPage.jsp');
			
		} else if (command == "secondPage") {
			
			myWindow = window.open('../jsp/thirdPage.jsp');
			sendData(command , jsonData);
			
		} else if (command == "thirdPage") {
			
			
		}
if(command!="firstPage"){
		window.close();	
		}

	});
	myDiagram.model = new go.GraphLinksModel([ {
		key : "Alpha",
		color : "lightblue"
	}], []);
	/*if (document.frm.command.value == "firstPage") {

		myDiagram.model = new go.GraphLinksModel([ {
			key : "Alpha",
			color : "lightblue"
		}, {
			key : "",
			color : "white"
		}, ], []);
	} else {
		myDiagram.model = new go.GraphLinksModel();

	}*/

}

function sendData(command , jsonData) {
	$.ajax({
		type : "POST",
		dataType : "json",
		url : "../pop.do",
		data : {
			obj : jsonData,
			command : command
		}

	});
}

function popUPdata() {

}