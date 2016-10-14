(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
    'uberAuth' : {
        'uberClientID' : 'lQrY4VzaD2T3WeMQeD49w72Xzxr3K9pz',
        'uberServerToken' : 'QlVSYsoftbiUB-EnhQRi959wjWURf33AbB4bEgDD'
    }
}
},{}],2:[function(require,module,exports){
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
},{"./auth":1}]},{},[2]);
