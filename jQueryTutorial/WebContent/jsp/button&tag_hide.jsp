<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
	$(document).ready(function(){
		//if tag p click ==> tag p hide
		$("p").click(function(){
			$(this).hide();
		}),//if button click ==> id="test" hide
		$("button").click(function(){
			$("#test").hide();
		});
	});
	
</script>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
	
	<p>If you click on me, I will disappear.</p>
	<q id="test">If you click on me, I will not disappear</q>
	<button>click me</button>
</body>
</html>