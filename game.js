const mainImage = document.querySelector("#main-image");
const gamePieces = document.querySelector("#game-pieces");
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
    src: `https://ukmadcat.com/wp-content/uploads/2019/04/sleepy-cat.jpg`,
  },
  option2: {
    objectID: 02,
    artist: "b",
    src: `http://www.trbimg.com/img-5a68a878/turbine/ct-grumpy-cat-lawsuit-20180124`,
  },
  option3: {
    objectID: 03,
    artist: "c",
    src: `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallup.net%2Fwp-content%2Fuploads%2F2018%2F09%2F25%2F597795-licking-cat-animals.jpg&f=1&nofb=1`,
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

function populateGameOptions() {
  // populate image with winner object
  mainImage.src = gameOptions.winner.src;

  console.log(gameOptions.winner.objectID);
  // ***mainIage.className should be equal to object ID***
  mainImage.setAttribute("data-id", gameOptions.winner.objectID);
  mainImage.style.width = "400px";

  // populate gamePiece options
  option1.textContent = gameOptions.option1.artist;
  option1.setAttribute("data-id", gameOptions.option1.objectID);
  option2.textContent = gameOptions.option2.artist;
  option2.setAttribute("data-id", gameOptions.option2.objectID);
  option3.textContent = gameOptions.option3.artist;
  option3.setAttribute("data-id", gameOptions.option3.objectID);

  // loop over gameOptions

  // if answer is correct, display modal, increase score counter, and repopulate game with new question
}
populateGameOptions();
