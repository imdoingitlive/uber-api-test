// bring in uber api credentials
var configAuth = require('./auth');

$(document).ready( function(){
    // placeholder variables
    var userLatitude;
    var userLongitude;

    var partyLatitude = 40.747728;
    var partyLongitude = -73.986794;

    // creating variable to store the timer
    var timer;

    navigator.geolocation.watchPosition( function(position){
        // console.log(position);
       
        // this will update lat and long
        userLatitude = position.coords.latitude;
        userLongitude = position.coords.longitude;

        // create timer if needed
        // will fire every 60 seconds as recommended by the uber api
        // only create the timer if users location has been grabbed for the first time
        if (typeof timer === typeof undefined) {
            timer = setInterval(function() {
                getEstimatesForUserLocation(userLatitude, userLongitude);
            }, 60000);
        }

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
                
                var data = result["prices"];

                if (typeof data != typeof undefined) {
                    // sort uber products by time to the user's location
                    data.sort(function(t0, t1){
                        return t0.duration - t1.duration;
                    });

                    // update the uber button with the shortest time
                    var shortest = data[0];
                    if (typeof shortest != typeof undefined) {
                        console.log("Updating time estimate...");
                        $("#time").html("IN " + Math.ceil(shortest.duration / 60.0) + " MIN");
                    }
                }
            }
        });
    }
});