/**
 * Created by Sebastien on 2015-12-07.
 */
var Watchlists = Backbone.Collection.extend({
    'url': 'http://umovie.herokuapp.com/watchlists',
    'model': Watchlist,

    'parse': function( apiResponse ){
        return apiResponse;
    }
});

