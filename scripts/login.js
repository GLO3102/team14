/**
 * Created by dmercier on 2015-11-18.
 */

var loginCookieName = "umovieToken";

window.onload = function(){
    var loginButton = document.getElementById("loginButton");
    loginButton.onclick = function() {
        var username = document.getElementById("userEmail").value;
        var password = document.getElementById("userPassword").value;

        console.log("u=" + username + " p=" + password);
    }
};

function getTokenFromCookie () {
    var tokenCookie = $.cookie(loginCookieName);
    return tokenCookie;
};

function saveTokenToCookie (token) {
    var tokenCookie = $.cookie(loginCookieName, token);

    if(tokenCookie === undefined) {
        return false;
    }

    return true;
};