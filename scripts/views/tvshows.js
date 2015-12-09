var TvShowsView = Backbone.View.extend({
    template:  _.template($("#TVShows-list-template").html()),
    el: "#list-tvshows",
    initialize: function (){
        _.bindAll(this, 'render');
        var self = this;
        this.collection.bind('sync change add remove', function () {
            self.render();
        });

    },
    render: function () {

        var tvShowsName = this.collection.toJSON()[0].collectionName;

        this.$el.html(this.template({
            results: this.collection.toJSON()
        }));

        this.searchVideoYoutube(tvShowsName);
        getRecommendationList(tvShowsName, "shows");
        getPrice(tvShowsName);
        return this;
    },
    searchVideoYoutube: function(title){

        var urlBegin = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q="';
        var urlMiddle =  title+' official trailer';
        var urlEnd = '&maxResults=1&order=viewCount&key=AIzaSyBNPujtVRFaQjnXBUMu6kvMj-S6gIiNHYk';
        var urlComplete = urlBegin + urlMiddle + urlEnd;
        var player;

        $.ajax({
            url : urlComplete,
            type : 'GET',
            contentType: 'application/json'
        }).done(function(data) {
            player = new YT.Player('player', {
                height: '220',
                width: '400',
                videoId: data.items[0].id.videoId
            });
        });
    },
});

