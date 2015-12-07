/**
 * Created by Sebastien on 2015-12-07.
 */
var Watchlists = Backbone.Collection.extend({
    'url': 'http://umovie.herokuapp.com/watchlists',
    'model': Watchlist,
    'userId': "",
    initialize: function(userId){
        this.userId = userId;
    },


    'parse': function( apiResponse ){
        console.log("user Id: " + this.userId);
        console.log("voici la collection de la watchlist");
        console.log(apiResponse);
        var self = this;
        var newWatchlistArray = [];
        apiResponse.forEach(function(watchlist){
            console.log(watchlist+ "====" + self.userId)
            if(watchlist.owner !==  undefined){
                var owner = watchlist.owner;
                if(owner.id === self.userId){
                    newWatchlistArray.push(watchlist)
                }
            }
        })
        console.log(newWatchlistArray);
        return newWatchlistArray;
    },
    getUserWatchLists: function( watchlistArray){

    }
});


