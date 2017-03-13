
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

///Extracting Image

var polyanno_open_the_image_sub_section = function() {
  var shape = polyanno_map.getLayer(vectorSelected).toGeoJSON();
  var IIIFsection = getIIIFsectionURL(imageSelected, shape.geometry.coordinates[0], "jpg");
  window.open(IIIFsection, "imageExtract");
};

///Downloading Text Files

//https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications

/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-setclasses !*/
!function(n,e,s){function o(n){var e=r.className,s=Modernizr._config.classPrefix||"";if(c&&(e=e.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+s+"no-js(\\s|$)");e=e.replace(o,"$1"+s+"js$2")}Modernizr._config.enableClasses&&(e+=" "+s+n.join(" "+s),c?r.className.baseVal=e:r.className=e)}function a(n,e){return typeof n===e}function i(){var n,e,s,o,i,l,r;for(var c in f)if(f.hasOwnProperty(c)){if(n=[],e=f[c],e.name&&(n.push(e.name.toLowerCase()),e.options&&e.options.aliases&&e.options.aliases.length))for(s=0;s<e.options.aliases.length;s++)n.push(e.options.aliases[s].toLowerCase());for(o=a(e.fn,"function")?e.fn():e.fn,i=0;i<n.length;i++)l=n[i],r=l.split("."),1===r.length?Modernizr[r[0]]=o:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=o),t.push((o?"":"no-")+r.join("-"))}}var t=[],f=[],l={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(n,e){var s=this;setTimeout(function(){e(s[n])},0)},addTest:function(n,e,s){f.push({name:n,fn:e,options:s})},addAsyncTest:function(n){f.push({name:null,fn:n})}},Modernizr=function(){};Modernizr.prototype=l,Modernizr=new Modernizr;var r=e.documentElement,c="svg"===r.nodeName.toLowerCase();i(),o(t),delete l.addTest,delete l.addAsyncTest;for(var u=0;u<Modernizr._q.length;u++)Modernizr._q[u]();n.Modernizr=Modernizr}(window,document);
//////Copied to detect for use of File type because stupid Safari..


var generate_export_text = function(editorString, text_type) {
  var the_text = `
  The image json: `+imageSelected;
  var the_top_text = $(editorString).find("polyanno-top-voted").html();
  the_text.concat(` 
    The most popular `+text_type+": "+the_top_text);
  if ((!isUseless(polyanno_siblingArray)) && (!isUseless(polyanno_siblingArray[0]))) {
    for (var i=0; i < polyanno_siblingArray.length; i++) {
      var child = polyanno_siblingArray[i][0];
      var alt_text = `
      Alternative: `+child.text;
      the_text.concat(alt_text);
    };
  };
  if (!isUseless(vectorSelected)) {
    var shape = allDrawnItems.getLayer(vectorSelected).toGeoJSON();
    var IIIFsection = getIIIFsectionURL(imageSelected, shape.geometry.coordinates[0], "jpg");
    the_text.concat(` 
      The image sub-section: `+IIIFsection);
  };
  if (Modernizr.filereader) {
    var generatedFile = new File([the_text], "new_annotation.txt", {type: "text/plain"});
    var objectURL = URL.createObjectURL(generatedFile);
    window.open(objectURL, "ExportedText");
  } else {
    // not-supported
    alert("Get a better browser!!!!!!");
  };

};

$("#polyanno-page-body").on("click", ".polyanno-export-text", function(event){
    var theEditor = "#"+ $(this).closest(".textEditorPopup").attr("id");
    generate_export_text(polyanno_text_type_selected);
});


///Reporting or Flagging Up Inappropriate Content






