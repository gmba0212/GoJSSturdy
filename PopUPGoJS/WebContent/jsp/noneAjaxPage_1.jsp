<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script>

var myWindow = null; 

function tong(){
	openWin();
	sendToChild();
}

function openWin() 
{ 
myWindow=window.open('noneAjaxPage_2.jsp','','width=500,height=500'); 

} 
 
function sendToChild() 
{ 
var sv = document.getElementById('parents').value;
myWindow.document.getElementById('sendmen').value = sv;
} 
 
</script>
</head>
<body>
 
<input type="text" name="parents" id="parents" />
<button type="button" onclick="openWin()">popup</button>
<button type="button" onclick="sendToChild()">자식창으로 전송</button>
<button type="button" onclick="tong()">popup자식창으로 전송</button>
 
</body>
</html>

