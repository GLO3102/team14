/**
 * Created by Sebastien on 2015-10-26.
 */
MovieView = Backbone.View.extend({
    el: "#movies-lists",
    render: function(){
        var that = this;
        var formData = {email:"sebastien.reader.1@ulaval.ca", password:"serea@ulaval@2013"};
        $.ajax({
            url : "https://umovie.herokuapp.com/login",
            type: "POST",
            data : formData,
            success: function(data, textStatus, jqXHR)
            {
                var securityToken = data.token;
                var v_trackId = 380239015;

                var movie = new MovieModel({trackId: v_trackId});
                movie.urlRoot += "/" +v_trackId;
                movie.fetch({headers: {
                    'Authorization': securityToken} ,
                    success: function (data) {
                        var film = data.toJSON();
                        var result = film.results[0];
                        result =  changeFilmStatsFormat(result);
                        var template = _.template($("#movie-template").html());
                        that.$el.html(template({movie: result}));
                    }
                })


            }});

    }



},
changeFilmStatsFormat = function(filmArray){
    var date =  filmArray.releaseDate;
    filmArray.releaseDate = date.slice(0,10);
    var filmTime = filmArray.trackTimeMillis;
    var millisInMinute = 60000;
    filmTime = (filmTime /millisInMinute);
    filmArray.trackTimeMillis = Math.round(filmTime);
    return filmArray;
})
