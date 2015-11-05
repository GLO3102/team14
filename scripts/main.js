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
        'tvshow/:id': 'tvshow'
    }
});

// Display logic
var movieModel = new MovieModel({});
var movieView = new MovieView({})
var router = new Router();

router.on('route:home', function() {
    console.log("routing to home");
});

router.on('route:watchlists', function() {
    console.log("routing to watchlists");
    toggleUserMenu(null);

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
router.on('route:showMovieData', function(id){
    movieModel.trackId=id;
    console.log(id);
    console.log("voici mon model -->>>>>>>>>>>>>>>>>>>>>");
    console.log(movieModel);
    var rootUrl = "http://umovie.herokuapp.com/unsecure/movies";
    movieModel.urlRoot = rootUrl+"/"+id;
    movieView.model = movieModel;
    movieModel.fetch({
        success: function(){
            console.log("youpi ça marché!");
            console.log(movieView.model.toJSON());
            movieView.render();
        }
    })
    console.log(movieView.model.toJSON());
});

router.on('route:tvshow', function(id){

    $.get('tvshow.html', function(data) {
        $("#PageContent").html(data);
    }).done(function(){
        var tvShowsCollection =  new TvShowsCollection({});
        //http://umovie.herokuapp.com/unsecure/tvshows/season/271383858
        tvShowsCollection.url = 'http://umovie.herokuapp.com/unsecure/tvshows/season/' + id;
        console.log('Log Patrick tvshow URL : ' + tvShowsCollection.url);
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
$("#showAMovie").click(function(){
    var tabMovie=[365647689,380239015,380040080,287984473,301963538,279588778,430024279,532285804,303821906,872652035];
    var idMovie = tabMovie[Math.floor((Math.random()*10)+1)-1]
    console.log("id du film " +idMovie)
    router.navigate('movies/'+idMovie, {trigger: true});
});

Backbone.history.start();
