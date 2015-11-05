function createEpisodesListe(tvShowsCollection){
    var collectionId = tvShowsCollection.toJSON()[0].collectionId;
    var episodesCollection =  new EpisodesCollection({"collectionId" : collectionId});
    episodesCollection.url = 'https://umovie.herokuapp.com/unsecure/tvshows/season/' + collectionId + '/episodes';
    var episodesView = new EpisodesView({
        collection: episodesCollection
    });
    episodesCollection.fetch({
        success: function (model, response) {
            episodesView.render();
        },
        error: function (model, response) {
            console.log("error");
        }
    });
}