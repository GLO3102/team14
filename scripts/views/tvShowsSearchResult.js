/**
 * Created by Patrick on 2015-11-29.
 */
TvShowsSearchResultView = Backbone.View.extend({
    template: _.template($("#tvshows-result-tpl").html()),
    el: "#TVShowsSearchList",
    initialize: function (){
        _.bindAll(this, 'render');
        var self = this;
        this.collection.bind('sync change add remove', function () {
            self.render();
        });
    },
    render: function(){
        this.$el.html(this.template({
            tvShowResults: this.collection.toJSON()[0].results
        }));

        return this;
    }
});