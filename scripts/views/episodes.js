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

            })
        },
    });
});

