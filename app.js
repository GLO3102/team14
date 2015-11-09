/**
 * Created by Stéphane on 2015-10-29.
 */
var actorFunction=function (id) {


    var actorModel = new ActorModel(['results'].artistId= id);
    actorModel.url = 'https://umovie.herokuapp.com/unsecure/actors/'+ id;

   // collection movies
    var movieCollection = new ActorMoviesCollection();
    movieCollection.url='https://umovie.herokuapp.com/unsecure/actors/'+id+'/movies';

    var actorView = new ActorView({
        model: actorModel
    });

    //vue movies
    var movieView = new MovieView({
        collection: movieCollection
    });


    // We add `.complete` callback to render the views only after the `fetch()` is completed.
    actorModel.fetch().complete(function () {
        actorView.render();
        var data =JSON.stringify(actorModel);
    });
    /**actorModel.fetch({
        success: function (actorModel) {
            //console.log( JSON.stringify(actorModel));
            var data =JSON.stringify(actorModel);
            console.log( data);
        }
    })*/
    movieCollection.fetch().complete(function () {
        movieView.render();
    });

};

