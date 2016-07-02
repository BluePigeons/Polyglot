
var fs = require('fs');

var websiteURL = "";

var LUNAimages = [

	

];

var processedImages = [];

var processLUNAimage = function(currentURL) {
	var twoparts = currentURL.split("");
	var baseURL = twoparts[0];
	var imageID = twoparts[1];
	var IIIFurl = baseURL.concat("iiif/"+imageID+"/info.json");
	console.log(IIIFurl);
	return IIIFurl
};

LUNAimages.forEach(function(image){
	var processedImage = processLUNAimage(image);
	processedImages.push(processedImage);
});

var theJSON = 	
	{
		"websiteURL": websiteURL,
		"images": processedImages
	};

fs.writeFile("./leafletiiifanno.json", JSON.stringify(theJSON));


