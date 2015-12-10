/**
 * Created by Sebastien on 2015-12-07.
 */
var WatchlistListView = Backbone.View.extend({
    'el': '#PageContent',
    'template': _.template($('#watchlist-list-template').html()),
    'render': function(currentUserId) {
        var that = this;
        var watchlists = new Watchlists();
        watchlists.initialize(currentUserId);
        watchlists.fetch( {
            beforeSend: setHeader,
            success: function() {
                that.$el.html( that.template( { 'watchlists': watchlists } ) );
            }
        })

    }

});
var watchlists = new Watchlists();
var watchlistSearchResults = [];
var WatchlistEditView = Backbone.View.extend({
    'el': '.page',
    'render': function(options) {
        var self = this;
        //si la requ�te est faite avec un ID, c'est qu'on veut aller chercher une watchlist en particulier (*Edit
        // Watchlist*)a
        if(options.id) {
            var watchlist = new Watchlist({id: options.id});
            watchlist.fetch({
                beforeSend: setHeader,
                success: function(watchlist) {
                    obj = watchlist.toJSON();

                    var template= _.template($("#watchlist-edit-template").html(), {watchlist: obj});
                    self.$el.html(template);
                }
            });
        }
        //sinon, c'est qu'on cr�e une nouvelle watchlist (*New Watchlist*)
        else {
            var template = _.template($("#watchlist-edit-template").html(), {watchlist: null});
            this.$el.html(template);
        }
    },
    'events': {
        'click .addSubmit': 'saveWatchlist',
        'click .delete': 'deleteWatchlist',
        'click .addMovieToWL': 'addMovieToWatchlist',
        'click #btnWatchlistMovieSearch': 'searchMoviesForWatchlist',
        'click .addSearchResult' : 'addSearchResultToWatchlist',
        'click .deleteMovieFromWL' : 'deleteMovieFromWL',
        'click #watchlist-movies-list' : 'showMovieDetails'
    },
    'saveWatchlist': function(event) {

        var currentId = $('#hiddenWatchlistId').text();
        if(currentId == 0) {
            var watchlistName = $('#watchlistName').val();
            var isNameValid = checkWatchlistName(watchlistName);
            console.log("Name valid: "+isNameValid);
            //c'est alors une nouvelle watchlist
            if(!($('#watchlistName').val().length > 0)) {
                alert("A watchlist name must contain at least one character.");
            }
            else if (!isNameValid) {
                console.log("is name valid?!");
                alert("A watchlist with that name already exists.");
            }
            else {
                var checkValid = watchlists.create({
                    name: $('#watchlistName').val()
                }, {
                    type: 'POST',
                    validate: true,
                    beforeSend: setHeader,

                    success: function (watchlist) {
                        router.navigate('watchlists', {trigger: true});
                    }
                });
            }
        } else {

            //on veut plut�t modifier une watchlist existante
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
        }
        return false;
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
        return false;
    },
    'searchMoviesForWatchlist': function(event) {

        $(".searchResultItem").hide();
        var self = this;
        var searchword = $("#watchlistMovieSearch").val();
        searchword = searchword.trim();
        if(searchword==="") {
            alert("Please enter some search text and try again");
        }
        else {
            var movies = new MoviesCollection();
            var reqUrl = "https://umovie.herokuapp.com/search/movies?q="+encodeURIComponent(searchword)+"&limit=5";
            movies.url = reqUrl;
            movies.fetch({
                beforeSend: setHeader,
                success: function(movies) {
                    self.$("#watchlistMovieSearchResults").show();
                    watchlistSearchResults = movies.toJSON()[0].results;
                    displaySearchResults(movies.toJSON()[0]);
                }
            });
        }
        return false;
    },
    'addSearchResultToWatchlist': function(event) {
        var currentId = $('#hiddenWatchlistId').text();
        var clickId = event.target.id;
        var id = Number(clickId.substr(clickId.length-1));
        var movieToAdd = watchlistSearchResults[id-1];
        var self = this;
        $.ajax({
            beforeSend: setHeader,
            type: "POST",
            url: "https://umovie.herokuapp.com/watchlists/"+currentId+"/movies",
            data: JSON.stringify(movieToAdd),
            success: function() {
                options = {'id': currentId};
                self.render(options);
            },
            contentType: 'application/json'
        } );
        return false;
    },
    'deleteMovieFromWL': function(event) {
        var currentWLID = $('#hiddenWatchlistId').text();
        var currentMovieID = event.currentTarget.id;
        var self = this;
        $.ajax({
            beforeSend: setHeader,
            url: "https://umovie.herokuapp.com/watchlists/" + currentWLID + "/movies/" + currentMovieID,
            type: 'DELETE',
            success: function(result) {
                options = {'id': currentWLID};
                self.render(options);
            }
        });

        return false;
    },
    showMovieDetails : function(event){
        var idMovie = event.target.id;
        router.navigate('/movies/'+idMovie, {trigger: true});

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

var checkWatchlistName = function(name) {
    var nameToCheck = " "+name+" ";
    var valid = true;
    console.log("start check name "+nameToCheck);
    $(".watchlistsList").each(function(index, element) {
        var currentName = $(element).html();
        console.log("Current name: -"+currentName+"-");
        console.log("Name: -"+nameToCheck+"-");
        if(currentName === nameToCheck) {
            console.log("am i here?");
            valid = false;
        }
    });
    return valid;
};

