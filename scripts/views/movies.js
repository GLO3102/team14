/**
* Created by Sebastien on 2015-10-26.
*/
MovieView = Backbone.View.extend({
    template: _.template($("#movie-template").html()),
    el: "#PageContent",
    initialize: function (){
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    },
    render: function(){
        var modelJson = this.model.toJSON();
        var indexArray = 0;
        var movie = modelJson.results[indexArray];

        movie.artworkUrl100 = this.changeCoverPhotoDefinition(movie.artworkUrl100);
        movie.releaseDate = this.changeDateFormat(movie.releaseDate);
        movie.trackTimeMillis = this.changeTimeTrackFormat(movie.trackTimeMillis);

        this.searchVideoYoutube(movie.trackName);
        this.getWatchlitsForAddWatchistButton(movie);
    },
    events:{
        "click #btnAddWatchList": "addMovieWatchlist"
    },
    addMovieWatchlist: function(event){
        var modelJson =  this.model.toJSON();
        var indexArray=0;
        var movie = modelJson.results[indexArray];
        this.addMovieInWatchList(movie);
    },
    searchVideoYoutube: function(title){
        var urlBegin = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q="';
        var urlMiddle =  title+'official trailer';
        var urlEnd = '&maxResults=1&order=viewCount&key=AIzaSyBNPujtVRFaQjnXBUMu6kvMj-S6gIiNHYk';
        var urlComplete = urlBegin + urlMiddle + urlEnd;
        var player;

        $.ajax({
            url : urlComplete,
            type : 'GET',
            contentType: 'application/json'
        }).done(function(data) {
            player = new YT.Player('movie-template', {
                height: '220',
                width: '400',
                videoId: data.items[0].id.videoId
            });
        });
    },
    addMovieInWatchList: function(movie){
        console.log($("#menuWatchlistMovie").find(":selected").index());
        var idWatchList = $("#menuWatchlistMovie").val();
        var that= this;
        $.ajax({
            type: "POST",
            url: "https://umovie.herokuapp.com/unsecure/watchlists/"+idWatchList+"/movies",
            data: JSON.stringify(movie),
            success: function() {
                alert("The movie " +movie.trackName + "  #"+ idWatchList);
                LoadMainScreen();
            },
            contentType: 'application/json'
        } );
    },
    getWatchlitsForAddWatchistButton: function(movie){
        self = this;
        var watchListMovie = new Watchlists;
        watchListMovie.fetch({
            success: function (data){
                var templateWatchList = _.template($("#movie-template").html());
                self.$el.html(self.template({movie: movie,watchlists: data.toJSON()}))
            }
        })

    },
    changeDateFormat: function (dateRelease) {
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

            var releaseDate = new Date(dateRelease);
            releaseDate = monthNames[releaseDate.getMonth()] + " "+releaseDate.getUTCDate() + ", "+releaseDate.getUTCFullYear() ;
            return releaseDate;
    },
    changeTimeTrackFormat: function(trackTimeMillis){
        var trackTime = trackTimeMillis;
        var millisInMinute = 60000;
        trackTime = (trackTime /millisInMinute);
        trackTime = Math.round(trackTime);
        return trackTime;
    },
    changeCoverPhotoDefinition: function(coverPhoto){
        coverPhoto = coverPhoto.replace("100x100bb","300x300bb");
        return coverPhoto;
    }

});

