/**
 * Created by Stéphane on 2015-10-27.
 */
$(function() {
    ActorCollection = Backbone.Collection.extend({
        model: ActorModel,
        parse: function(response) {
            return response.actors;
        }
    });
});
