// ==UserScript==
// @name        attachOnmouseoverout
// @namespace   meh
// @include     http://localhost:8080/*
// @version     1
// ==/UserScript==
allLinks = document.getElementsByTagName('a');

for(i=0;i<allLinks.length;i++){

    if (allLinks[i].href.indexOf(".IsBook.") != -1){
        console.log(allLinks[i].href);
		allLinks[i].setAttribute("id","link00"+i);
		allLinks[i].setAttribute("onmouseover","doHover('link00"+i+"')");
		//allLinks[i].setAttribute("onmouseout","unHover()");
    }
}

