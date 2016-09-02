## README

This is a project aiming to enable to crowdsourced transcription and translation of the awesome collections at the University of Edinburgh. Maybe gamifying if I get time. Currently being built in NodeJS using Express to build the framework. 

#Getting Started

Firstly copy the latest version from Github.


```
$ git clone "https://github.com/BluePigeons/Polyglot.git" 
```

Then open the Polyglot folder and install dependencies.

```
$ npm install 
```

If you open the server.js file you can see that the port the application is exposed to 


Then start the server and view it at [http://172.20.185.81:8080](http://172.20.185.81:8080) and enjoy the annotation fun!

```
$ npm start 
```


#Front End Development

Editing Pages

Images are defined using [IIIF](http://iiif.io) info.json format with [Leaflet JS](http://leafletjs.com) as a IIIF viewer using [Leaflet IIIF](#). Sections of the images containing text are built using [Leaflet Draw](https://github.com/Leaflet/Leaflet.draw) and then annotations generated using the [Polyanno UI](#) (to be released separately shortly). The UI relies on the latest version of [Bootstrap](#), [JQuery](#), [JQuery UI](#), and then the packages developed for this application of [Dragon_drop](#) for the responsive box display and [All The Unicode](#) to enable input of most characters and languages that have Unicode encoding (that's a lot by the way).

The IIIF images for the University of Edinburgh are stored within the University of Edinburgh's experimental LUNA database and presented in the Editing pages of the site by linking to their URL - this means that if loading this code as it is you will need the relevant access credentials to load the University of Edinburgh's Collections. Alternatively you are free to create your own copy edited to link through to your own databases. 

The Polyanno package is looking the variable "imageViewing" to be defined which is done here through firstly checking cookies for an "imageViewing" defined, and then if it is not, it is setting it by reconstructing the unique University of Edinburgh LUNA URL from the URL parameter after "/editors/". 

![alt text]( "Editing Page URL Screenshot")

Homepage

The Homepage loads thumbnail images by adjusting the info.json URLs to load small images as defined in the IIIF specification. It uses the latest versions of [Bootstrap](#), [JQuery](#) and [Infinity](#) for its UI.

The Queue

The queue of images, i.e. the order in which they appear as thumbnails on the Homepage and which images load next when clicking the up and down buttons on the Editing pages is determined by using the polyedsearchpage.js file. 

This requires firstly for the JSON variable "theFilters" to be defined in the following format:

```
var theFilters = {
	metadata: {
		startYear: Number,
		endYear: Number,

	},
	transcription: {
		languages: String,
		difficulty: String
	},
	translation: {
		languages: String,
		difficulty: String
	},
	searchTerms: String

}
```

Then the array variable "collectionDocArray" to be defined - this must be an array of IIIF info.json URLs from which the queue can be generated. In this case it is defined in a separate file and lists University of Edinburgh Collections LUNA test URLs.

For example:
```
collectionDocArray = [

"http://lac-luna-test2.is.ed.ac.uk:8181/luna/servlet/iiif/UoEcha~4~4~343880~104980/info.json",

"http://lac-luna-test2.is.ed.ac.uk:8181/luna/servlet/iiif/UoEgal~5~5~76533~105854/info.json",

"http://lac-luna-test2.is.ed.ac.uk:8181/luna/servlet/iiif/UoEsha~3~3~54530~102219/info.json",

"http://lac-luna-test2.is.ed.ac.uk:8181/luna/servlet/iiif/UoEsha~3~3~64904~103090/info.json"
]
```

And then the queue generated using the function generateQueue which takes the following options: 
 - children_no (Number) - The number of items to be selected from the collectionDocArray to be added to the queue.
 - scrolling (Boolean) - [Optional] If true, look for the object defined by variable InfinityListView and fill with thumbnail icons of the queue.
 - reuse (Boolean) - [Optional] If true then will reuse images from the "collectionDocArray" to keep lengthening the queue dynamically, if scrolling is also true then the queue will infinitely lengthen when the thumbnail list is scrolled through.
 - repeat_no (Number) - [Optional] The maximum number of times that objects can be reused to lengthen the queue - if undefined with reuse true then reuse will continue infinitely - this could cause harm to user experience if unlimited icons are loaded into the page.

```
generateQueue(children_no, scrolling, reuse, repeat_no)
```

#Further Information

For more information about the project, the research done and decisions made then you can read the series of posts about it here - [https://pigeonsblue.com/2016/08/22/polyanno-adventures-in-annotation/](https://pigeonsblue.com/2016/08/22/polyanno-adventures-in-annotation/) and you can tweet your compliments and complaints to Erin Nolan for creating the mess [@TheGreySkies](https://twitter.com/TheGreySkies).

This project should be compliant with the international standards of both [IIIF interoperable image viewing](http://iiif.io) and [W3C Open Annotation Data Model](http://www.w3.org/TR/annotation-model/).
