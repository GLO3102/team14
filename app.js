/**
 * Created by Stéphane on 2015-10-29.
 */
$(function () {
    var actorModel = new ActorModel(['results'].artistId= 184723090);
    ActorModel.url = 'https://umovie.herokuapp.com/unsecure/actors/184723090';

    var actorView = new ActorView({
        model: actorModel
    });

    // We add `.complete` callback to render the views only after the `fetch()` is completed.

    actorModel.fetch({
        success: function (actorModel) {
            console.log(actorModel.toJSON());
        }
    })


});