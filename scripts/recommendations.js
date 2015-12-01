/**
 * Created by Simon on 2015-11-29.
 */

var uMovieRecTotal = 0;

var recCallback = function(data) {
    var recList = []
    for(var i = 0; i<data.Similar.Results.length; i++) {
        var itemName = data.Similar.Results[i].Name;
        var itemType = data.Similar.Results[i].Type;
        recList.push({"name": itemName, "type": itemType});
    }
    var uMovieRecList = createUMovieRecList(recList);


};

var getRecommendationList = function(title, type) {
    var urlBegin = "https://www.tastekid.com/api/similar?q=" + encodeURIComponent("attack of the killer tomatoes") + "&type=" + type;
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
        //var url = "https://umovie.herokuapp.com/unsecure/search/movies?q="+encodeURIComponent(recList[i].Name)+"&limit=1";
        var url = "https://umovie.herokuapp.com/unsecure/search/movies?q="+encodeURIComponent("attack of the killer" +
                " tomatoes")+"&limit=1";
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
    //TODO: vérifier si le response contient au moins un élément: ajouter si oui, rien si non, mais incrémente quand
    //TODO: meme le counter uMovieRecTotal
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

};