
var infinityListView = new infinity.ListView($('#poly-ed-scroll'));

var theFilters = {};

$(".filterBtn").on("click", function(event){

	theFilters.metadata.startYear = $(".poly-ed-startYear");
	theFilters.metadata.startYear = $(".poly-ed-endYear");

/////need to break up strings into arrays to search properly
	theFilters.transcription.languages = $(".poly-ed-languages-filter");
	theFilters.transcription.difficulty = $("#poly-ed-TranscriptionDifficulty");
	theFilters.translation.languages = $(".poly-ed-languages-filter");
	theFilters.translation.difficulty = $("#poly-ed-TranslationDifficulty");

	theFilters.searchTerms = $(".poly-ed-languages-filter");

});

var theScrollHeight = $( window ).height() - $(".ed-poly-header").height() - $(".poly-ed-filters-row").height();
$("#poly-ed-scroll").height(theScrollHeight);

var polyEdFilters = null;
generateQueue(12, true, true, 0);

