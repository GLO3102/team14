/**
 * Created by Patrick on 2015-11-29.
 */
UsersSearchResultView = Backbone.View.extend({
    template: _.template($("#users-result-tpl").html()),
    el: "#UsersSearchList",
    initialize: function (){
        _.bindAll(this, 'render');
        var self = this;
        this.collection.bind('sync change add remove', function () {
            self.render();
        });
    },
    render: function(){
        this.$el.html(this.template({
            usersResults: this.collection.toJSON()
        }));

        return this;
    }
});