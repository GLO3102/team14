/**
 * Created by dmercier on 2015-10-18.
 */

var Router = Backbone.Router.extend({
    routes: {
        '' : 'home', // intentionally blank for the home page
        'watchlists' : 'watchlists',
        'watchlists/:id' : 'editWatchlist'
    }
});

// Display logic
var watchlistListView = new WatchlistListView({ });
//var watchlistEditView = new WatchlistEditView({ });
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
    //watchlistEditView.render({id: id});
});

Backbone.history.start();
