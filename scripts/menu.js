var MainMenuView = Backbone.View.extend({
    template: _.template($('#MainMenu-Template').html()),
    initialize: function () {
        _.bindAll(this, 'render');
    },
    render: function () {
        this.$el.html(this.template({}));
    },
    events: {
        "click #accountRef": "showAccount",
        "click #watchlistsRef": "showWatchlists",
        "click #logout": "logout"
    },
    showAccount: function (event) {
        var token = $.cookie("umovieToken");
        var infoTokenModel = new InfosTokenModel();
        infoTokenModel.fetch({
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', token);
            },
            success: function(data){
                router.navigate("user/"+data.id, {trigger: true})
            }
        })

    },
    showWatchlists: function(event){
        router.navigate("watchlists", {trigger: true});
    },
    logout: function(event){
        router.navigate("logout", {trigger: true});
    }
});

var appMainMenuView = new MainMenuView({el: $('#MainMenu')});
appMainMenuView.render();

var userButton = document.getElementById("user-btn");
userButton.onclick = toggleUserMenu;

var loginButton = document.getElementsByClassName("login-btn");
loginButton.onclick = toggleUserMenu;

function toggleUserMenu(even){
    var userMenu = document.getElementById("user-nav");

    if (userMenu.className === "hidden") {
        userMenu.removeAttribute("class");
    }else{
        userMenu.className = "hidden";
    }
}

var barButton = document.getElementById("bar-btn");
barButton.onclick = toggleBarMenu;

function toggleBarMenu(even){
    var barMenu = document.getElementById("bar-nav");

    if (barMenu.className === "hidden") {
        barMenu.removeAttribute("class");
    }else{
        barMenu.className = "hidden";
    }
}

function SearchUMovie()
{
    router.navigate("search", {trigger: true});
    LoadSearchResults();
}

function LoadSearchResults()
{
    $.get('search.html', function(data) {
        $("#PageContent").html(data);
    }).done(function(){
        var moviesSRCollection =  new MoviesSearchResultCollection({});
        moviesSRCollection.url = 'http://umovie.herokuapp.com/unsecure/search/movies?q=' + $('#SearchCriteria').val();
        var moviesSRView = new MoviesSearchResultView({
            collection: moviesSRCollection
        });
        moviesSRCollection.fetch({
            success: function (model, response) {
                moviesSRView.render();
            },
            error: function (model, response) {
                console.log("error");
            }
        });

        var tvShowsSRCollection = new TvShowsSearchResultCollection({});
        tvShowsSRCollection.url = 'http://umovie.herokuapp.com/unsecure/search/tvshows/seasons?q=' + $('#SearchCriteria').val();
        var tvShowsSRView = new TvShowsSearchResultView({
            collection: tvShowsSRCollection
        });
        tvShowsSRCollection.fetch({
            success: function (model, response) {
                tvShowsSRView.render();
            },
            error: function (model, response) {
                console.log("error");
            }
        });

        var actorsSRCollection = new ActorsSearchResultCollection({});
        actorsSRCollection.url = 'http://umovie.herokuapp.com/unsecure/search/actors?q=' + $('#SearchCriteria').val();
        var actorsSRView = new ActorsSearchResultView({
            collection: actorsSRCollection
        });
        actorsSRCollection.fetch({
            success: function (model, response) {
                actorsSRView.render();
            },
            error: function (model, response) {
                console.log("error");
            }
        });

        var usersSRCollection = new UsersSearchResultCollection({});
        usersSRCollection.url = 'http://umovie.herokuapp.com/unsecure/search/users?q=' + $('#SearchCriteria').val();
        var usersSRView = new UsersSearchResultView({
            collection: usersSRCollection
        });
        usersSRCollection.fetch({
            success: function (model, response) {
                usersSRView.render();
            },
            error: function (model, response) {
                console.log("error");
            }
        });
    });
}