/**
* Created by Sebastien on 2015-10-26.
*/
MovieView = Backbone.View.extend({
    filmPresent: "",
    el: ".page",
    render: function(options){
        var that = this;
        if(options.id) {
            var v_trackId= options.id;
            console.log(options);
            console.log(options.id);
            var movie = new MovieModel({trackId: v_trackId});
            movie.urlRoot += "/" + v_trackId;
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
                            console.log(data.toJSON());
                            var templateWatchList = _.template($("#movie-template").html());
                            self.$el.html(templateWatchList({movie: result,watchlists: data.toJSON()}))
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
                alert("vous avez ajouter le film" + filmPresent.trackName + "dans la watchlist #"+ idWatchList);
            },
            contentType: 'application/json'
        } );
        console.log(filmPresent);
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