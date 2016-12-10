var app = function(){

     var searchBox = document.querySelector("#search_box");
     // showFavorites();
     searchBox.onchange = handleSubmit;

}

// var showFavorites = function(){
//      var favoritesArea = document.querySelector("#favorites");
//      if (localStorage){
//           favoritesArea.innerText = "See favorites";
//      } 
//           else {
//           favoritesArea.style.visibility = "invisible";
//      }
// }

var handleSubmit = function(){
     var searchResults = document.getElementById("search_results");
     searchResults.innerText = "";
     var searchBox = document.querySelector("#search_box");
     var searchTerm = searchBox.value;
     if (searchTerm == "") return;
     var url = "http://www.omdbapi.com/?t=" + searchTerm + "&plot=short&r=json";
     makeRequest(url, requestComplete);
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

var displayResult = function(result){
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
     resultsTable.appendChild(plotRow);

     searchResults.appendChild(poster);
     searchResults.appendChild(resultsTable);

}

window.onload = app;