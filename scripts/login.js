/**
 * Created by dmercier on 2015-11-18.
 */

var loginCookieName = "umovieToken";

window.onload = function(){
    var loginButton = document.getElementById("loginButton");

    if(getTokenFromCookie() === undefined) {
        loginButton.onclick = function() {
            var username = document.getElementById("userEmail").value;
            var password = document.getElementById("userPassword").value;

            console.log("u=" + username + " p=" + password);

            cookie = "asgasfhdregdfssdaf";
            console.log(cookie);

            if(saveTokenToCookie(cookie)) {
                window.location.replace("index.html");
            }
        }
    }
};

function getTokenFromCookie () {
    var tokenCookie = $.cookie(loginCookieName);
    return tokenCookie;
};

function saveTokenToCookie (token) {
    var tokenCookie = $.cookie(loginCookieName, token);

    if(tokenCookie === undefined) {
        console.log("tokenCookie does not exist");
        return false;
    }

    console.log("saving token to cookie");
    return true;
};