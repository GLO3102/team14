/**
 * Created by Simon on 2015-11-29.
 */

var uMovieRecTotal = 0;

var recCallback = function(data, type) {
    var recList = [];
    for(var i = 0; i<data.Similar.Results.length; i++) {
        var itemName = data.Similar.Results[i].Name;
        var itemType = data.Similar.Results[i].Type;
        recList.push({"name": itemName, "type": itemType});
    }
    var uMovieRecList = createUMovieRecList(recList, type);
}

var recCallbackMovies = function(data) {
    recCallback(data, "movies");
};

var recCallbackShows = function(data) {
    recCallback(data, "shows");
};

var recCallbackActor = function(data) {
    recCallback(data, "actor");
};



var getRecommendationList = function(title, type) {
    uMovieRecTotal=0;
    var titleToSearch = prepareTitle(title);
    var callbackMethod = "recCallback";
    if(type=="shows") {
        callbackMethod = callbackMethod + "Shows";
    } else if (type=="movies") {
        callbackMethod = callbackMethod + "Movies";
    } else if (type=="actor") {
        callbackMethod = callbackMethod + "Actor";
    }
    var urlBegin = "https://www.tastekid.com/api/similar?q=" + encodeURIComponent(titleToSearch) + "&type=" + type;
    var urlEnd = "&limit=5&format=JSON&jsonp=?&k=179633-uMovie-8BNUD4NB&callback="+callbackMethod;
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

var createUMovieRecList = function(recList, type) {
    var uMovieRecList = [];
    //for each item in recList
    var recListLength = recList.length;
    var i = 0;
    for(var i = 0; i < recListLength; i++) {
        var subUrl = "movies";
        if(type==="movies") {
            subUrl = "movies";
        } else if (type==="shows") {
            subUrl = "tvshows/seasons";
        } else if (type==="actor") {
            subUrl = "actors";
        }
        var url = "https://umovie.herokuapp.com/unsecure/search/"+subUrl+"?q="+encodeURIComponent(recList[i].name)+"&limit=1";
        //var url = "https://umovie.herokuapp.com/unsecure/search/movies?q="+encodeURIComponent("attack of the killer" +
        //        " tomatoes")+"&limit=1";
        $.ajax({
            type: 'GET',
            url: url,
            contentType: 'application/json',
            success: function(data) {
                addResponseToList(uMovieRecList, data, i, recListLength, type);
            }
        });
    }
};

var addResponseToList = function(uMovieRecList, response, index, recListLength, type) {
    if(response === undefined) {
        return;
    }
    //ajoute le résultat à la liste si pas undefined
    uMovieRecList.push(response.results[0]);
    uMovieRecTotal = uMovieRecTotal+1;
    if(uMovieRecTotal===recListLength) {
        //si c'est le dernier élément, lancer la fonction d'affichage
        displayRecommendations(uMovieRecList, type);
    }
};

var displayRecommendations = function(uMovieRecList, type) {
    var divtype = "movie";
    if(type==="movies") {
        divtype = "movie";
    } else if (type==="shows") {
        divtype = "show";
    }
    else if (type==="actor") {
        divtype = "actor";
    }
    if(uMovieRecList.length===0) {
        var noResDivId = divtype+"Rec1";
        $(noResDivId).text("Sorry, no recommendations found");
        $(noResDivId).show();
    } else {
        for(var i = 0; i<uMovieRecList.length; i++) {
            if(uMovieRecList[i]!==undefined) {
                var divid = "#"+divtype+"Rec" + (i + 1);
                if(divtype=="movie") {
                    $(divid).text(uMovieRecList[i].trackCensoredName);
                    $(divid).prop("href","#/"+divtype+"s/"+uMovieRecList[i].trackId);
                    $(divid).show();
                } else if (divtype == "show") {
                    $(divid).text(uMovieRecList[i].collectionName);
                    $(divid).prop("href","#/tv"+divtype+"/"+uMovieRecList[i].collectionId);
                    $(divid).show();
                } else if (divtype == "actor") {
                    $(divid).text(uMovieRecList[i].artistName);
                    $(divid).prop("href","#/"+divtype+"s/"+uMovieRecList[i].artistId);
                    $(divid).show();
                }
            }
        }
        var checkdiv = "#"+divtype+"Rec1";
        if( $(checkdiv).css('display') == 'none' ) {
            $(checkdiv).text("Sorry, no recommendations found");
            $(checkdiv).show();
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