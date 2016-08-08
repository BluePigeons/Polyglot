
var popupVectorMenuHTML = function() {
  var openHTML = "<div class='popupAnnoMenu'>";
  var transcriptionOpenHTML = "<a class='openTranscriptionMenu ui-btn ui-corner-all ui-shadow ui-btn-inline'>TRANSCRIPTION</a><br>";
  var translationOpenHTML = "<a class='openTranslationMenu ui-btn ui-corner-all ui-shadow ui-btn-inline'>TRANSLATION</a>";
  var endHTML = "</div>";
  var totalHTML = openHTML + transcriptionOpenHTML + translationOpenHTML + endHTML;
  /////this as a function instead of one line string allows for flexibility during development but may fix later 
  return totalHTML;
};

///the maps
var findTextMap;
var addNewMap;
var changeSelectionMap;
var votingMap;
var linkMarkerMap;
var crazyTextMap;
var filtersMap;

var mapArray = [findTextMap,addNewMap,changeSelectionMap,votingMap,linkMarkerMap,crazyTextMap,filtersMap];

///the images
var genericBaseLayer;/////////////FIND GOOD EXAMPLE IMAGES!!!
var crazyTextBaseLayer;/////////////

var allDrawnItems = new L.FeatureGroup();
var controlOptions = {
    draw: {
        polyline: false,  //disables the polyline and marker feature as this is unnecessary for annotation of text as it cannot enclose it
        marker: false,
    },
    edit: {
        featureGroup: allDrawnItems, //passes draw controlOptions to the FeatureGroup of editable layers
    }
};

var popupVectorMenu = L.popup()
    .setContent(popupVectorMenuHTML()); 

var setMapSettings = function(themap, theImage) {
  var mapID = themap.toString();
  themap = L.map(mapID);
  var baseLayer;
  themap.options.crs = L.CRS.Simple;
  themap.setView(
    [0, 0], //centre coordinates
    0 //zoom needs to vary according to size of object in viewer but whatever
  );
  themap.options.crs = L.CRS.Simple;
  baseLayer = L.tileLayer.iiif(theImage);
  themap.addLayer(baseLayer);
  themap.addLayer(allDrawnItems);
  new L.Control.Draw(controlOptions).addTo(map);

  themap.whenReady(function(){
    mapset = true;
  });
};

mapArray.forEach(function(mapItem){
  setMapSettings(mapItem, genericBaseLayer);
});

////pre load vectors

////selection function but only for the one slide area otherwise alerts

var createEditorPopupBox = function() {

  //CREATE POPUP BOX
  var popupBoxDiv = document.createElement("div");
  popupBoxDiv.classList.add("textEditorPopup");
  popupBoxDiv.classList.add("col-md-6");
  popupBoxDiv.id = "DivTarget-" + Math.random().toString().substring(2);
  var popupIDstring = "#" + popupBoxDiv.id;
//need to eventually save HTML as string in JS file but for now cloning
  var popupTranscriptionTemplate = document.getElementById("theEditor");
  var newPopupClone = popupTranscriptionTemplate.cloneNode("true");
  popupBoxDiv.appendChild(newPopupClone);

  var pageBody = document.getElementById("ViewerBox1");
  pageBody.insertBefore(popupBoxDiv, pageBody.childNodes[0]); 

  var newCarouselID = "Carousel" + Math.random().toString().substring(2);
  $(popupIDstring).find(".editorCarousel").attr("id", newCarouselID);
  $(popupIDstring).find(".carousel-control").attr("href", "#" + newCarouselID);

  return popupIDstring;

};

var buildCarousel = function(existingChildren, popupIDstring, extraHTML) {

  var openingHTML = "<div class='item pTextDisplayItem ";
  var openingHTML2 = "'> <div class='pTextDisplay'> <div class='well well-lg'> <p id='";
  var middleHTML = "' class='content-area' title=' '>";
  var endTextHTML = "</p></div>";
  var endDivHTML = "</div></div>";
  var closingHTML = endTextHTML + extraHTML + endDivHTML;

  existingChildren.forEach(function(subarray) {

    var itemText = subarray[0].body.text;
    var itemID = subarray[0]._id;
    var itemHTML = openingHTML + itemID + openingHTML2 + itemID + middleHTML + itemText + closingHTML;
    $(popupIDstring).find(".editorCarouselWrapper").append(itemHTML);

    if ( !isUseless(subarray[1]) )  {
      var votesUp = subarray[1].votesUp;
      $("."+itemID).find(".votesUpBadge").find(".badge").html(votesUp); 
    }; 
/////////update metadata options with defaults and placeholders???    
  });

};

///SELECTION PROCESS

function getSelected() {
  if(window.getSelection) { return window.getSelection() }
  else if(document.getSelection) { return document.getSelection(); }
  else {
    var selection = document.selection && document.selection.createRange();
    if(selection.text) { return selection.text; }
    return false;
  }
  return false;
};

$('#page_body').on("mouseup", '.content-area', function(event) {

  var selection = getSelected(); 
  var classCheck = selection.anchorNode.parentElement.className;

  if (classCheck.includes('openTranscriptionMenuOld')) { //if it is a popover within the selection rather than the text itself

    textSelectedID = startParentID;
    if (  !isUseless($(outerElementTextIDstring).parent().attr('id')) ){
      textSelectedParent = transcriptionURL + $(outerElementTextIDstring).parent().attr('id'); 
    };
    textSelectedHash = textSelectedParent.concat("#"+textSelectedID);
//    checkEditorsOpen("text", "transcription");
    $(outerElementTextIDstring).popover('hide'); ////

  }   
  else if (classCheck.includes('popover-title')) { 
    $(outerElementTextIDstring).popover('hide'); ///
  } 
  else {
    setNewTextVariables(selection, classCheck);
  };
});



