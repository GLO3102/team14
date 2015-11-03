$(function (){



    var tvShowsCollection =  new TvShowsCollection({});
    tvShowsCollection.url = 'http://umovie.herokuapp.com/unsecure/search/tvshows/seasons?q=Breaking Bad, Season 5&limit=1';
    var tvShowsView = new TvShowsView({
        collection: tvShowsCollection
    });
    tvShowsCollection.fetch({
        success: function (model, response) {
            createEpisodesListe();
        },
        error: function (model, response) {
            console.log("error");
        }
    });


    function createEpisodesListe(){
        var collectionId = tvShowsCollection.toJSON()[0].collectionId;
        var episodesCollection =  new EpisodesCollection({"collectionId" : collectionId});
        episodesCollection.url = 'https://umovie.herokuapp.com/unsecure/search/tvshows/episodes?q=Breaking Bad&limit=1000';
        //episodesCollection.bySeason(533936970);
        var episodesView = new EpisodesView({
            collection: episodesCollection
        });
        console.log(tvShowsCollection.model.collectionId);
        episodesCollection.fetch();
    }


});
