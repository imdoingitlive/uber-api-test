$(document).ready( function(){
    // placeholder variables
    var userLatitude;
    var userLongitude;

    navigator.geolocation.watchPosition( function(position){
        console.log(position);
       
        // this will update lat and long
        userLatitude = position.coords.latitude;
        userLongitude = position.coords.longitude;
    });
})