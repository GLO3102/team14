var MainMenuView = Backbone.View.extend({
    template: _.template($('#MainMenu-Template').html()),
    initialize: function () {
        _.bindAll(this, 'render');
    },
    render: function () {
        this.$el.html(this.template({}));
    }
});

var appMainMenuView = new MainMenuView({el: $('#MainMenu')});
appMainMenuView.render();

var userButton = document.getElementById("user-btn");
userButton.onclick = toggleUserMenu;

function toggleUserMenu(even){
    console.log("toggleUserMenu");
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