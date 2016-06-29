
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

//just for testing
//textSelected = "http://127.0.0.1:8080/api/vectors/5770501940cb40851b000001";

//Boolean to indicate if the currently selected text already has children or not
var childrenText = false;

//used to indicate if the user is currently searching for a vector to link or not
var selectingVector = "";

var imageSelected = imageURL.concat(imageViewing);

///Image Handling
var getIIIFjsonURL = function (image_id) {
  imageURL.concat(image_id).concat("/info.json")
};

var currentImage = getIIIFjson(imageSelected);

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

  var theText = JSON.stringify(getTargetJSON(target).body.text);

};

var checkForTranscription = function(target) {

  var targetChecking = getTargetJSON(target);

  var targetTranscription = JSON.stringify(targetChecking.transcription);
  alert(targetTranscription);

  if (targetTranscription == '""') {
    alert("nope no transcription");
    return false;
  }
  else if (targetTranscription == "") {
    alert("nope no transcription");
    return false;
  }
  else {
    return targetTranscription;
  };

};

var checkForTranslation = function(target) {


};

var checkForParent = function(target) {


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

  var targetTranscription = checkForTranscription(target);

  if (targetTranscription == false) {

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
//    $(".voteUp").click(voteUp(target));

  //ADD NEW TRANSCRIPTION
  //open input form

    /*
    $(document).ready(function(){

      $(".addTranscriptionSubmit").click(addTranscription(target));

    });
    */

  //var voteEnabled = checkForVoting(target, targetType, "transcription");
  //if (voteEnabled == true) {
      //VOTING UP
      //VOTING DOWN
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

var checkForVoting = function(target, targetType, parentType) {
  var targetJSON = "";
  if (parentType == "transcription") {
    if (targetType == "vector") {
      targetJSON = getTranscriptionByVector(target);
    }
    else if (targetType == "transcription") {
      targetJSON = getTranscriptionByText(target);
    };
  }
  else if (parentType == "translation") {
    if (targetType == "vector") {
      targetJSON = getTranslationByVector(target);
    }
    else if (targetType == "transcription") {
      targetJSON = getTranslationByText(target);
    };   
  };
  var answer = checkForParent(targetJSON);
  return answer;
};


var addTranscription = function(target){

//  alert("the addTranscription function is running")


  var isItFirst;

  if (checkForTranscription(target) == false) {
    isItFirst = true;
  }
  else {
    isItFirst = false;
  };

  var transcriptionText = $("#transcription").val();
  //alert(transcriptionText);
  var createdTranscription;

  $.ajax({
    type: "POST",
    url: transcriptionURL,
    async: false,
    data: {body: {text: transcriptionText}},
    success: 
      function (data) {
        createdTranscription = data.url;
      }
  });

//  alert(createdTranscription);

  if (textSelected != "") {

    var textSelectedURL = transcriptionURL.concat(target);

//  $.put(createdTranscription, {target: {id: textSelectedURL}, {format: "text Fragment"}}, null);
//  $.put(createdTranscription, {parent: textSelectedURL}, null);

    if (isItFirst == true) {}

//add a new location to the children array of parent text
/*    $.put(   , 
        {children: 
          {id:textSelectedURL
          fragment: {
            id: createdTranscription,
            rank: 1.0}
          }
        })

    }
*/
    else {};

//add to the existing location in the children array of parent text
/*    $.put(   , 
        {children: 
          {id:textSelectedURL
          fragment: {
            id: createdTranscription,
            rank: 1.0}
          }
        })


    };
*/
    textSelected = "";

  }

  else if (vectorSelected != "") {

    var vectorSelectedURL = vectorURL.concat(target);
//  $.put(createdTranscriptionURL, {target: {id: vectorSelectedURL}, {format: "text Fragment"}}, null);

    vectorSelected = "";

  }

  else {
    alert("What are you adding the transcription of?");
  };


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

  $.ajax({
    type: "POST",
    url: vectorURL,
    async: false,
    data: shape,
    success: 
      function (data) {
        vectorSelected = data.url;
      }
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
//  alert(vectorSelected);

  if (selectingVector == "") {
    vec.layer.openPopup();

  }

  else {
    updateVectorSelection(vectorSelected);
  }

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

//JQUERY 

//$('.addTranslationSubmit').click(addTranslation());

$('.votedUp').click(votedUp());

$('.votedDown').click(votedDown());

$('.addTranscriptionSubmit').on("click", function(event) {
  event.preventDefault();
  event.stopPropagation();
  addTranscription(textSelected)
});

$('.addTranslationSubmit').on("click", function(event) {
  event.preventDefault();
  event.stopPropagation();
  addTranslation(textSelected)
});
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
map.on('popupopen', function() {

  $('.openTranscriptionMenu').on("click", function(event) {
    openTranscriptionMenu(vectorSelected, "vector");
  });

  $('.openTranslationMenu').on("click", function(event) {
    openTranslationMenu(vectorSelected, "vector");
  });


});


