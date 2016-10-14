// bring in uber api credentials
var configAuth = require('./auth');

$(document).ready( function(){
    // placeholder variables
    var userLatitude;
    var userLongitude;

    var partyLatitude = 40.747728;
    var partyLongitude = -73.986794;

    navigator.geolocation.watchPosition( function(position){
        // console.log(position);
       
        // this will update lat and long
        userLatitude = position.coords.latitude;
        userLongitude = position.coords.longitude;

        // query uber api if needed
        getEstimatesForUserLocation(userLatitude, userLongitude);
    });

    function getEstimatesForUserLocation(latitude, longitude){
        $.ajax({
            url : "https://api.uber.com/v1/estimates/price",
            headers : {
                Authorization : "Token " + configAuth.uberAuth.uberServerToken
            },
            data : {
                start_latitude: latitude,
                start_longitude: longitude,
                end_latitude: partyLatitude,
                end_longitude: partyLongitude
            },
            success: function(result) {
                console.log(result);
            }
        });
    }
});