/**
 * Created by dmercier on 2015-11-18.
 */

var loginToken = "umovieToken";
var loginUsername = "umovieUsername";
var loginUserId = "umovieUserId";

window.onload = function(){
    console.log("on load called");

    $('#badCredText').text("");
    var loginButton = document.getElementById("loginButton");
    var signinButton = document.getElementById("signinButton");

    if(getLoginToken() === undefined) {
        deleteAllCookies(); // just to make sure we don't have old data in username or other...
        loginButton.onclick = function() {
            var usermail = document.getElementById("userEmail").value;
            var password = document.getElementById("userPassword").value;

            login(usermail, password);
        }

        signinButton.onclick = function() {
            var username = document.getElementById("newUserName").value;
            var usermail = document.getElementById("newUserEmail").value;
            var password = document.getElementById("newUserPassword").value;

            $('#newSigninText').text("");

            console.log("n=" + username + "m=" + usermail + " p=" + password);

            if(username == "" || usermail == "" || password == "") {
                $('#newSigninText').addClass("red");
                $('#newSigninText').text("Make sure to fill in all fields...");
                return;
            }

            var loginInfo = {
                name : username,
                email : usermail,
                password : password
            };

            $.ajax({
                type: "POST",
                url: "https://umovie.herokuapp.com/signup",
                data: {
                    "name": username,
                    "email": usermail,
                    "password": password
                },
                contentType: 'application/x-www-form-urlencoded',
                statusCode: {
                    200: function (response) {
                        console.log('200');
                        login(usermail, password);
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
                    },
                    500: function (response) {
                        $('#newSigninText').addClass("red");
                        $('#newSigninText').text("This e-mail already exists or is invalid... please use another one.");
                        console.log('404');
                    }
                },
                success: function(data) {
                    console.log("request signup succeeded");
                    console.log(data.token);
                },
                fail: function() {
                    console.log("request signup failed");
                },
                always: function() {
                    console.log("request signup always");
                }
            });
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

function login(usermail, password) {
    console.log("u=" + usermail + " p=" + password);

    if(usermail == "" || password == "") {
        $('#badCredText').text("Make sure to fill in all fields...");
        return;
    }

    var loginInfo = {
        email : usermail,
        password : password
    };

    $.ajax({
        type: "POST",
        url: "https://umovie.herokuapp.com/login",
        data: {
            "email": usermail,
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
                $('#badCredText').text("The login information you entered are invalid...");
            },
            404: function (response) {
                console.log('404');
            }
        },
        success: function(data) {
            console.log("request login succeeded");
            console.log(data.token);

            if(saveToCookie(loginToken, data.token) && saveToCookie(loginUsername, usermail) && saveToCookie(loginUserId, data.id)) {
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

function deleteAllCookies() {
    $.removeCookie(loginToken);
    $.removeCookie(loginUsername);
    $.removeCookie(loginUserId);
}

function getLoginToken () {
    var cookie = $.cookie(loginToken);
    return cookie;
};

function getCurrentUsername() {
    var cookie = $.cookie(loginUsername);
    return cookie;
}

function getCurrentUserId() {
    var cookie = $.cookie(loginUserId);
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
