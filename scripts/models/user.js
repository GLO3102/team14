/**
 * Created by Sebastien on 2015-11-17.
 */
var UsersModel = Backbone.Model.extend({
    default: {
        id: "",
        name : "",
        email: "",
        following: []
    }

})