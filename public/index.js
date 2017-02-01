var app = function(){

     var searchBox = document.querySelector("#search_box");
     // showFavorites();
     searchBox.onchange = handleSubmit;
}

var handleSubmit = function(){
     var searchResults = document.getElementById("search_results");
     searchResults.innerText = "";
     var relatedResults = document.getElementById("related_results");
     relatedResults.innerText = "";
     var searchBox = document.querySelector("#search_box");
     var searchTerm = searchBox.value;
     if (searchTerm == "") return;
     var url = "http://www.omdbapi.com/?t=" + searchTerm + "&plot=full&r=json";
     var urlS = "http://www.omdbapi.com/?s=" + searchTerm + "&plot=short&r=json";
     makeRequest(url, requestComplete);
     makeRequest(urlS, requestCompleteS);
     var creditPara = document.getElementById("credits");
     creditPara.style.textAlign = "left";
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

     var imdbLinkRow = document.createElement("tr");
     var imdbLinkHead = document.createElement("th");
     imdbLinkHead.innerText = "IMDB";
     var imdbLink = document.createElement("td");
     imdbLink.innerHTML = "<a href='http://www.imdb.com/title/" + result.imdbID + "/'>http://www.imdb.com/title/" +  result.imdbID + "/</a>";

     var plotRow = document.createElement("tr");
     plotRow.classList.add("blue");
     var plotHead = document.createElement("th");
     plotHead.innerText = "Plot";
     var plot = document.createElement("td");
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

     plotRow.appendChild(plotHead);
     plotRow.appendChild(plot);

     imdbLinkRow.appendChild(imdbLinkHead);
     imdbLinkRow.appendChild(imdbLink);

     resultsTable.appendChild(titleRow);
     resultsTable.appendChild(yearRow);
     resultsTable.appendChild(directorRow);
     resultsTable.appendChild(starringRow);
     resultsTable.appendChild(ratingRow);
     resultsTable.appendChild(imdbLinkRow);
     resultsTable.appendChild(plotRow);

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

     var relatedResultsLink = document.createElement('p');
     relatedResultsLink.innerHTML = "<a href='#related_results'>Related results</a>";

     searchResults.appendChild(poster);
     searchResults.appendChild(resultsTable);
     searchResults.appendChild(relatedResultsLink);
}

var displayResultS = function(results){
     var relatedResults = document.getElementById("related_results");

     relatedResults.style.display = "block";

     var relatedList = document.createElement('ul');

     for (result of results){
          var listItem = document.createElement('li');
          listItem.innerHTML =  "<a href='http://www.imdb.com/title/" + result.imdbID + "/' id=" + result.imdbID + ">" + result.Title + "</a>, " + result.Year + ", " + result.Type + ".";
          relatedList.appendChild(listItem);
     }

     relatedResults.appendChild(relatedList);
}

// var idLookup = function(result){
//      var movieID = result.imdbID;
//      var urlID = "http://www.omdbapi.com/?i=" + movieID;
//      makeRequest(urlID, requestComplete);
// }

window.onload = app;