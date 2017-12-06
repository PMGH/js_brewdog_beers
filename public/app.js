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
    var ingredients = beer.ingredients;
    var malts = ingredients.malt;

    imageLi = createLi();
    imageLi.innerHTML = "<img class=" + imageClass + " src=" + beer.image_url + " />  ";

    nameLi = createLi();
    nameLi.classList = "beerName";
    nameLi.innerText = beer.name;

    maltLi = createLi();
    maltLi.classList = "beerMalt";
    maltString = "Malt: \n"
    for (var malt of malts){
      maltString += "- " + malt.name + "\n";
    }
    maltLi.innerText = maltString;

    beerUl = createUl();
    beerUl.classList = "beerItem";

    beerUl.appendChild(imageLi);
    beerUl.appendChild(nameLi);
    beerUl.appendChild(maltLi);
    container.appendChild(beerUl);
  }
}

// var populateIngredients = function(){
//   var
// }

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
