/**
 * Created by St�phane on 2015-12-08.
 */

var priceFunctionMovie = function(data) {
    priceFunction(data, "Movie");
}

var priceFunctionShow = function(data) {
    priceFunction(data, "Show");
}

var priceFunction = function(data, type) {
    var result = data.items[0];
    var resultProductUrl = result.productUrl;
    var resultPrice = result.salePrice;
};


//http://api.walmartlabs.com/v1/search?query=hunger+games&format=json&facet=on&apiKey=ekvw4ff7kantjdwufr892nqu

var getPrice = function(name, type) {
    var urlBegin = "http://api.walmartlabs.com/v1/search?query=";
    var urlMiddle = encodeURIComponent(name);
    var urlEnd="&format=json&apiKey=ekvw4ff7kantjdwufr892nqu&callback=?";

    var url = urlBegin + urlMiddle + urlEnd;

    var callbackFunction = "priceFunction"+type;

    //http://api.walmartlabs.com/v1/search?query=ipod&format=json&apiKey=ekvw4ff7kantjdwufr892nqu
    $.ajax({
        type: 'GET',
        jsonpCallback: 'priceFunction',
        url: url,
        async: false,
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function(data) {
            //console.log(data);
        }
    })


}

