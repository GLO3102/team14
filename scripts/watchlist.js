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

//*Simon: je commence le WatchlistEditView//

var watchlists = new Watchlists();

var WatchlistEditView = Backbone.View.extend({
    'el': '.page',
    'render': function(options) {
        var self = this;
        //si la requête est faite avec un ID, c'est qu'on veut aller chercher une watchlist en particulier (*Edit
        // Watchlist*)
        if(options.id) {

            var watchlist = new Watchlist({id: options.id});
            watchlist.fetch({
                beforeSend: setHeader,
                success: function(watchlist) {
                    var template= _.template($("#watchlist-edit-template").html(), {watchlist: watchlist.toJSON()});
                    self.$el.html(template);
                }
            });
        }
        //sinon, c'est qu'on crée une nouvelle watchlist (*New Watchlist*)
        else {
            {
                var template = _.template($("#watchlist-edit-template").html(), {watchlist: null});
                this.$el.html(template);
            }
        }
    },
    'events': {
        'click .addSubmit': 'saveWatchlist',
        'click .delete': 'deleteWatchlist'
    },
    'saveWatchlist': function(event) {
        var currentId = $('#hiddenWatchlistId').text();
        if(currentId == 0) {
            //c'est alors une nouvelle watchlist
            var checkValid = watchlists.create({
                name: $('#watchlistName').val()
            }, {
                beforeSend: setHeader,
                type: 'POST',
                validate: true,
                success: function(watchlist) {
                    router.navigate('watchlists', {trigger:true});
                }
            });
        } else {
            //on veut plutôt modifier une watchlist existante
            var watchlist = new Watchlist();
            var checkValid = watchlist.save({
                id: currentId,
                name: $("#watchlistName").val()
            }, {
                beforeSend: setHeader,
                validate: true,
                success: function(watchlist) {
                    router.navigate('watchlists', {trigger: true});
                }
            });
            return false;
        }
    },
    'deleteWatchlist': function(event) {

    }
});