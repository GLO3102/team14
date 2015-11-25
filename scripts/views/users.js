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


        var templateWatchList = _.template($('#watchlist-list-template').html());
        var watchlists = new Watchlists();
        var that = this;
        watchlists.fetch( {
            beforeSend: setHeader,
            success: function() {
                that.$el.html(that.template({
                    user: that.model.toJSON(), 'watchlists': watchlists
                }));
                $("#followUserButton").hide()
                $("#stopFollowUserButton").hide();
                $("#boutonsEffacer").hide();
            }
        })

        if (this.model.id === loginObj['id']) {
            $("#boutonsEffacer").show()
        }
        else {
            this.searchFriendOnAccountFollow(this.model.attributes.name);
        }

    },
    events: {
        "click #friendsFollowList": "viewFriend",
        "click #followUserButton": "addFriend",
        "click #stopFollowUserButton": "deleteFriendFollow",
        "click .deleteMovieFromWL": "deleteFriendAccount"
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
                router.navigate("user/"+loginObj.id, {trigger: true})
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Ca va mal a la shop")

            }
        });
    },
    deleteFriendFollow: function (event) {
        var token = loginObj.token;

        var id = this.model.attributes.id;
        var userAccount = new UsersModel();
        userAccount.urlRoot = "http://umovie.herokuapp.com/users" + "/" + loginObj.id;
        var that = this;
        userAccount.fetch({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function (data) {
                alert("youppi j'ai gagne!");
                var followArray = data.attributes.following;
                that.deleteFriend(that,followArray);

            }
        })
    },
    deleteFriendAccount: function(event){
      console.log(event);
        var idFriend = event.target.id;
        this.deleteFriendOnServer(idFriend);
    },
    deleteFriend: function(that,followArray){
        followArray.forEach(function (friend) {
            console.log(that);
            if (friend.name === that.model.attributes.name) {
                var idFriend = friend._id;
                that.deleteFriendOnServer(idFriend);
                that.Model.fetch({})


            }
        })
    },
    deleteFriendOnServer: function(idFriend){
        var token = loginObj.token;
        $.ajax({
            type: "DELETE",
            url: "http://umovie.herokuapp.com/follow" + "/" + idFriend,
            contentType: "application/json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function (data, textStatus, jqXHR) {
                router.navigate("user/"+loginObj.id, {trigger: true})
            }
        })
    },
    searchFriendOnAccountFollow: function(nameFriend){
        var token = loginObj.token;
        var result = false;
        var accountUser = new UsersModel;
        accountUser.urlRoot = "http://umovie.herokuapp.com/users" + "/" + loginObj.id;
        accountUser.fetch({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function(data){
                var arrayFollow = data.attributes.following;
                arrayFollow.forEach(function(friend){
                    if(friend.name === nameFriend){
                        result = true;
                    }
                })
                if(result){
                    $("#stopFollowUserButton").show();

                }
                else{
                    $("#followUserButton").show()

                }

            }
        })

    }
})
