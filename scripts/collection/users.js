/**
 * Created by Sebastien on 2015-11-17.
 */
var UsersCollection = Backbone.Collection.extend({
    Model: UsersModel,
    parse: function(response){
        return response.id;
    }
});

