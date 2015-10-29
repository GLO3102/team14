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
        'click .delete': 'deleteWatchlist',
        'click .addMovieToWL': 'addMovieToWatchlist',
        'click #btnWatchlistMovieSearch': 'searchMoviesForWatchlist'

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
        var watchlist = new Watchlist();
        watchlist.id = $('#hiddenWatchlistId').text();
        watchlist.destroy({
            beforeSend: setHeader,
            success: function() {
                router.navigate('watchlists', {trigger: true});
            }
        });
        return false;
    },
    'addMovieToWatchlist': function(event) {
        $("#watchlistSearchContainer").show(200);
    },
    'searchMoviesForWatchlist': function(event) {
        var self = this;
        var searchword = $("#watchlistMovieSearch").val();
        searchword = searchword.trim();
        if(searchword==="") {
            alert("Please enter some search text and try again");
        }
        else {
            var movies = new Movies();
            var reqUrl = "https://umovie.herokuapp.com/search/movies?q="+encodeURIComponent(searchword)+"&limit=5";
            console.log(reqUrl);
            movies.url = reqUrl;
            movies.fetch({
                beforeSend: setHeader,
                success: function(movies) {
                    self.$("#watchlistMovieSearchResults").show();
                    displaySearchResults(movies.toJSON()[0]);
                }
            });


        }


    }
});

function displaySearchResults(results) {
    var numResults = results.resultCount;
    for (i=1; i<=numResults; i++) {
        $("#rowResult"+i).show();
        $("#titleResult"+i).text(results.results[i-1].trackName);
        $("#descriptionResult"+i).text(results.results[i-1].longDescription);
        $("#idResult"+i).text(results.results[i-1].trackId);
    }
};