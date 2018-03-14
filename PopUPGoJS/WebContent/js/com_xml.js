/*******************************************
 * XML 처리 객체 
********************************************/
var xmlObj = {
	openXml : function(fname) { // open xml file//input: fname=xml파일이름//리턴: root 노드 
		var xmlhttp;
		var xmlDoc;
		var root = null;
		
		if(window.ActiveXObject) {  // IE5, IE6
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} else if(window.XMLHttpRequest) {  // IE 이외의 브라우저 
			xmlhttp = new XMLHttpRequest();
		} else {
			alert('XML을 사용못하는 브라우저');
			return null;
		}
	  
		// xml 파일 open 
		xmlhttp.open("GET", fname, false); 
		xmlhttp.send();
		
		xmlDoc = xmlhttp.responseXML;
		root = xmlDoc.documentElement; 
		
		return root;
	},
	getXMLDoc : function(xmlStr) { // get xml document//input: xmlStr=xml스트링//리턴: xml dom 파서
		var xmlDoc = null;
		if(window.DOMParser) {
			var parser = new DOMParser();
			xmlDoc = parser.parseFromString(xmlStr,"text/xml");	
		} else {
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async=false;
			xmlDoc.loadXML(xmlStr); 
		}
		return xmlDoc;
	},
	getXMLRoot : function(xmlStr) { // get root element//input: xmlStr=xml스트링//리턴: root노드
		var xmlDoc;
		var root = null;

		xmlDoc = this.getXMLDoc(xmlStr);
		root = xmlDoc.documentElement; 
		
		return root;
	},
	getXMLHead : function(encoding) { // xml header 가져오기//input: encoding=euc-kr, uft-8
		return "<?xml version=\"1.0\" encoding=\""+encoding+"\"?>";
	},
	getTag: function(node) { // get element name=tag
		return node.nodeName;
	},
	getAttrs : function(node) { // get attributes of element, [{name: attribute name, text: value}]
		var atts = node.attributes;
		var len = atts.length;
		var arr = [];

		for(var i = (len-1); i >= 0; i--) { // xml file 기록되있는 순서대로 가져오도록 
			var d = { name: atts[i].name, text: atts[i].value };
			arr.push(d);
		}

		return arr;	
	},
	getValAtrPop : function(attrs, name) { // get text(value) of name in attrs array and splice.
		var val = "";
		for(var i = 0; i < attrs.length; i++) {
			if(attrs[i].name == name) {
				val = attrs[i].text;
				attrs.splice(i, 1);
			}
		}
		return val;		
	},
	getValAtr : function(attrs, name) { // get text(value) of name in attrs
		var val = "";
		for(var i = 0; i < attrs.length; i++) {
			if(attrs[i].name == name) {
				val = attrs[i].text;
			}
		}
		return val;
	},
	getValue : function(node) { // get text value of element
		return node.data;
	},
	getChildNodes : function(node) { // get child nodes of element. element and text element(not space)
		var cNodes = [];
		for (var i = 0; i < node.childNodes.length; i++) {
			if(node.childNodes[i].nodeType == 1) {			
				cNodes.push(node.childNodes[i]);
			} else if(node.childNodes[i].nodeType == 3) {
				var temp = node.childNodes[i].data;
				temp = replaceAll_etc(temp);
				if(temp.length > 0) {
					cNodes.push(node.childNodes[i]);
				}
			}
		}	
		return cNodes;
	},
	getChildNodesCount : function(node) { // get count to child nodes of element
		var cnt = 0; 
		for (var i = 0; i < node.childNodes.length; i++) {
			if(node.childNodes[i].nodeType == 1) {
				cnt++
			} else if(node.childNodes[i].nodeType == 3) {
				var temp = node.childNodes[i].data;
				temp = temp.trim();
				if(temp.length > 0)	{
					var regx1 = /[^\n\t\s]/;
					if(!regx1.test(temp)) {
						cnt++;
					}
				}
			}
		}	
		return cnt;
	},
	getNodes_xpath : function(xmlDoc, xPath) { // get xpath nodes
		var ret = [];
		if(xmlDoc.evaluate) {
			var nodes = xmlDoc.evaluate(xPath, xmlDoc, null, XPathResult.ANY_TYPE, null);
			var result = nodes.iterateNext();
			while (result) {
				//console.log('[getNodes_xpath] evaluate node='+result.childNodes.length);
				ret.push(result);
				result = nodes.iterateNext();
			} 
		} else {
			xmlDoc.setProperty("SelectionLanguage", "XPath"); // first node index 1로 만듬 
			var nodes = xmlDoc.selectNodes(xPath);
			for (i = 0; i < nodes.length; i++) {
				//console.log('[getNodes_xpath] selectNodes node='+nodes[i].childNodes.length);
				ret.push(nodes[i]);
			}
		}
		return ret;
	},
	replaceAllSpace : function(str) { // 빈칸 처리 
		str = str.trim();
		str = str.replace(/ +/g, ' ');
		str = str.split('\n').join('');
		str = str.split('\t').join('');
		return str;
	},
	getComment : function(node, flag) {
		if(flag == 1) { // get previousSibling comment
			var prenode = node.previousSibling;
			while(prenode !== null) {
				if(prenode.nodeType == 8) {
					return prenode.data;
				} else if(prenode.nodeType == 3) {
					var temp = prenode.data;
					temp = this.replaceAllSpace(temp);
					if(temp.length > 0)	prenode = null;
				} else {
					prenode = null;
				}
				
				prenode = (prenode !== null) ? prenode.previousSibling : prenode;
			}	
			return '';
		} else if(flag == 2) {	// get nextSibling comment
			var nextnode = node.nextSibling;
			while(nextnode !== null) {
				if(nextnode.nodeType == 8) {
					return nextnode.data;
				} else if(nextnode.nodeType == 3) {
					var temp = nextnode.data;
					temp = this.replaceAllSpace(temp);
					if(temp.length > 0)	nextnode = null;
				} else {
					nextnode = null;
				}
				
				nextnode = (nextnode !== null) ? nextnode.nextSibling : nextnode;
			}	
			return '';
		} else { // get child comment
			for(var i = 0; i < node.childNodes.length; i++) {
				var nextnode = node.childNodes[i];
				if(nextnode.nodeType == 8) {
					return nextnode.data;
				} else if(nextnode.nodeType == 3) {
					var temp = nextnode.data;
					temp = this.replaceAllSpace(temp);
					if(temp.length > 0)	break;
				} else {
					break;
				}
			}

			return '';
		}
	},
	getDocString : function(xmlDoc) { // xml document to string
		var serializer = new XMLSerializer();
		var xmlString = serializer.serializeToString(xmlDoc);	
		return xmlString;
	},
	getXmlString : function(node) { // child nodes of node to string
		var xmlString = '';
		var cLen = node.childNodes.length;
		var cNode = node.childNodes;

		for(var i = 0; i < cLen; i++) {
			if(cNode[i].nodeType == 1) { // tag 노드일때
				xmlString += '<' + cNode[i].nodeName;
				var attrs = this.getAttrs(cNode[i]);
				for(var j in attrs) {
					if(attrs[j].text !== undefined) { 
					// admin에서 테스트시 undefined의 attribute 값을 가져옴..;;
						xmlString += ' ' + attrs[j].name + '=\"' + attrs[j].text + '\"';
					}
				}

				var tmpString = this.getXmlString(cNode[i]);
				if(tmpString == '') {
					xmlString += '/>';
				} else {
					xmlString += '>' + tmpString + '</' + cNode[i].nodeName + '>';	
				}	
			} else if(cNode[i].nodeType == 3) { // text 노드일때
				var val = this.getValue(cNode[i]);
				
				var regx1 = /[^\n\t\s]/;
				var regx2 = />$/;
				var regx3 = /\/>$/;
				if(!regx1.test(val)) {
					// val이 공백문자일때
					// 앞 string이 일반 태그(/>으로 안끝나는), xmlString이 빈공간이 아닐때는 val을 ""
					// 이외에 val 공백 하나로 치환
					if((regx2.test(xmlString) && !regx3.test(xmlString)) || xmlString == '')	val = '';
					else	val = ' ';
				}	
				
				xmlString += val;
			}
		}

		return xmlString;
	},	
	createElement : function(xmlDoc, node, tag) { // create element node
		if(tag == "") tag = "undefined";	
		var child = xmlDoc.createElement(tag);
		node.appendChild(child);
		return child;
	},
	createElement_Attr : function(xmlDoc, node, tag, attrs) { // create element node with attributes(=array [{name: "a", text: "b"}])
		if(tag == "") tag = "undefined";
		var child = xmlDoc.createElement(tag); // set element create

		var len = attrs.length;
		if(len >= 1) {
			for(var i = (len-1); i >= 0; i--) {
				if(attrs[i].text != "") {
					this.createAttr(xmlDoc, child, attrs[i].name, attrs[i].text);
				}
			}
		}
		node.appendChild(child); // set element append 
		return child;
	},
	createAttr : function(xmlDoc, node, attr, val) { // create attribute
		var attNode = xmlDoc.createAttribute(attr);
		attNode.nodeValue = val;
		node.setAttributeNode(attNode);
	},
	createText : function(xmlDoc, node, val) { // create text node
		var str = "";
		if(val instanceof Object) {
			for(var i=0; i < val.length; i++) {
				str += val[i];
				str += (i != val.length-1) ? " " : "";
			}
		} else {
			str = val;
		}
		
		var tNode = xmlDoc.createTextNode(str);
		node.appendChild(tNode);	
	},
	createComment : function(xmlDoc, node, val) { // create comment node
		if(val == "")	return;	
		var tNode = xmlDoc.createComment(val);
		node.appendChild(tNode);	
	},
	appendChilds_Str : function(xmlDoc, pnode, xmlStr) { // append child nodes from xml string
		xmlStr = "<START>" + xmlStr + "</START>"; // 임시 <START> 태그 붙여서 수행
		var root = this.getXMLRoot(xmlStr);
		this.appendDom_Traverse(xmlDoc, pnode, root);
	},
	appendDom_Traverse : function(xmlDoc, pnode, node) { // pnode에 node append 
		var tag = this.getTag(node);
		var attrs = this.getAttrs(node);	
		var xmlNode = pnode;
		
		if((tag === undefined) || (tag == ""))	return ;
		
		if(tag != "START") {
			xmlNode = this.createElement_Attr(xmlDoc, pnode, tag, attrs);
		}
		
		for(var i = 0; i < node.childNodes.length; i++) {
			if(node.childNodes[i].nodeType == 1) { // tag
				this.appendDom_Traverse(xmlDoc, xmlNode, node.childNodes[i]);
			} else if(node.childNodes[i].nodeType == 3) { // text
				var val = this.getValue(node.childNodes[i]);
				if(val.trim() != '')	this.createText(xmlDoc, xmlNode, val);
			}
		}	
	}
};