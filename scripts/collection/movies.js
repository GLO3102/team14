/**
 * Created by Sebastien on 2015-10-19.
 */

var MoviesCollection = Backbone.Collection.extend({
    model:MovieModel,

    'initialize': function(data) {
        console.log("initializing movies collection");
    }
});
