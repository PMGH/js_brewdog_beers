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

  populateBeersList();
}

var populateBeersList = function(){
  var container = document.getElementById('beer-list');
  var imageClass = "beerImage";

  for (var beer of beers){
    imageLi = createLi();
    imageLi.innerHTML = "<img class=" + imageClass + " src=" + beer.image_url + " />  ";

    var nameLi = createNameLi(beer);
    var maltLi = createMaltLi(beer);
    var hopLi = createHopLi(beer);
    var yeastLi = createYeastLi(beer);

    beerUl = createUl();
    beerUl.classList = "beerItem";

    beerUl.appendChild(imageLi);
    beerUl.appendChild(nameLi);
    beerUl.appendChild(maltLi);
    beerUl.appendChild(hopLi);
    beerUl.appendChild(yeastLi);
    container.appendChild(beerUl);
  }
}

var createNameLi = function(beer){
  nameLi = createLi();
  nameLi.classList = "beerName";
  nameLi.innerText = beer.name;
  return nameLi;
}

var createMaltLi = function(beer){
  var malts = beer.ingredients.malt;

  maltLi = createLi();
  maltLi.classList = "beerMalt";
  maltString = "Malt: \n"
  for (var malt of malts){
    maltString += "- " + malt.name + "\n";
  }
  maltLi.innerText = maltString;
  return maltLi;
}

var createHopLi = function(beer){
  var hops = beer.ingredients.hops;

  hopLi = createLi();
  hopLi.classList = "beerHop";
  hopString = "Hop: \n";
  for (var hop of hops){
    hopString += "- " + hop.name + "\n";
  }
  hopLi.innerText = hopString;
  return hopLi;
}

var createYeastLi = function(beer){
  var yeasts = beer.ingredients.yeast;

  yeastLi = createLi();
  yeastLi.classList = "beerYeast";
  yeastString = "Yeast: \n";
  yeastString += "- " + yeasts + "\n";
  yeastLi.innerText = yeastString;
  return yeastLi;
}

var createLi = function(){
  return document.createElement('li');
}

var createUl = function(){
  return document.createElement('ul');
}


var beers = [];

var app = function(){

  // request (GET) data from API
  var url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestComplete);

}

window.addEventListener('load', app);
