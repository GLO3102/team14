/**
 * Created by Sebastien on 2015-11-17.
 */
var UsersViews = Backbone.View.extend({
    template: _.template($("#user-tpl").html()),
    el: "#PageContent",
    initialize: function () {
        _.bindAll(this, 'render');
        var self = this;
        this.collection.bind('sync change add remove', function () {
            self.render();
        });
    },
    render: function () {
        this.$el.html(this.template({
            user: this.model.toJSON()
        }))

        if (this.model.id === loginObj['id']) {
            $("#followUserButton").hide();
        }
        $("#stopFollowUserButton").hide();

    },
    events: {
        "click #friendFollowing": "viewFriend",
        "click #followUserButton": "addFriend",
        "click #stopFollowUserButton": "deleteFriend",
    },
    viewFriend: function (event) {
        var friendUser = new UsersModel;

        var root = "http://umovie.herokuapp.com/search/users?q="
        console.log(event.target.innerHTML);
        friendUser.urlRoot = root + event.target.innerHTML;
        friendUser.fetch({
            beforeSend: setHeader,
            success: function (data) {
                console.log(data.attributes[0]);
                var id = data.attributes[0].id;
                router.navigate("user/" + id, {trigger: true})
            }

        })
    },
    addFriend: function (event) {
        var friend = {"id": this.model.id};
        console.log(loginObj.token);
        var token = loginObj.token;

        $.ajax({
            type: "POST",
            url: "http://umovie.herokuapp.com/follow",
            data: JSON.stringify(friend),
            contentType: "application/json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function (data, textStatus, jqXHR) {
                $("#followUserButton").hide();
                $("#stopFollowUserButton").show();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Ca va mal a la shop")

            }
        });
    },
    deleteFriend: function (event) {
        console.log(this.model);
        var that = this;

        var id = this.model.attributes.id;
        var token = loginObj.token;
        var userAccount = new UsersModel();
        userAccount.urlRoot = "http://umovie.herokuapp.com/users" + "/" + loginObj.id;
        userAccount.fetch({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function (data) {
                console.log(data);
                var followArray = data.attributes.following;
                console.log(followArray);
                followArray.forEach(function (friend) {
                    console.log(friend);
                    if (friend.name === that.model.attributes.name) {
                        var idFriend = friend._id;
                        console.log("id Friend ==== " + idFriend);
                        alert(idFriend);
                        $.ajax({
                            type: "DELETE",
                            url: "http://umovie.herokuapp.com/follow" + "/" + idFriend,
                            contentType: "application/json",
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('Authorization', token);
                            },
                            success: function (data, textStatus, jqXHR) {
                                alert("J'ai gagné");
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                alert("Ca va mal a la shop")

                            }

                        })
                    }
                })
            }
        })
    }
})
