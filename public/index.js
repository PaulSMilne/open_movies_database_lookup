var app = function(){
     var submit = document.querySelector("#submit");
     console.log(submit);

     var searchResults = document.querySelector('#search_results');
     console.log(searchResults);

     var handleSubmit = function(){
          console.log("I have been clicked");
          var pTag = document.createElement("p");
          console.log(pTag);
          var searchBox = document.querySelector('#search_box');
          console.log(searchBox);
          console.log(searchBox.value);
          pTag.innerText = searchBox.value;
          searchResults.appendChild(pTag);
     }

     submit.onclick = handleSubmit;
}

window.onload = app;