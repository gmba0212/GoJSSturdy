<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
	$(document).ready(function(){
		$("p").on({
			mouseenter: function(){
				$(this).css("background-color","lightgray");
			},
			mouseleave: function(){
				$(this).css("background-color","lightblue");
			},
			click: function(){
				$(this).css("background-color","yellow");
			}
		
		}),//if hide button click ==> tag="p" hide
		$("#hide").click(function(){
			$("p").hide();
		}),//if show button click ==> tag="p" show
		$("#show").click(function(){
			$("p").show();
		}),//if slowHide button click ==> tag="p" slowHide
		$("#slowHide").click(function(){
			$("p").hide(1000);
		}),//if slowshow button click ==> tag="p" slowshow
		$("#slowshow").click(function(){
			$("p").show(1000);
		}),//if togle button click ==> tag="p" toggle
		$("#toggle").click(function(){
			$("p").toggle();
		}),
		$("#fadeInBox").click(function(){
			$("#div1").fadeIn();
			$("#div2").fadeIn("slow");
			$("#div3").fadeIn(2000);
		}),
		$("#fadeOutBox").click(function(){
			$("#div1").fadeOut();
			$("#div2").fadeOut("slow");
			$("#div3").fadeOut(3000);
		}),
		$("#fadeToggleBox").click(function(){
			$("#div1").fadeToggle();
			$("#div2").fadeToggle("slow");
			$("#div3").fadeToggle(3000);
		});
	});
</script>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<p>mememememememe</p><br>
	<button id="slowHide">slowHide</button>
	<button id="slowshow">slowShow</button>
	<button id="show">show</button>
	<button id="hide">hide</button>
	<button id="toggle">toggle</button>
	<button id="fadeInBox">fadeInBox</button>
	<button id="fadeOutBox">fadeOutBox</button>
	<button id="fadeToggleBox">fadeToggleBox</button>
	<div id="div1" style="width:80px;height:80px;background-color:red;"></div>
	<div id="div2" style="width:80px;height:80px;background-color:blue;"></div>
	<div id="div3" style="width:80px;height:80px;background-color:green;"></div>
	
</body>
</html>