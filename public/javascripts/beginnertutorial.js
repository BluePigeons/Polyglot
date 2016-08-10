
var popupVectorMenuHTML = function() {
  var openHTML = "<div class='popupAnnoMenu'>";
  var transcriptionOpenHTML = "<a class='openTranscriptionMenu ui-btn ui-corner-all ui-shadow ui-btn-inline'>TRANSCRIPTION</a><br>";
  var translationOpenHTML = "<a class='openTranslationMenu ui-btn ui-corner-all ui-shadow ui-btn-inline'>TRANSLATION</a>";
  var endHTML = "</div>";
  var totalHTML = openHTML + transcriptionOpenHTML + translationOpenHTML + endHTML;
  /////this as a function instead of one line string allows for flexibility during development but may fix later 
  return totalHTML;
};

var preLoadVector = {
  ////some coordinates etc here
};

///the maps
var findTextMap = "findTextMap";
var addNewMap = "addNewMap";
var changeSelectionMap = "changeSelectionMap";
var votingMap = "votingMap";
var linkMarkerMap = "linkMarkerMap";
var crazyTextMap = "crazyTextMap";

var mapArray = [findTextMap,addNewMap,changeSelectionMap,votingMap,linkMarkerMap,crazyTextMap];

///the images
var genericBaseLayer = "https://stacks.stanford.edu/image/iiif/cv770rd9515%2F0767_23A_SM/info.json";/////////////FIND GOOD EXAMPLE IMAGES!!!
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
  var mapID = themap;
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
  new L.Control.Draw(controlOptions).addTo(themap);

  themap.whenReady(function(){
    mapset = true;
  });
};

mapArray.forEach(function(mapItem){
  setMapSettings(mapItem, genericBaseLayer);
});

////pre load vectors

////selection function but only for the one slide area otherwise alerts


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



