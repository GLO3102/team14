$(function (){
    EpisodesView =  Backbone.View.extend({
        template:  _.template($("#episodes-list-template").html()),
        el: "#list-episodes",
        initialize: function (){
            _.bindAll(this, 'render');
            var self = this;
            this.collection.bind('sync', function () {
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

