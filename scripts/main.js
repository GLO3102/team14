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
var router = new Router();

router.on('route:home', function() {
    console.log("routing to home");
});

router.on('route:watchlists', function() {
    console.log("routing to watchlists");

    var watchlistListView = new WatchlistListView({ });
    watchlistListView.render();
});

router.on('route:editWatchlist', function(id) {
    console.log("routing to editWachlist");
    console.log(id);

    var watchlistEditView = new WatchlistEditView({ });
    watchlistEditView.render({id: id});
});
/**
 * Created by Sebastien on 2015-10-30.
 */
router.on('route:showMovieData', function(id)
{
    var movieVue = new MovieView();
    movieVue.render({id: id});
});

var formData = {email:"david.mercier@gmail.com", password:"123456"};
var loginObj;

$.ajax({
    url : "https://umovie.herokuapp.com/login",
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
