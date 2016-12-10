var app = function(){

     var submit = document.querySelector("#submit");
     submit.onclick = handleSubmit;

}

var handleSubmit = function(){
     var searchBox = document.querySelector("#search_box");
     var searchTerm = searchBox.value;
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

     var title = document.createElement("p");
     title.innerText = "Title: " + result.Title;

     var year = document.createElement("p");
     year.innerText = "Year: " + result.Year;

     var director = document.createElement("p");
     director.innerText = "Director: " + result.Director;

     var starring = document.createElement("p");
     starring.innerText = "Starring: " + result.Actors;

     var rating = document.createElement("p");
     rating.innerText = "IMdB rating: " + result.imdbRating;

     var plot = document.createElement("p");
     plot.classList.add('textBox');
     plot.innerText = result.Plot;

     searchResults.appendChild(poster);
     searchResults.appendChild(title);
     searchResults.appendChild(year);
     searchResults.appendChild(director);
     searchResults.appendChild(starring);
     searchResults.appendChild(rating);
     searchResults.appendChild(plot);

}

window.onload = app;