var MainMenuView = Backbone.View.extend({
    template: _.template($('#MainMenu-Template').html()),
    initialize: function () {
        _.bindAll(this, 'render');
    },
    render: function () {
        this.$el.html(this.template({user: getCurrentUsername()}));
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

$("#user-nav ").mouseleave(function() {
    $("#user-nav").addClass("hidden");
});

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
        searchFiltersCategories = [];


        var watchListMovie = new Watchlists;
        watchListMovie.initialize(getCurrentUserId());
        watchListMovie.fetch({
            beforeSend: setHeader,
            success: function (data){

                var watchlists = $('<select />');
                var dataArray = JSON.parse(JSON.stringify(data));

                for(var i=0; i < dataArray.length; ++i) {
                    $('<option />', {value: dataArray[i].id, text: dataArray[i].name}).appendTo(watchlists);
                }

                var moviesSRCollection =  new MoviesSearchResultCollection({});
                moviesSRCollection.url = 'http://umovie.herokuapp.com/search/movies?q=' + $('#SearchCriteria').val();
                var moviesSRView = new MoviesSearchResultView({
                    collection: moviesSRCollection
                });
                moviesSRCollection.fetch({
                    beforeSend: setHeader,
                    success: function (model, response) {
                        moviesSRView.render();

                        $(".movieSearchResultLine").append(watchlists);

                        var results = JSON.parse(JSON.stringify(moviesSRView.collection))[0].results;

                        moviesSearchResults = results;

                        for(var i=0; i < results.length; ++i)
                        {
                            var genre = results[i].primaryGenreName;
                            var index = searchFiltersCategories.indexOf(genre);
                            if (index === -1)
                            {
                                searchFiltersCategories.push(genre);
                                $('#SearchFilters').append('<li><input type=\"checkbox\" id=\"' + genre + '\" class=\"SearchFilter\" onclick=\"ApplySearchFilter(this);\">' + genre + '</li>');
                            }
                        }
                    },
                    error: function (model, response) {
                        console.log("error");
                    }
                });
            }
        });

        var tvShowsSRCollection = new TvShowsSearchResultCollection({});
        tvShowsSRCollection.url = 'http://umovie.herokuapp.com/search/tvshows/seasons?q=' + $('#SearchCriteria').val();
        var tvShowsSRView = new TvShowsSearchResultView({
            collection: tvShowsSRCollection
        });
        tvShowsSRCollection.fetch({
            beforeSend: setHeader,
            success: function (model, response) {
                tvShowsSRView.render();

                var results = JSON.parse(JSON.stringify(tvShowsSRView.collection))[0].results;

                tvShowsSearchResults = results;

                for(var i=0; i < results.length; ++i)
                {
                    var genre = results[i].primaryGenreName;
                    var index = searchFiltersCategories.indexOf(genre);
                    if (index === -1)
                    {
                        searchFiltersCategories.push(genre);
                        $('#SearchFilters').append('<li><input type=\"checkbox\" id=\"' + genre + '\" class=\"SearchFilter\" onclick=\"ApplySearchFilter(this);\">' + genre + '</li>');
                    }
                }
            },
            error: function (model, response) {
                console.log("error");
            }
        });

        var actorsSRCollection = new ActorsSearchResultCollection({});
        actorsSRCollection.url = 'http://umovie.herokuapp.com/search/actors?q=' + $('#SearchCriteria').val();
        var actorsSRView = new ActorsSearchResultView({
            collection: actorsSRCollection
        });
        actorsSRCollection.fetch({
            beforeSend: setHeader,
            success: function (model, response) {
                actorsSRView.render();

                var results = JSON.parse(JSON.stringify(actorsSRView.collection))[0].results;

                actorsSearchResults = results;

                for(var i=0; i < results.length; ++i)
                {
                    var genre = results[i].primaryGenreName;
                    var index = searchFiltersCategories.indexOf(genre);
                    if (index === -1)
                    {
                        searchFiltersCategories.push(genre);
                        $('#SearchFilters').append('<li><input type=\"checkbox\" id=\"' + genre + '\" class=\"SearchFilter\" onclick=\"ApplySearchFilter(this);\">' + genre + '</li>');
                    }
                }
            },
            error: function (model, response) {
                console.log("error");
            }
        });

        var usersSRCollection = new UsersSearchResultCollection({});
        usersSRCollection.url = 'http://umovie.herokuapp.com/search/users?q=' + $('#SearchCriteria').val();
        var usersSRView = new UsersSearchResultView({
            collection: usersSRCollection
        });
        usersSRCollection.fetch({
            beforeSend: setHeader,
            success: function (model, response) {
                usersSRView.render();

                var results = JSON.parse(JSON.stringify(usersSRView.collection))[0].results;

                usersSearchResults = results;

                for(var i=0; i < results.length; ++i)
                {
                    var genre = results[i].primaryGenreName;
                    var index = searchFiltersCategories.indexOf(genre);
                    if (index === -1)
                    {
                        searchFiltersCategories.push(genre);
                        $('#SearchFilters').append('<li><input type=\"checkbox\" id=\"' + genre + '\" class=\"SearchFilter\" onclick=\"ApplySearchFilter(this);\">' + genre + '</li>');
                    }
                }
            },
            error: function (model, response) {
                console.log("error");
            }
        });
    });
}

function ApplySearchFilter(control)
{
    var checkedFilters = $('.SearchFilter:checked');
    var checkedGenres = [];
    for(var i=0; i < checkedFilters.length; ++i)
    {
        checkedGenres.push(checkedFilters[i].id);
    }

    $('#movieResultsList').empty();
    for(var i=0; i < moviesSearchResults.length; ++i)
    {
        if (checkedGenres.length == 0) {
            $('#movieResultsList').append('<li><span><a href=\"#/movies/' + moviesSearchResults[i].trackId + '\">' + moviesSearchResults[i].trackName + '</a> - '
                                                                                                                   + moviesSearchResults[i].primaryGenreName + '</span></li>');
        }
        else {
            if (checkedGenres.indexOf(moviesSearchResults[i].primaryGenreName) !== -1)
            {
                $('#movieResultsList').append('<li><span><a href=\"#/movies/' + moviesSearchResults[i].trackId + '\">' + moviesSearchResults[i].trackName + '</a> - '
                                                                                                                       + moviesSearchResults[i].primaryGenreName + '</span></li>');
            }
        }
    }

    $('#tvShowResultsList').empty();
    for(var i=0; i < tvShowsSearchResults.length; ++i)
    {
        if (checkedGenres.length == 0) {
            $('#tvShowResultsList').append('<li><span><a href=\"#/tvshow/' + tvShowsSearchResults[i].collectionId + '\">' + tvShowsSearchResults[i].collectionName + '</a> - '
                + tvShowsSearchResults[i].primaryGenreName + '</span></li>');
        }
        else {
            if (checkedGenres.indexOf(tvShowsSearchResults[i].primaryGenreName) !== -1)
            {
                $('#tvShowResultsList').append('<li><span><a href=\"#/tvshow/' + tvShowsSearchResults[i].collectionId + '\">' + tvShowsSearchResults[i].collectionName + '</a> - '
                    + tvShowsSearchResults[i].primaryGenreName + '</span></li>');
            }
        }
    }

    $('#actorsResultsList').empty();
    for(var i=0; i < actorsSearchResults.length; ++i)
    {
        if (checkedGenres.length == 0) {
            $('#actorsResultsList').append('<li><span><a href=\"#/actors/' + actorsSearchResults[i].artistId + '\">' + actorsSearchResults[i].artistName + '</a> - '
                + actorsSearchResults[i].primaryGenreName + '</span></li>');
        }
        else {
            if (checkedGenres.indexOf(actorsSearchResults[i].primaryGenreName) !== -1)
            {
                $('#actorsResultsList').append('<li><span><a href=\"#/actors/' + actorsSearchResults[i].artistId + '\">' + actorsSearchResults[i].artistName + '</a> - '
                    + actorsSearchResults[i].primaryGenreName + '</span></li>');
            }
        }
    }
}