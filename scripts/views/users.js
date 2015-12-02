/**
 * Created by Sebastien on 2015-11-17.
 */
var UsersViews = Backbone.View.extend({
    template: _.template($("#user-tpl").html()),
    el: "#PageContent",
    userId: "",

    initialize: function () {

        _.bindAll(this, 'render');
        var self = this;
        this.collection.bind('sync change add remove', function () {
            self.render();
        });
    },
    render: function () {


        var watchlists = new Watchlists();
        var that = this;
        var token = $.cookie("umovieToken");
        watchlists.fetch( {
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function() {
                that.getWatchListAccounnt(that,watchlists);
                that.$el.html(that.template({
                    user: that.model.toJSON(), 'watchlists': watchlists
                }));
                $("#followUserButton").hide()
                $("#stopFollowUserButton").hide();
                $("#boutonsEffacer").hide();
            }
        })
        var infoTokenModel = new InfosTokenModel();
        infoTokenModel.fetch({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function(data){
                that.userId = data.id;
                if (that.model.id === data.id) {
                    $("#boutonsEffacer").show()
                }
                else {
                    that.searchFriendOnAccountFollow(that.model.attributes.name);
                }
            }
        })

    },
    events: {
        "click #friendsFollowList": "viewFriend",
        "click #followUserButton": "addFriend",
        "click #stopFollowUserButton": "deleteFriendFollow",
        "click .deleteMovieFromWL": "deleteFriendAccount",
        "click .list-group-item": "viewWatchlistDetails"
    },
    viewFriend: function (event) {
        var friendUser = new UsersModel;
        var root = "http://umovie.herokuapp.com/search/users?q="
        var token = $.cookie("umovieToken");
        friendUser.urlRoot = root + event.target.innerHTML;

        friendUser.fetch({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function (data) {

                var id = data.attributes[0].id;

                router.navigate("user/" + id, {trigger: true})
            }

        })
    },
    addFriend: function (event) {
        var friend = {"id": this.model.id};
        var token = $.cookie("umovieToken")
        var that  = this;
        $.ajax({
            type: "POST",
            url: "http://umovie.herokuapp.com/follow",
            data: JSON.stringify(friend),
            contentType: "application/json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function (data, textStatus, jqXHR) {
                router.navigate("user/"+that.userId, {trigger: true})
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Ca va mal a la shop")

            }
        });
    },
    deleteFriendFollow: function (event) {
        var token = $.cookie("umovieToken");

        var id = this.model.attributes.id;
        var userAccount = new UsersModel();
        userAccount.urlRoot = "http://umovie.herokuapp.com/users" + "/" +this.userId;
        var that = this;
        userAccount.fetch({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function (data) {
                var followArray = data.attributes.following;
                that.searchIdFollowUser(that,followArray);
            },
            error: function(){
                alert("moutarde noire!")
            }
        })
    },
    deleteFriendAccount: function(event){
        var idFriend = event.target.id;
        this.deleteFriendOnServer(this,idFriend);


    },
    searchIdFollowUser: function(currentUser,followArray){
        followArray.forEach(function (friend) {
            if (friend.name === currentUser.model.attributes.name) {
                var idFriend = friend._id;
                currentUser.deleteFriendOnServer(idFriend);

            }
        })
    },
    deleteFriendOnServer: function(userCurrent, idFriend){
        var token = $.cookie("umovieToken");
        var that = this;
        $.ajax({
            type: "DELETE",
            url: "http://umovie.herokuapp.com/follow" + "/" + idFriend,
            contentType: "application/json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function (data, textStatus, jqXHR) {
                router.navigate("user/"+that.userId, {trigger: true})
                userCurrent.render();
            }
        })
    },
    searchFriendOnAccountFollow: function(nameFriend){
        var token = $.cookie("umovieToken");
        var accountUser = new UsersModel;

        accountUser.urlRoot = "http://umovie.herokuapp.com/users" + "/" + this.userId;
        accountUser.fetch({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function(data){
                var arrayFollow = data.attributes.following;
                var result = false;
                arrayFollow.forEach(function(friend){
                    if(friend.name === nameFriend){
                        result = true;
                    }
                })
                if(result){
                    $("#stopFollowUserButton").show();

                }
                else{
                    $("#followUserButton").show();
                }

            }
        })
    },
    getWatchListAccounnt: function(that,watchlists){
        var modelsArray = watchlists.models;
        var watchlistsAccount = []
        modelsArray.forEach(function(watchlist){
            if(watchlist.attributes.owner !== undefined){
                if(watchlist.attributes.owner.id === that.model.attributes.id){
                    watchlistsAccount.push(watchlist);
                }
            }
        })
        watchlists.models = watchlistsAccount;
    },
    viewWatchlistDetails: function(event){
        //router.navigate("watchlists", {trigger: true});


    }

})
