const mainImage = document.querySelector("#main-image");
const option1 = document.querySelector("#objectID-1");
const option2 = document.querySelector("#objectID-2");
const option3 = document.querySelector("#objectID-3");

const score = document.querySelector("#scorekeeper");
const timeLeft = document.querySelector("#timeleft");


function randomNum() {
    Math.floor(Math.random() * 494);
  }

  function goSearch(searchTerm) {
  fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=cat&hasImages=true`)
    .then((res) => res.json())
    .then((data) => searchResults(data))
  }
  
  function searchResults(searchResultsData) {
      console.log(searchResultsData)
  }

  const gameOptions = {
    "option1": {
    "objectID": 01, 
      "artist": "a"
    },
    "option2": {
      "objectID": 02, 
      "artist": "b"
    },
    "option3": {
      "objectID": 03, 
      "artist": "c"
    }
}