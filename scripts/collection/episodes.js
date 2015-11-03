$(function (){
    EpisodesCollection =  Backbone.Collection.extend({
        model: EpisodesModel,
        collectionId: "",
        initialize: function(data) {
            collectionId = data.collectionId;
        },

        parse: function(response) {
            var filterBySeason = response.results.filter(function (el) {
                return el.collectionId == this.collectionId;
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
