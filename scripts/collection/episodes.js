$(function (){
    EpisodesCollection =  Backbone.Collection.extend({
        model: EpisodesModel,
        getCollectionId: function (response) {
            return 0;
        },
        parse: function(response) {
            var filterBySeason = response.results.filter(function (el) {
                return el.collectionId == 533936970;
            });
            filterBySeason.forEach(function(obj) {
                var trackName = obj.trackName;
                trackName = trackName.substring(trackName.indexOf("\"")+1);
                trackName = trackName.substring(0,trackName.indexOf("\""));
                obj.trackName = trackName;
            });

            return filterBySeason;
        }
    });
});
