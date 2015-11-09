$(function () {
    ActorMovieView = Backbone.View.extend({
        template: _.template($('#movies-tpl').html()),
        el: ".movieInfo",

        initialize: function () {
            // You'll see the `_.bindAll()` function in almost every `initialize`.
            // See this StackOverflow [answer](http://stackoverflow.com/a/6396224/884338 "JSONP") to why `_.bindAll()` is necessary.
            _.bindAll(this, 'render');

            // Keep `this` in a variable to use in a different scope (as in `this.collection.bind()` ).
            var self = this;

            // We want the view to render itself each time the model is changed.
            // We can bind to any events like this.

        },
        render: function () {


            // Pass the model (as a JSON) to the template to be rendered.
            this.$el.html(this.template({
                movies: this.collection.toJSON()
            }));

            populatePreviews();
        }


    });

});

var searchVideoYoutube=function(title,container){
    console.log("searchVideoYoutube "+title)
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
        player = new YT.Player(container, {
            height: '220',
            width: '400',
            videoId: data.items[0].id.videoId
        });
    });
};

var populatePreviews=function(){
    var listTitles = $('.title');
    for(var i=0; i < listTitles.length; ++i) {
        searchVideoYoutube(listTitles[i].innerHTML, 'previewTitle' + i);
    }


}