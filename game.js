const mainImage = document.querySelector("#main-image");
const option1 = document.querySelector("#objectID-1");
const option2 = document.querySelector("#objectID-2");
const option3 = document.querySelector("#objectID-3");

const score = document.querySelector("#scorekeeper");
const timeLeft = document.querySelector("#timeleft");

function randomNum() {
  return Math.floor(Math.random() * 494);
}

function goSearch(searchTerm) {
  fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?q=cat&hasImages=true`
  )
    .then((res) => res.json())
    .then((data) => searchResults(data));
}

//this is the object that will store our game options
//first the objectID is filled from picking three random numbers from our search-set
//then the artist value should be filled in by a second fetch call to each of the relevant objects
const gameOptions = {
  option1: {
    objectID: 01,
    artist: "a",
  },
  option2: {
    objectID: 02,
    artist: "b",
  },
  option3: {
    objectID: 03,
    artist: "c",
  },
};

function searchResults(data) {
  //this fills in our game pieces with randomly chosen objects
  for (let option in gameOptions) {
    gameOptions[option].objectID = data.objectIDs[randomNum()];
    let objectToFind = gameOptions[option].objectID;
    //use our three objectIDs to then search for each object and gather data
    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectToFind}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(option, data);
        return (gameOptions[option].artist = data.artistDisplayName);
      });
  }
}
console.log(gameOptions);
// function findArtistDetails(objectID){
//     fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
//     .then((resp) => resp.json())
//     .then((data) => {
//         gameOptions[option].artist = data.constituents[0].name
//     })

// }

goSearch();

function randomizeOptions() {
  //generate random number between 1-3
  const randNum = Math.floor(Math.random() * (4 - 1) + 1);
  console.log(randNum);
  for (let option in gameOptions) {
    // console.log(`option${randNum}`);
    if (option === `option${randNum}`) {
      gameOptions["winner"] = gameOptions[option];
    }
  }
  console.log(gameOptions);
}
randomizeOptions();
