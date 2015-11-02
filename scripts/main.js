/**
 * Created by dmercier on 2015-10-18.
 */

var Router = Backbone.Router.extend({
    routes: {
        '' : 'home', // intentionally blank for the home page
        'new': 'editWatchlist',
        'watchlists' : 'watchlists',
        'watchlists/:id' : 'editWatchlist',
        'movies/:id': 'showMovieData'

    }
});

// Display logic
var watchlistListView = new WatchlistListView({ });
var watchlistEditView = new WatchlistEditView({ });
var router = new Router();

router.on('route:home', function() {
    console.log("routing to home");
});

router.on('route:watchlists', function() {
    console.log("routing to watchlists");
    watchlistListView.render();
});

router.on('route:editWatchlist', function(id) {
    console.log("routing to editWachlist");
    console.log(id);
    watchlistEditView.render({id: id});
});
/**
 * Created by Sebastien on 2015-10-30.
 */
router.on('route:showMovieData', function(id)
{

    var movieCollection = new MoviesCollection();
    movieCollection.url = 'http://umovie.herokuapp.com/movies/';
    var movieVue = new MovieView({
        collection:movieCollection
    });
    movieVue.render({id: id});
});

var formData = {email:"sebastien.reader.1@ulaval.ca", password:"serea@ulaval@2013"};
var loginObj;

$.ajax({
    type: "POST",
    data : formData,
    success: function(data, textStatus, jqXHR)
    {
        loginObj = data;
        //alert(loginObj["token"]);
    },
    error: function (jqXHR, textStatus, errorThrown)
    {

    }
});

Backbone.history.start();
