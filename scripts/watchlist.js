/**
 * Created by dmercier on 2015-10-18.
 */

var Movie = Backbone.Model.extend({
    //'urlRoot': 'http://localhost:5000/watchlists',
});

var Movies = Backbone.Collection.extend({
    //'url': 'http://localhost:5000/watchlists',
    'model': Movie,

    'parse': function( apiResponse ){
        console.log("parsing collection");
        console.log(apiResponse);
        return apiResponse;
    }
});

var Watchlist = Backbone.Model.extend({
    'urlRoot': 'http://umovie.herokuapp.com/watchlists',

    'defaults': {
        id: null
    },

    'initialize': function() {
        this.set('movies', new Movies());
    },

    'parse': function( apiResponse ){
        console.log("parsing model");
        console.log(apiResponse);
        return apiResponse;
    }
});

var setHeader = function (xhr) {
    xhr.setRequestHeader('authorization', loginObj["token"]);
    //xhr.setRequestHeader('X-Parse-REST-API-Key', 'gvT2Isd5vAvjgq*****************');
}

var Watchlists = Backbone.Collection.extend({
    'url': 'http://umovie.herokuapp.com/watchlists',
    'model': Watchlist,

    'parse': function( apiResponse ){
        console.log("parsing collection");
        console.log(apiResponse);
        return apiResponse;
    }
});

var WatchlistListView = Backbone.View.extend({
    'el': '.page',
    'template': _.template($('#watchlist-list-template').html()),

    'render': function() {
        var that = this;
        var watchlists = new Watchlists();

        watchlists.fetch( {
            beforeSend: setHeader,
            success: function() {
                that.$el.html( that.template( { 'watchlists': watchlists } ) );
            }
        })
    }
});