$(function (){
    EpisodesView =  Backbone.View.extend({
        template:  _.template($("#episodes-list-template").html()),
        el: "#list-episodes",
        templateModal : _.template($("#single-episode-template").html()),
        initialize: function (){
            _.bindAll(this,  'render', 'afterRender');
            var _this = this;
            this.render = _.wrap(this.render, function(render) {
                render();
                _this.afterRender();
                return _this;
            });
        },
        render: function () {
            this.$el.html(this.template({
                results: this.collection.toJSON()
            }))
        },
        afterRender : function() {

            var episodeCollection = this.collection.toJSON();
            var _this = this;
            var elModal = $("#myTvShowModal");
            var templateModal = _.template($("#single-episode-template").html());
            var episodeInModal = {};

            $('#myTvShowModal').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget)
                var trackId = $(button).attr('data-trackId');
                episodeCollection.forEach(function(obj) {
                    if(obj.trackId == trackId){
                        episodeInModal = obj;
                    }
                });
                elModal.html(templateModal({
                    result: episodeInModal
                }))
                _this.searchVideoYoutube(episodeInModal.collectionName+" "+episodeInModal.trackCensoredName);
            })

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
                if(data.items.length == 0){
                    $("#player").html("No preview find");
                }else{
                    player = new YT.Player('player', {
                        height: '150',
                        width: '300',
                        videoId: data.items[0].id.videoId
                    });
                }

            });
        }
    });
});

