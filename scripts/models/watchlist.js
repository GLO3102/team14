/**
 * Created by Sebastien on 2015-12-07.
 */
var Watchlist = Backbone.Model.extend({
    'urlRoot': 'http://umovie.herokuapp.com/watchlists',

    'defaults': {
        id: null,
    },

    'initialize': function() {
        this.set('movies', new MoviesCollection(this.get('movies')));
    },

    'parse': function( apiResponse ){
        apiResponse.movies.forEach( function(item) {
        });

        return apiResponse;
    }
});