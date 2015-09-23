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


function connectionWindow(){
   // alert("bonjour les tous petit");

    window.open("connection.html","Connection", 'height=150,width=200,top=110,left=1600,resizable=no' );
}
function userWindow(){

    window.open("userWindow.html", "_blank", "location=no,menubar=no,scrollbars=no,status=no,titlebar=no,toolbar=no, top=100, left=1600, width=200, height=100");


}

function passwordValidation()
{
    var userName = document.getElementById("userInput");
    var password = document.getElementById("passWordInput");

    console.log("allo la terre");
    if(userName.value==="serea" && password.value==="12345"){


        window.close();
        var test = document.getElementById("userMenu");


        test.style.opacity=100;
        document.getElementById("connection").style.opacity=0;
        console.log(document.getElementById("userMenu").style.opacity);
        


    }
    else{
        alert("This user not exist or the password is false.")
    }



}
