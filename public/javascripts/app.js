

var currentWebsite = window.location.href;
//alert(currentWebsite);

var websiteAddress = "http://localhost:8080";

var vectorURL = websiteAddress.concat("/api/vectors/");
var transcriptionURL = websiteAddress.concat("/api/transcriptions/");
var translationURL = websiteAddress.concat("/api/translations/");

//because LUNA API is questionable currently using from database but will change later
var imageDevURL = "http://localhost:8080/api/images_api/"

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

var bodySelected = ""; 
var bodyType = "";

//Boolean to indicate if the currently selected text already has children or not
var childrenText = false;

//used to indicate if the user is currently searching for a vector to link or not
var selectingVector = "";

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

//currently hardcoded for testing
imageSelected = 'http://ids.lib.harvard.edu/ids/iiif/25286610/info.json';
imageSelectedFormats = "jpg";

var loadImage = function(image_id) {

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

var popupTranscriptionChildrenMenu = function () {

  var textSelectedURL = transcriptionURL.concat(textSelected);

  //VIEW OTHER TRANSCRIPTIONS
  //openTranscriptionMenu(textSelectedURL);

};

var popupTranscriptionMenu = function () {

  var textSelectedURL = transcriptionURL.concat(textSelected);

  //ADD NEW TRANSCRIPTION
  //openTranscriptionMenu(textSelectedURL);

};

var popupTranslationChildrenMenu = function () {

  var textSelectedURL = translationURL.concat(textSelected);

  //VIEW OTHER TRANSLATIONS
  //openTranslationMenu(textSelectedURL);

};

var popupTranslationMenu = function () {

  var textSelectedURL = translationURL.concat(textSelected);

  //ADD NEW TRANSLATION
  //openTranslationMenu(textSelectedURL);

};

///// VIEWER WINDOWS

var openTranscriptionMenu = function (target, targetType) {

  //jquery to generate new window
  //open in centre third or right third?
  //trigger closing of other windows?

  var targetsTranscription = checkForTranscription(target);

  if (targetsTranscription == false) {



  }
  else {

    var theText = getBodyText(targetsTranscription);
    alert(theText);

    $("#firstTitle").val("TRANSCRIPTION");
    $("#testLoading").val(theText);

  };

  //META DATA OPTIONS

  //LINK VECTOR 

//    $(".linkVectorTranscription").click(linkVectorTranscription(target));

  //ADD NEW TRANSCRIPTION
  //open input form

//      $(".addTranscriptionSubmit").click(addTranscription(target));

  //var voteEnabled = checkForParent(target);
  //if (voteEnabled != false) {
      //VOTING UP
      //    $(".voteUp").click(voteUp(target));
      //VOTING DOWN
      //    $(".voteDown").click(voteDown(target));
//  };

};


var openTranslationMenu = function (target) {



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

  var newText = $("#transcription").val();
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

  $("#transcription").val('');
  $('#testLoading').val(newText);

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

  targetSelected = "";
  targetType = "";
  newText = "";

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
var map;

//IIIF Viewer initial settings

map = L.map('map', {
  center: [0, 0],
  crs: L.CRS.Simple,
  zoom: 0
});

var baseLayer = L.tileLayer.iiif(imageSelected).addTo(map);

//need to adjust settings to account for viewport size

var drawnItems = new L.FeatureGroup();
var oldDrawnItems = new L.FeatureGroup();
var allDrawnItems = new L.FeatureGroup();
allDrawnItems.addLayer(drawnItems);
allDrawnItems.addLayer(oldDrawnItems);
map.addLayer(allDrawnItems);

var controlOptions = {
    draw: {
// disables the polyline and marker feature as this is unnecessary for annotation of text as it cannot enclose it
        polyline: false,
        marker: false,
//disabling polygons and circles as IIIF image region API does not specify how to encode anything but rectangular regions
        polygon: false,
        circle: false
    },
//passes draw controlOptions to the FeatureGroup of editable layers
    edit: {
        featureGroup: drawnItems,
    }
};

//adds new draw control features to the map
new L.Control.Draw(controlOptions).addTo(map);

var popupVectorMenu = L.popup()
    .setContent('<div class="openTranscriptionMenu button"><p>TRANSCRIPTION</p></div><br><div data-rel="popup" class="openTranslationMenu button"><p>TRANSLATION</p></div>')

//to track when editing
var currentlyEditing = false;
var currentlyDeleting = false;

var existingVectors = getImageVectors(imageSelected);

//load the existing vectors
if (existingVectors != false) {
  existingVectors.forEach(function(vector) {

    var existingVectorFeature = L.geoJson();
    oldFeature = ({
      "type": "Feature",
      "properties":{},
      "geometry":{
        "type": vector.notFeature.notGeometry.notType,
        "coordinates": [vector.notFeature.notGeometry.notCoordinates]
      }
    });
    existingVectorFeature.addData(oldFeature);
    oldDrawnItems.addLayer(existingVectorFeature);
    existingVectorFeature.bindPopup(popupVectorMenu);
  });
};

oldDrawnItems.on('load', function(){
  oldDrawnItems.eachFeature(function(layer){
    drawItems.addLayer(layer);
  })
});

////whenever a new vector is created within the app
map.on('draw:created', function(evt) {

	var layer = evt.layer;
  var shape = layer.toGeoJSON();

	drawnItems.addLayer(layer);

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
  alert(targetSelected);

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

  var vectorInUse = this;

  $('.openTranscriptionMenu').on("click", function(event) {
    openTranscriptionMenu(vectorSelected, "vector");
    map.closePopup();
  });

  $('.openTranslationMenu').on("click", function(event) {
    openTranslationMenu(vectorSelected, "vector");
    map.closePopup();
  });

});

///// TEXT SELECTION

//whenever text is selected in 


/*if (window.getSelection) {
    textSelected = window.getSelection().toString();
} 
else if (document.selection && document.selection.type != "Control") {
    textSelected = document.selection.createRange().textSelected;
};

function selectingText() {
  alert(textSelected);
};

var elem = document.getElementById('thing');
elem.addEventListener('select', function() {
  alert('Selection changed!');
}, false);



var gettext = (function () {
    if (typeof global.Gettext === 'function') {
        var _gettext = new global.Gettext({domain: "annotator"});
        return function (msgid) { return _gettext.gettext(msgid); };
    }

    return function (msgid) { return msgid; };
}());
*/


//look up parent text JSON for target

//store fragment selector info as textSelected

//trigger popup

///////JQUERY 

$('.addTranscriptionSubmit').on("click", function(event) {
  event.preventDefault();
  event.stopPropagation();
  addTranscription(targetSelected)
});

$('.addTranslationSubmit').on("click", function(event) {
  event.preventDefault();
  event.stopPropagation();
  addTranslation(targetSelected)
});

$('textarea').on("click", function(event) {
  event.preventDefault();
  event.stopPropagation();
//  targetSelected = textarea;
})
/*
$('.openTranscriptionMenu').on("click", function(event) {
  event.preventDefault();
  event.stopPropagation();
  openTranscriptionMenu(textSelected,"text");
});

$('.openTranslationMenu').on("click", function(event) {
  event.preventDefault();
  event.stopPropagation();
  openTranslationMenu(textSelected, "text");
});
*/

//whenever the transcription or translation viewer is clicked on, or any child DOMs then the target selected has to change to their target
//$('')


