$(function (){
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    var player;

    $.ajax({
        url : 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=Breaking Bad, Season 5&maxResults=1&order=viewCount&key=AIzaSyBNPujtVRFaQjnXBUMu6kvMj-S6gIiNHYk',
        type : 'GET',
        contentType: 'application/json'
    }).done(function(data) {
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: data.items[0].id.videoId,
        });
    });
});