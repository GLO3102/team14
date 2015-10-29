MovieModel = Backbone.Model.extend({
    urlRoot: "http://umovie.herokuapp.com/movies",
    defaults: {
        trackId: "",
        nameId: ""
    },
    parse: function(response){
        this.trackId=response.trackId;
        return response;
    }
})