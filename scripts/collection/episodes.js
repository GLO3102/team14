$(function (){
    EpisodesCollection =  Backbone.Collection.extend({
        model: EpisodesModel,
        getCollectionId: function (response) {
            console.log(response);

            return 0;
        },
        parse: function(response) {
            var filterBySeason = response.results.filter(function (el) {
                return el.collectionId == 533936970;
            });
            return filterBySeason;
        }
    });
});
