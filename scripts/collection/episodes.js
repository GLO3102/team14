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
                var trackTimeMillis = obj.trackTimeMillis;

                trackName = trackName.substring(trackName.indexOf("\"")+1);
                trackName = trackName.substring(0,trackName.indexOf("\""));
                obj.trackName = trackName;

                obj.trackTimeMillis = millisecondsToTime(trackTimeMillis);
            });

            return filterBySeason;
        }
    });

    function millisecondsToTime(milli)
    {
        var seconds = Math.floor((milli / 1000) % 60);
        var minutes = Math.floor((milli / (60 * 1000)) % 60);
        if(seconds < 10){
            seconds = "0"+seconds;
        }

        return minutes + ":" + seconds;
    }

});
