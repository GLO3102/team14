/**
 * Created by dmercier on 2015-11-18.
 */

var loginToken = "umovieToken";
var loginUsername = "umovieUsername";

window.onload = function(){
    console.log("on load called");

    $('#badCredText').text("");
    var loginButton = document.getElementById("loginButton");
    var signinButton = document.getElementById("signinButton");

    if(getLoginToken() === undefined) {
        deleteAllCookies(); // just to make sure we don't have old data in username or other...
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
                        //$('#badCredentials').hide();
                        //$('#badCredentials').show();
                        $('#badCredText').text("The login information you entered are invalid...");
                    },
                    404: function (response) {
                        console.log('404');
                    }
                },
                success: function(data) {
                    console.log("request succeeded");
                    console.log(data.token);

                    if(saveToCookie(loginToken, data.token) && saveToCookie(loginUsername, username)) {
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

        signinButton.onclick = function() {
            console.log("asdfsdfasdf");
        }
    }
    else {
        console.log("load main screen");
        console.log("Current token is " + getLoginToken());
        console.log("Current user is " + getCurrentUsername());
        $.get('mainpage.html', function(data) {
            $("#PageContent").html(data);
        });
    }
};

function deleteAllCookies() {
    $.removeCookie(loginToken);
    $.removeCookie(loginUsername);
}

function getLoginToken () {
    var cookie = $.cookie(loginToken);
    return cookie;
};

function getCurrentUsername() {
    var cookie = $.cookie(loginUsername);
    return cookie;
}

var setHeader = function (xhr) {
    var token = getLoginToken();
    xhr.setRequestHeader('authorization', token);
}

function saveToCookie(key, value) {
    var cookie = $.cookie(key, value);

    if(cookie === undefined) {
        console.log("Can't write cookie into store");
        return false;
    }

    console.log("Cookie has been saved into store");
    return true;
}
