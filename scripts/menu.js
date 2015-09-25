/*function ToggleMenu() {
    var menuElement = document.getElementById('Menu');
    var mainContainerElement = document.getElementById('mainContainer');

    if (mainContainerElement.style.left === '0px')
    {
        menuElement.style.display = 'inline';
        mainContainerElement.style.left = menuElement.style.width;
    }
    else
    {
        menuElement.style.display = 'none';
        mainContainerElement.style.left = 0;
    }
}*/

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



