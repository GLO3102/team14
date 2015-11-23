var formData = {email:"sebastien.reader.1@ulaval.ca", password:"serea@ulaval@2013"};
var loginObj;

$.ajax({
    type: "POST",
    url: "http://umovie.herokuapp.com/login",
    data : formData,
    contentType : "application/x-www-form-urlencoded",
    success: function(data, textStatus, jqXHR)
    {
        loginObj = data;
        console.log(loginObj)
    },
    error: function (jqXHR, textStatus, errorThrown)
    {

    }
});