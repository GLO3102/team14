/**
 * Created by Simon on 2015-11-29.
 */

var uMovieRecTotal = 0;

var recCallback = function(data) {
    var recList = [];
    for(var i = 0; i<data.Similar.Results.length; i++) {
        var itemName = data.Similar.Results[i].Name;
        var itemType = data.Similar.Results[i].Type;
        recList.push({"name": itemName, "type": itemType});
    }
    var uMovieRecList = createUMovieRecList(recList);


};

var getRecommendationList = function(title, type) {
    uMovieRecTotal=0;
    var titleToSearch = prepareTitle(title);
    console.log("title to search is:"+titleToSearch);
    var urlBegin = "https://www.tastekid.com/api/similar?q=" + encodeURIComponent(titleToSearch) + "&type=" + type;
    var urlEnd = "&limit=5&format=JSON&jsonp=?&k=179633-uMovie-8BNUD4NB&callback=recCallback";
    var urlComplete = urlBegin + urlEnd;

    $.ajax({
        type: 'GET',
        url: urlComplete,
        async: false,
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function(data) {
            //console.log(data);
        }
    })
};

var createUMovieRecList = function(recList) {
    var uMovieRecList = [];
    //for each item in recList
    var recListLength = recList.length;
    var i = 0;
    for(var i = 0; i < recListLength; i++) {
        var subUrl = "";
        //subUrl sera pour alterner entre "search movies" et "search shows"
        console.log(recList[i].name);
        var url = "https://umovie.herokuapp.com/unsecure/search/movies?q="+encodeURIComponent(recList[i].name)+"&limit=1";
        //var url = "https://umovie.herokuapp.com/unsecure/search/movies?q="+encodeURIComponent("attack of the killer" +
        //        " tomatoes")+"&limit=1";
        $.ajax({
            type: 'GET',
            url: url,
            contentType: 'application/json',
            success: function(data) {
                addResponseToList(uMovieRecList, data, i, recListLength);
            }
        });
    }
};

var addResponseToList = function(uMovieRecList, response, index, recListLength) {
    console.log("index="+index);
    //ajoute le résultat à la liste
    uMovieRecList.push(response.results[0]);
    uMovieRecTotal = uMovieRecTotal+1;
    if(uMovieRecTotal===recListLength) {
        //si c'est le dernier élément, lancer la fonction d'affichage
        console.log("here");
        console.log(uMovieRecList);
        displayRecommendations(uMovieRecList);
    }
};

var displayRecommendations = function(uMovieRecList) {
    console.log("display time");
    console.log(uMovieRecList.length);
    if(uMovieRecList.length===0) {
        //todo: show the first box and write "no similar items found"
    }
    for(var i = 0; i<uMovieRecList.length; i++) {
        if(uMovieRecList[i]!==undefined) {
            var divid = "#movieRec" + (i + 1);
            $(divid).text(uMovieRecList[i].trackCensoredName);
            $(divid).show();
            $(divid).prop("href","#/movies/"+uMovieRecList[i].trackId);
        }
    }

};

var prepareTitle = function(title) {
    var cleanTitle = title.replace(/[&]/g, 'and');
    var bracketPos = cleanTitle.indexOf("(");

    if (bracketPos !== -1) {
        cleanTitle = cleanTitle.substring(0,bracketPos);
        var colonPos = cleanTitle.indexOf(":");
        if (colonPos !== -1) {
            cleanTitle = cleanTitle.substring(0, colonPos);
        }
    } else {
        var colonPos = cleanTitle.indexOf(":");
        if (colonPos !== -1) {
            cleanTitle = cleanTitle.substring(0, colonPos);
        }
    }
    return cleanTitle;
}