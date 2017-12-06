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
  populateBeersList();
}

var populateBeersList = function(){
  var container = document.getElementById('beer-list');
  var imageClass = "beerImage";

  for (var beer of beers){
    newLi = createLi();
    // newLi.innerText = beer.name;
    newLi.innerHTML = "<img class=" + imageClass + " src=" + beer.image_url + " />  " + beer.name;
    container.appendChild(newLi);
  }
}

var createLi = function(){
  return document.createElement('li');
}


var beers = [];

var app = function(){

  // request (GET) data from API
  var url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestComplete);

}

window.addEventListener('load', app);
