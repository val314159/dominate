document.write("<pre id=t contenteditable=true>\n\n</pre>");
var t = document.getElementById("t");
console.log("HELLO", t);
t.focus();

function dump(){
    console.log(t);
    var sel = window.getSelection();
    var range = sel.getRangeAt(0); 
    console.log("RNG =", range);
}
function simpleBackspace(range,spot){
    range.setStart(range.startContainer,spot-1);
    range.setEnd(range.startContainer,spot);
    range.deleteContents()
}
function xsimpleBackspace(range,cont,spot){
    range.setStart(cont,spot-1);
    range.setEnd(cont,spot);
    range.deleteContents()
}
function backspace(){
    console.log(t);
    var sel = window.getSelection();
    var range = sel.getRangeAt(0); 
    console.log("RNG =", range);
    var container = range.endContainer;
    var offset = range.endOffset;
    
    if(container.nodeType!==3){
	console.log("ok, the end thing is NOT a text node");
	console.log("I don't know what to do...");
	return;
    }
    console.log("ok, the end thing is a text node");
    var newStartOffset = range.startOffset-1;
    if (newStartOffset >= 0){
	// normal in-text-node operation
	console.log("QQQQ", range.startOffset, range.endOffset);
	xsimpleBackspace(range,range.startContainer,range.startOffset);
	return;
    }

    console.log("we're at the start, dont do anything");
    console.log("BUT ARE WE REALLY?? Actually, we need to see whats before us (in the world)");
    var sib = container.previousSibling;
    console.log(sib);
    if(sib.nodeType==3){
	console.log("Ok, sib is a text node!  cool!", sib.nodeValue.length);
	if(!sib.nodeValue.length){
	    console.log("No length!  DEAD NODE ALERT!!!!!!!");
	    return;
	}
	xsimpleBackspace(range,sib,sib.nodeValue.length);
	return;
    }
    
    console.log("Ok, sib is NOT a text node!  NOT cool!");
}
function insertText(txt){
    console.log(t);
    var sel = window.getSelection();
    var range = sel.getRangeAt(0); 
    console.log("RNG =", range);
    var container = range.endContainer;
    var offset = range.endOffset;
    if(container.nodeType==3){
	console.log("ok, the whole thing is a text node");
	var tn = document.createTextNode( txt );
	range.insertNode( tn );
	range.setStartAfter( tn );
    }else{
	console.log("ok, the whole thing is NOT a text node");
	console.log("I don't know what to do...");
    }
}
