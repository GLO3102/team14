/**
 * Created by sebastien on 15-09-14.
 */
function passwordValidation()
{
    var userName = document.getElementById("userInput");
    var password = document.getElementById("passWordInput");
    if(userName.value==="serea" && password.value==="12345"){

        var userIdentity = document.getElementById("userIdentity");
        userIdentity.value="Sebastien";
        document.getElementById("userConnection").style.opacity="0";
        document.getElementById("identity").style.opacity="100";

    }
    else{
        alert("This user not exist or the password is false.")
    }

}

function disconnectUser() {
    var userName = document.getElementById("userInput");
    var password = document.getElementById("passWordInput");
    userName.value = password.value = "";
    document.getElementById("userConnection").style.opacity="100";
    document.getElementById("identity").style.opacity="0";
}

function onMenuBouton(type) {
    if (type === "movie") {
        document.getElementById("contenuFrame").src = "movie.html";
    }
    else if (type === "tv") {
        document.getElementById("contenuFrame").src = "tvShow.html";
    }
    else{
        document.getElementById("contenuFrame").src = "index.html";
        frames.valueOf();

    }

}

