
var loadImage = function() {
  
  var theCookieImage; // = searchCookie("imageviewing=");
  if (isUseless(theCookieImage)) {
    var thisWebsiteAddress = window.location.href;
    var theImageID = thisWebsiteAddress.substring( thisWebsiteAddress.indexOf("/editors/") + 9, thisWebsiteAddress.length);
    imageSelected = "http://lac-luna-test2.is.ed.ac.uk:8181/luna/servlet/iiif/"+theImageID+"/info.json";
  }
  else {
    imageSelected = theCookieImage;
  };
  var theImage = getTargetJSON(imageSelected);
  imageSelectedFormats = theImage.formats;
  imageSelectedMetadata = theImage.metadata;

};

loadImage();

var loginAndSetUsername = function() {
  ///use EASE to setup login and set document.cookie = "theusername="+username+";";
  //set polyanno_current_username
};

polyanno_setup({"highlighting": true});

var polyEdFilters = null; ////for now
polyEdCurrentDocs.push(imageSelected);

setUpPolyEdChangeBtns();





