var app = function(){

     var searchBox = document.querySelector("#search_box");
     // showFavorites();
     searchBox.onchange = handleSubmit;
}

// var showFavorites = function(){
//      var favoritesLink = document.querySelector("#favoritesLink");
//      if (localStorage) {
//           favoritesLink.style.display = "block";
//      } else {
//           favoritesLink.style.display = "none";
//      }
// }

var handleSubmit = function(){
     var searchResults = document.getElementById("search_results");
     searchResults.innerText = "";
     var searchBox = document.querySelector("#search_box");
     var searchTerm = searchBox.value;
     if (searchTerm == "") return;
     var url = "http://www.omdbapi.com/?t=" + searchTerm + "&plot=short&r=json";
     var urlS = "http://www.omdbapi.com/?s=" + searchTerm + "&plot=short&r=json";
     console.log(urlS);
     makeRequest(url, requestComplete);
     makeRequest(urlS, requestCompleteS);
}

var makeRequest = function(url, callback){
     var request = new XMLHttpRequest();
     request.open('GET', url);
     request.onload = callback;
     request.send();
}

var requestComplete = function(){
     if (this.status !== 200) return;
     var jsonString = this.responseText;
     var movie = JSON.parse(jsonString);
     displayResult(movie);
}

var requestCompleteS = function(){
     if (this.status !== 200) return;
     var jsonString = this.responseText;
     var movies = JSON.parse(jsonString);
     movies = movies.Search;
     console.log(movies);
     displayResultS(movies);
}

var displayResult = function(result){
     var resultId = result.imdbID;
     console.log(resultId);

     var searchResults = document.getElementById("search_results");

     var poster = document.createElement("img");
     poster.src = result.Poster;

     var resultsTable = document.createElement("table");

     var titleRow = document.createElement("tr");
     titleRow.classList.add("blue");
     var titleHead = document.createElement("th");
     titleHead.innerText = "Title";
     var title = document.createElement("td");
     title.innerText = result.Title;

     var yearRow = document.createElement("tr");
     var yearHead = document.createElement("th");
     yearHead.innerText = "Year";
     var year = document.createElement("td");
     year.innerText = result.Year;

     var directorRow = document.createElement("tr");
     directorRow.classList.add("blue");
     var directorHead = document.createElement("th");
     directorHead.innerText = "Director";
     var director = document.createElement("td");
     director.innerText = result.Director;

     var starringRow = document.createElement("tr");
     var starringHead = document.createElement("th");
     starringHead.innerText = "Starring";
     var starring = document.createElement("td");
     starring.innerText = result.Actors;

     var ratingRow = document.createElement("tr");
     ratingRow.classList.add("blue");
     var ratingHead = document.createElement("th");
     ratingHead.innerText = "IMDb Rating";
     var rating = document.createElement("td");
     rating.innerText = result.imdbRating;

     var plotRow = document.createElement("tr");
     var plot = document.createElement("td");
     plot.setAttribute("colspan", "2");
     plot.innerText = result.Plot;
     plot.classList.add("plot");

     titleRow.appendChild(titleHead);
     titleRow.appendChild(title);

     yearRow.appendChild(yearHead);
     yearRow.appendChild(year);

     directorRow.appendChild(directorHead);
     directorRow.appendChild(director);

     starringRow.appendChild(starringHead);
     starringRow.appendChild(starring);

     ratingRow.appendChild(ratingHead);
     ratingRow.appendChild(rating);

     plotRow.appendChild(plot);

     resultsTable.appendChild(titleRow);
     resultsTable.appendChild(yearRow);
     resultsTable.appendChild(directorRow);
     resultsTable.appendChild(starringRow);
     resultsTable.appendChild(ratingRow);

     if (result.Type === "series"){
          var seasonsRow = document.createElement("tr");
          var seasonsHead = document.createElement("th");
          var seasons = document.createElement("td");
          seasonsHead.innerText = "Seasons";
          seasons.innerText = result.totalSeasons;
          seasonsRow.appendChild(seasonsHead);
          seasonsRow.appendChild(seasons);
          resultsTable.appendChild(seasonsRow);
     }

     resultsTable.appendChild(plotRow);

     // var favoritesCheck = document.createElement("p");

     // var checkBox = document.createElement("input");
     // checkBox.setAttribute("type", "checkbox");
     // checkBox.setAttribute("id", "favoritesCheckBox");

     // var checkBoxLabel = document.createElement("label");
     // checkBoxLabel.setAttribute("for", "favoritesCheckBox");
     // checkBoxLabel.innerText = "Favorite";

     // favoritesCheck.appendChild(checkBox);
     // favoritesCheck.appendChild(checkBoxLabel);


     searchResults.appendChild(poster);
     searchResults.appendChild(resultsTable);
     // searchResults.appendChild(favoritesCheck);

     // checkBox.onchange = handleFavorites(result);
}

var displayResultS = function(results){
     
}

// var handleFavorites = function(result){

//      var checkBox = document.getElementById("favoritesCheckBox");
 
//      if (checkBox.checked == true) {

//           var film = result.title;
//           console.log(result);
//           localStorage.setItem(film, film);

//      }

// }

window.onload = app;