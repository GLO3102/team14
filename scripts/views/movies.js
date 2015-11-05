/**
* Created by Sebastien on 2015-10-26.
*/
MovieView = Backbone.View.extend({
    template: _.template($("#movie-template").html()),
    el: "#PageContent",
    first: true,

    initialize: function (){
        var tag =document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



    },
    render: function(){
        var modelJson =  this.model.toJSON();
        var indexArray=0;
        var movie =modelJson.results[indexArray];
        movie =  this.changeFilmStatsFormat(movie);
        if(this.first){
            this.first = false;
            this.searchVideoYoutube(movie);
        }

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
                LoadMainScreen();
            },
            contentType: 'application/json'
        } );
    },
    searchVideoYoutube: function(filmArray){
        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        var urlBegin = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q="';
        var urlMiddle =  filmArray.trackName+'official trailer';
        var urlEnd = '&maxResults=1&order=viewCount&key=AIzaSyBNPujtVRFaQjnXBUMu6kvMj-S6gIiNHYk';
        var urlComplete = urlBegin + urlMiddle + urlEnd;
        var player;

        $.ajax({
            url : urlComplete,
            type : 'GET',
            contentType: 'application/json'
        }).done(function(data) {
            player = new YT.Player('movie-template', {
                height: '390',
                width: '640',
                videoId: data.items[0].id.videoId
            });
            console.log("************************************* youtube Function *******************");
            console.log(player);
            console.log("***************************************************************************");
        });


    },
    changeFilmStatsFormat: function(filmArray){
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
    }

});

