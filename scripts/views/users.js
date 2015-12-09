/**
 * Created by Sebastien on 2015-11-17.
 */
    var MoviesWatchListView = Backbone.View.extend({
        template: _.template($("#user-watchlist-movies").html()),
        el:".pageUser",
        render: function(watchlistName,movies){
            this.$el.html(this.template({watchlistName: watchlistName, movies: movies}))

        }
    }
)
var UsersViews = Backbone.View.extend({
    template: _.template($("#user-tpl").html()),
    el: "#PageContent",
    userId: "",

    initialize: function () {

        _.bindAll(this, 'render');
        var self = this;
        this.collection.bind('sync change add remove', function () {
            var options = {'id': ""};
            self.render(options);
        });
    },
    render: function (options) {
        if(options.id){
            var watchlistTarget = new Watchlist;
            watchlistTarget.urlRoot = "http://umovie.herokuapp.com/watchlists/"+ event.target.id;
            watchlistTarget.fetch({
                beforeSend: setHeader,
                success: function(data){
                    var watchlistJSon = data.toJSON();
                    var watchlistName = watchlistJSon.name;
                    var movies = watchlistJSon.movies;
                    var moviesWatchlist = new MoviesWatchListView();
                    moviesWatchlist.render(watchlistName,movies);
                }
            })
        }
        else{
            var watchlists = new Watchlists();
            watchlists.initialize(this.model.id)
            var that = this;
            watchlists.fetch( {
                beforeSend:setHeader,
                success: function() {
                    that.getWatchListAccounnt(that, watchlists);
                    var test = watchlists.toJSON();

                    that.$el.html(that.template({
                        user: that.model.toJSON(), 'watchlists': watchlists.toJSON()
                    }));
                    $("#followUserButton").hide()
                    $("#stopFollowUserButton").hide();
                    $(".eraseButton").hide();
                    var infoTokenModel = new InfosTokenModel();
                    infoTokenModel.fetch({
                        beforeSend: setHeader,
                        success: function(data){
                            that.userId = data.id;
                            if (that.model.id === data.id) {
                                $(".eraseButton").show()
                            }
                            else {
                                that.searchFriendOnAccountFollow(that.model.attributes.name);
                            }
                        }
                    })
                }
            })


        }

    },
    events: {
        "click #friendsFollowList": "viewFriend",
        "click #followUserButton": "addFriend",
        "click #stopFollowUserButton": "deleteFriendFollow",
        "click .deleteMovieFromWL": "deleteFriendAccount",
        "click .watchlist-list": "viewWatchlistDetails",
        "click .moviesWatchListUser": "showMovie"
    },
    viewFriend: function (event) {
        var friendUser = new UsersModel;
        var root = "http://umovie.herokuapp.com/search/users?q="
        var nameUserFollow = event.target.innerHTML;
        friendUser.urlRoot = root + nameUserFollow;

        friendUser.fetch({
            beforeSend: setHeader,
            success: function (data) {
                var resultsSearch = data.toJSON();
                var found = false
                var index = 0;
                var idFollowUser;
                while(!found){
                    if(resultsSearch[index].name === nameUserFollow){
                        idFollowUser = resultsSearch[index].id;
                        found = true;
                    }
                    else{
                        index++;
                    }
                }
                router.navigate("/user/"+ idFollowUser, {trigger: true})
            }
        })
    },
    addFriend: function (event) {
        FollowUser(this.model.id);
        /*var friend = {"id": this.model.id};
        var that  = this;
        $.ajax({
            type: "POST",
            url: "http://umovie.herokuapp.com/follow",
            data: JSON.stringify(friend),
            contentType: "application/json",
            beforeSend: setHeader,
            success: function (data, textStatus, jqXHR) {
                router.navigate("user/"+that.userId, {trigger: true})
            }
        });*/
    },
    deleteFriendFollow: function (event) {
        var id = this.model.attributes.id;
        var userAccount = new UsersModel();
        userAccount.urlRoot = "http://umovie.herokuapp.com/users" + "/" +this.userId;
        var that = this;
        userAccount.fetch({
            beforeSend: setHeader,
            success: function (data) {
                var followArray = data.attributes.following;
                that.searchIdFollowUser(that,followArray);
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
                currentUser.deleteFriendOnServer(currentUser,idFriend);

            }
        })
    },
    deleteFriendOnServer: function(userCurrent, idFriend){
        var that = userCurrent;
        $.ajax({
            type: "DELETE",
            url: "http://umovie.herokuapp.com/follow" + "/" + idFriend,
            contentType: "application/json",
            beforeSend: setHeader,
            success: function (data, textStatus, jqXHR) {
                that.model.fetch();
                router.navigate("user/"+that.userId, {trigger: true})
            }
        })
    },
    searchFriendOnAccountFollow: function(nameFriend){
        var accountUser = new UsersModel;
     accountUser.urlRoot = "http://umovie.herokuapp.com/users" + "/" + this.userId;
        accountUser.fetch({
            beforeSend: setHeader,
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
    viewWatchlistDetails: function(event) {
        var idWatchListTarget = event.target.id;
        var options = {'id': idWatchListTarget};
        this.render(options);
    },
    showMovie:function(event){
        router.navigate("/movies/"+ event.target.id, {trigger: true})

    }
})

function FollowUser(userId)
{
    var userInfo = {"id": userId};

    $.ajax({
        type: "POST",
        url: "http://umovie.herokuapp.com/follow",
        data: JSON.stringify(userInfo),
        contentType: "application/json",
        beforeSend: setHeader,
        success: function (data, textStatus, jqXHR) {
            router.navigate("user/" + getCurrentUserId(), {trigger: true})
        }
    });
}