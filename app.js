/**
 * Created by Stéphane on 2015-10-29.
 */
var actorFunction=function (id) {


    var actorModel = new ActorModel(['results'].artistId= id);
    actorModel.url = 'https://umovie.herokuapp.com/actors/'+ id;

   // collection movies
    var movieCollection = new ActorMoviesCollection();
    movieCollection.url='https://umovie.herokuapp.com/actors/'+id+'/movies';

    var actorView = new ActorView({
        model: actorModel
    });

    //vue movies
    var movieView = new ActorMovieView({
        collection: movieCollection
    });

    actorModel.fetch({
        beforeSend: setHeader,
        complete: function () {
            actorView.render();
            var data =JSON.stringify(actorModel);
        }
    });

    movieCollection.fetch({
        beforeSend: setHeader,
        complete: function () {
            movieView.render();
        }
    });
};

