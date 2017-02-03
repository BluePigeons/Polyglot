
var loadImage = function() {
  
  var theCookieImage; // = searchCookie("imageviewing=");
  if (isUseless(theCookieImage)) {
    var thisWebsiteAddress = window.location.href;
    var theImageID = thisWebsiteAddress.substring( thisWebsiteAddress.indexOf("/editors/") + 9, thisWebsiteAddress.length);
    imageSelected = "http://images.is.ed.ac.uk/luna/servlet/iiif/"+theImageID+"/info.json";
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

  ///for now
  polyanno_current_username = "ErinNolan";

  $(".ed-poly-username").html(polyanno_current_username);
  
};

polyanno_setup({"highlighting": true});


var polyEdFilters = null; ////for now
polyEdCurrentDocs.push(imageSelected);

setUpPolyEdChangeBtns();

////log out when sign out is clicked

///load username into HTML where necessary

///redirect to favourites page

///redirect to activity page



