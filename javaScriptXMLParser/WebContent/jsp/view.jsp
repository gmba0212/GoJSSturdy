<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script src="../js/javaScriptXMLParser.js" charset="EUC-KR"></script>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<script>
		var examXML='<?xml version="1.0" encoding="EUC-KR"?><girlgroup>  <name>����ģ��</name>  <members>    <member>�ҿ�</member>    <member>����</member>    <member>����</member>    <member>����</member>    <member>�ź�</member>    <member>����</member>  </members>  <albums>    <album order="EP 1��">Season of Glass</album>    <album order="EP 2��">Flower Bud</album>    <album order="EP 3��">Snowflake</album>    <album order="���� 1��">LOL</album>  </albums></girlgroup>';
	</script>
	
	sayhello<br>
	<hr>
	<br>
	<br><hr>
	TagName���� ã��<input type="text" name="data" id="data" value="">
	<input type="button" name ="search" value="searchStr" onclick='xml.xmlSearchElement(examXML,document.getElementById("data").value)'><br>
	Traverse<input type="button" name="traverse" value="traverse" onclick='xml.xmlTraVerse(examXML)'><br>
	CreateNode(����߰�) �̸��Է�<input type ="text" id="name" value="">
	<input type="button" name="CreateNode" value="CreateNode" onclick='xml.createElement(examXML,document.getElementById("name").value)'> <br>
	DeleteNode(�������) �̸��Է�<input type ="text" id="deleteMember" value="">
	<input type="button" name="deleteMember" value="deleteMember" onclick='xml.deleteMember(examXML,document.getElementById("deleteMember").value)'> <br>
</body>
</html>