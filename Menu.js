/**
 * Created by Patrick on 2015-09-16.
 */
function ToggleMenu() {
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
}