/**
 * Created by Sebastien on 2015-11-17.
 */
var UsersViews = Backbone.View.extend({
    template: _.template($("#user-tpl").html()),
    el: "#PageContent",
    initialize: function(){
        _.bindAll(this, 'render');
        var self = this;
        this.collection.bind('sync change add remove', function () {
            self.render();
        });
    },
    render: function(){
        this.$el.html(this.template({
            user: this.model.toJSON()
        }))
    },
    events: {
        "click #friendFollowing" : "viewFriend"
    },
    viewFriend: function(event){
        var friendUser = new UsersModel;
        var root = "http://umovie.herokuapp.com/unsecure/search/users?q="
        friendUser.urlRoot = root + event.target.innerHTML;
        friendUser.fetch({
            success:function(data){
                console.log("allo toi");
                console.log(data.attributes[0]);
                var id = data.attributes[0].id;
                router.navigate("user/"+id, {trigger: true})
            }

        })

    }

})
