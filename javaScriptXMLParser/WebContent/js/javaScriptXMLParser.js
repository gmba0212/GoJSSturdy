/**
 * 
 */

var xmlDoc = null;
var xml={
		sayHello:function(){
			alert("helloWorld");
		},
		getXMLDoc_xmlStr:function(xmlstr){
			if(window.DOMParser){
				var parser = new DOMParser();
				xmlDoc = parser.parseFromString(xmlstr,"text/xml");
			}else{
				xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
				xmlDoc.async=false;
				xmlDoc.loadXML(xmlstr)
			}
			
			return xmlDoc;
		},
		getXMLroot:function(xmlstr){
			var root=null;
			var xmldoc = this.getXMLDoc_xmlStr(xmlstr);
			
			root = xmldoc.documentElement;
			return root;
			
		},
		xmlTraVerse: function(xmlStr){
			parser = new DOMParser();
			xmlDoc = this.getXMLDoc_xmlStr(xmlStr);
			
			x = xmlDoc.documentElement.childNodes;
			for(i=0 ; i<x.length;i++){
				if(x[i].nodeName!=="#text"){
					console.log(x[i].nodeName+" : "+x[i].innerHTML);
				}
			}
		},
		xmlSearchElement:function(xmlStr,str){
			xmlDoc = this.getXMLDoc_xmlStr(xmlStr);
			console.log(str);
			var res=xmlDoc.getElementsByTagName(str);
			console.log(res);
		},	
		createElement : function(xmlStr,text) {
			xmlDoc = this.getXMLDoc_xmlStr(xmlStr);
			console.log("before");
			console.log((new XMLSerializer()).serializeToString(xmlDoc));
			
			var child = xmlDoc.createElement('member');
			var textNode = xmlDoc.createTextNode(text);
			child.appendChild(textNode);
			xmlDoc.getElementsByTagName("members")[0].appendChild(child);
			
			console.log("after");
			console.log((new XMLSerializer()).serializeToString(xmlDoc));
			return child;
		},
		deleteMember :function(xmlStr,name){
			var delNode=null;
			xmlDoc = this.getXMLDoc_xmlStr(xmlStr);
			console.log("before");
			console.log((new XMLSerializer()).serializeToString(xmlDoc));

			
			var members=xmlDoc.getElementsByTagName("member");
			console.log(members);
			for( i = 0;i<members.length;i++){
				if(members[i].textContent===name){
					delNode = members[i];
					
				}
			}
			if(delNode === null){
				console.log("noneMember.");
			}else{
				
				delNode.parentNode.removeChild(delNode);
				console.log("member :"+name+" delete")
			}
			console.log((new XMLSerializer()).serializeToString(xmlDoc));
			
		}
}