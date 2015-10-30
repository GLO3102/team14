$(function (){
    TvShowsCollection =  Backbone.Collection.extend({
        model: TVShowsModel,
        parse: function(response) {

            return response.results;
        }
    });
});