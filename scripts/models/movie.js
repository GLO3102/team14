var MovieModel = Backbone.Model.extend({
    urlRoot: "http://umovie.herokuapp.com/unsecure/movies",
    defaults: {
        trackId: "",
        nameId: ""
    },

    initialize: function(data) {
        this.trackId = data.trackId;
        console.log("initializing moviemodel")
    },
    parse: function(response){
        console.log("parsing moviemodel");
        this.trackId=response.trackId;
        return response;
    }
});
