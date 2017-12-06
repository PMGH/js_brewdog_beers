var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

var requestComplete = function(){

  if (this.status != 200) return;

  var jsonString = this.responseText;

  var beerData = JSON.parse(jsonString);

  for (var beer of beerData){
    beers.push(beer);
  }

  console.log("response received");
  console.log(beers.length);
}


var beers = [];

var app = function(){

  var url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestComplete);

}

window.addEventListener('load', app);
