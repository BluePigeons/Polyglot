
//The main Annotator script
/*
if (typeof annotator === 'undefined') {
  alert("Oops! it looks like you haven't built Annotator. " +
        "Either download a tagged release from GitHub, or build the " +
        "package by running `make`");
} else {
  var app = new annotator.App();
  app.include(annotator.ui.main);
  app.start();
}
*/
var vectorURL = "http://localhost:8080/api/vectors/";
var transcriptionURL = "http://localhost:8080/api/transcriptions/";
var translationURL = "http://localhost:8080/api/translations/";
var imageURL = "http://lac-luna-test2.is.ed.ac.uk:8181/luna/servlet/iiif/"

var imageViewing = "UoEsha~3~3~54530~102219";

var vectorSelected = "";
//the coordinates of the current vector selected
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

var imageSelected = imageURL.concat(imageViewing);

///Image Handling
var getIIIFjsonURL = function (image_id) {
  imageURL.concat(image_id).concat("/info.json")
};

var currentImage = getIIIFjsonURL(imageSelected);

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

  var bodyText = getTargetJSON(target).body.text;

  alert(bodyText);

  var theText = JSON.stringify(bodyText);

  alert(theText);

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

//    var textSelectedURL = transcriptionURL.concat(textSelected);

//    $.put(textSelectedURL, {target: {id: vectorURL}}, null);
//    $.put(vectorURL, {transcription: textSelectedURL}, null);

//    selectingVector = "";

  }

  else if (selectingVector == "translation") {

//    var textSelectedURL = translationURL.concat(textSelected);

//    $.put(textSelectedURL, {target: vectorURL}, null);
//    $.put(vectorURL, {translation: textSelectedURL});

//    selectingVector = "";

  }

  else {
    return handleError(err);
  }

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

    alert("nothing there");

  }
  else {

    var theText = getBodyText(target);

    alert("this function will display "+theText);

    $("h2.firstTitle").html("TRANSCRIPTION");
    $("textarea.testLoading").html(theText);

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

  var newText = $("#transcription").val();
  var createdTranscription;
  var transcriptionData;
  var targetData;

  if (targetType == "vector") {

    transcriptionData = {body: {text: newText}, target: {id: target, format: "SVG"}};

    targetData = {transcription: createdTranscription};

  }

  else if (targetType == "transcription") {

    transcriptionData = {body: {text: transcriptionText},target: {id: textSelected, format: "text Fragment"},parent: textSelected};

    targetData = {children: {id: textSelected,fragment: {id: createdTranscription,rank: 1.0}}};

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

  alert(targetData);

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

var baseLayer = L.tileLayer.iiif(
  'http://ids.lib.harvard.edu/ids/iiif/25286610/info.json'
).addTo(map);

//initialises layer group called drawItems and adds it to the map - standard Leaflet Draw setup
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var controlOptions = {

    draw: {
// disables the polyline feature as this is unnecessary for annotation of text as it cannot enclose it
        polyline: false,
        marker: false
    },
//passes draw controlOptions to the FeatureGroup of editable layers
    edit: {
        featureGroup: drawnItems        
    }
};

//adds new draw control features to the map
new L.Control.Draw(controlOptions).addTo(map);

////whenever a new vector is created within the app
map.on('draw:created', function(evt) {

	var type = evt.layerType;
	var layer = evt.layer;

	drawnItems.addLayer(layer);

//a new geoJSON file is always created
  var shape = layer.toGeoJSON().geometry;
  currentCoords = shape.coordinates;

  $.ajax({
    type: "POST",
    url: vectorURL,
    async: false,
    data: shape,
    success: 
      function (data) {
        vectorSelected = data.url;
        targetSelected = data.url;
        targetType = "vector";
      }
  });

  var targetData = {target: {id: imageSelected, format: "application/json"}};

  $.ajax({
    type: "PUT",
    url: vectorSelected,
    async: false,
    data: targetData,
    success:
      function (data) {}
  });

  var popupVectorMenu = L.popup()
    .setContent('<div class="openTranscriptionMenu button"><p>TRANSCRIPTION</p></div><br><div data-rel="popup" class="openTranslationMenu button"><p>TRANSLATION</p></div>')

  layer._leaflet_id = vectorSelected;
  layer.bindPopup(popupVectorMenu).openPopup();

    if (selectingVector != "") {
      updateVectorSelection(vectorSelected);
    }

});

/////whenever a vector is clicked
drawnItems.on('click', function(vec) {

  var shape = vec.layer.toGeoJSON();
  var currentCoords = shape.geometry.coordinates;

//find id url of vector selected
  vectorSelected = vec.layer._leaflet_id;
  targetSelected = vec.layer._leaflet_id;
  targetType = "vector";
//  alert(vectorSelected);

  if (selectingVector == "") {
    vec.layer.openPopup();

  }

  else {
    updateVectorSelection(vectorSelected);
  }

});

//////update DB whenever vector coordinates are changed
//drawItems.on();

//////update DB whenever vector is deleted
//drawnItems.on();


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

//JQUERY 

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

map.on('popupopen', function() {

  $('.openTranscriptionMenu').on("click", function(event) {
    openTranscriptionMenu(vectorSelected, "vector");
    map.closePopup();
  });

  $('.openTranslationMenu').on("click", function(event) {
    openTranslationMenu(vectorSelected, "vector");
    map.closePopup();
  });

});


