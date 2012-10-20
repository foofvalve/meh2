var collapsableOpenCss = "collapsable";
var collapsableClosedCss = "hidden";
var collapsableOpenImg = "/files/images/collapsableOpen.gif";
var collapsableClosedImg = "/files/images/collapsableClosed.gif";

function toggleCollapsable(id)
{
  var div = document.getElementById(id);
  var img = document.getElementById("img" + id);
  if (div.className.indexOf(collapsableClosedCss) != -1)
  {
    div.className = collapsableOpenCss;
    img.src = collapsableOpenImg;
  }
  else
  {
    div.className = collapsableClosedCss;
    img.src = collapsableClosedImg;
  }
}

function popup(window_id) {
  var window = document.getElementById(window_id);
  window.style.visibility = "visible";
}

function popdown(window_id) {
  var window = document.getElementById(window_id);
  window.style.visibility = "hidden";
}

function expandOrCollapseAll(cssClass)
{
  divs = document.getElementsByTagName("div");
  for (i = 0; i < divs.length; i++)
  {
    div = divs[i];
    if (div.className == cssClass)
    {
      toggleCollapsable(div.id);
    }
  }
}

function collapseAll()
{
  expandOrCollapseAll(collapsableOpenCss);
}

function expandAll()
{
  expandOrCollapseAll(collapsableClosedCss);
}

function symbolicLinkRename(linkName, resource)
{
  var newName = document.symbolics[linkName].value.replace(/ +/g, '');

  if (newName.length > 0)
    window.location = resource + '?responder=symlink&rename=' + linkName + '&newname=' + newName;
  else
    alert('Enter a new name first.');
}

// Allow ctrl-s to save the changes.
// Currently this alone appears to work on OS X. For windows (and linux??) use alt-s, which doesn't work on OS X!
formToSubmit = null;
function enableSaveOnControlS(control, formToSubmit)
{
  formToSubmit = formToSubmit;
  if (document.addEventListener)
  {
    document.addEventListener("keypress", keypress, false);
  }
  else if (document.attachEvent)
  {
    document.attachEvent("onkeypress", keypress);
  }
  else
  {
    document.onkeypress = keypress;
  }

}
function keypress(e)
{
  if (!e) e = event;
  if (e.keyIdentifier == "U+0053" || e.keyIdentifier == "U+0060")
  {
    suppressdefault(e, formToSubmit.keypress.checked);
    if (formToSubmit != null)
    {
      formToSubmit.submit
    }
  }
}

function doSilentRequest(url)
{
  var xmlHttp;
  try
  {
    // Firefox, Opera 8.0+, Safari
    xmlHttp=new XMLHttpRequest();
  }
  catch (e)
  {
    // Internet Explorer
    try
    {
      xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e)
    {
      try
      {
        xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch (e)
      {
        alert("Your browser does not support AJAX!");
        return false;
      }
    }
  }
  xmlHttp.onreadystatechange=function() {}
  xmlHttp.open("GET",url,true);
  xmlHttp.send(null);
  return false;
}

function doHover(linkId) {
	//strURL = "http://localhost:8080/FrontPage.MeH.IsBook?edit";
	//strURL = "http://localhost:8080/IsBook.CostsPanelRegression.CostPanelRegressionNzIntlMultiStop?edit";
	strURL = document.getElementById(linkId).href;
	console.log("offset from top "+ document.getElementById(linkId).offsetTop);
    var xmlHttpReq = false;
    var self = this;
   
    if (window.XMLHttpRequest) {  // Mozilla/Safari
        self.xmlHttpReq = new XMLHttpRequest();
    }

    self.xmlHttpReq.open('POST', strURL, true);
    self.xmlHttpReq.onreadystatechange = function() {
        if (self.xmlHttpReq.readyState == 4) {					
			var domResponse = toDOM(self.xmlHttpReq.responseText);
			mainDiv = getWebElementByTagAndClassNameUsingCustomDOM(domResponse,"div","main");
			console.log(mainDiv.innerHTML);
            showPopOut(mainDiv.innerHTML);			
        }
    }   
	self.xmlHttpReq.send();
}

function toDOM(str){
	try //Internet Explorer
	{
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async="false";
		xmlDoc.loadXML(str);
	} catch(e){
		try { // Firefox, Mozilla, Opera, etc.
			parser=new DOMParser();
			//return parser.parseFromString(str,"text/xml");
			return parser.parseFromString(str,"text/html");
			
		} catch(e) {
			alert(e.message);
			return;
		}
	}
}

function showPopOut(innerHTMLguts){

	unHover();
	var popout = 'div';

	var fitnesseInfo = document.createElement(popout);

//	fitnesseInfo.setAttribute("overflow","auto");
	fitnesseInfo.setAttribute("id","fitnesseInfo");
	fitnesseInfo.setAttribute("position","absolute");
    fitnesseInfo.setAttribute("class","popup_window");
	fitnesseInfo.setAttribute("onclick","unHover()");

	fitnesseInfo.setAttribute("z-index","11");
	//fitnesseInfo.innerHTML = "<br><h3><i>The fully integrated stand-alone acceptance testing framework and wiki.</i></h3><br><br><a href='FrontPage.MeH'>&gt;MeH</a><br><br>To add your first 'page', click the <a href='FrontPage?edit'>Edit</a> button and add a <a href='FitNesse.UserGuide.WikiWord'>WikiWord</a> ";
	mainDiv = getWebElementByTagAndClassName("div","main");
	mainDiv.appendChild(fitnesseInfo);
	document.getElementById("fitnesseInfo").style.backgroundColor="gray"
	document.getElementById("fitnesseInfo").style.top="50px"
	document.getElementById("fitnesseInfo").style.right="10px"
	document.getElementById("fitnesseInfo").style.visibility = 	"visible"		
	document.getElementById("fitnesseInfo").style.width="500px"	
	document.getElementById("fitnesseInfo").style.height="650px"	
	document.getElementById("fitnesseInfo").innerHTML = innerHTMLguts;
}

function unHover(){
	if(document.getElementById("fitnesseInfo")!=undefined&&document.getElementById("fitnesseInfo")!=null){
		console.log("unHovering");
		document.getElementById("fitnesseInfo").style.visibility = 	"hidden";
	}
}

function getWebElementByTagAndClassName(tagName,className){
    theDivs = document.getElementsByTagName(tagName);
    console.log(theDivs.length);
    
    for(i=0;i<theDivs.length;i++){
        if(theDivs[i].className==className){
            return theDivs[i];
            //console.log(theDivs[i].innerHTML);
        }
    }
}

//Thisworks...........................
function getWebElementByTagAndClassNameUsingCustomDOM(theDOM,tagName,className){
    theDivs = theDOM.getElementsByTagName(tagName);
    console.log(theDivs.length);
    
    for(i=0;i<theDivs.length;i++){
        if(theDivs[i].className==className){
            return theDivs[i];
            //console.log(theDivs[i].innerHTML);
        }
    }
}

