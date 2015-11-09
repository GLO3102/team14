/**
 * Created by Stéphane on 2015-10-27.
 */


var ActorView = Backbone.View.extend({
        template: _.template($('#actors-tpl').html()),
        el: ".actorInfo",
        initialize: function () {
            // You'll see the `_.bindAll()` function in almost every `initialize`.
            // See this StackOverflow [answer](http://stackoverflow.com/a/6396224/884338 "JSONP") to why `_.bindAll()` is necessary.
            _.bindAll(this, 'render');

            // Keep `this` in a variable to use in a different scope (as in `this.collection.bind()` ).
            var self = this;

            // We want the view to render itself each time the model is changed.
            // We can bind to any events like this.

        },
        setHeader:function(xhr){
            xhr.setRequestHeader('Api-Key','p6av4vu96q5kh2mpfhcpwjbz')
        },
        render: function () {
            // Pass the model (as a JSON) to the template to be rendered.
            this.$el.html(this.template({
                actor: this.model.toJSON()
            }));
            var nom=this.model.toJSON().results[0].artistName;
            $.ajax({
                //url : 'https://api.gettyimages.com/v3/search/images?fields=id,title,thumb,referral_destinations&sort_order=best&phrase='+ encodeURIComponent(nom),
                url:'https://api.gettyimages.com/v3/search/images?phrase='+ encodeURIComponent(nom),
                beforeSend:this.setHeader,
                contentType: 'application/json'
            }).done(function(data) {

                var img = document.createElement("IMG");
                img.src = data.images[0].display_sizes[0].uri;
                $('.actorPhoto').append(img);

                console.log(data.images[0].display_sizes[0].uri);

            });
        }
    });

