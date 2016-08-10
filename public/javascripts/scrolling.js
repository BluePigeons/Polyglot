
var rejectionOptions = new Set(["false",'""' , null , false , 'undefined']);

//////imported from elsewhere??? Use external search functions??? 
//////needs to remove all docs already visited by user
var collectionDocArray = []; 

var filterCheck = {}; 

var upcomingDocs = [];
var previousDocs = [];
var currentImage;

/////////problems with bootstrap in iframe???

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

var nextPossible = function() {
	collectionDocArray[Math.floor((Math.random() * 100))]; //////need to be number between 0 and length of collectionDocArray
};

var languageCheck = function(doc, annoType, languagesArray) {
	var theAnno = doc[annoType];
	if (!isUseless(theAnno)) {
		var annoDocLanguages = getTargetJSON(theAnno).body.language;
		languagesArray.forEach(function(language){
			if (annoDocLanguages.includes(language)) {	return true	 }
			else {	return false	};
		});
	};
};

//////set placeholder of filters to limit date searches to max larger than min

var dateCheck = function(doc, startYear, endYear) {
	var theDate = doc.metadata.date; /////metadata official name
	if (!isUseless(theDate) && (theDate >= startYear) && (theDate <= endYear)) {	return true;	}
	else {	return false;	};
};

var searchTerms = function(doc, keywords) {
	var bodyText = doc.body.text;
	if (!isUseless(bodyText) && ( eachKeyword(bodyText, keywords) ) ) { return true }
	else {	return false	};
};

var filterImagesSearch = function(theDetails, filters) {
	if (searchTerms(theDetails, filters.keywords)) {	return true;	}
	else {	return false;	};
};

var filterImagesTranscription = function(theDetails, filters) {

	var theVectors = lookupTargetChildren(imageSelected, vectorURL);
	theVectors.forEach(function(vectorTarget) {
		if (languagesArray(vectorTarget, "transcription", filters.transcription.languages)) {

		};
	});
	if (languagesArray(theDetails, "transcription", filters.transcription.languages)) {	 filterImagesSearch(theDetails, filters);	}
	else {	return false;	};
};

var filterImagesDate = function(theDetails, filters) {
	if (dateCheck(theDetails, filters.dates.startYear, filters.dates.endYear)) {	filterImagesTranscription(theDetails, filters);	}
	else {	return false	};
};

var filterImages = function (filters) {
	var nextOne;
	for ( var theNext = " "; isUseless(theNext); theNext = nextPossible() ) {
		nextOne = theNext;
	};
	var theDetails = getTargetJSON(nextOne);
	if(filterImagesDate(theDetails, filters)) {  return nextOne;	}
	else {	filterImages(filters);	};
};

var removeFromQueue = function (thisImage) {
//////remove from upcomingDocs
 	previousDocs.pop(thisImage);
 	addToQueue(filterCheck);
};

var addToQueue = function (filters) {
	upcomingDocs.push(filterImages(filters));
 /////remove from collectionDocArray so it cannot be added again
};

var setNextCookies = function (image) {
	document.cookie = "imageviewing="+image+"; path=/theimage";
	return image;
};

var setNext = function(queue) {
	var theNewImage = queue[0];
	currentImage = theNewImage;
	setNextCookies(theNewImage);
};

/////postmessage/cookies to iframe window for image to be loaded???

////when document ready or form for filters submitted then update filterCheck

$('.displayCarousel').on('slide.bs.carousel', function(event) {

	////if next then
	removeFromQueue(setNext(upcomingDocs));
	/////if back then
	setNext(previousDocs);

});



