var MovieModel = Backbone.Model.extend({
    urlRoot: "http://umovie.herokuapp.com/movies",
    defaults: {
        trackId: "",
        nameId: ""
    },
    parse: function(response){
        console.log("parsing moviemodel");
        this.trackId=response.trackId;
        return response;
    }
});
