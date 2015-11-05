$(function () {
    MovieView = Backbone.View.extend({
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
        }


    });

});