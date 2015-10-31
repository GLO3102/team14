var MovieModel = Backbone.Model.extend({
    urlRoot: "http://umovie.herokuapp.com/unsecure/movies",
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
