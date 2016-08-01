

var currentWebsite = window.location.href;
var websiteAddress = "http://localhost:8080";

var rejectionOptions = new Set(["false",'""' , null , false , 'undefined']);
var vectorURL = websiteAddress.concat("/api/vectors/");
var transcriptionURL = websiteAddress.concat("/api/transcriptions/");
var translationURL = websiteAddress.concat("/api/translations/");

var addNewAnnoHTML = "<div class='item addNewItem'> <div class='addNewContainer'> <h3>Add New</h3> <textarea class='newAnnotation' rows='5'></textarea><br><button type='button' class='btn addAnnotationSubmit'>SUBMIT</button><br>   </div>  </div>";
var voteButtonsHTML = "<div  ><button type='button' class='btn btn-default voteBtn votingUpButton'><span class='badge'></span><span class='glyphicon glyphicon-plus' aria-hidden='true' ></span></button></div>";
//var metaHTML = ; ///////////

var imageSelected; //info.json format URL
var imageSelectedFormats;
var imageSelectedMetadata = [];

var vectorSelected = ""; //API URL
var vectorSelectedParent; //API URL
var currentCoords;

var textSelected = ""; //API URL
var textSelectedParent = ""; //API URL
var textSelectedID; //DOM id
var textSelectedHash; //parent API URL + ID
var textSelectedFragment; //HTML Selection Object
var textTypeSelected = "";

//URLs
var targetSelected; //array
var targetType = ""; 
var childrenArray;

var editorsOpen = []; //those targets currently open in editors
var selectingVector = false; //used to indicate if the user is currently searching for a vector to link or not
var findingcookies = document.cookie;

///// TEXT SELECTION

var outerElementTextIDstring;
var newContent;
var newNodeInsertID;
var startParentID;

var isUseless = function(something) {
  if (rejectionOptions.has(something) || rejectionOptions.has(typeof something)) {  return true;  }
  else {  return false;  };
};

var getTargetJSON = function(target) {

  if ( isUseless(target) ) { return null;  }
  else {
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
};

var updateAnno = function(targetURL, targetData) {
  $.ajax({
    type: "PUT",
    url: targetURL,
    async: false,
    dataType: "json",
    data: targetData,
    success:
      function (data) {  }
  });
};

var fieldMatching = function(searchArray, field, fieldValue) {
  if (isUseless(searchArray) || isUseless(field) || isUseless(fieldValue)) {  return false  }
  else {
    var theMatch = false; 
    searchArray.forEach(function(childDoc){
      if (childDoc[field] == fieldValue) {
          theMatch = childDoc;
      };
    });
    return theMatch;
  };
};

var asyncPush = function(addArray, oldArray) {
    var theArray = oldArray;
    var mergedArray = function() {
        addArray.forEach(function(addDoc){
            theArray.push(addDoc);
        });
        if (theArray.length = (oldArray.length + addArray.length)) {
            return theArray;
        };
    };
    return mergedArray();
};

var arrayIDCompare = function(arrayA, arrayB) {
  return arrayA.forEach(function(doc){
    var theCheck = fieldMatching(arrayB, "id", arrayA.id);
    if (  isUseless(theCheck) ) { return false }
    else {
      return [doc, theCheck];
    };
  });
};

var findField = function(target, field) {
  if ( isUseless(field) || isUseless(target) || isUseless(target[field])  ) {  return false  } 
  else {  return target[field] }; 
};

var checkFor = function(target, field) {
  var theChecking = getTargetJSON(target);
  return findField(theChecking, field);
};

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

var insertSpanDivs = function() {
  $(outerElementTextIDstring).html(newContent); 
  textSelectedID = newNodeInsertID;
};

var findBaseURL = function() {
  if (textTypeSelected == "transcription") {  return transcriptionURL;  }
  else if (textTypeSelected == "translation") {  return translationURL;  };
};

var newAnnotationFragment = function(baseURL) {

  textSelectedHash = textSelectedParent.concat("#"+textSelectedID); //need to refer specifically to body text of that transcription - make body independent soon so no need for the ridiculously long values??
  targetSelected = [textSelectedHash];
  var targetData = {body: {text: textSelectedFragment.toString(), format: "text/html"}, target: [{id: textSelectedHash, format: "text/html"}], parent: textSelectedParent};
  
  $.ajax({
    type: "POST",
    url: baseURL,
    async: false,
    data: targetData,
    success: 
      function (data) {
        textSelected = data.url;
      }
  });

  var newHTML = $(outerElementTextIDstring).html();
  var parentData = {body: {text: newHTML}, children: [{id: textSelectedID, fragments: [{id: textSelected}]}]};
  updateAnno(textSelectedParent, parentData);

};

var findClassID = function(classString, IDstring) {
  var IDindex = classString.search(IDstring) + IDstring.length;
  var IDstart = classString.substring(IDindex);
  var theID = IDstart.split(" ", 1);
  return theID[0];
};

var setTextSelectedID = function(theText) {
  var theTarget = fieldMatching(checkFor(theText, "target"), "format", "text/html");
  if ( theTarget != false ) { 
    textSelectedHash = theTarget.id;
    textSelectedID = textSelectedHash.substring(textSelectedParent.length + 1); //the extra one for the hash        
  };
};

var searchCookie = function(field) {
  var fieldIndex = findingcookies.lastIndexOf(field);
  if (fieldIndex == -1) {  return false;  }
  else {
    var postField = findingcookies.substring(fieldIndex+field.length);
    var theValueEncoded = postField.split(";", 1);
    var theValue = theValueEncoded[0];
    return theValue;
  };
};

var checkForVectorTarget = function(theText) {
  var theChecking = checkFor(theText, "target");
  if (  isUseless(theChecking[0])  ) { return false } 
  else {   return fieldMatching(theChecking, "format", "SVG").id;  };
};

var lookupTargetChildren = function(target, baseURL) {
  var childTexts;
  var targetParam = encodeURIComponent(target);
  var aSearch = baseURL.concat("targets/"+targetParam);
  $.ajax({
    type: "GET",
    dataType: "json",
    url: aSearch,
    async: false,
    success: 
      function (data) {
        childTexts = data.list;
      }
  });
  return childTexts;
};

var updateVectorSelection = function(vectorURL) {

  var textData = {target: {id: vectorURL, format: "SVG"}};
  var vectorData = {};
  vectorData[textTypeSelected] = textSelected;
  selectingVector.forEach(function(child){
    updateAnno(child.body.id, textData);
  });
  updateAnno(vectorURL, vectorData);
  selectingVector = false;

};

var votingFunction = function(vote, votedID, currentTopText) {
  var baseURL = findBaseURL();
  var theVote = baseURL + "voting/" + vote;
  var targetID = baseURL.concat(votedID);; ///API URL of the annotation voted on
  var outerSpanOpen = "<a class='"+textTypeSelected+"-text open"+textTypeSelected+"ChildrenPopup' id='"+ textSelectedID + "' >";
  var votedTextBody = $(votedID).html(); 
  var currentText = outerSpanOpen + currentTopText + "</a>"; ///current most voted at that location, includes outerHTML
  var votedText = outerSpanOpen + votedTextBody + "</a>"; ///text just voted on, includes outerHTML
  var targetData = {
    parent: textSelectedParent, ///it is this that is updated containing the votedText within its body
    children: [{
      id: textSelectedID, //ID of span location
      fragments: [{
        id: targetID
      }]
    }],
    votedText: votedText,  topText: currentText
  };
  var updatedTranscription;

  $.ajax({
    type: "PUT",
    url: theVote,
    async: false,
    dataType: "json",
    data: targetData,
    success:
      function (data) {
        updatedTranscription = data.reloadText;
      }
  });

////if the highest ranking has changed
///////rebuild carousel with new textSelected
///////if the parent is open in an editor rebuild carousel with new transcription 

};

var findHighestRankingChild = function(parent, locationID) {
  var theLocation = fieldMatching(getTargetJSON(parent).children, "id", locationID);
  var the_child = fieldMatching(theLocation.fragments, "rank", 0); 
  return findField(the_child, "id");
};

var loadImage = function() {
  imageSelected = searchCookie("imageviewing=");
  var theImage = getTargetJSON(imageSelected);
  imageSelectedFormats = theImage.formats;
  imageSelectedMetadata = theImage.metadata;
};

///// VIEWER WINDOWS

var setChildrenArray = function() {
  return childrenArray = lookupTargetChildren(targetSelected[0], findBaseURL()); //////setting childrenArray
};

var buildCarousel = function(existingChildren, popupIDstring, extraHTML) {

  var openingHTML = "<div class='item pTextDisplayItem'> <div class='pTextDisplay'> <div class='well well-lg'> <p id='";
  var middleHTML = "' class='content-area' title='X '>";
  var endTextHTML = "</p></div>";
  var endDivHTML = "</div></div>";
  var closingHTML = endTextHTML + extraHTML + endDivHTML;

  existingChildren.forEach(function(subarray) {

    var itemText = subarray[0].body.text;
    var itemID = subarray[0]._id;
    var itemHTML = openingHTML + itemID + middleHTML + itemText + closingHTML;
    $(popupIDstring).find(".editorCarouselWrapper").append(itemHTML);
/////////find votes up for badges
///////////////////for some reeeaalllly inexplicable reason this isn't working
  /*  if ((typeof subarray[1] == null || subarray[1] == 'undefined') || (typeof subarray[1].votingInfo == null || subarray[1].votingInfo == 'undefined')) {} 
    else {
      var votesUp = subarray[1].votingInfo.votesUp;
      $(popupIDstring).find(".votingUpButton").find(".badge").val(votesUp);
      var votesDown = subarray[1].votingInfo.votesDown;
      $(popupIDstring).find(".votingDownButton").find(".badge").val(votesDown);
    }; */
/////////update metadata options with defaults and placeholders???    
  });

};

var highlightTopVoted = function() {
  var theTextString = "#" + textSelected.slice(findBaseURL().length, textSelected.length);
  $(theTextString).parent().parent().parent().addClass("active"); //ensures it is the first slide people see
  $(theTextString).addClass("currentTop");
///////////choose better styling later!!!!!///////
  $(theTextString).css("color", "grey");
  $(theTextString).parent().parent().append("<h4>Most Popular</h4>");
};

var canLink = function(popupIDstring) {
  if (targetType.includes("vector") == false){ 
    var linkButtonHTML = "<button type='button' class='btn linkBtn'>Link Vector</button><br>";
    $(popupIDstring).find(".textEditorMainBox").append(linkButtonHTML);
  };
};

var canVoteAdd = function(popupIDstring, theVectorParent) {
  //if it is targeting it's own type OR it is targeting a vector with parents THEN you can vote and add
  if ( targetType.includes(textTypeSelected) || ( ( targetType.includes("vector") ) && ( isUseless(theVectorParent) == false ) ) ) { 
    $(popupIDstring).find(".editorCarouselWrapper").append(addNewAnnoHTML);
    return voteButtonsHTML; ///////metadata stuff too!!!!!!!
  }
  else {
    $(popupIDstring).find(".carousel-control").css("display", "none");
    return "";
  };
};

var addCarouselItems = function(popupIDstring) {
  var theVectorParent = checkFor(vectorSelected, "parent");
  if (  isUseless(childrenArray[0]) && isUseless(theVectorParent) ) {
    $(popupIDstring).find(".editorCarouselWrapper").append(addNewAnnoHTML);
    $(popupIDstring).find(".addNewItem").addClass("active");
    $(popupIDstring).find(".carousel-control").css("display", "none");
  }
  else {
    var theExtras = canVoteAdd(popupIDstring, theVectorParent);
    buildCarousel(childrenArray, popupIDstring, theExtras);
    highlightTopVoted();
  };
};

var updateEditor = function(popupIDstring) {
  $(popupIDstring).find("#theEditor").attr("id", "newEditor");
  $(popupIDstring).find(".editorTitle").html(textTypeSelected.toUpperCase());
  $(".textEditorPopup").draggable();
  $(".textEditorPopup").draggable({
    handle: ".popupBoxHandlebar"
  });
  canLink(popupIDstring);
  setChildrenArray();
  addCarouselItems(popupIDstring);
  $(popupIDstring).find(".textEditorMainBox").find('*').addClass(textTypeSelected+"-text"); 
};

var addEditorsOpen = function(popupIDstring) {
  return editorsOpen.push({
    "editor": popupIDstring,
    "typesFor": targetType,
    "vSelected": vectorSelected,
    "tSelectedParent": textSelectedParent,
    "tSelectedID": textSelectedID,
    "tSelectedHash": textSelectedHash,
    "tTypeSelected": textTypeSelected,
    "children": childrenArray
  });
};

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

var openEditorMenu = function() {

  var popupIDstring = createEditorPopupBox();
  $('.opentranscriptionChildrenPopup').popover({ 
    trigger: 'manual',
    placement: 'top',
    html : true,
    title: "  ",
    content: function() {
      return $('#popupTranscriptionChildrenMenu').html();
    }
  });
  updateEditor(popupIDstring); 
  addEditorsOpen(popupIDstring); 

};

var removeEditorChild = function(thisEditor) {
  var theParent = document.getElementById("ViewerBox1");
  var toRemove = document.getElementById(thisEditor);
  theParent.removeChild(toRemove);
  if (  isUseless(toRemove) != true ) {  return thisEditor;  };
};

var removeEditorsOpen = function(popupIDstring) {
  var theEditorItem = fieldMatching(editorsOpen, "editor", popupIDstring);
  var currentIndex = editorsOpen.indexOf(theEditorItem); 
  editorsOpen.splice(currentIndex,1);
};

var closeEditorMenu = function(thisEditor) {
  removeEditorsOpen(thisEditor);
  return removeEditorChild(thisEditor);
};

var findNewTextData = function(editorString) {

  var newText = $(editorString).find(".newAnnotation").val();
  var textData = {body: {text: newText, format: "text"}, target: []};

  if (targetType.includes("vector") == true) {
    textData.target.push({id: vectorSelected, format: "image/SVG"});
  };

  if (targetType.includes(textTypeSelected) == true) {
      textData.target.push({id: textSelectedHash, format: "text/html"});
      textData.parent = textSelectedParent;
  }
  else if (targetType.includes(textTypeSelected) == false) {
      //textData.target.push({id: ???, format: "text/html"});
  };

  if (textData.target[0] != 'undefined') {
    return textData;
  };
  
};

var addAnnotation = function(thisEditor){

  var editorString = "#" + thisEditor;
  var createdText;

  $.ajax({
    type: "POST",
    url: findBaseURL(),
    async: false,
    data: findNewTextData(editorString),
    success: 
      function (data) {
        createdText = data.url;
      }
  });

  $(editorString).find(".newAnnotation").val("");  
  if (targetType.includes(textTypeSelected)==true) {
    var targetData = {children: [{id: textSelectedID, fragments: [{id: createdText}] }]};
    updateAnno(textSelectedParent, targetData);
  };
  if ((targetType.includes("vector")==true) && (  isUseless(childrenArray[0]) )) {
    var targetData = {};
    targetData[textTypeSelected] = createdText;
    updateAnno(vectorSelected, targetData);
  };

  //rebuild editor 
  closeEditorMenu(thisEditor);
/////////reset variables......?
  openEditorMenu(); 
};

var setTargets = function() {
 
  if (  isUseless(vectorSelected) ){ 
    targetSelected = [textSelectedHash];
    targetType = textTypeSelected;
  }
  else if ( isUseless(textSelected) || isUseless(textSelectedParent) ) { 
    targetSelected = [vectorSelected];
    targetType = "vector";
  }
  else {
    targetSelected = [textSelectedHash, vectorSelected];
    targetType = "vector " + textTypeSelected;
  };
};

var openNewEditor = function(fromType) {

  if (fromType == "vector") {
    textSelected = checkFor(vectorSelected, textTypeSelected); //return the api url NOT json file
    textSelectedParent = checkFor(textSelected, "parent");
    if ( textSelected != false ) { setTextSelectedID(textSelected) };
  }
  else if (fromType == "text") {
    textSelected = findHighestRankingChild(textSelectedParent, textSelectedID);
    vectorSelected = checkForVectorTarget(textSelected); 
  };
  setTargets();
  openEditorMenu();
};

var checkEditorsOpen = function(fromType, textType) {
  textTypeSelected = textType;
  if (editorsOpen == null || editorsOpen == 'undefined') {    openNewEditor(fromType);  }
  else {
    var canOpen = true;
    editorsOpen.forEach(function(editorOpen){
      if ( ((editorOpen[vectorSelected] == vectorSelected)||(editorOpen[textSelectedParent] == textSelectedParent)) && (editorOpen[textTypeSelected] == textType)){
        $(editorOpen.editor).effect("shake");
        canOpen = false;
      };
    });
    if (canOpen == true) {  openNewEditor(fromType) };
  };
};

///////LEAFLET 

loadImage(findingcookies);
var map;
var baseLayer;
var allDrawnItems = new L.FeatureGroup();
var controlOptions = {
    draw: {
        polyline: false,  //disables the polyline and marker feature as this is unnecessary for annotation of text as it cannot enclose it
        marker: false,
        polygon: false, //disabling polygons and circles as IIIF image region API does not specify how to encode anything but rectangular regions
        circle: false
    },
    edit: {
        featureGroup: allDrawnItems, //passes draw controlOptions to the FeatureGroup of editable layers
    }
};

var popupVectorMenuHTML = function() {
  var openHTML = "<div class='popupAnnoMenu'>";
  var transcriptionOpenHTML = "<a class='openTranscriptionMenu ui-btn ui-corner-all ui-shadow ui-btn-inline'>TRANSCRIPTION</a><br>";
  var translationOpenHTML = "<a class='openTranslationMenu ui-btn ui-corner-all ui-shadow ui-btn-inline'>TRANSLATION</a>";
  var endHTML = "</div>";
  var totalHTML = openHTML + transcriptionOpenHTML + translationOpenHTML + endHTML;
  /////this as a function instead of one line string allows for flexibility during development but may fix later 
  return totalHTML;
};

var popupVectorMenu = L.popup()
    .setContent(popupVectorMenuHTML());
//to track when editing
var currentlyEditing = false;
var currentlyDeleting = false;
var existingVectors = lookupTargetChildren(imageSelected, vectorURL);

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

var tempGeoJSON = {  "type": "Feature",  "properties":{},  "geometry":{}  };

//load the existing vectors
if (existingVectors != false) {
  existingVectors.forEach(function(vector) {

    var oldData = tempGeoJSON;
    oldData.geometry.type = vector.notFeature.notGeometry.notType;
    oldData.geometry.coordinates = [vector.notFeature.notGeometry.notCoordinates];
    oldData.properties.transcription = findField(vector, "transcription");
    oldData.properties.translation = findField(vector, "translation");
    oldData.properties.parent = findField(vector, "parent");

    var existingVectorFeature = L.geoJson(oldData, 
      { onEachFeature: function (feature, layer) {
          layer._leaflet_id = vector.body.id,
          allDrawnItems.addLayer(layer),
          layer.bindPopup(popupVectorMenu)
          }
      }).addTo(map);

  });
};

var findVectorParent = function(coordinatesArray, parentCoordsArray) {
  var xBounds = [ parentCoordsArray[0][0], parentCoordsArray[2][0] ];
  var yBounds = [ parentCoordsArray[0][1], parentCoordsArray[2][1] ];
  var counter = 0;
  coordinatesArray.forEach(function(pair){
    if (  (xBounds[0] <= pair[0] <= xBounds[1]) && (yBounds[0] <= pair[1] <= yBounds[1])  ) {  counter += 1;  };
  });
  if (counter >= 3) {  return true;  }
  else {  return false;  };
};

var searchForVectorParents = function(allDrawnItems, theCoordinates) {
  var overlapping = false;
  allDrawnItems.forEach(function(drawnItem){
    var check = findVectorParent(theCoordinates, drawnItem.geometry.coordinates);
    if (check == true) {  overlapping = drawnItem.body.id;  };
  });
  return overlapping;
};

map.on('draw:created', function(evt) {

	var layer = evt.layer;
  var shape = layer.toGeoJSON();
  var vectorOverlapping = false;
  //var vectorOverlapping = searchForVectorParents(allDrawnItems, shape.geometry.coordinates[0]);
  if (  (vectorOverlapping != false) && (selectingVector == false)  ) {    }
  else {
    allDrawnItems.addLayer(layer);
    var targetData = {geometry: shape.geometry, target: {id: imageSelected, formats: imageSelectedFormats}, metadata: imageSelectedMetadata, parent: vectorOverlapping };
    $.ajax({
      type: "POST",
      url: vectorURL,
      async: false,
      data: targetData,
      success: 
        function (data) {
          vectorSelected = data.url;
        }
    });
    layer._leaflet_id = vectorSelected;
    layer.bindPopup(popupVectorMenu).openPopup();
    if (selectingVector != false) {  
      vectorSelectedParent = vectorOverlapping;
      updateVectorSelection(vectorSelected);  
    };
  };

});

/////whenever a vector is clicked
allDrawnItems.on('click', function(vec) {

  vectorSelected = vec.layer._leaflet_id;
  if ((currentlyEditing == true) || (currentlyDeleting == true)) {}
  else if (selectingVector != false) {  updateVectorSelection(vectorSelected);  }
  else {  vec.layer.openPopup();  };

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
  updateAnno(vectorSelected, shape);
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

  $('.openTranscriptionMenu').one("click", function(event) {
    checkEditorsOpen("vector", "transcription");
    map.closePopup();
  });

  $('.openTranslationMenu').one("click", function(event) {
    checkEditorsOpen("vector", "translation");
    map.closePopup();
  });

});

///////ANNOTATION EDITORS

var newSpanClass = function(startParentClass) {
  if (startParentClass.includes('transcription-text')) {
    return "transcription-text opentranscriptionChildrenPopup";
  }
  else if (startParentClass.includes('translation-text')) {
    return "translation-text opentranslationChildrenPopup";
  }
  else {
    alert("Please select transcription translation text");
    return null;
  };
};

var strangeTrimmingFunction = function(thetext) {
  if(thetext && (thetext = new String(thetext).replace(/^\s+|\s+$/g,''))) {
    return thetext.toString();
  }; 
};

$(document).ready(function() { ////necessary???
  $('#page_body').on("mouseup", '.content-area', function(event) {

    var selection = getSelected(); 
    var classCheck = selection.anchorNode.parentElement.className;

    if (classCheck.includes('openTranscriptionMenuOld')) { 

      textSelectedID = startParentID;
      if ($(outerElementTextIDstring).parent().attr('id') != (null || 'undefined' || false
        )){
        textSelectedParent = findBaseURL() + $(outerElementTextIDstring).parent().attr('id'); 
      };
      textSelectedHash = textSelectedParent.concat("#"+textSelectedID);

      checkEditorsOpen("text", "transcription");

      $('.opentranscriptionChildrenPopup').popover('hide');

    }   

    else {

      var startNode = selection.anchorNode; // the text type Node that the beginning of the selection was in
      var startNodeText = startNode.textContent; // the actual textual body of the startNode - removes all html element tags contained
      var startNodeTextEndIndex = startNodeText.toString().length;
      startParentID = startNode.parentElement.id;
      var startParentClass = startNode.parentElement.className;

      var nodeLocationStart = selection.anchorOffset; //index from within startNode text where selection starts
      var nodeLocationEnd = selection.focusOffset; //index from within endNode text where selection ends

      var endNode = selection.focusNode; //the text type Node that end of the selection was in 
      var endNodeText = endNode.textContent;
      var endParentID = endNode.parentElement.id; //the ID of the element type Node that the text ends in

      outerElementTextIDstring = "#" + startParentID; //will be encoded URI of API?

      if (classCheck.includes('opentranscriptionChildrenPopup')) { 
        $('.opentranscriptionChildrenPopup').popover('show');
      }
      else if (classCheck.includes('opentranslationChildrenPopup')) { 
        $('.opentranslationChildrenPopup').popover('show');
      }
      else if (startParentID != endParentID) {
        alert("you can't select across existing fragments' borders sorry");
      }
      else {

        newNodeInsertID = Math.random().toString().substring(2);

        var newSpan = "<a class='" + newSpanClass(startParentClass) + "' id='" + newNodeInsertID + "' >" + selection + "</a>";
        var currentTextString = strangeTrimmingFunction(selection);
     
        var outerElementHTML = $(outerElementTextIDstring).html().toString(); //includes any spans that are contained within this selection 

        ///CONTENT BEFORE HIGHLIGHT IN THE TEXT TYPE NODE
        var previousSpanContent = startNodeText.slice(0, nodeLocationStart);

        //CONTENT BEFORE HIGHLIGHT IN THE ELEMENT TYPE NODE
        var previousSpan = startNode.previousElementSibling; //returns null if none i.e. this text node is first node in element node
        var outerElementStartContent;
        if (previousSpan == "null" || previousSpan == null) {outerElementStartContent = previousSpanContent}
        else {
          var previousSpanAll = previousSpan.outerHTML;
          var StartIndex = outerElementHTML.indexOf(previousSpanAll) + previousSpanAll.length;
          outerElementStartContent = outerElementHTML.slice(0, StartIndex).concat(previousSpanContent);
        };

        ///CONTENT AFTER HIGHLIGHT IN THE TEXT TYPE NODE
        var nextSpanContent;
        if (endNode == startNode) { nextSpanContent = startNodeText.slice(nodeLocationEnd, startNodeTextEndIndex)}
        else {nextSpanContent = endNodeText.slice(0, nodeLocationEnd)};

        ///CONTENT AFTER HIGHLIGHT IN ELEMENT TYPE NODE
        var nextSpan = endNode.nextElementSibling; //returns null if none i.e. this text node is the last in the element node
        var outerElementEndContent;
        if (nextSpan == "null" || nextSpan == null) {outerElementEndContent = nextSpanContent}
        else {
          var nextSpanAll = nextSpan.outerHTML;
          var EndIndex = outerElementHTML.indexOf(nextSpanAll);
          outerElementEndContent = nextSpanContent.concat(outerElementHTML.substring(EndIndex));
        };

        newContent = outerElementStartContent + newSpan + outerElementEndContent;
        textSelectedFragment = currentTextString;

        $(outerElementTextIDstring).popover({ 
          trigger: 'manual',
          placement: 'top',
          html : true,
          container: 'body',
          title: "  ",
          content: function() {
            return $('#popupTranscriptionNewMenu').html();
          }
        });

        $(outerElementTextIDstring).popover('show');

        $(outerElementTextIDstring).on("shown.bs.popover", function(event) {

          $('#page_body').on("click", function(event) {
            if ($(event.target).hasClass("popupAnnoMenu") == false) {
              $(outerElementTextIDstring).popover("hide");
            }
          });

          $('.openTranscriptionMenuNew').one("click", function(event) {
            insertSpanDivs();
            textSelectedParent = transcriptionURL.concat(startParentID);
            newAnnotationFragment(transcriptionURL);
            textTypeSelected = "transcription";
            targetType = "transcription";
            openEditorMenu();
            $(outerElementTextIDstring).popover('hide');    
          });

          $('.closeThePopover').on("click", function(event){
            $(outerElementTextIDstring).popover("hide");
          });

        });

      };
    };
  });
});

/////maybe change to be more specific to the drawing?
$('#map').popover({ 
  trigger: 'manual',
  placement: 'top',
  html : true,
  content: function() {
    return $('popupLinkVectorMenu').html();
  }
});

$('#map').on("shown.bs.popover", function(event) {
    $('#page_body').on("click", function(event) {
      if ($(event.target).hasClass("popupAnnoMenu") == false) {
        $('#map').popover("hide");
      }
    });
    $('.closeThePopover').on("click", function(event){
      $('#map').popover("hide");
    });
});

$('#page_body').on("click", ".textEditorBox", function(event){
  var thisEditor = "#" + $(event.target).parent().attr("id");
  editorsOpen.forEach(function(target){
    if(target.editor == thisEditor) {
      targetType = target.typesFor;
      vectorSelected = target.vSelected;
      textSelectedParent = target.tSelectedParent;
      textSelectedID = target.tSelectedID;
      textSelectedHash = target.tSelectedHash;
      textTypeSelected = target.tTypeSelected;
      childrenArray = target.children;
    };
  })
});

$('#page_body').on("click", '.addAnnotationSubmit', function(event) {
  var thisEditor = $(event.target).parent().parent().parent().parent().parent().parent().parent().attr("id");
  addAnnotation(thisEditor);
});

$('#page_body').on("click", ".closePopupBtn", function(){
  var thisEditor = $(event.target).parent().parent().parent().attr("id");
  closeEditorMenu(thisEditor);
});


$('#page_body').on('slid.bs.carousel', '.editorCarousel', function(event) {
  var baseURL;
  if(textTypeSelected == "transcription") {
    baseURL = transcriptionURL;
  }
  else if(textTypeSelected == "translation") {
    baseURL = translationURL;
  };
/////change the textSelected to whatever slide of the carousel is selected...

});

$('#page_body').on("click", ".addNewBtn", function(){
  $(event.target).siblings(".editorCarousel").carousel(0);
});

$('#page_body').on("click", ".linkBtn", function(){
  selectingVector = childrenArray;
  $("#imageViewer").effect("bounce");
  $("#map").popover( "show");
});

$('#page_body').on("click", '.votingUpButton', function(event) {
  var votedID = $(event.target).parent().parent().parent().find("p").attr("id");
  var currentTopText = $(event.target).parent().parent().parent().parent().parent().find(".currentTop").html();
  votingFunction("up", votedID, currentTopText);
});

//////TRANSCRIPTIONS

$('.opentranscriptionChildrenPopup').popover({ 
  trigger: 'click',
  placement: 'top',
  html : true,
  title: "  ",
  content: function() {
    return $('#popupTranscriptionChildrenMenu').html();
  }
});

$('.opentranscriptionChildrenPopup').on("shown.bs.popover", function(event) {

  $('#page_body').on("click", function(event) {
    if ($(event.target).hasClass("popupAnnoMenu") == false) {
      $('.opentranscriptionChildrenPopup').popover("hide");
    }
  });

  $('.openTranscriptionMenuOld').on("click", function(event) {

    textSelectedID = startParentID;
    if ($(outerElementTextIDstring).parent().attr('id') != (null || 'undefined')){
      textSelectedParent = findBaseURL() + $(outerElementTextIDstring).parent().attr('id'); 
    };
    textSelectedHash = textSelectedParent.concat("#"+textSelectedID);

    checkEditorsOpen("text", "transcription");

    $('.opentranscriptionChildrenPopup').popover('hide');
  });

  $('.closeThePopover').on("click", function(event){
    $('.opentranscriptionChildrenPopup').popover("hide");
  });

});

///////TRANSLATIONS

