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
		commentAlert:function(xmlStr){
			xmlDoc = this.getXMLDoc_xmlStr(xmlStr);
			var node = xmlDoc.getElementsByTagName("node");
			this.searchPreComment(node[0]);
			this.searchPostComment(node[0]);
			this.searchChildComment(node[0]);
		},
		searchPreComment:function(node){
			var comment;
			var preNode = node.previousSibling;
			
			while(preNode !==null){
				if(preNode.nodeType===8){
					alert(preNode.data);
				}else if(preNode.nodeType===3){
					preNode=null;
				}

				preNode = (preNode !== null) ? preNode.previousSibling : preNode;
			}
			
			
			
		},
		searchPostComment:function(node){
			var comment;
			var nextnode = node.nextSibling;
			
			while(nextnode !==null){
				if(nextnode.nodeType===8){
					alert(nextnode.data);
				}else if(nextnode.nodeType===3){
					nextnode=null;
				}
				nextnode = (nextnode !== null) ? nextnode.nextSibling : nextnode;
			}
			
			
			
		},
		searchChildComment:function(node){
			var childs=node.childNodes;
			
			for(i = 0;i< childs.length ;i++){
				if(childs[i].nodeType===8){
					alert(childs[i].data);
				}
			}
			
			
		},
		createElement : function(xmlStr,text) {
			xmlDoc = this.getXMLDoc_xmlStr(xmlStr);
			console.log("before");
			console.log((new XMLSerializer()).serializeToString(xmlDoc));
			
			var child = xmlDoc.createElement('member');
			var textNode = xmlDoc.createTextNode(text);
			var val = "commentTexT";
			var tNode = xmlDoc.createComment(val)
			
			child.appendChild(textNode);
			child.appendChild(tNode);	
			
			console.log(child);
			
			
			xmlDoc.getElementsByTagName("members")[0].appendChild(child);
			
			
			
			
			;
			
			
			
			
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