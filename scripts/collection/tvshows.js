$(function (){
    TvShowsCollection =  Backbone.Collection.extend({
        model: TVShowsModel,
        parse: function(response) {
            response = response.results;

            var monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            response.forEach(function(obj) {
                var releaseDate = new Date(obj.releaseDate);
                releaseDate = monthNames[releaseDate.getMonth()] + " "+releaseDate.getUTCDate() + ", "+releaseDate.getUTCFullYear() ;
                obj.releaseDate = releaseDate;
            });
            return response;
        }
    });
});