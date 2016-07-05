

var currentWebsite = window.location.href;
//alert(currentWebsite);

var websiteAddress = "http://localhost:8080";

var vectorURL = websiteAddress.concat("/api/vectors/");
var transcriptionURL = websiteAddress.concat("/api/transcriptions/");
var translationURL = websiteAddress.concat("/api/translations/");

//will be info.json format
var imageSelected;
var imageSelectedFormats;
var imageSelectedMetadata = [];

var vectorSelected = "";
var currentCoords;

var textSelected = "";
var textSelectedFragment = "";
var textTypeSelected = "";

var targetSelected = "";
var targetType = ""; 
var targetParent;

//Boolean to indicate if the currently selected text already has children or not
var childrenText = false;

//used to indicate if the user is currently searching for a vector to link or not
var selectingVector = "";

var findingcookies = document.cookie;

///// TEXT SELECTION

//based on the code from https://davidwalsh.name/text-selection-ajax

// attempt to find a text selection 
function getSelected() {
  if(window.getSelection) { 
    return window.getSelection(); 
  }
  else if(document.getSelection) { 
    return document.getSelection(); 
  }
  else {
    var selection = document.selection && document.selection.createRange();
    if(selection.text) { 
      return selection.text; 
    }
    return false;
  }
  return false;
}
// create sniffer 
$(document).ready(function() {
  $('.content-area').mouseup(function(event) {

    //hardcoded here for dev
    textTypeSelected = "transcription";
    targetType = "transcription";

    var selection = getSelected();

    var startNode = selection.anchorNode; // the text type Node that the beginning of the selection was in
    var startNodeText = startNode.textContent; // the actual textual body of the startNode - removes all html element tags contained
    var startNodeTextEndIndex = startNodeText.toString().length;
    var startParentNode = startNode.parentNode; //the element type Node that the start text is contained in - p or span
    var startParentID = startNode.parentElement.id;

    var nodeLocationStart = selection.anchorOffset; //index from within startNode text where selection starts
    var nodeLocationEnd;

    var endNode = selection.focusNode; //the text type Node that end of the selection was in 
    var endParentID = endNode.parentElement.id; //the ID of the element type Node that the text ends in

    textSelected = startParentID;
    textSelectedFragment = selection; //includes any HTML elements contained within that

    if(selection && (selection = new String(selection).replace(/^\s+|\s+$/g,''))) {
      textSelectedFragmentString = selection.toString(); //removes all html tags contained or displays them as string???
    };


    if (startParentID != endParentID) {
      alert("you can't select across existing fragments' borders sorry");
      nodeLocationEnd = startNodeTextEndIndex; //nope
    }
    else {
      nodeLocationEnd = nodeLocationStart + textSelectedFragmentString.length; //nope
    };

    alert(nodeLocationEnd);

    var outerTextIDstring = "#" + startParentID;
    var nodeBodyHTML = $(outerTextIDstring).html(); //includes any spans that are contained within this selection

    var newIDnumber = Math.random().toString().substring(2);
    var newNodeInsertID = textSelected.concat("_location_"+newIDnumber); //not a standardised selection label but will do for now

    //need to select start and end differently
    var previousContent = nodeBodyHTML.slice(0, nodeLocationStart);
    var nextContent = nodeBodyHTML.slice(nodeLocationEnd, startNodeTextEndIndex); 

    //change shade of yellow if layered??
    var newBodyContent = previousContent + "<span style='background-color:yellow" + "'id='" + newNodeInsertID + "' >" + textSelectedFragment + "</span>" + nextContent;

    $(outerTextIDstring).html(newBodyContent);

    //$( "#popupTranscriptionNewMenu" ).popup( "open");

  });
});

///// API FUNCTIONS

var getTargetJSON = function(target) {

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

var searchCookie = function(cookiestring, field) {
  var searchTerm = field;
  var fieldIndex = cookiestring.lastIndexOf(searchTerm);
  if (fieldIndex == -1) {
    return false;
  }
  else {
    var postField = cookiestring.substring(fieldIndex+searchTerm.length);
    var theValueEncoded = postField.split(";", 1);
    var theValue = theValueEncoded[0];
    return theValue;
  };
};

var getBodyText = function(target) {
  var bodyText = getTargetJSON(target);
  var theText = bodyText.body.text;
  return theText;
};

var checkForTranscription = function(target) {

  var targetChecking = getTargetJSON(target);
  var targetTranscription = targetChecking.transcription;

  if (targetTranscription == '""') {
    return false;
  }
  else if (targetTranscription == "") {
    return false;
  }
  else {
    return targetTranscription;
  };

};

var checkForTranslation = function(target) {

  var targetChecking = getTargetJSON(target);

  var targetTranslation = targetChecking.translation;

  if (targetTranslation == '""') {
    return false;
  }
  else if (targetTranslation == "") {
    return false;
  }
  else {
    return targetTranslation;
  };

};

var checkForParent = function(target) {

  var targetChecking = getTargetJSON(target);

  var parent = targetChecking.parent;

  if (parent == '""') {
    return false;
  }
  else if (parent == "") {
    return false;
  }
  else if (parent == false) {
    return false;
  }
  else {
    return parent;
  };

};

var updateVectorSelection = function(vectorURL) {

  if (selectingVector == "transcription") {

    var textSelectedURL = transcriptionURL.concat(textSelected);
    $.put(textSelectedURL, {target: {id: vectorURL}});
    $.put(vectorURL, {transcription: textSelectedURL});
    selectingVector = "";

  }

  else if (selectingVector == "translation") {

    var textSelectedURL = translationURL.concat(textSelected);
    $.put(textSelectedURL, {target: vectorURL});
    $.put(vectorURL, {translation: textSelectedURL});
    selectingVector = "";

  }

  else {
    return handleError(err);
  }

};

////IMAGE HANDLING

var loadImage = function(cookiestring) {

  imageSelected = searchCookie(cookiestring, "imageviewing=");
  var theImage = getTargetJSON(imageSelected);
  imageSelectedFormats = theImage.formats;
  imageSelectedMetadata = theImage.metadata;

};

var getImageVectors = function(target) {
  var imageVectors;
  var targetParam = encodeURIComponent(target);
  var imageSearch = vectorURL.concat("targets/"+targetParam);
  $.ajax({
    type: "GET",
    dataType: "json",
    url: imageSearch,
    async: false,
    success: 
      function (data) {
        imageVectors = data.list;
      }
  });
  return imageVectors;
};

//////POPUP OPTIONS

/*

var popupTranscriptionChildrenMenu = function () {

  var textSelectedURL = transcriptionURL.concat(textSelected);

  //VIEW OTHER TRANSCRIPTIONS
  //openTranscriptionMenu(textSelectedURL);

};

var popupTranscriptionNewMenu = function () {

  var textSelectedURL = transcriptionURL.concat(textSelected);

  //ADD NEW TRANSCRIPTION
  //openTranscriptionMenu(textSelectedURL);

};

var popupTranslationChildrenMenu = function () {

  var textSelectedURL = translationURL.concat(textSelected);

  //VIEW OTHER TRANSLATIONS
  //openTranslationMenu(textSelectedURL);

};

var popupTranslationNewMenu = function () {

  var textSelectedURL = translationURL.concat(textSelected);

  //ADD NEW TRANSLATION
  //openTranslationMenu(textSelectedURL);

};
*/

///// VIEWER WINDOWS

var openTranscriptionMenu = function() {

  var targetsTranscription;
  var theText;
//currently hardcoded for dev
  var canUserAdd = true;

  if (targetType == "vector"){

    targetsTranscription = checkForTranscription(targetSelected);

    if (targetsTranscription == false) {
      theText = " ";
      canUserAdd = true;
    }

    else {

      theText = getBodyText(targetsTranscription);
/*
      if (checkForParent(targetTranscription) == false) {
        canUserAdd = false;
      }
      else {
        canUserAdd = true;
      };
*/
    };

  }
  else if (targetType == "transcription"){

    theText = textSelectedFragment;


/*

  for this location look up other children and generate carousel with each child on a page

*/

  }
  else {
    alert("what are you opening transcription of?");
  };

  //first slide is always theText
  $(".annoTextDisplay").html(theText);
  
  //META DATA OPTIONS

  //LINK VECTOR 

//    $(".linkVectorTranscription").click(linkVectorTranscription(target));

  //var voteEnabled = checkForParent(target);
  //if (voteEnabled != false) {
      //VOTING UP
      //    $(".voteUp").click(voteUp(target));
      //VOTING DOWN
      //    $(".voteDown").click(voteDown(target));
//  };

};

var openTranslationMenu = function() {

};


///// TRANSLATION AND TRANSCRIPTION FUNCTIONS

var linkVectorTranscription = function(target){

      textSelected = target;
      selectingVector = "transcription";

    //highlight or emphasise image viewer

};

var linkVectorTranslation = function(target) {

};

var addTranscription = function(target){

  //generate the relevant data to be posted

  var newText = $("#newTranscription").val();
  var createdTranscription;
  var transcriptionData;
  var targetDataJSON;

  if (targetType == "vector") {
    transcriptionData = {body: {text: newText}, target: {id: target, format: "SVG"}};
  }

  else if (targetType == "transcription") {
    transcriptionData = {body: {text: transcriptionText},target: {id: textSelected, format: "text Fragment"},parent: textSelected};
  }

  else {
    alert("What are you adding the transcription of?");
  };

  $.ajax({
    type: "POST",
    url: transcriptionURL,
    async: false,
    data: transcriptionData,
    success: 
      function (data) {
        createdTranscription = data.url;
      }
  });

  $("#newTranscription").val("");

  //update relevant files with new transcription info

  if (targetType == "vector") {
    targetData = {transcription: createdTranscription};
  }

  else if (targetType == "transcription") {
    targetData = {children: {id: textSelected,fragment: {id: createdTranscription,rank: 1.0}}};
  }; 

  $.ajax({
    type: "PUT",
    url: target,
    async: false,
    data: targetData,
    success:
      function (data) {}
  });

  newText = "";

  openTranscriptionMenu();

};

//ADD TRANSLATION OPTION
var addTranslation = function() {

};


//when vote up added
var votedUp = function (target) {
/*    $.put(target, 
        {children: 
          {id:textSelectedURL
          fragment: {
            id: createdTranscriptionURL,
            rank: 1.0}
          }
        })
*/
};

//when vote down added
var votedDown = function (target) {

};

///////LEAFLET 

loadImage(findingcookies);
var mapset;
var map;
var baseLayer;
var allDrawnItems = new L.FeatureGroup();
var controlOptions = {
    draw: {
//disables the polyline and marker feature as this is unnecessary for annotation of text as it cannot enclose it
        polyline: false,
        marker: false,
//disabling polygons and circles as IIIF image region API does not specify how to encode anything but rectangular regions
        polygon: false,
        circle: false
    },
//passes draw controlOptions to the FeatureGroup of editable layers
    edit: {
        featureGroup: allDrawnItems,
    }
};
var popupVectorMenu = L.popup()
    .setContent('<a href="#transcriptionEditor" data-rel="popup" data-position-to="#ViewerBox1" data-transition="fade" class="openTranscriptionMenu ui-btn ui-corner-all ui-shadow ui-btn-inline">TRANSCRIPTION</a><br><a href="#translationEditor" data-rel="popup" data-position-to="#ViewerBox1" data-transition="fade" class="openTranscriptionMenu ui-btn ui-corner-all ui-shadow ui-btn-inline">TRANSLATION</a>');
//to track when editing
var currentlyEditing = false;
var currentlyDeleting = false;
var existingVectors = getImageVectors(imageSelected);

map = L.map('map');
map.options.crs = L.CRS.Simple;
map.setView(
  [0, 0], //centre coordinates
  0 //zoom needs to vary according to size of object in viewer but whatever
);
map.options.crs = L.CRS.Simple;
baseLayer = L.tileLayer.iiif(imageSelected);
map.addLayer(baseLayer);
map.addLayer(allDrawnItems);
new L.Control.Draw(controlOptions).addTo(map);

map.whenReady(function(){
  mapset = true;
});

//load the existing vectors
if (existingVectors != false) {
  existingVectors.forEach(function(vector) {

    var oldData = {
        "type": "Feature",
        "properties":{},
        "geometry":{
          "type": vector.notFeature.notGeometry.notType,
          "coordinates": [vector.notFeature.notGeometry.notCoordinates]
        }
      };

    var existingVectorFeature = L.geoJson(oldData, {
      onEachFeature: function (feature, layer) {
        layer._leaflet_id = vector.body.id,
        allDrawnItems.addLayer(layer),
        layer.bindPopup(popupVectorMenu)
      }

    }).addTo(map);

  });
};


////whenever a new vector is created within the app
map.on('draw:created', function(evt) {

	var layer = evt.layer;
  var shape = layer.toGeoJSON();

	allDrawnItems.addLayer(layer);

//check for parents of created vector and if so then add to targetData

  var targetData = {geometry: shape.geometry, target: {id: imageSelected, formats: imageSelectedFormats}, metadata: imageSelectedMetadata};

  $.ajax({
    type: "POST",
    url: vectorURL,
    async: false,
    data: targetData,
    success: 
      function (data) {
        vectorSelected = data.url;
        targetSelected = data.url;
        targetType = "vector";
      }
  });

  layer._leaflet_id = vectorSelected;
  layer.bindPopup(popupVectorMenu).openPopup();

    if (selectingVector != "") {
      updateVectorSelection(vectorSelected);
    }

});

/////whenever a vector is clicked
allDrawnItems.on('click', function(vec) {

  vectorSelected = vec.layer._leaflet_id;
  targetSelected = vec.layer._leaflet_id;
  targetType = "vector";
//  alert(targetSelected);

  if ((currentlyEditing == true) || (currentlyDeleting == true)) {}

  else {

    if (selectingVector == "") {
      vec.layer.openPopup();
    }
    else {
      updateVectorSelection(vectorSelected);
    }
  };

});

map.on('draw:deletestart', function(){
  currentlyDeleting = true;
});
map.on('draw:deletestop', function(){
  currentlyDeleting = false;
});
map.on('draw:editstart', function(){
  currentlyEditing = true;
});
map.on('draw:editstop', function(){
  currentlyEditing = false;
});

//////update DB whenever vector coordinates are changed
allDrawnItems.on('edit', function(vec){

  var shape = vec.layer.toGeoJSON();

  $.ajax({
    type: "PUT",
    url: vectorSelected,
    async: false,
    data: shape,
    success:
      function (data) {}
  });

});

//////update DB whenever vector is deleted
allDrawnItems.on('remove', function(vec){

  $.ajax({
    type: "DELETE",
    url: vectorSelected,
    success:
      function (data) {}
  });

});

map.on('popupopen', function() {

  $('.openTranscriptionMenu').on("click", function(event) {
    openTranscriptionMenu();
    map.closePopup();
  });

  $('.openTranslationMenu').on("click", function(event) {
    openTranslationMenu();
    map.closePopup();
  });

});


//////TRANSCRIPTIONS

var generatingNewTranscription = false;

var insertSpanDivs = function(textFragment, textParentID) {

  var parentTextBody = textParentID.html();

  beginning

};

//$( "#transcriptionEditor" ).on( "popupafteropen", function( event, ui ) {

//  var editorTarget = targetSelected;
//  var editorTargetType = targetType;

//  generatingNewTranscription = false;


/*
  $( "#popupTranscriptionChildrenMenu" ).on( "popupafteropen", function( event, ui ) {

    targetType = "transcription";

      $('.openTranscriptionMenu').on("click", function(event) {
        openTranscriptionMenu();
        generatingNewTranscription = true;
        //close popup
      });

  });

  $( "#popupTranscriptionChildrenMenu" ).on( "popupafterclose", function( event, ui ) {
      if (generatingNewTranscription = false) {
          targetSelected = editorTarget;
          targetType = editorTargetType;
      };
  });
*/


  $( "#popupTranscriptionNewMenu" ).on( "popupafteropen", function( event, ui ) {

      $('.openTranscriptionMenu').on("click", function(event) {

        alert(textSelectedFragment);
        openTranscriptionMenu();
        generatingNewTranscription = true;
        //close popup
      });

  });

  $( "#popupTranscriptionNewMenu" ).on( "popupafterclose", function( event, ui ) {

      if (generatingNewTranscription = false) {
          targetSelected = editorTarget;
          targetType = editorTargetType;
      };
  });

//});

$('.addTranscriptionSubmit').on("click", function(event) {
  event.preventDefault();
  event.stopPropagation();
  addTranscription(targetSelected)
});

$('#transcriptionCarousel').on('slide.bs.carousel', function (event) {
  var slideID = event.relatedTarget.id;

  if (slideID == 1) {
    //display button to jump to slide 1
    alert("you can make a new one");
  }
  else {
    //display addTranscriptionSubmit button
  };

})



/*
$( "#transcriptionEditor" ).position({
  my: "center",
  at: "center",
  of: "#ViewerBox1"
});
*/

/////TRANSLATIONS

$( "#transcriptionEditor" ).on( "popupafteropen", function( event, ui ) {});

$('.addTranslationSubmit').on("click", function(event) {
  event.preventDefault();
  event.stopPropagation();
  addTranslation(targetSelected)
});

/*
$( "#translationEditor" ).position({
  my: "center",
  at: "center",
  of: "#ViewerBox1"
});
*/


