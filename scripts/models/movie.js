var MovieModel = Backbone.Model.extend({
    urlRoot: "http://umovie.herokuapp.com/unsecure/movies",
    defaults: {
        trackId: "",
        nameId: ""
    },

    initialize: function(data) {
        this.trackId = data.trackId;
    },
    parse: function(response) {
        this.trackId = response.trackId;
        var indexArray = 0;
        var movie = response.results[indexArray];
        movie = this.changeMovieFormat(movie);
        return response;
    },
    changeMovieFormat: function(movie){
        movie.artworkUrl100 = this.changeCoverPhotoDefinition(movie.artworkUrl100);
        movie.releaseDate = this.changeDateFormat(movie.releaseDate);
        movie.trackTimeMillis = this.changeTimeTrackFormat(movie.trackTimeMillis);
        return movie;
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
