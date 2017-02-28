
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

var polyannoOptionsHTML = `

        <div class="col-md-2 polyanno-options-buttons">
          <button class="btn btn-default polyanno-discussion-btn"><span class="glyphicon glyphicon glyphicon-comment"></span></button>
        </div>

        <div class="col-md-2 polyanno-options-buttons">
          <button class="btn btn-default polyanno-export-text" type="button"><span class="glyphicon glyphicon-save"></span></button> <!--export as txt or PDF??-->
        </div> 

        <div class="col-md-2 polyanno-options-buttons">
          <button class="btn btn-default polyanno-social" type="button"><span class="glyphicon glyphicon-share"></span></button> <!-- social media sharing-->
        </div> 

        <div class="col-md-2 polyanno-options-buttons">
          <button class="btn btn-default polyanno-report" type="button"><span class="glyphicon glyphicon-exclamation-sign"></span><!--report inappropriate content--></button>
        </div>

`;

var loginAndSetUsername = function() {
  ///use EASE to setup login and set document.cookie = "theusername="+username+";";
  //set polyanno_current_username

  ///for now
  polyanno_current_username = "ErinNolan";

  $(".ed-poly-username").html(polyanno_current_username);
  
};

polyanno_setup({
  "highlighting": true, 
  "editor_options": polyannoOptionsHTML
});


var polyEdFilters = null; ////for now
polyEdCurrentDocs.push(imageSelected);

setUpPolyEdChangeBtns();


////log out when sign out is clicked

///load username into HTML where necessary

///redirect to favourites page

///redirect to activity page



