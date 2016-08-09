
var rejectionOptions = new Set(["false",'""' , null , false , 'undefined']);
var collectionDocArray = []; //////
var filterCheck = {}; 


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

var setNextCookies = function (image) {
	////before slide is opened the cookie for imageSelected needs to be reset
	document.cookie = "imageviewing="+image+"; path=/theimage";
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
		})
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

var filterImages = function (filters) {
	var nextOne;
	for ( var theNext = " "; isUseless(theNext); theNext = nextPossible() ) {
		nextOne = theNext;
	};
	var theDetails = getTargetJSON(nextOne);
	if (!dateCheck(theDetails, filters.dates.startYear, filters.dates.endYear)) {	filterImages(filters)	};
	if (!languagesArray(theDetails, "transcription", filters.transcription.languages)) {	filterImages(filters)	};
	if (!languagesArray(theDetails, "translation", filters.translation.languages)) {	filterImages(filters)	};
	if (!searchTerms(theDetails, filters.keywords));

};

var addToQueue = function () {
	var itemHTML = "<div class='item iframe-slide'>"+"<iframe src='/theimage'></iframe>"+"</div>"
	$(".displayCarouselWrapper").append(itemHTML);
};

var removeFromQueue = function () {
 /////
};

/////postmessage/cookies to iframe window for image to be loaded

$('.displayCarousel').on('slid.bs.carousel', function(event) {



});

var currentImage;

var openImage = function(image) {
	document.cookie = "imageviewing="+image+"; path=/theimage";
};

$('.openImage').on("click", function(event) {
  	event.stopPropagation(); ///
  	currentImage = 
  	openImage(currentImage);
});

