
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

var imageSelected = "UoEsha~3~3~54530~102219";

var vectorSelected = "";
//the coordinates of the current vector selected
var currentCoords;

var textSelected = "";
var textSelectedFragment = "";
var textTypeSelected = "";

//Boolean to indicate if the currently selected text already has children or not
var childrenText = false;

//used to indicate if the user is currently searching for a vector to link or not
var selectingVector = "";

///Image Handling
var getIIIFjson = function (image_id) {
  imageURL.concat(image_id).concat("/info.json")
};

var currentImage = getIIIFjson(imageSelected);

///// API FUNCTIONS

/*
var getVectorByCRS = function(CRS) {
  var currentCRSurl = vectorURL.concat(CRS);
//  var vector = $.get(currentCRSurl);
//  return vector;
};
*/
var getTranscriptionByVector = function(vector) {
    var targetVectorURL = vectorURL.concat(vector);
//  var vectorParent = $.get(targetVectorURL).transcription;
//    return vectorParent;
};

var getTranslationByVector = function(vector) {
    var targetVectorURL = vectorURL.concat(vector);
//  var vectorParent = $.get(targetVectorURL).translation;
//    return vectorParent;
};

var getTranscriptionByText = function(text) {
    var targetTextURL = transcriptionURL.concat(text);
//    var textParent = $.get(targetTextURL).parent;
//    return textParent;
};

var getTranslationByText = function(text) {
    var targetTextURL = translationURL.concat(text);
//    var textParent = $.get(targetTextURL).parent;
//    return textParent;
};

var checkForTranscription = function(target) {

  field = $.get(target).transcription;
  if (field == "") {
    return false;
  }
  else {
    return field;
  };

};

var checkForTranslation = function(target) {

  field = $.get(target).translation;
  if (field == "") {
    return false;
  }
  else {
    return field;
  };

};

var checkForParent = function(target) {

  field = $.get(target).parent;
  if (field == "") {
    return false;
  }
  else {
    return field;
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


var popupVectorMenu = function (vector) {

  //OPEN TRANSCRIPTION 
  //contains .openTranscriptionMenu

  //OPEN TRANSLATION 
  // contains .openTranslationMenu

/*
  $(document).ready(function(){
    $(".openTranslationMenu").click(openTranslationMenu(vector));
    $(".openTranscriptionMenu").click(openTranscriptionMenu(vector));
  });
*/

};

///// VIEWER WINDOWS

var openTranscriptionMenu = function (target, targetType) {

  if (checkForTranscription(target) == false) {

    //display textarea blank and open input form

  };

  var theText = viewTranscription(target, targetType);

  //set textarea contents to theText
  //load display of children transcriptions highlighted

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

var viewTranscription = function(target, targetType) {
  var transcriptionText = "";

  if (targetType == "vector") {
    transcriptionText = getTranscriptionByVector(target).body.text;
  }
  else if (targetType == "transcription") {
    transcriptionText = getTranscriptionByText(target).body.text;
  }
  else {
    alert("What are you viewing the transcription of?")
  };

  return transcriptionText;
};

var viewTranslation = function() {

};


var addTranscription = function(target){
/*
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

  $.post(
    transcriptionURL,
    {body: {text: transcriptionText}},
    function (data) {
      createdTranscription = data;
    }
  );

  var createdTranscriptionURL = transcriptionURL.concat(createdTranscription);

  if (textSelected != "") {

    var textSelectedURL = transcriptionURL.concat(target);

//  $.put(createdTranscriptionURL, {target: {id: textSelectedURL}, {format: "text Fragment"}}, null);
//  $.put(createdTranscriptionURL, {parent: textSelectedURL}, null);

    if (isItFirst == true) {

//add a new location to the children array of parent text
/*    $.put(   , 
        {children: 
          {id:textSelectedURL
          fragment: {
            id: createdTranscriptionURL,
            rank: 1.0}
          }
        })

    }

    else {

//add to the existing location in the children array of parent text
/*    $.put(   , 
        {children: 
          {id:textSelectedURL
          fragment: {
            id: createdTranscriptionURL,
            rank: 1.0}
          }
        })


    };

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

*/
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

//JQUERY 

//$('.addTranslationSubmit').click(addTranslation());

$('.votedUp').click(votedUp());

$('.votedDown').click(votedDown());

$("#addTranscriptionSubmit").on("click", addTranscription("http://127.0.0.1:8080/api/vectors/5770501940cb40851b000001"));

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
    url: "http://localhost:8080/api/vectors",
    async: false,
    data: shape,
    success: 
      function (data) {
        vectorSelected = data.field;

      }
  });

  var vectorSelectedURL = vectorURL.concat(vectorSelected);

    if (selectingVector != "") {
      updateVectorSelection(vectorSelectedURL);
    }

});

/////whenever a vector is clicked
drawnItems.on('click', function(vec) {

  var shape = vec.layer.toGeoJSON();
  var currentCoords = shape.geometry.coordinates;

  //alert(currentCRS);

//find id of vector selected
  vectorSelected = getVectorByCRS(currentCRS)._id;
  var vectorSelectedURL = vectorURL.concat(vectorSelected);

  if (selectingVector == "") {
    popupVectorMenu(vectorSelectedURL);
  }

  else {
    updateVectorSelection(vectorSelectedURL);
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

