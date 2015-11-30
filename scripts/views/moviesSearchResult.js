/**
 * Created by Patrick on 2015-11-29.
 */

MoviesSearchResultView = Backbone.View.extend({
    template: _.template($("#movies-result-tpl").html()),
    el: "#MoviesSearchList",
    initialize: function (){
        _.bindAll(this, 'render');
        var self = this;
        this.collection.bind('sync change add remove', function () {
            self.render();
        });
    },
    render: function(){
        this.$el.html(this.template({
            movieResults: this.collection.toJSON()[0].results
        }));

        return this;
    }
});

