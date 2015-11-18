/**
 * Created by Sebastien on 2015-11-17.
 */
var UsersViews = Backbone.View.extend({
    template: _.template($("#user-tpl").html()),
    el: "#PageContent",
    initialize: function(){
        _.bindAll(this, 'render');
        var self = this;
        this.collection.bind('sync change add remove', function () {
            self.render();
        });
    },
    render: function(){
        this.$el.html(this.template({
            user: this.model.toJSON()
        }))
    }

})
