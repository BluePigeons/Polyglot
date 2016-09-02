
var currentWebsite = window.location.href;
var websiteAddress = "http://localhost:8080";

var rejectionOptions = new Set(["false",'""' , null , false , 'undefined']);
var vectorURL = websiteAddress.concat("/api/vectors/");
var transcriptionURL = websiteAddress.concat("/api/transcriptions/");
var translationURL = websiteAddress.concat("/api/translations/");
var annoURL = websiteAddress.concat("/api/annotations/")

var addNewAnnoHTML = `<div class='item addNewItem row'> 
                        <div class='addNewContainer col-md-12'> 
                          <textarea id='testingKeys' class='newAnnotation row' placeholder='Add new annotation text here'></textarea><br>
                          <button type='button' class='btn addAnnotationSubmit row'>Submit <span class='glyphicon glyphicon-ok'></span></button>  
                        </div> 
                      </div>`;
var voteButtonsHTML = `<div class='row polyanno-below-anno-well' >
                        <button type='button' class='btn btn-default voteBtn votingUpButton'>
                          <span class='glyphicon glyphicon-thumbs-up' aria-hidden='true' ></span>
                        </button>
                        <button type='button' class='btn btn-default votesUpBadge'>
                          <span class='badge'></span>
                        </button>
                      </div>`;
var closeButtonHTML = `<span class='closePopoverMenuBtn glyphicon glyphicon-remove'></span>`;
var linkButtonHTML = `<button type='button' class='btn linkBtn'>
                        <span class="glyphicon glyphicon-picture"></span>
                      </button>`;

var transcriptionIconHTML = `<span class='glyphicon glyphicon-edit'></span>
                            <span>Transcription</span>`;
var translationIconHTML = `<span class='glyphicon glyphicon-globe'></span>
                            <span>Translation</span>`;

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

///[editor, vector, span] colours
var highlightColoursArray = ["#EC0028","#EC0028","#EC0028"];
var defaultColoursArray = ["buttonface","#03f","transparent"]; 

var editorsOpen = []; //those targets currently open in editors
var selectingVector = false; //used to indicate if the user is currently searching for a vector to link or not
var findingcookies = document.cookie;

var polyannoEditorHandlebarHTML = `
      <button class="btn col-md-1 polyanno-colour-change dragondrop-handlebar-obj polyanno-favourite">
        <span class="glyphicon glyphicon-star-empty"></span>
      </button>
      <button class="btn polyanno-options-dropdown-toggle dragondrop-handlebar-obj polyanno-colour-change col-md-2" type="button" >
          <span class="glyphicon glyphicon-cog"></span>
          <span class="caret"></span>
      </button>
`;
var polyannoEditorHTML = `

    <div class="textEditorMainBox row ui-content">
    <div class="col-md-12">

      <div class="row polyanno-options-row">
        <div class="btn-group polyanno-options-buttons" role="group" aria-label="options_buttons">
          <button type="button" class="btn btn-success addNewBtn">
            <span class="glyphicon glyphicon-pencil" ></span> NEW
          </button>
          <button class="btn btn-default polyanno-add-keyboard" type="button"><span class="glyphicon glyphicon-th"></span><span class="glyphicon glyphicon-th"></span></button> <!--add keyboard characters-->
          <button class="btn btn-default polyanno-metadata-btn"><span class="glyphicon glyphicon-tags"></span></button>
          <button class="btn btn-default polyanno-export-text" type="button"><span class="glyphicon glyphicon-save"></span></button> <!--export as txt or PDF??-->
          <button class="btn btn-default polyanno-social" type="button"><span class="glyphicon glyphicon-share"></span></button> <!-- social media sharing-->
          <button class="btn btn-default polyanno-report" type="button"><span class="glyphicon glyphicon-exclamation-sign"></span><!--report inappropriate content--></button>
        </div>
      </div>

        <div class="row polyanno-carousel-controls">
        <button class="polyanno-carousel-prev col-md-3" role="button" >
            <span class="glyphicon glyphicon-chevron-left"></span>
        </button>
        <div class="col-md-6 polyanno-mid-carousel-controls"></div>
        <button class="polyanno-carousel-next col-md-3" role="button">
            <span class="glyphicon glyphicon-chevron-right"></span>
        </button>
        </div>

      <div class="row editorCarousel carousel slide" data-interval="false">
        <!-- Wrapper for slides -->
        <div class="editorCarouselWrapper col-md-12 carousel-inner" role="listbox">
            <!--appended slides go here-->
        </div>
      </div>

      <div class="row polyanno-below-anno-display">

      </div>

    </div>
    </div>

`;

var polyannoEditorHTMLFull = `

  <!-- EDITOR BOX -->
  <div id="theEditor" class="row textEditorBox">
  <div class="col-md-12">

    <div class="row popupBoxHandlebar polyanno-colour-change ui-draggable-handle">
      <button class="btn col-md-1 polyanno-colour-change">
        <span class="closePopupBtn glyphicon glyphicon-remove"></span>
      </button>
      <button class="btn col-md-1 polyanno-colour-change polyanno-popup-min">
        <span> _ </span>
      </button>
      <div class="col-md-7">
        <div class="editorTitle"></div>
      </div>
      <button class="btn col-md-1 polyanno-colour-change polyanno-favourite">
        <span class="glyphicon glyphicon-star-empty"></span>
      </button>
      <button class="btn polyanno-options-dropdown-toggle polyanno-colour-change col-md-2" type="button" >
          <span class="glyphicon glyphicon-cog"></span>
          <span class="caret"></span>
      </button>
    </div>


    <div class="textEditorMainBox row ui-content">
    <div class="col-md-12">

      <div class="row polyanno-options-row">
        <div class="btn-group polyanno-options-buttons" role="group" aria-label="options_buttons">
          <button type="button" class="btn btn-success addNewBtn">
            <span class="glyphicon glyphicon-pencil" ></span> NEW
          </button>
          <button class="btn btn-default polyanno-add-keyboard" type="button"><span class="glyphicon glyphicon-th"></span><span class="glyphicon glyphicon-th"></span></button> <!--add keyboard characters-->
          <button class="btn btn-default polyanno-metadata-btn"><span class="glyphicon glyphicon-tags"></span></button>
          <button class="btn btn-default polyanno-export-text" type="button"><span class="glyphicon glyphicon-save"></span></button> <!--export as txt or PDF??-->
          <button class="btn btn-default polyanno-social" type="button"><span class="glyphicon glyphicon-share"></span></button> <!-- social media sharing-->
          <button class="btn btn-default polyanno-report" type="button"><span class="glyphicon glyphicon-exclamation-sign"></span><!--report inappropriate content--></button>
        </div>
      </div>

        <div class="row polyanno-carousel-controls">
        <button class="polyanno-carousel-prev col-md-3" role="button" >
            <span class="glyphicon glyphicon-chevron-left"></span>
        </button>
        <div class="col-md-6 polyanno-mid-carousel-controls"></div>
        <button class="polyanno-carousel-next col-md-3" role="button">
            <span class="glyphicon glyphicon-chevron-right"></span>
        </button>
        </div>

      <div class="row editorCarousel carousel slide" data-interval="false">
        <!-- Wrapper for slides -->
        <div class="editorCarouselWrapper col-md-12 carousel-inner" role="listbox">
            <!--appended slides go here-->
        </div>
      </div>

      <div class="row polyanno-below-anno-display">

      </div>

    </div>
    </div>

  </div>
  </div>

`;

///// TEXT SELECTION

var outerElementTextIDstring;
var newContent;
var newNodeInsertID;
var startParentID;
var $langSelector = false;
var $imeSelector = false;

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
  var targetData = {body: {text: textSelectedFragment.toString(), format: "text/html"}, parent: textSelectedParent};
  var annoData = { target: [{id: textSelectedHash, format: "text/html"}] };
  
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

  annoData.body.id = textSelected;

  $.ajax({
    type: "POST",
    url: annoURL,
    async: false,
    data: annoData,
    success: 
      function (data) {  }
  });

  var newHTML = $(outerElementTextIDstring).html();
  var parentData = {body: {text: newHTML}, children: [{id: textSelectedID, fragments: [{id: textSelected}]}]};
  updateAnno(textSelectedParent, parentData);

};

var preBtnClosing = function(thisEditor) {
  resetVectorHighlight(thisEditor);
  removeEditorsOpen(thisEditor);
};

var findClassID = function(classString, IDstring) {
  var IDindex = classString.search(IDstring) + IDstring.length;
  var IDstart = classString.substring(IDindex);
  var theID = IDstart.split(" ", 1);
  return theID[0];
};

var setTextSelectedID = function(theText) {

  /////update with new separated JSONs

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

  /////update for separated JSONs

  var theChecking = checkFor(theText, "target");
  if (  isUseless(theChecking[0])  ) { return false } 
  else {   return fieldMatching(theChecking, "format", "SVG").id;  };

};

var lookupTargetChildren = function(target, baseURL) {
  var childTexts;
  var targetParam = encodeURIComponent(target);
  var aSearch = baseURL.concat("targets/"+targetParam);
  alert("this is what it is searching for "+aSearch);
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
  var theSearch = baseURL.concat("ids/"+encodeURIComponent(childTexts));
  var theDocs;
  $.ajax({
    type: "GET",
    dataType: "json",
    url: theSearch,
    async: false,
    success: 
      function (data) {
        theDocs = data.list;
      }
  });
  return theDocs;
};

var updateVectorSelection = function(vectorURL) {

  var textData = {target: [{id: vectorURL, format: "SVG"}]};
  selectingVector.forEach(function(child){
    updateAnno(child[0].body.id, textData);
  });
  var editorID = fieldMatching(editorsOpen, "tSelectedParent", selectingVector[0][0].parent).editor;
  selectingVector = false;

  /////remove linkVector button

  closeEditorMenu(editorID);
  openEditorMenu(); 

};

var votingFunction = function(vote, votedID, currentTopText, editorID) {
  var theVote = findBaseURL() + "voting/" + vote;
  var targetID = findBaseURL().concat(votedID); ///API URL of the annotation voted on
  var votedTextBody = $("#"+votedID).html(); 
  var targetData = {
    parent: textSelectedParent, ///it is this that is updated containing the votedText within its body
    children: [{
      id: textSelectedID, //ID of span location
      fragments: [{
        id: targetID
      }]
    }],
    votedText: votedTextBody,  topText: currentTopText
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

  if (updatedTranscription) {    textSelected = targetID;  };
  if (updatedTranscription && (!isUseless(vectorSelected))) {
    var updateTargetData = {};
    updateTargetData[textTypeSelected] = targetID;
    updateAnno(vectorSelected, updateTargetData);
  };

  closeEditorMenu(editorID);
  openEditorMenu(); 

///////if the parent is open in an editor rebuild carousel with new transcription 
  editorsOpen.forEach(function(editorOpen){
    editorOpen.children.forEach(function(eachChild){
      if ( eachChild.id == textSelectedID ){
        closeEditorMenu(editorOpen.editor);
        ////reopen???
        //$(editorOpen.editor).effect("shake");
      };
    });
  });

};

var findHighestRankingChild = function(parent, locationID) {
  var theLocation = fieldMatching(getTargetJSON(parent).children, "id", locationID);
  var the_child = fieldMatching(theLocation.fragments, "rank", 0); 
  return findField(the_child, "id");
};

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

///// VIEWER WINDOWS

var setChildrenArray = function() {  return childrenArray = lookupTargetChildren(targetSelected[0], findBaseURL()); };

var buildCarousel = function(existingChildren, popupIDstring, extraHTML) {

  var openingHTML = "<div class='item row pTextDisplayItem ";
  var openingHTML2 = "'> <div class='pTextDisplay col-md-12'> <div class='row well well-sm polyanno-anno-well'> <p id='";
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

var highlightTopVoted = function() {
  var theTextString = "#" + textSelected.slice(findBaseURL().length, textSelected.length);
  $(theTextString).closest(".item").addClass("active"); //ensures it is the first slide people see
  $(theTextString).addClass("currentTop");
///////////choose better styling later!!!!!///////
  $(theTextString).css("color", "grey");
  $(theTextString).find(".polyanno-below-anno-well").append("<span='glyphicon glyphicon-star'></span><span='glyphicon glyphicon-star'></span><span='glyphicon glyphicon-star'></span><span='glyphicon glyphicon-star'></span>");
};

var canLink = function(popupIDstring) {
  if (targetType.includes("vector") == false){ 
    $(popupIDstring).find(".polyanno-options-buttons").append(linkButtonHTML);
  };
};

var canVoteAdd = function(popupIDstring, theVectorParent) {
  //if it is targeting it's own type OR it is targeting a vector with parents THEN you can vote and add
  if ( targetType.includes(textTypeSelected) || ( ( targetType.includes("vector") ) && ( !isUseless(theVectorParent) ) ) ) { 
    $(popupIDstring).find(".editorCarouselWrapper").append(addNewAnnoHTML);
    return voteButtonsHTML; ///////metadata stuff too!!!!!!!
  }
  else {
    $(popupIDstring).find(".polyanno-carousel-controls").css("display", "none");
    $(popupIDstring).find(".addNewBtn").css("display", "none");
    return "";
  };
};

var addCarouselItems = function(popupIDstring) {
  var theVectorParent = checkFor(vectorSelected, "parent");
  if (  isUseless(childrenArray[0]) && isUseless(theVectorParent) ) {
    $(popupIDstring).find(".editorCarouselWrapper").append(addNewAnnoHTML);
    $(popupIDstring).find(".newAnnotation").attr("id", "addBox"+popupIDstring);
    $(popupIDstring).find(".addNewItem").addClass("active");
    $(popupIDstring).find(".polyanno-carousel-controls").css("display", "none");
    $(popupIDstring).find(".addNewBtn").css("display", "none");
  }
  else {
    var theExtras = canVoteAdd(popupIDstring, theVectorParent);
    buildCarousel(childrenArray, popupIDstring, theExtras);
    highlightTopVoted();
  };
};

var returnTextIcon = function(textTypeSelected){
  if(textTypeSelected == "transcription") {
    return transcriptionIconHTML;
  }
  else if (textTypeSelected == "translation"){
    return translationIconHTML;
  };
};

var updateEditor = function(popupIDstring) {
  $(popupIDstring).find("#theEditor").attr("id", "newEditor");
  $(popupIDstring).find(".editorTitle").html(returnTextIcon(textTypeSelected));
  canLink(popupIDstring);
  setChildrenArray();
  addCarouselItems(popupIDstring);
  $(popupIDstring).find(".textEditorMainBox").find('*').addClass(textTypeSelected+"-text"); 
};

var addEditorsOpen = function(popupIDstring) {
  editorsOpen.push({
    "editor": popupIDstring,
    "typesFor": targetType,
    "vSelected": vectorSelected,
    "tSelectedParent": textSelectedParent,
    "tSelectedID": textSelectedID,
    "tSelectedHash": textSelectedHash,
    "tTypeSelected": textTypeSelected,
    "children": childrenArray
  });
  vectorSelected = "";
  textSelectedParent = "";
  textSelectedID = "";
  textSelectedHash = "";
  textTypeSelected = "";
  childrenArray = [];
  return editorsOpen;
};

var createEditorPopupBox = function() {

  var dragon_opts = {
    "minimise": true,
    "initialise_min_bar": false,
    "beforeclose": preBtnClosing
  };
  var popupIDstring = add_dragondrop_pop("textEditorPopup", polyannoEditorHTML, "polyanno-page-body", dragon_opts, polyannoEditorHandlebarHTML);
  $(popupIDstring).find(".dragondrop-handlebar").addClass("polyanno-colour-change");
  $(popupIDstring).find(".dragondrop-handlebar-obj").addClass("polyanno-colour-change"); 
  //id="theEditor" class="row textEditorBox"
  $(popupIDstring).children[0].addClass("textEditorBox");
  var newCarouselID = "Carousel" + Math.random().toString().substring(2);
  $(popupIDstring).find(".editorCarousel").attr("id", newCarouselID);
  $(popupIDstring).find(".polyanno-carousel-controls").attr("href", "#" + newCarouselID);

  return popupIDstring;

};

var openEditorMenu = function() {

  var popupIDstring = createEditorPopupBox();
  /*$('.opentranscriptionChildrenPopup').popover({ 
    trigger: 'manual',
    placement: 'top',
    html : true,
    title: "  ",
    content: function() {
      return $('#popupTranscriptionChildrenMenu').html();
    }
  });*/
  updateEditor(popupIDstring); 
  addEditorsOpen(popupIDstring); 

};

var resetVectorHighlight = function(thisEditor) {
  var thisVector = fieldMatching(editorsOpen, "editor", thisEditor).vSelected; 
  if(!isUseless(thisVector)){ highlightVectorChosen("#"+thisVector, defaultColoursArray[1]); };
};

var removeEditorsOpen = function(popupIDstring) {
  var theEditorItem = fieldMatching(editorsOpen, "editor", popupIDstring);
  var currentIndex = editorsOpen.indexOf(theEditorItem); 
  editorsOpen.splice(currentIndex,1);
};

var closeEditorMenu = function(thisEditor) {
  if (thisEditor.includes("#")) { thisEditor = thisEditor.split("#")[1]; };
  resetVectorHighlight(thisEditor);
  removeEditorsOpen(thisEditor);
  return dragondrop_remove_pop(thisEditor);
};

var findNewTextData = function(editorString) {

  var newText = $(editorString).find(".newAnnotation").val();
  textSelected = newText; ////////
  var textData = {body: {text: newText, format: "text"}, target: []}; ////

  if (targetType.includes("vector") == true) {
    textData.target.push({id: vectorSelected, format: "image/SVG"});
  };

  if (targetType.includes(textTypeSelected)) {
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
  var theData = findNewTextData(editorString);

  $.ajax({
    type: "POST",
    url: findBaseURL(),
    async: false,
    data: theData,
    success: 
      function (data) {
        createdText = data.url;
      }
  });

  var annoData = { };
  annoData.target = theData.target;
  annoData.body.id = createdText;

  $.ajax({
    type: "POST",
    url: annoURL,
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
  if (  targetType.includes("vector") && (  isUseless(childrenArray[0]) )) {
    var targetData = {};
    targetData[textTypeSelected] = createdText;
    updateAnno(vectorSelected, targetData);
  };

//  textSelected = createdText; //////only if there was none before??
  closeEditorMenu(thisEditor);
  if (  targetType.includes("vector") ) { openNewEditor("vector") }
  else { openNewEditor("text")  };
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
  if (isUseless(editorsOpen)) {    openNewEditor(fromType);  }
  else {
    var canOpen = true;
    editorsOpen.forEach(function(editorOpen){
      if ( ( (  !isUseless(editorOpen["vSelected"]) && (editorOpen["vSelected"] == vectorSelected)  )||( !isUseless(editorOpen["tSelectedParent"]) && editorOpen["tSelectedParent"] == textSelectedParent)) && (editorOpen["tTypeSelected"] == textType)){
        $(editorOpen.editor).effect("shake");
        canOpen = false;
      };
    });
    if (canOpen == true) {  openNewEditor(fromType) };
  };
};

var findVectorParent = function(coordinatesArray, parentCoordsArray) {
  var xBounds = [ parentCoordsArray[0][0], parentCoordsArray[2][0] ];
  var yBounds = [ parentCoordsArray[0][1], parentCoordsArray[2][1] ];
  var counter = 0;
  coordinatesArray.forEach(function(pair){
    if (  (xBounds[0] <= pair[0]) && ( pair[0]<= xBounds[1]) && (yBounds[0] <= pair[1]) && (pair[1] <= yBounds[1])  ) {  counter += 1;  };
  });
  if (counter >= 3) {  return true;  }
  else {  return false;  };
};

var searchForVectorParents = function(theDrawnItems, theCoordinates) {
  var overlapping = false;
  theDrawnItems.eachLayer(function(layer){
    var drawnItem = layer.toGeoJSON();
    if (findVectorParent(theCoordinates, drawnItem.geometry.coordinates[0])) {  
      overlapping = layer._leaflet_id ;  
    };
  });
  return overlapping;
};

var highlightVectorChosen = function(chosenVector, colourChange) {
  allDrawnItems.eachLayer(function(layer){
    if(layer._leaflet_id == chosenVector) {
      layer.setStyle({color: colourChange});
    };
  });
};

var highlightEditorsChosen = function(chosenEditor, colourChange) {
  if (!chosenEditor.includes("#")) {  chosenEditor = "#"+chosenEditor; }
  $(chosenEditor).find(".polyanno-colour-change").css("background-color", colourChange);
};

var highlightSpanChosen = function(chosenSpan, colourChange) {
  $(chosenSpan).css("background-color", colourChange);
};

var checkingItself = function(searchField, searchFieldValue, theType) {
  if (theType == searchField) { return false }
  else {  return fieldMatching(editorsOpen, searchField, searchFieldValue)[theType] };
};

var findAndHighlight = function(searchField, searchFieldValue, highlightColours) {
  var thisEditor = checkingItself(searchField, searchFieldValue, "editor");
  if (!isUseless(thisEditor)) {  highlightEditorsChosen(thisEditor, highlightColours[0]);  };
  var thisVector = checkingItself(searchField, searchFieldValue, "vSelected");
  if (!isUseless(thisVector)) {  highlightVectorChosen(thisVector, highlightColours[1]);  };
  var thisSpan = checkingItself(searchField, searchFieldValue, "tSelectedID");
  if (!isUseless(thisSpan)) {  
    if (!thisSpan.includes("#")) {  thisSpan = "#"+thisSpan; };
    if (!isUseless($(thisSpan))) {  highlightSpanChosen(thisSpan, highlightColours[2]);  };
  };
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

///////LEAFLET 

loadImage(findingcookies);
var map;
var baseLayer;
var allDrawnItems = new L.FeatureGroup();
var controlOptions = {
    draw: {
        polyline: false,  //disables the polyline and marker feature as this is unnecessary for annotation of text as it cannot enclose it
        marker: false,
        //polygon: false,
        //circle: false
    },
    edit: {
        featureGroup: allDrawnItems, //passes draw controlOptions to the FeatureGroup of editable layers
    }
};

var popupVectorMenu = L.popup()
    .setContent(popupVectorMenuHTML()); /////
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
var currentVectorLayers = {};
if (!isUseless(existingVectors)) {
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

var generateIIIFregion = function(coordinates) {

    /////how to encode polygon regions?? Are they allowed in IIIF???

    /*

    NOTE ABOUT COORDINATES

    + Leaflet Simple CRS has (0,0) in top left corner 
    + GeoJSON coordinates go clockwise from bottom left
    + IIIF has downwards +y axis
    _____________________  
    |*-----> x          |           
    ||                  |           [2] ---> [3] 
    |v                  |            ^        |
    |-y                 |            |        v
    |                   |           [1] <--- [4]
    |    L.CRS.Simple   |
    |                   |        GeoJSON Coordinates
    |                   | 
    |                   | 
    ---------------------    

    */
    var xy1 = coordinates[0];
    var xy2 = coordinates[1];
    var xy3 = coordinates[3];

    var x = xy2[0];
    var y = -xy2[1];
    var w = xy3[0] - xy2[0];
    var h = xy2[1] - xy1[1];
    var paramURL = x.toString() + "," + y.toString() + "," + w.toString() + "," + h.toString() + "/full/0/";

    return paramURL;
};

var getIIIFsectionURL = function (imageJSON, coordinates, formats) {

    var imagewithoutinfo = imageJSON.split("/info.json",1);
    var imagewithoutinfoURL = imagewithoutinfo[0];
    var splitIndex = imagewithoutinfoURL.lastIndexOf("/");
    var image_id = imagewithoutinfoURL.substring(splitIndex +1);
    var baseImageURL = imagewithoutinfoURL.slice(0, splitIndex +1);

    var regionParams = generateIIIFregion(coordinates);
    var pickAFormat = formats;

    var params = regionParams.concat(image_id + "." + pickAFormat);
    var theURL = baseImageURL.concat(params);

    return theURL;
};

map.on('draw:created', function(evt) {

	var layer = evt.layer;
  var shape = layer.toGeoJSON();
  var vectorOverlapping = searchForVectorParents(allDrawnItems, shape.geometry.coordinates[0]); 
  allDrawnItems.addLayer(layer);
  if (  (vectorOverlapping != false) && (selectingVector == false)  ) { 
    allDrawnItems.removeLayer(layer);
    vectorSelected = vectorOverlapping;
    $("#map").popover();
    $("#map").popover('show');
  }
  else {
    var IIIFsection = getIIIFsectionURL(imageSelected, shape.geometry.coordinates[0], "jpg");
    var targetData = {geometry: shape.geometry, metadata: imageSelectedMetadata, parent: vectorOverlapping };
    var annoData = {target: []};
    targetData.target.push({
        "id": imageSelected,
        "format": "application/json"
    });
    targetData.target.push({
        "id": IIIFsection,
        "format": "jpg" ////official jpg file type???
    });
    if (selectingVector != false) { 
      var theTopText = findHighestRankingChild(textSelectedParent, textSelectedID);
      targetData[textTypeSelected] = theTopText;  
    };
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

    annoData.body.id = vectorSelected;

    $.ajax({
      type: "POST",
      url: annoURL,
      async: false,
      data: annoData,
      success: 
        function (data) {}
    });

    layer._leaflet_id = vectorSelected;
    if (selectingVector == false) { layer.bindPopup(popupVectorMenu).openPopup(); }
    else {  updateVectorSelection(vectorSelected); };
  };

});

/////whenever a vector is clicked
allDrawnItems.on('click', function(vec) {

  vectorSelected = vec.layer._leaflet_id;
  if (currentlyEditing || currentlyDeleting) {}
  else if (selectingVector != false) {  alert("make a new vector!");  }
  else {  vec.layer.openPopup();  };

});

allDrawnItems.on('mouseover', function(vec) {
  vec.layer.setStyle({color: highlightColoursArray[1]});
  findAndHighlight("vSelected", vec.layer._leaflet_id, highlightColoursArray);
});
allDrawnItems.on('mouseout', function(vec) {
  vec.layer.setStyle({color: defaultColoursArray[1]});
  findAndHighlight("vSelected", vec.layer._leaflet_id, defaultColoursArray);
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
  updateAnno(vectorSelected, shape); ////////////
});

//////update DB whenever vector is deleted
allDrawnItems.on('remove', function(vec){
  //////
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

var settingEditorVars = function(thisEditor) {
  if(!thisEditor.includes("#")) { thisEditor = "#" + thisEditor; };
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
  });
};

var newSpanClass = function(startParentClass) {
  if (startParentClass.includes('transcription-text')) {
    return "transcription-text opentranscriptionChildrenPopup";
  }
  else if (startParentClass.includes('translation-text')) {
    return "translation-text opentranslationChildrenPopup";
  }
  else {
    //alert("Please select transcription translation text");
    return null;
  };
};

var strangeTrimmingFunction = function(thetext) {
  if(thetext && (thetext = new String(thetext).replace(/^\s+|\s+$/g,''))) {
    return thetext.toString();
  }; 
};

var newTextPopoverOpen = function(theTextIDstring, theParent) {
  $('#polyanno-page-body').on("click", function(event) {
    if ($(event.target).hasClass("popupAnnoMenu") == false) {
      $(theTextIDstring).popover("hide");
    }
  });

  $('.openTranscriptionMenuNew').one("click", function(event) {
    insertSpanDivs();
    textSelectedParent = transcriptionURL.concat(theParent);
    newAnnotationFragment(transcriptionURL);
    textTypeSelected = "transcription";
    targetType = "transcription";
    openEditorMenu();
    $(theTextIDstring).popover('hide');    
  });

  $('.closeThePopover').on("click", function(event){
    $(theTextIDstring).popover("hide");
  });
};

var initialiseNewTextPopovers = function(theTextIDstring, theParent) {
  $(theTextIDstring).popover({ 
    trigger: 'manual',
    placement: 'top',
    html : true,
    container: 'body',
    title: closeButtonHTML,
    content: function() {
      return $('#popupTranscriptionNewMenu').html();
    }
  });
  $(theTextIDstring).popover('show');
  $(theTextIDstring).on("shown.bs.popover", function(ev) {
    newTextPopoverOpen(theTextIDstring, theParent);
  });
};

var initialiseOldTextPopovers = function(theTextIDstring) {
  $(theTextIDstring).popover({ 
    trigger: 'manual', //////
    placement: 'top',
    html : true,
    title: closeButtonHTML,
    content: function() {
      return $('#popupTranscriptionChildrenMenu').html();
    }
  });
  $(theTextIDstring).popover('show');
};

var setOESC = function(outerElementHTML, previousSpanContent, previousSpan) {
  var outerElementStartContent;
  if (previousSpan == "null" || previousSpan == null) {outerElementStartContent = previousSpanContent}
  else {
    var previousSpanAll = previousSpan.outerHTML;
    var StartIndex = outerElementHTML.indexOf(previousSpanAll) + previousSpanAll.length;
    outerElementStartContent = outerElementHTML.slice(0, StartIndex).concat(previousSpanContent);
  };
  return outerElementStartContent;
};

var setOEEC = function(outerElementHTML, nextSpanContent, nextSpan) {
    var outerElementEndContent;
    if (nextSpan == "null" || nextSpan == null) {outerElementEndContent = nextSpanContent}
    else {
      var EndIndex = outerElementHTML.indexOf(nextSpan.outerHTML);
      outerElementEndContent = nextSpanContent.concat(outerElementHTML.substring(EndIndex));
    };
    return outerElementEndContent;
};

var setNewTextVariables = function(selection, classCheck) {

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
    initialiseOldTextPopovers(outerElementTextIDstring);
  }
  else if (classCheck.includes('opentranslationChildrenPopup')) { 
    initialiseOldTextPopovers(outerElementTextIDstring);
  }    
  else if (startParentID != endParentID) {
   // alert("you can't select across existing fragments' borders sorry");
  }
  else {

    newNodeInsertID = Math.random().toString().substring(2);

    var newSpan = "<a class='" + newSpanClass(startParentClass) + " ' id='" + newNodeInsertID + "' >" + selection + "</a>";
    var outerElementHTML = $(outerElementTextIDstring).html().toString(); //includes any spans that are contained within this selection 

    ///CONTENT BEFORE HIGHLIGHT IN THE TEXT TYPE NODE
    var previousSpanContent = startNodeText.slice(0, nodeLocationStart);

    //CONTENT BEFORE HIGHLIGHT IN THE ELEMENT TYPE NODE
    var previousSpan = startNode.previousElementSibling; //returns null if none i.e. this text node is first node in element node
    var outerElementStartContent = setOESC(outerElementHTML, previousSpanContent, previousSpan);

    ///CONTENT AFTER HIGHLIGHT IN THE TEXT TYPE NODE
    var nextSpanContent;
    if (endNode == startNode) { nextSpanContent = startNodeText.slice(nodeLocationEnd, startNodeTextEndIndex)}
    else {nextSpanContent = endNodeText.slice(0, nodeLocationEnd)};

    ///CONTENT AFTER HIGHLIGHT IN ELEMENT TYPE NODE
    var nextSpan = endNode.nextElementSibling; //returns null if none i.e. this text node is the last in the element node
    var outerElementEndContent = setOEEC(outerElementHTML, nextSpanContent, nextSpan );

    newContent = outerElementStartContent + newSpan + outerElementEndContent;
    textSelectedFragment = strangeTrimmingFunction(selection);

    initialiseNewTextPopovers(outerElementTextIDstring, startParentID);

  };
};

////USERS HANDLING

var loginAndSetUsername = function() {
  ///use EASE to setup login and set document.cookie = "theusername="+username+";";
};

var polyannoAddFavourites = function(the_favourited_type, the_favourited_id) {
  var targetData = {  "favourites": { "image_id" : imageSelected } };
  targetData.favourites[the_favourited_type] = the_favourited_id;

  $.ajax({
    type: "PUT",
    url: websiteAddress+"/users/"+searchCookie("theusername="),
    dataType: "json",
    data: targetData
  });

};

var polyannoRemoveFavourites = function(the_favourited_type, the_favourited_id) {
  var targetData = {  "removefavourite": { "image_id" : imageSelected } };
  targetData.favourites[the_favourited_type] = the_favourited_id;

  $.ajax({
    type: "PUT",
    url: websiteAddress+"/users/"+searchCookie("theusername="),
    dataType: "json",
    data: targetData
  });

};

///SELECTION PROCESS
$('#polyanno-page-body').on("mouseup", '.content-area', function(event) {

  var selection = getSelected(); 
  var classCheck = selection.anchorNode.parentElement.className;

  if (classCheck.includes('openTranscriptionMenuOld')) { //if it is a popover within the selection rather than the text itself

    textSelectedID = startParentID;
    if (  !isUseless($(outerElementTextIDstring).parent().attr('id')) ){
      textSelectedParent = transcriptionURL + $(outerElementTextIDstring).parent().attr('id'); 
    };
    textSelectedHash = textSelectedParent.concat("#"+textSelectedID);
    checkEditorsOpen("text", "transcription");
    $(outerElementTextIDstring).popover('hide'); ////

  }   
  else if (classCheck.includes('popover-title')) { 
    $(outerElementTextIDstring).popover('hide'); ///
  } 
  else if (classCheck.includes("polyanno-add-discuss")) {
    if ($(outerElementTextIDstring).hasClass("annotator-hl")) {

    }
    else {
      var thisSpanText = $(outerElementTextIDstring).html().toString();
      new TextQuoteAnchor($(outerElementTextIDstring), thisSpanText);
    };
  }
  else {
    setNewTextVariables(selection, classCheck);
  };
});


/////maybe change to be more specific to the drawing?
$('#imageViewer').popover({ 
  trigger: 'manual',
  placement: 'top',
  html : true,
  title: closeButtonHTML,
  content: function() {
    return $('#popupLinkVectorMenu').html();
  }
});

$('#imageViewer').on("shown.bs.popover", function(event) {
    $('#polyanno-page-body').on("click", function(event) {
      if ($(event.target).hasClass("popupAnnoMenu") == false) {
        $('#map').popover("hide");
      }
    });
    $('.closeThePopover').on("click", function(event){
      $('#map').popover("hide");
    });
});

$('#map').popover({ 
  trigger: 'manual',
  placement: 'top',
  html : true,
  title: closeButtonHTML,
  content: function() {
    return $('#popupVectorParentMenu').html();
  }
});

$('#map').on("shown.bs.popover", function(event) {

  $('#polyanno-page-body').one("click", '.openTranscriptionMenuParent', function(event) {
    checkEditorsOpen("vector", "transcription");
    $('#map').popover('hide');
  });
  $('#polyanno-page-body').one("click", '.openTranslationMenuParent', function(event) {
    checkEditorsOpen("vector", "translation");
    $('#map').popover('hide');
  });

  $('.closeThePopover').on("click", function(event){
    $('#map').popover("hide");
  });
});

$(".polyanno-image-box").draggable();
$(".polyanno-image-box").draggable({
  addClasses: false,
  handle: ".imageHandlebar",
  revert: function(theObject) {
    return adjustDragBootstrapGrid($(this));
  },
  revertDuration: 0,
  snap: ".annoPopup",
  snapMode: "outer"
});
$( ".polyanno-image-box" ).resizable();
$( ".polyanno-image-box" ).resizable( "enable" );

$('#polyanno-page-body').on("mouseover", ".textEditorBox", function(event){

  var thisEditor = "#" + $(event.target).closest(".textEditorPopup").attr("id");
  //////////
  $(thisEditor).find(".polyanno-colour-change").css("background-color", highlightColoursArray[0]);
  findAndHighlight("editor", thisEditor, highlightColoursArray);
  //////////
  $(thisEditor).on("mouseenter", ".opentranscriptionChildrenPopup", function(event){
    $(thisEditor).find(".polyanno-colour-change").css("background-color", defaultColoursArray[0]);
    findAndHighlight("editor", thisEditor, defaultColoursArray);
    var thisSpan = $(event.target).attr("id");
    $("#"+thisSpan).css("background-color", highlightColoursArray[2]);
    findAndHighlight("tSelectedID", thisSpan, highlightColoursArray);
  });

  $(thisEditor).on("mouseleave", ".opentranscriptionChildrenPopup", function(event){
    var thisSpan = $(event.target).attr("id");
    $("#"+thisSpan).css("background-color", defaultColoursArray[2]);
    findAndHighlight("tSelectedID", thisSpan, defaultColoursArray);
  });  

});

$('#polyanno-page-body').on("mouseout", ".textEditorBox", function(event){
  var thisEditor = "#" + $(event.target).closest(".textEditorPopup").attr("id");
  $(thisEditor).find(".polyanno-colour-change").css("background-color", defaultColoursArray[0]);
  findAndHighlight("editor", thisEditor, defaultColoursArray);
});

$('#polyanno-page-body').on("mouseover", ".leaflet-popup", function(event){
  highlightVectorChosen(vectorSelected, highlightColoursArray[1]);
  findAndHighlight("vSelected", vectorSelected, highlightColoursArray);
});

$('#polyanno-page-body').on("mouseover", ".leaflet-popup", function(event){
  highlightVectorChosen(vectorSelected, defaultColoursArray[1]);
  findAndHighlight("vSelected", vectorSelected, defaultColoursArray);
});

$('#polyanno-page-body').on("click", '.newAnnotation', function(event) {

  if ($langSelector != false) {
    atu_the_input = $(this);
    addIMEoptions();
  };

});

$('#polyanno-page-body').on("click", '.addAnnotationSubmit', function(event) {
  var thisEditor = $(event.target).closest(".annoPopup").attr("id"); 
  settingEditorVars(thisEditor);
  ///
  addAnnotation(thisEditor);
});

////ANNO HEADER BARS

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

$("#polyanno-top-bar").on("click", ".polyanno-add-keyboard", function(event){
    var dragon_opts = {
      "minimise": true,
      "initialise_min_bar": false
    };
    addKeyboard(dragon_opts);
});

var polyEdFilters = null; ////for now
polyEdCurrentDocs.push(imageSelected);

setUpPolyEdChangeBtns();

addIMEs(true, null);




