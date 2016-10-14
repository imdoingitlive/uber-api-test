var configAuth = require('./auth');

$(document).ready( function(){
    // placeholder variables
    var userLatitude;
    var userLongitude;

    var partyLatitude = 40.747728;
    var partyLongitude = -73.986794;

    navigator.geolocation.watchPosition( function(position){
        console.log(position);
       
        // this will update lat and long
        userLatitude = position.coords.latitude;
        userLongitude = position.coords.longitude;
    });
})