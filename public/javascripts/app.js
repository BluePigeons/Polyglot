
var loadImage = function() {
  
  var theCookieImage = searchCookie("imageviewing=");
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



loadImage(findingcookies);


///EVENT LISTENERS

$('#polyanno-page-body').on("click", '.addAnnotationSubmit', function(event) {
  var thisEditor = $(event.target).closest(".annoPopup").attr("id"); 
  settingEditorVars(thisEditor);
  ////
  addAnnotation(thisEditor);
});

$('#polyanno-page-body').on("click", ".closePopoverMenuBtn", function(){
  $(event.target).closest(".popover").popover("hide"); ///////
});


$('#polyanno-page-body').on('slid.bs.carousel', '.editorCarousel', function(event) {

  var currentSlideID = $(event.target).find(".active").find(".content-area").attr("id");
  var thisEditor = $(event.target).closest(".annoPopup").attr("id"); 
  settingEditorVars(thisEditor);
  if (!isUseless(currentSlideID))  {  textSelected = findBaseURL() + currentSlideID;  };

});

$('#polyanno-page-body').on("click", ".addNewBtn", function(event){
  $(event.target).closest(".textEditorPopup").find(".editorCarousel").carousel(0);
});

$('#polyanno-page-body').on("click", ".polyanno-carousel-next", function(event){
  $(event.target).closest(".textEditorPopup").find(".editorCarousel").carousel("next");
});

$('#polyanno-page-body').on("click", ".polyanno-carousel-prev", function(event){
  $(event.target).closest(".textEditorPopup").find(".editorCarousel").carousel("prev");
});

$('#polyanno-page-body').on("click", ".linkBtn", function(){
  var thisEditor = $(event.target).closest(".textEditorPopup").attr("id"); 
  settingEditorVars(thisEditor);
  selectingVector = childrenArray;
  $("#imageViewer").effect("bounce");
  $("#map").popover( "show");
});

$('#polyanno-page-body').on("click", '.votingUpButton', function(event) {
  var votedID = $(event.target).closest(".pTextDisplay").find("p").attr("id");
  var currentTopText = $(event.target).closest(".textEditorPopup").find(".currentTop").html();
  var thisEditor = $(event.target).closest(".textEditorPopup").attr("id");
  settingEditorVars(thisEditor);
  votingFunction("up", votedID, currentTopText, thisEditor);
});

$("#polyanno-page-body").on("click", ".polyanno-options-dropdown-toggle", function(event){
    var theOptionRows = $(this).closest(".textEditorPopup").find(".polyanno-options-row");
    var theHandlebar = $(this).closest(".textEditorPopup").find(".popupBoxHandlebar");
    if (theOptionRows.css("display") == "none") {
      theOptionRows.css("display", "block");
      theHandlebar.css("border-radius", "5px 5px 0px 0px");
    }
    else {
      theOptionRows.css("display", "none");
      theHandlebar.css("border-radius", "5px");
    };
});

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

var polyEdFilters = null; ////for now
polyEdCurrentDocs.push(imageSelected);

setUpPolyEdChangeBtns();





