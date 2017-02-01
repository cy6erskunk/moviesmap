/* eslint-env es6 */
"use strict";

var input = document.querySelector('.addressInput');

input.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
        processAddress(e.target.value);
    }
});

function processAddress(address) {
    if (!geocoder) {
        alert('WTF, geocoder is not ready yet!')
    } else {
        geocoder.geocode({address}, geocoderCallback);
    }
}

function geocoderCallback(result, status) {
    if (status === 'OK') {
        window.map.setCenter(result[0].geometry.location);
        var marker = new google.maps.Marker({
            map: window.map,
            position: result[0].geometry.location
        });
    } else {
        alert('Something went wrong: ' + status);
    }
}