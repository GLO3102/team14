/**
 * Created by dmercier on 2015-10-18.
 */

var Router = Backbone.Router.extend({
    routes: {
        '' : 'home', // intentionally blank for the home page
        'new': 'editWatchlist',
        'watchlists' : 'watchlists',
        'watchlists/:id' : 'editWatchlist',
        'movies/:id': 'showMovieData',
        'tvshow/:id': 'tvshow',
        'actors/:id': 'actor',
        'user/:id': 'users',
        'search': 'search',
        'logout': 'logout'
    }
});

// Display logic
var movieModel = new MovieModel({});
var movieView = new MovieView({});
var usersCollection = new UsersCollection({});
var userModel = new UsersModel({});
var userView = new UsersViews({collection: usersCollection});

var searchFiltersCategories = [];
var moviesSearchResults = [];
var tvShowsSearchResults = [];
var actorsSearchResults = [];
var usersSearchResults = [];

var router = new Router();
router.on('route:home', function() {
    console.log("home route called");
});
router.on('route:actor', function(id) {
    console.log("actor route called");
    $.get('actor.html', function(data) {
        $("#PageContent").html(data);
    }).done(function(){
        actorFunction(id);
    });
});
router.on('route:watchlists', function() {
    console.log("watchlist route called");
    toggleUserMenu(null);
    var watchlistListView = new WatchlistListView({ });
    watchlistListView.render();
});
router.on('route:editWatchlist', function(id) {
    var watchlistEditView = new WatchlistEditView({ });
    watchlistEditView.render({id: id});
});
/**
 * Created by Sebastien on 2015-10-30.
 */
router.on('route:showMovieData', function(id){
    movieModel.trackId=id;
    var rootUrl = "http://umovie.herokuapp.com/movies";
    movieModel.urlRoot = rootUrl+"/"+id;
    if (movieView.model) {
        movieView.model.set(movieModel.toJSON());
    }
    else
    {
        movieView.model = movieModel;
    }
    var token = $.cookie("umovieToken");
    movieModel.fetch({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', token);
        },
        success: function(){
            movieView.render();

            var trackName = movieView.model.toJSON().results[0].trackName;
            setTimeout(movieView.searchVideoYoutube, 200, trackName);
        }
    })
});
router.on('route:tvshow', function(id){
    $.get('tvshow.html', function(data) {
        $("#PageContent").html(data);
    }).done(function(){
        var tvShowsCollection =  new TvShowsCollection({});
        tvShowsCollection.url = 'http://umovie.herokuapp.com/unsecure/tvshows/season/' + id;
        var tvShowsView = new TvShowsView({
            collection: tvShowsCollection
        });
        tvShowsCollection.fetch({
            success: function (model, response) {

                tvShowsView.render();
                createEpisodesListe(model);

            },
            error: function (model, response) {
                console.log("error");
            }
        });
    });
});
router.on('route:users', function(id){
    var rootUrl="http://umovie.herokuapp.com/users"
    userModel.urlRoot = rootUrl+"/"+id;
    userModel.id="";
    userView.model = userModel;
    userModel.fetch({
        beforeSend: setHeader,
        success: function(){
            var options = {'id': ""};
            userView.render(options);

        }
    })
});
router.on('route:search', function() {
    console.log("search route called");
    LoadSearchResults();
});
router.on('route:logout', function() {
    console.log("route logout detected");
    deleteAllCookies();
    //router.navigate("", {trigger: true});
    window.location = 'index.html';
});

if(getLoginToken()) {
    console.log("cookie has been found");
    console.log(getLoginToken());
} else {
    console.log("cookie not found");
    $.get('login.html', function(data) {
        $("#PageContent").html(data);
    })
}

Backbone.history.start();
