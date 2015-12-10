function createEpisodesListe(tvShowsCollection){
    var collectionId = tvShowsCollection.toJSON()[0].collectionId;
    var episodesCollection =  new EpisodesCollection({"collectionId" : collectionId});
    episodesCollection.url = 'https://umovie.herokuapp.com/tvshows/season/' + collectionId + '/episodes';
    var episodesView = new EpisodesView({
        collection: episodesCollection
    });
    episodesCollection.fetch({
        beforeSend: setHeader,
        success: function (model, response) {
            episodesView.render();
        },
        error: function (model, response) {
            console.log("error");
        }
    });

    $('#search-episodes-form').submit(function () {
        return false;
    });

    $("#search-episode").click(function() {
        console.log("#search-episode");
        var valeurRecherche = $("#search-episodes-field").val();
        var episode = null;
        var episodeList = episodesCollection;
        episodeList.forEach(function(obj) {

            var trackName = obj.attributes.trackCensoredName.toString().toLowerCase();
            if(trackName.indexOf(valeurRecherche) > -1 && valeurRecherche.length > 0){
                episode = obj.attributes;
                return false;
            }
        });
        if(episode == null){
            $('#myTvShowModal').modal('show');
            $('.modal-body').empty();
            $('.modal-body').append("Nothing was found");
        }else{
            $('#myTvShowModal').modal('show');
            episodesView.modalEpisode(episode.trackId);
        }

    });
}