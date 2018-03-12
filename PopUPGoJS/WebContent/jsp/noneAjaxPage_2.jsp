<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<script type="text/javascript">
	function init(){
		alert("init");
		opener.parent.sendToChild();
	}
</script>
<head>
</head>
<body onload="g">
 
<input type="text" name="sendmen" id="sendmen" />
 
</body>
</html>

