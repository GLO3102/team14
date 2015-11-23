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

        if(this.model.id === loginObj['id']){
            $("#followUserButton").hide();
        }

    },
    events: {
        "click #friendFollowing" : "viewFriend",
        "click #followUserButton": "addFriend"
    },
    viewFriend: function(event){
        var friendUser = new UsersModel;

        var root = "http://umovie.herokuapp.com/search/users?q="
        console.log(event.target.innerHTML);
        friendUser.urlRoot = root + event.target.innerHTML;
        friendUser.fetch({
            beforeSend: setHeader,
            success:function(data){
                console.log(data.attributes[0]);
                var id = data.attributes[0].id;
                router.navigate("user/"+id, {trigger: true})
            }

        })
    },
    addFriend: function(event){
        var friend = {id: this.model.id}
        $.ajax({
            type: "POST",
            url: "http://umovie.herokuapp.com/follow",
            data : friend,
            contentType : "application/json",
            Authorization: loginObj['token'],
            success: function(data, textStatus, jqXHR)
            {
                alert("Victoire, Je suis une femme!")
            },
            error: function (jqXHR, textStatus, errorThrown)
            {

            }
        });

    }

})
