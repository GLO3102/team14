$(function (){
    TvShowsView =  Backbone.View.extend({
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
            this.$el.html(this.template({
                results: this.collection.toJSON()
            }))
        }
    });
});

