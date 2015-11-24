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
        "click #watchlistsRef": "showWatchlists"
    },
    showAccount: function (event) {
        var id = loginObj['id'];
        router.navigate("user/"+id, {trigger: true})
    },
    showWatchlists: function(event){
        router.navigate("watchlists", {trigger: true});
    }
});

var appMainMenuView = new MainMenuView({el: $('#MainMenu')});
appMainMenuView.render();

var userButton = document.getElementById("user-btn");
userButton.onclick = toggleUserMenu;

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

