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
     console.log(searchResults);
     var poster = document.createElement("img");
     console.log(poster);
     console.log(result.Poster);
     poster.src = result.Poster;
     console.log(poster.src);
     searchResults.appendChild(poster);
}

window.onload = app;