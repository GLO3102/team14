$(function (){



    var tvShowsCollection =  new TvShowsCollection({});
    tvShowsCollection.url = 'http://umovie.herokuapp.com/unsecure/search/tvshows/seasons?q=Breaking Bad, Season 5&limit=1';
    var tvShowsView = new TvShowsView({
        collection: tvShowsCollection
    });
    tvShowsCollection.fetch();

    var episodesCollection =  new EpisodesCollection({});
    episodesCollection.url = 'https://umovie.herokuapp.com/unsecure/search/tvshows/episodes?q=Breaking Bad&limit=1000';
    //episodesCollection.bySeason(533936970);
    var episodesView = new EpisodesView({
        collection: episodesCollection
    });
    episodesCollection.fetch();

});
