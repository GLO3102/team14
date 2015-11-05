/**
 * Created by Stéphane on 2015-10-29.
 */
$(function () {


    var actorModel = new ActorModel(['results'].artistId= 184723090);
    actorModel.url = 'https://umovie.herokuapp.com/unsecure/actors/184723090';

   // collection movies
    var movieCollection = new MoviesCollection ({});
    movieCollection.url='https://umovie.herokuapp.com/unsecure/actors/184723090/movies';

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
        //console.log( JSON.stringify(actorModel));
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
        movieView .render();
        console.log( JSON.stringify(movieCollection));
    });

});