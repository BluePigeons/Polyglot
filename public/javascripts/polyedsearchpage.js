
var websiteAddress = "http://localhost:8080";

var rejectionOptions = new Set(["false",'""' , null , false , 'undefined']);

var vectorURL = websiteAddress.concat("/api/vectors/");
var transcriptionURL = websiteAddress.concat("/api/transcriptions/");
var translationURL = websiteAddress.concat("/api/translations/");

//var collectionDocArray = []; //////////////LUNA API???????? Array of info.json URIs

var polyEdPrevDocs = [];
var polyEdCurrentDocs = [];
var polyEdNextDocs = [];

///////BASIC FUNCTIONS

var isUseless = function(something) {
  if (rejectionOptions.has(something) || rejectionOptions.has(typeof something)) {  return true;  }
  else {  return false;  };
};

var getTargetJSON = function(target) {

  if ( isUseless(target) ) { return null;  }
  else {
    var targetJSON;

    $.ajax({
    type: "GET",
    dataType: "json",
    url: target,
    async: false,
    success: 
      function (data) {
        targetJSON = data;
      }
    });
    return targetJSON;
  };
};

var lookupTargetChildren = function(target, baseURL) {
  var childTexts;
  var targetParam = encodeURIComponent(target);
  var aSearch = baseURL.concat("targets/"+targetParam);
  $.ajax({
    type: "GET",
    dataType: "json",
    url: aSearch,
    async: false,
    success: 
      function (data) {
        childTexts = data.list;
      }
  });
  return childTexts;
};

////////CHECKS

var languageCheck = function(theAnno, languagesArray) {
	var canUse;
	var annoDocLanguages = getTargetJSON(theAnno).body.language;
	languagesArray.forEach(function(language){
		if (annoDocLanguages.includes(language)) {	canUse = true;	 };
	});
	return canUse;
};

var bySearchTerms = function(doc, keywords) {
	var bodyText = doc.body.text;
	if (!isUseless(bodyText) && ( eachKeyword(bodyText, keywords) ) ) { return true }
	else {	return false	};
};

//set placeholder of filters to limit date searches to max larger than min
var dateCheck = function(doc, metaFilters) {
	var startYear = metaFilters.startYear;
	var endYear = metaFilters.endYear;
	var theDate = doc.metadata.date; /////metadata official name????
	if ( (isUseless(startYear) && isUseless(startYear)) 
		|| (isUseless(startYear) && !isUseless(theDate) && (theDate <= endYear) ) 
		|| (isUseless(endYear) && !isUseless(theDate) && (theDate >= startYear) ) 
		|| (!isUseless(theDate) && (theDate >= startYear) && (theDate <= endYear))) 
		{	return true;	}
	else {	return false;	};
};

////////FILTERS

var annoLanguageFilters = function(theDocs, annoFilters) {
	if (isUseless(annoFilters.languages)) {
		return true;
	} 
	else if ( !isUseless(annoFilters.languages) ) {
		var containsLang = false;
		theDocs.forEach(function(doc){
			if (languageCheck(doc, annoFilters.languages)) {
				containsLang = true;
			};
		});
		return containsLang;
	}
	else 
		{ return false; };
};

var annoSearchFilters = function(theDocs, filters) {
	var searchTerms = filters.searchTerms;
	if (isUseless(searchTerms))  
		{ return true; }
	else if ( !isUseless(searchTerms) ) {
		var isContains = false;
		theDocs.forEach(function(doc){
			if ( bySearchTerms(theAnnoDoc, searchTerms) ) {
				isContains = true;
			};
		});
		return isContains;
	}
	else 
		{ return false; };
};

var theURL = function(annoType) {
	if (annoType == "transcription") {
		return transcriptionURL;
	}
	else if (annoType == "translation") {
		return translationURL;
	};
};

var annoFilters = function(doc, filters, annoType) {
	var theAnnoFilters = filters[annoType];
	if (isUseless(theAnnoFilters)) {
		return true;
	}
	else {
		var theAnnoDocs = lookupTargetChildren(doc, theURL(annoType) );
		return ( (!isUseless(theAnnoDocs)) && (annoLanguageFilters(theAnnoDocs, theAnnoFilters)) && (annoSearchFilters(theAnnoDocs, filters)) );
	};
};

var metaFilters = function(doc, filters) {
	if (isUseless(filters.metadata)) {
		return true;
	}
	else {
		return ( dateCheck(doc, filters.metadata) ); ////add other metadata filters?
	}
};

var startFilters = function(doc, filters) {
	if ( isUseless(filters) || (!isUseless(filters) && metaFilters(doc, filters) && annoFilters(doc, filters, "transcription") && annoFilters(doc, filters, "translation")  ) ) {
		return true;
	}
	else {
		return false;
	};
};

////////QUEUE BUILDING

var nextPossible = function() {
	var theIndexNo = Math.floor( Math.random() * collectionDocArray.length );
	return collectionDocArray[theIndexNo]; 
};

var filterImages = function (filters) {
	var theNext = nextPossible();
	var theDoc = getTargetJSON(theNext);
	if ( (isUseless(filters)) || ( !isUseless(theDoc) && startFilters(theDoc, filters) )) {
		return theNext;
	}
	else {
		return false; 
	};
};

var endOfPageHTML = `<div class="poly-ed-end-scroll">
						<p> End of Page </p>
					</div>`;

var iconRowHTML = `<div class="poly-ed-icon-row row">`;
var openAnchorHTML = `<a `
var docIconHTML = `<div class="poly-ed-doc-icon col-md-4">`;
var openImgHTML = `<img src=`;
var endDivHTML = `</div>`;
var endAnchorHTML = `</a>`;

var theThumbnailIIIF = "http://lac-luna-test2.is.ed.ac.uk:8181/luna/servlet/iiif/";
var thumbnailFileExt = "/full/100,100/0/default.jpg"; /////???????

var generateIconHTML = function(theURL) {
	var theDocID = theURL.substring( 57, theURL.lastIndexOf("/info.json") ); ///the 57 comes from length of LUNA Test URL length
	var theDOMID = " id='"+theDocID+"' ";
	var theHREF = " href='/editors/"+encodeURI(theDocID)+"' ";
	var theTitle = "<p >" + "</p>"; ///////find title
	return openAnchorHTML+theDOMID+theHREF+" >"+docIconHTML+theTitle+openImgHTML+theThumbnailIIIF+theDocID+thumbnailFileExt+" >"+endDivHTML+endAnchorHTML;
};

var loopImageFilter = function(filters) {
	var image;
	do {
		image = filterImages(filters);
	}
	while (image == false);
	if (image != false) {
		return image;
	};
};

var addToNextQueue = function (theDoc) {
	polyEdNextDocs.push( theDoc ); //add to end of next queue
	if ( collectionDocArray.indexOf(theDoc) != -1 ) {
		collectionDocArray.splice( collectionDocArray.indexOf(theDoc) , 1);
	};
};

var addToPrevQueue = function(theDoc) {
	polyEdPrevDocs.unshift(theDoc); ///add to front of prev docs
};

var removeFromNextQueue = function (theDoc) {
	polyEdNextDocs.splice( polyEdNextDocs.indexOf(theDoc) , 1); ///remove from next queue
};

var removeFromPrevQueue = function (prevDoc) {
	polyEdPrevDocs.splice( polyEdPrevDocs.indexOf(prevDoc) , 1);	
};

var shouldScrollLoop = false;

var generateQueue = function(childrenNo, scrolling, reuse, repeatNo) {

	var theRowHTML = iconRowHTML;

	for ( i=1; i<=childrenNo; i++ ) {

		var theNewDoc = loopImageFilter(polyEdFilters);

		addToNextQueue(theNewDoc);

		if (scrolling) {
			var createRow = function(theNewDoc, theIndexNo) {
				if (theIndexNo % 3 == 0) {
					theRowHTML += generateIconHTML(theNewDoc) + endDivHTML;
					infinityListView.append(theRowHTML);
					theRowHTML = iconRowHTML; ///reset?
				}
				else {
					theRowHTML += generateIconHTML(theNewDoc);
				};
			};
			createRow(theNewDoc, i);
			if (i==childrenNo) {	infinityListView.append(endOfPageHTML);	};
		};
	};

	if (reuse) {	
		shouldScrollLoop = true;
		if (collectionDocArray.length < (childrenNo * repeatNo)) {
			collectionDocArray.forEach(function(doc){
				addToQueue(doc);
			});
			collectionDocArray = polyEdNextDocs;
			generateQueue(childrenNo * repeatNo, true, true);
		}
		else {
			generateQueue(childrenNo * repeatNo, true, true);
		};	
	};
};

$('#poly-ed-scroll').on("scroll", function(){
	var viewportBottom = $('#poly-ed-scroll').scrollTop() + $('#poly-ed-scroll').height(); 
	var nearEnd = $(".poly-ed-end-scroll").offset().top; ///distance from top of scroll to the div at the end of the list
	var reloadDistance = $('#poly-ed-scroll').height() / 10; ///distance of bottom of scroll from bottom of screen when the next lot should be generated

	if ((shouldScrollLoop) && (nearEnd <= viewportBottom + reloadDistance)) {
		infinityListView.find(".poly-ed-end-scroll")[0].remove();
		if (collectionDocArray.length < 12) {
			collectionDocArray.forEach(function(doc){
				addToQueue(doc);
			});
			collectionDocArray = polyEdNextDocs;
			generateQueue(12, true, true);
		}
		else {
			generateQueue(12, true, true);
		};
	};
});

var extractLunaIds = function(theURL) {
  return theURL.substring( "http://lac-luna-test2.is.ed.ac.uk:8181/luna/servlet/iiif/".length , theURL.lastIndexOf("/info.json") );
};

var createLUNAurl = function(theDOM) {
  var theHREF = $(theDOM).closest("a").attr("href");
  if (isUseless(theHREF)) { return false }
  else { return "http://lac-luna-test2.is.ed.ac.uk:8181/luna/servlet/iiif/" + theHREF.substring("/editors/".length , theHREF.length) + "/info.json"; };
};

var settingPolyEdCookies = function(prevDocs, upDocs) {
  document.cookie = "upcomingdocs="+upDocs+";";
  document.cookie = "previousdocs="+upDocs+";";
};

var searchPolyEdCookie = function(field) {
  var fieldIndex = document.cookie.lastIndexOf(field);
  if (fieldIndex == -1) {  return false;  }
  else {
    var postField = document.cookie.substring(fieldIndex+field.length);
    var theValueEncoded = postField.split(";", 1);
    var theValue = theValueEncoded[0];
    return theValue;
  };
};

var cookieNextDocs = searchPolyEdCookie("upcomingdocs=");
var cookiePrevDocs = searchPolyEdCookie("previousdocs=");

alert("the next docs are "+cookieNextDocs);
alert("the prev docs are "+cookiePrevDocs);

var setUpPolyEdChangeBtns = function() {

	if (isUseless(cookieNextDocs) && isUseless(polyEdNextDocs[0])) {
		alert("no queue so making and setting");
	  	generateQueue(3, false, false, 0);
	  	$(".poly-ed-editors-next").attr("href", extractLunaIds(polyEdNextDocs[0]));
	}
	else if (!isUseless(cookieNextDocs) && isUseless(polyEdNextDocs[0])) {
		alert("using cookies to set next");
	  	polyEdNextDocs = cookieNextDocs.split(",");
	  	$(".poly-ed-editors-next").attr("href", extractLunaIds(polyEdNextDocs[0]));
	}
	else if (!isUseless(polyEdNextDocs[0])) {
		$(".poly-ed-editors-next").attr("href", extractLunaIds(polyEdNextDocs[0]));
	};

	if (isUseless(cookiePrevDocs) && isUseless(polyEdPrevDocs)) {
	  	polyEdPrevDocs = [];
	  ////set CSS of prev button to disabled or faded
	}
	else if (!isUseless(cookiePrevDocs) && isUseless(polyEdPrevDocs[0])) {
	  	polyEdPrevDocs = cookiePrevDocs.split(",");
	  	$(".poly-ed-editors-prev").attr("href", extractLunaIds(polyEdPrevDocs[0]));
	}
	else if (!isUseless(polyEdPrevDocs[0])) {
	  	$(".poly-ed-editors-prev").attr("href", extractLunaIds(polyEdPrevDocs[0]));
	};

	$(".poly-ed-editors-prev").on("click", function(event){
		polyEdCurrentDocs.forEach(function (doc) {
			addToNextQueue(doc);
		});
		var theURL = createLUNAurl( this );
		removeFromPrevQueue( theURL );
		document.cookie = "imageviewing="+theURL;
		settingPolyEdCookies(polyEdPrevDocs, polyEdNextDocs);

//////needs to happen before redirect??

	});
	$(".poly-ed-editors-next").on("click", function(event){
		var theURL = createLUNAurl( this );
	  	removeFromNextQueue( theURL );
	  	polyEdCurrentDocs.forEach(function (doc) {
			addToPrevQueue(doc);
		});
	  	document.cookie = "imageviewing="+theURL;
	  	settingPolyEdCookies(polyEdPrevDocs, polyEdNextDocs);

//////needs to happen before redirect??

	});

};

///if icon clicked on then


//////currently difficulty rating does nothing

/*
var theFilters = {
	metadata: {
		startYear: null,
		endYear: null,

	},
	transcription: {
		languages: null,
		difficulty: null
	},
	translation: {
		languages: null,
		difficulty: null
	},
	searchTerms: null

}
*/

