## README

This is a project aiming to enable to crowdsourced transcription and translation of the awesome collections at the University of Edinburgh. Maybe gamifying if I get time.

Currently being built in NodeJS around [IIIF](http://iiif.io) with [Leaflet JS](http://leafletjs.com) as both viewer and adding additional canvas layers.

Annotations are built using [Leaflet Draw](https://github.com/Leaflet/Leaflet.draw) to allow users to input but with my own adaptations for the needs of this project.

If you want to use and can forgive my chaotic jumble of testing packages all on top of each other (that I plan one day to pay attention to and actually constructively use) then simply clone this project into your own folder.


```
$ git clone "https://github.com/BluePigeons/Polyglot.git" 
```

Then open the Polyglot folder and install dependencies.

```
$ npm install 
```

Then start the server and view it at [http://172.20.185.81:8080](http://172.20.185.81:8080) and enjoy the buggy annotation fun!

```
$ npm start 
```

And if you want to run tests, which you probably should then of course you can.

```
$ npm test 
```

You can tweet your compliments and complaints to me [@TheGreySkies](https://twitter.com/TheGreySkies).

This project should be compliant with the international standards of both [IIIF interoperable image viewing](http://iiif.io) and [W3C Open Annotation Data Model](http://www.w3.org/TR/annotation-model/).