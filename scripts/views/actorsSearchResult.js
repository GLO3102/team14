/**
 * Created by Patrick on 2015-11-29.
 */
ActorsSearchResultView = Backbone.View.extend({
    template: _.template($("#actors-result-tpl").html()),
    el: "#ActorsSearchList",
    initialize: function (){
        _.bindAll(this, 'render');
        var self = this;
        this.collection.bind('sync change add remove', function () {
            self.render();
        });
    },
    render: function(){
        this.$el.html(this.template({
            actorsResults: this.collection.toJSON()[0].results
        }));

        return this;
    }
});