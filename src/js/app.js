import $ from 'jquery';



$.getJSON('http://apis.is/concerts').then(function(serverRes){



})

$.getJSON('http://apis.is/rides/samferda-drivers/').then(function(serverRes){
console.log(serverRes)

})

$.getJSON('http://apis.is/flight?language=en&type=departures').then(function(serverRes){



})
