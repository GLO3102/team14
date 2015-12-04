
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
        this.searchVideoYoutube(movie.nameTrack);
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
            player = new YT.Player('MoviePageVideoContainer', {
                height: '220',
                width: '400',
                videoId: data.items[0].id.videoId
            });
        });
    },
    addMovieInWatchList: function(movie){
        var idWatchList = $("#menuWatchlistMovie").val();
        var that= this;
        $.ajax({
            type: "POST",

            url: "https://umovie.herokuapp.com/unsecure/watchlists/"+idWatchList+"/movies",
            data: JSON.stringify(movie),
            success: function(data) {
                router.navigate('watchlists', {trigger:true});
                alert("The movie " +movie.trackName + " is added to the watchlist : "+ data.name);
                LoadMainScreen();
            },
            contentType: 'application/json'
        } );
    },
    getWatchlitsForAddWatchistButton: function(movie){
        console.log("before call to getRecList");
        self = this;
        var watchListMovie = new Watchlists;
        var token = $.cookie("umovieToken");
        watchListMovie.fetch({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function (data){
                var templateWatchList = _.template($("#movie-template").html());
                self.$el.html(self.template({movie: movie,watchlists: data.toJSON()}))
                getRecommendationList(movie.trackName, "movies");
            }
        })

    },

});

