<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script src="../js/go.js"></script>
<script src="../js/nodeTest.js"></script>
<script type="text/javascript">
function test(){
	var reqData = null;
	
	reqData='<%=(String) request.getParameter("obj")%>';
		document.getElementById("jsonString").value = reqData;
	}
</script>
<script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>thirdpage</title>
</head>
<body>
<script>
		test();
	</script>
	<input type="text" id="jsonString" name="jsonString" value="">
	<h1>thirdPage</h1>
	<input type="hidden" name="command" id="command" value="thirdPage">
	<div id="sample">
		<div id="myDiagramDiv"
			style="border: solid 1px black; width: 200px; height: 200px"></div>
		<span id="diagramEventsMsg" style="color: red"></span>
	</div>
	
	<input type="button" name="button" value="button" onclick="init()">
</body>
</html>