var $$ = null;
var command = null;
var jsonData = null;
var myWindow = null;
function init() {
	if(document.getElementById("command").value ==="secondPage"){
		opener.parent.mainsendToChild();
	}
	
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
		command = null;
		jsonData = null;
		var part = e.subject.part;
		var newObj = new Object();
		newObj.key = part.data.key;
		newObj.color = part.data.color;

		jsonData = JSON.stringify(newObj);
		command = document.getElementById("command").value;
		var sendJson = '{"class": "go.TreeModel", "nodeDataArray":['+jsonData+']}';
		if (command === "firstPage") {
			document.getElementById("jsonString").value = sendJson;
			myWindow = window.open('../jsp/secondPage.jsp');

		}
		if(command ==='secondPage'){
			alert(command);
			var desLocation="../pop.do";
			//window.location="../jsp/thirdPage.jsp";
			//sendData(command,sendJson);
			sendForm(desLocation,sendJson,command);
		}
		if(command ==='thirdPage'){
			alert(command);
			var desLocation="../pop.do";
			sendForm(desLocation,sendJson,command);
			
			//opener.parent.location.reload();
			//window.close();
		}
		/*if (command != "firstPage") {
			window.close();
		}
*/
	});

	if (document.getElementById("command").value === "firstPage") {

		myDiagram.model = new go.GraphLinksModel([ {
			key : "Alpha",
			color : "lightblue"
		}
		], []);
	} else if(document.getElementById("command").value==="secondPage") {
		load();
	} else {
		//getData();
		load();
	}

}
function getData(){
	var reqData = null;
	
	reqData='<%= (String) request.getParameter("obj")%>';
	document.getElementById("jsonString").value=reqData;
}
function load(){
	myDiagram.model = go.Model.fromJson(document.getElementById("jsonString").value);
}

function mainsendToChild() {
	var sv = document.getElementById('jsonString').value;
	myWindow.document.getElementById('jsonString').value = sv;
}

function sendForm(path,data,command){
	var form = document.createElement("form");
	form.setAttribute("method","POST");
	form.setAttribute("action",path);
	var hiddenField1 = document.createElement("input");
	hiddenField1.setAttribute("name","obj");
	hiddenField1.setAttribute("value",data);
	
	var hiddenField2 = document.createElement("input");
	hiddenField2.setAttribute("name","command");
	hiddenField2.setAttribute("value",command);
	form.appendChild(hiddenField1);
	form.appendChild(hiddenField2);
	document.body.appendChild(form);
	form.submit();
	
}
function sendData(command, jsonData) {
	$.ajax({
		type : "POST",
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
			alert("message:" + request.responseText);
			alert("error");
			alert("error:" + error);
		}

	});
}

function popUPdata() {

}