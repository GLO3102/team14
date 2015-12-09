/**
 * Created by Stéphane on 2015-12-08.
 */





//http://api.walmartlabs.com/v1/search?query=hunger+games&format=json&facet=on&apiKey=ekvw4ff7kantjdwufr892nqu

    var getPrice = function(name) {
    console.log("test");
        var urlBegin = "http://api.walmartlabs.com/v1/search?query=";
        var urlMiddle =name;
        var urlEnd="&format=json&facet=on&apiKey=ekvw4ff7kantjdwufr892nqu";

        var url = urlBegin + urlMiddle + urlEnd;

        $.ajax({
            type: 'GET',
            url: url,
            contentType: 'application/json',
            success: function(data) {
                console.log(data);
            }
        })



    }

