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
           this.showMoviesWatchlist(event.target.id);
        }
        else{
            this.showUserData(this);
        }
    },
    showUserData:function(userView){
        var watchlists = new Watchlists();
        watchlists.initialize(userView.model.id)
        var self = userView;
        watchlists.fetch( {
            beforeSend:setHeader,
            success: function() {
                self.getWatchListAccount(self, watchlists);
                var watchlistArray = watchlists.toJSON();
                if(watchlists.length == 0) {
                    watchlistArray = "";
                }
                self.$el.html(self.template({
                    user: self.model.toJSON(), 'watchlists': watchlistArray
                }));
                self.hideButtons();
                self.checkCurrentUserInfos(self);
            }
        })
    },
    showMoviesWatchlist: function(watchlistId){
        var watchlistTarget = new Watchlist;
        watchlistTarget.urlRoot = "http://umovie.herokuapp.com/watchlists/"+ watchlistId;
        watchlistTarget.fetch({
            beforeSend: setHeader,
            success: function(data){
                var watchlistJSon = data.toJSON();
                var watchlistName = watchlistJSon.name;
                var movies = watchlistJSon.movies;
                if(movies.length > 0){
                    var moviesWatchlist = new MoviesWatchListView();
                    moviesWatchlist.render(watchlistName,movies);
                }
            }
        })

    },
    hideButtons: function(){
        $("#followUserButton").hide()
        $("#stopFollowUserButton").hide();
        $(".eraseButton").hide();
    },
    checkCurrentUserInfos: function(userView){

        var infoTokenModel = new InfosTokenModel();
        infoTokenModel.fetch({
            beforeSend: setHeader,
            success: function(data){
                userView.userId = data.id;
                if (userView.model.id === data.id) {
                    $(".eraseButton").show()
                }
                else {
                    userView.searchFriendOnAccountFollow(userView.model.attributes.name);
                }
            }
        })

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
        if(nameUserFollow){
            nameUserFollow = nameUserFollow.slice(46,nameUserFollow.length);
            friendUser.urlRoot = root + nameUserFollow;
            friendUser.fetch({
                beforeSend: setHeader,
                success: function (data) {
                    var resultsSearch = data.toJSON();
                    var found = false;
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
        }

    },
    addFriend: function (event) {
        var friend = {"id": this.model.id};
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
        });
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
        var idFriend = event.currentTarget.id;
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
                that.refreshModelAfterDelete(that)
            }
        })
    },
    refreshModelAfterDelete: function(userCurrent){
        var self = userCurrent;
        var userChanged =new UsersModel();
        var rootUrl="http://umovie.herokuapp.com/users"
        userChanged.urlRoot = rootUrl+"/"+userCurrent.userId;
        userCurrent.model = userChanged;
        userChanged.fetch({
            beforeSend: setHeader,
            success: function(){
                var options = {'id': ""};
                self.render(options);
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
    getWatchListAccount: function(that,watchlists){
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
});

function FollowUser(userId) {
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
