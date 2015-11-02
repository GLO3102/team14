/**
* Created by Sebastien on 2015-10-26.
*/
MovieView = Backbone.View.extend({
    template:  _.template($("#movie-template").html()),
    filmPresent: "",
    el: ".page",

    render: function(options){
        var that = this;
        if(options.id) {
            var v_trackId= options.id;
            console.log(options);
            console.log(options.id);
            var movie = new MovieModel({trackId: v_trackId});
            var rootUrl = "http://umovie.herokuapp.com/unsecure/movies";
            movie.urlRoot = rootUrl + "/" + v_trackId;
            movie.fetch({beforeSend: setHeader,
                success: function (data) {
                    var film = data.toJSON();
                    var result = film.results[0];
                    filmPresent=result;
                    result =  changeFilmStatsFormat(result);
                    var watchListMovie = new Watchlists;
                    self = that;
                    watchListMovie.fetch({beforeSend: setHeader,
                        success: function (data) {

                            $("#welcome-message").opacity=0;
                            var templateWatchList = _.template($("#movie-template").html());
                            self.$el.html(self.template({movie: result,watchlists: data.toJSON()}))
                        }
                    })
                }
            })
        }
    },
    events:{
        "click #btnAddWatchList": "addMovieWatchlist"
    },
    addMovieWatchlist: function(event){
        var idWatchList = $( "#menuWatchlistMovie" ).val();
        $.ajax({
            beforeSend: setHeader,
            type: "POST",
            url: "https://umovie.herokuapp.com/watchlists/"+idWatchList+"/movies",
            data: JSON.stringify(filmPresent),
            success: function() {
                self.$el.html("");
                console.log(filmPresent);
                router.navigate('');
                $("#welcome-message").opacity=100;
                alert("vous avez ajouter le film" + filmPresent.trackName + "dans la watchlist #"+ idWatchList);

            },
            contentType: 'application/json'
        } );
    }
});
var changeFilmStatsFormat = function(filmArray){
    var date =  filmArray.releaseDate;
    filmArray.releaseDate = date.slice(0,10);
    var filmTime = filmArray.trackTimeMillis;
    var millisInMinute = 60000;
    filmTime = (filmTime /millisInMinute);
    filmArray.trackTimeMillis = Math.round(filmTime);
    return filmArray;
};