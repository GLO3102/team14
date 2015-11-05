/**
* Created by Sebastien on 2015-10-26.
*/
MovieView = Backbone.View.extend({
    template: _.template($("#movie-template").html()),
    el: "#PageContent",

    render: function(){
        var modelJson =  this.model.toJSON();
        var indexArray=0;
        var movie =modelJson.results[indexArray];
        movie =  changeFilmStatsFormat(movie);
        var watchListMovie = new Watchlists;
        self = this;
        watchListMovie.fetch({
            success: function (data){
                var templateWatchList = _.template($("#movie-template").html());
                self.$el.html(self.template({movie: movie,watchlists: data.toJSON()}))
            }
        })
    },
    events:{
        "click #btnAddWatchList": "addMovieWatchlist"
    },
    addMovieWatchlist: function(event){
        var modelJson =  this.model.toJSON();
        var indexArray=0;
        var movie = modelJson.results[indexArray];
        var idWatchList = $( "#menuWatchlistMovie" ).val();
        var that= this;
        $.ajax({
            type: "POST",
            url: "https://umovie.herokuapp.com/unsecure/watchlists/"+idWatchList+"/movies",
            data: JSON.stringify(movie),
            success: function() {
                alert("vous avez ajouter le film " +movie.trackName + " dans la watchlist #"+ idWatchList);
                router.navigate('');
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
    moviePhoto = filmArray.artworkUrl100;
    moviePhoto = moviePhoto.replace("100x100bb","300x300bb");
    filmArray.artworkUrl100 = moviePhoto;
    return filmArray;
};