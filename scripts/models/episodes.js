var EpisodesModel = Backbone.Model.extend({
    parse: function( response ){
        this.collectionId=response.collectionId;
        return response;
    }
});

