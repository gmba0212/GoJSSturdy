var $$ = null;
var command = null;
var jsonData = null;

function init() {
	$$ = go.GraphObject.make; 
	myDiagram = $$(go.Diagram, "myDiagramDiv",
	{
		initialContentAlignment : go.Spot.Center, 
		"undoManager.isEnabled" : true
	});
	
	myDiagram.nodeTemplate = $$(go.Node, "Auto",
	$$(go.Shape, "RoundedRectangle", {
		strokeWidth : 1
	},
	new go.Binding("fill", "color")), $$(go.TextBlock, {
		margin : 8
	}, 
	new go.Binding("text", "key")));
	function showMessage(s) {
		document.getElementById("diagramEventsMsg").textContent = s;
	}
	myDiagram.addDiagramListener("objectSingleClicked", function(e) {
		command = null;
		jsonData = null;
		var part = e.subject.part;
		var newObj = new Object();
		newObj.key = part.data.key;
		newObj.color = part.data.color;

		jsonData = JSON.stringify(newObj);
		command = document.frm.command.value;
		alert(command);
		
		if (command == "firstPage") {
			alert('test1');
			sendData(command, jsonData);
			myWindow = window.open('../jsp/secondPage.jsp');

		}
		if (command != "firstPage") {
			window.close();
		}

	});
	var newObj= new Object();
	newObj.key="alpha";
	newObj.color="lightblue";
	jsonData = JSON.stringify(newObj);
	var tmp="[ {key : 'Alpha', color : 'lightblue'} ], []";
	myDiagram.model = new go.GraphLinksModel([{ key : "Alpha", color : "lightblue" }], []);
	/*
	 * if (document.frm.command.value == "firstPage") {
	 * 
	 * myDiagram.model = new go.GraphLinksModel([ { key : "Alpha", color :
	 * "lightblue" }, { key : "", color : "white" }, ], []); } else {
	 * myDiagram.model = new go.GraphLinksModel();
	 *  }
	 */

}

function sendData(command, jsonData) {
	$.ajax({
		type : "POST",
		dataType : "json",
		url : "../pop.do",
		data : {
			obj : jsonData,
			command : command
		},
		success : function() {
			alert('success');
		},
		error : function(request, status, error) {
			alert("code");
			alert("code:" + request.status);
			alert("message");
			alert("message:"+ request.responseText);
			alert("error");
			alert("error:" + error);
		}

	});
}

