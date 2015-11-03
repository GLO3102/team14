/**
 * Created by Stéphane on 2015-10-27.
 */

(function() {
    ActorModel = Backbone.Model.extend({
        defaults: {
            actor: ''
        },
        parse: function(response) {
            // Make sure the id is valid.
            this.id = response.id;
            return response;
        }

    });
})();
