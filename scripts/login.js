/**
 * Created by dmercier on 2015-11-18.
 */

var loginCookieName = "umovieToken";

window.onload = function(){
    console.log("on load called");
    var loginButton = document.getElementById("loginButton");

    if(getTokenFromCookie() === undefined) {
        console.log("just before loginButton");
        loginButton.onclick = function() {
            var username = document.getElementById("userEmail").value;
            var password = document.getElementById("userPassword").value;

            console.log("u=" + username + " p=" + password);

            var loginInfo = {
                email : username,
                password : password
            };

            $.ajax({
                type: "POST",
                url: "https://umovie.herokuapp.com/login",
                data: {
                    "email": username,
                    "password": password
                },
                contentType: 'application/x-www-form-urlencoded',
                statusCode: {
                    200: function (response) {
                        console.log('200');
                    },
                    201: function (response) {
                        console.log('201');
                    },
                    400: function (response) {
                        console.log('400');
                    },
                    401: function (response) {
                        console.log('401');
                    },
                    404: function (response) {
                        console.log('404');
                    }
                },
                success: function(data) {
                    console.log("request succeeded");
                    console.log(data.token);

                    if(saveTokenToCookie(data.token)) {
                        window.location.replace("index.html");
                    }
                },
                fail: function() {
                    console.log("request failed");
                },
                always: function() {
                    console.log("request always");
                }
            });
        }
    }
    else {
        console.log("load main screen");
        $.get('mainpage.html', function(data) {
            $("#PageContent").html(data);
        });
    }
};

function getTokenFromCookie () {
    var tokenCookie = $.cookie(loginCookieName);
    return tokenCookie;
};
var setHeader = function (xhr) {
    var token = getTokenFromCookie();
    xhr.setRequestHeader('authorization', token);
}

function saveTokenToCookie (token) {
    var tokenCookie = $.cookie(loginCookieName, token);

    if(tokenCookie === undefined) {
        console.log("tokenCookie does not exist");
        return false;
    }

    console.log("saving token to cookie");
    return true;
};

