
////Polyanno Setup

var loadImage = function() {
  
  var theCookieImage; 
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

        <!--<div class="col-md-2 polyanno-options-buttons">
          <button class="btn btn-default polyanno-image-metadata-tags-btn"><span class="glyphicon glyphicon glyphicon-tags"></span></button>
        </div>-->

        <div class="col-md-2 polyanno-options-buttons">
          <button class="btn btn-default polyanno-favourite"><span class="glyphicon glyphicon glyphicon-star-empty"></span></button>
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


polyanno_setup({
  "highlighting": true, 
  "editor_options": polyannoOptionsHTML
});

////Polyglot User Setup

var logged_out_user_tab_HTML = `
        <button class="btn btn default">
          <span>Login</span>
        </button>
`;

var logged_in_users_tab_HTML = `
        <div class="ed-poly-header-obj">

            <button class="btn polyanno-dropdown-menu polyanno-dropdown-menu-right dropdown-toggle" type="button" id="poly-ed-user-menu" onclick="if ($('.polyanno-dropdown-menu-items-right').css('display')=='none') { $('.polyanno-dropdown-menu-items-right').css('display','block'); } else { $('.polyanno-dropdown-menu-items-right').css('display','none'); } " >
            
                  <span class="caret"></span>
                  <img class="polyanno-user-icon " src="http://placekitten.com/g/50/50">

            </button>
          
        </div>

        <div class="polyanno-menu-item-obj-list polyanno-dropdown-menu-items-right poly-ed-user-menu-list">

          <div class="polyanno-user-menu-item-obj polyanno-dropdown-menu-items-right">
            <span class="polyanno-user-username polyanno-user-menu-item" >
              <button class="btn polyanno-dropdown-menu polyanno-dropdown-menu-right" type="button">
                  <span class="ed-poly-username ">Jane Blogg</span>
                </button>
              </span>
          </div>

          <div class="polyanno-user-menu-item-obj polyanno-dropdown-menu-items-right">
            <a class="polyanno-user-favourites polyanno-user-menu-item"  href="#">
              <button class="btn polyanno-dropdown-menu polyanno-dropdown-menu-right" type="button">
                        <span class='glyphicon glyphicon-star '></span>
                        <span >  Favourites</span>
                </button>
            </a>
          </div>

          <div class="polyanno-user-menu-item-obj polyanno-dropdown-menu-items-right">
            <a class="polyanno-user-activity polyanno-user-menu-item "  href="#">
              <button class="btn polyanno-dropdown-menu polyanno-dropdown-menu-right" type="button">
                        <span class='glyphicon glyphicon-tasks '></span>
                        <span >  Activity</span>
                </button>
            </a>
          </div>

          <div class="polyanno-user-menu-item-obj polyanno-dropdown-menu-items-right">
            <span class="polyanno-user-signout polyanno-user-menu-item "  href="#" onclick="logout_basic();">
              <button class="btn polyanno-dropdown-menu polyanno-dropdown-menu-right" type="button">
                        <span > Sign Out </span>
                </button>
            </span>
          </div>

        </div>

`;

var searchCookie = function(field) {
  var fieldIndex = document.cookie.lastIndexOf(field);
  if (fieldIndex == -1) {  return false;  }
  else {
    var postField = document.cookie.substring(fieldIndex+field.length);
    var theValueEncoded = postField.split(";", 1);
    var theValue = theValueEncoded[0];
    return theValue;
  };
};

var polyanno_current_username = false;


var setup_user_basic = function(username) {

  $(".ed-poly-users-tab").html(logged_in_users_tab_HTML);

  $(".polyanno-user-username").find("span").html(username);

  //ICON

  var current_user_icon = "http://placekitten.com/g/50/50"; //for now

  $(".polyanno-user-icon").attr("src", current_user_icon);

  ///FAVOURITES

  var current_user_favourites_page = "/favourites/"+username; //for now because ideally need to use OAuth etc
  $(".polyanno-user-favourites").attr("href", current_user_favourites_page);

  ///ACTIVITY

  var current_user_activity_page = "/activities/"+username; //for now because ideally need to use OAuth etc
  $(".polyanno-user-activity").attr("href", current_user_activity_page);

};

var enable_favourites = function () {

  /////need to update and complete

  $("#polyanno-page-body").on("click", ".polyanno-favourite", function(event) {
    var theSpan = $(this).find(".glyphicon");
    if (theSpan.hasClass("glyphicon-star-empty")) {
      if ( $(this).closest(".annoPopup").attr("id") == "imageViewer" ) {
        polyannoAddFavourites("the_image", true);
      }
      else {
        polyannoAddFavourites(textTypeSelected, textSelected);
      };
      theSpan.removeClass("glyphicon-star-empty").addClass("glyphicon-star");
    }
    else {
      if ( $(this).closest(".annoPopup").attr("id") == "imageViewer" ) {
        polyannoRemoveFavourites("the_image", false);
      }
      else {
        polyannoRemoveFavourites(textTypeSelected, textSelected);
      };
      polyannoHandleFavourites("removefavourite", textSelected);
      theSpan.removeClass("glyphicon-star").addClass("glyphicon-star-empty");
    };
  });

};

var enable_activity_functionality = function() {

};

var setup_user_editors = function(username) {

  setup_user_basic(username);

  enable_favourites();

  enable_activity_functionality();

};

var redirect_to_home = function() {

};

var loginAndSetUsername = function() {
  ///use EASE to setup login and set document.cookie = "theusername="+username+";";
  //set polyanno_current_username

  ///for now
  polyanno_current_username = "JaneBlogg";

  setup_user_basic("JaneBlogg"); 
  
};

var logout_basic = function(){
  $(".ed-poly-users-tab").html(logged_out_users_tab_HTML);
  document.cookie = "theusername="+false+";";
  polyanno_current_username = false;
};

var ed_poly_log_check = function(logged_in_callback, logged_out_callback) {
  if (polyanno_current_username != false) {
    if (logged_in_callback != null) {
      logged_in_callback(polyanno_current_username);
    };
  }
  else if (searchCookie("theusername") != false) {
    polyanno_current_username = searchCookie("theusername");
    if (logged_in_callback != null) {
      logged_in_callback(polyanno_current_username);
    };
  }
  else {
    //logged out
    if (logged_in_callback != null) {
      logged_out_callback();
    };
  };

};

//specific to the non-editor pages
//ed_poly_log_check(setup_user_basic, null);

//specific to editor pages
//ed_poly_log_check(setup_user_editors, redirect_to_home);

/////Favourites

var polyannoAddFavourites = function(the_favourited_type, the_favourited_id) {
  var targetData = {  "favourites": { "image_id" : imageSelected } };
  targetData.favourites[the_favourited_type] = the_favourited_id;

///////
  $.ajax({
    type: "PUT",
    url: users_url + polyanno_current_username,
    dataType: "json",
    data: targetData
  });

};

var polyannoRemoveFavourites = function(the_favourited_type, the_favourited_id) {
  var targetData = {  "removefavourite": { "image_id" : imageSelected } };
  targetData.favourites[the_favourited_type] = the_favourited_id;
///////
  $.ajax({
    type: "PUT",
    url: users_url + polyanno_current_username,
    dataType: "json",
    data: targetData
  });

};

/*
{

  "username": String,

  "docs_edited": {
    "vectors" : {
      "created" : [],
      "edited" : [],
      "deleted" : []
    },
    "transcriptions" : {
      "created" : [],
      "edited" : [],
      "deleted" : []
    },
    "translations" : {
      "created" : [],
      "edited" : [],
      "deleted" : []
    }
  },

  "favourites" : [{
    "image_id" : String,
    "the_image" : {
      "type": Boolean,
      "default": false
    },
    "transcriptions" : [],
    "translations" : [],
    "vectors" : []
  }]
}
*/

////Activity



////PolyEd Queue Setup

var polyEdFilters = null; ////for now
polyEdCurrentDocs.push(imageSelected);

setUpPolyEdChangeBtns();

