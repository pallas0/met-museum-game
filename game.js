const mainImage = document.getElementById("main-image");
const option1 = document.getElementById("objectID-1");
const option2 = document.getElementById("objectID-2");
const option3 = document.getElementById("objectID-3");

const scoreEl = document.getElementById("scorekeeper");
const timeLeftEl = document.getElementById("timeleft");
const welcomePopupEl = document.getElementById("modal-holder")

const newGameButton = document.querySelector('.new-game-button')
newGameButton.addEventListener("click", function(e) {
    //e.preventDefault()
    console.log("clickity click")
    window.location.reload()
})

const totalCorrectScore = document.querySelector("#total-correct");
const totalQuestionsScore = document.querySelector("#total-questions");

let correctAnswers = 0;
let totalQuestions = 0;

const baseSearchParam =
  "https://collectionapi.metmuseum.org/public/collection/v1/search?medium=Paintings&q=cat&department=13";

//returned value is no lower than (and may possibly equal) min, and is less than (and not equal) max.
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function goSearch(searchTerm) {
  fetch(baseSearchParam)
    .then((res) => res.json())
    .then((data) => searchResults(data))
  }


  //this is the object that will store our game options
  //first the objectID is filled from picking three random numbers from our search-set
  //then the artist value should be filled in by a second fetch call to each of the relevant objects
  const gameOptions = {
      "option1": {
        objectID: 01,
        artist: "a",
        title: "title",
        year: 0000,
        image: "url",
      },
        "option2": {
          objectID: 02,
          artist: "b",
          title: "title",
          year: 0000,
          image: "url",
        },
        "option3": {
          objectID: 03,
          artist: "c",
          title: "title",
          year: 0000,
          image: "url",
        }
    }
    


//this is the object that will store our game options
//first the objectID is filled from picking three random numbers from our search-set
//then the artist value should be filled in by a second fetch call to each of the relevant objects


function searchResults(data) {
  //this fills in our game pieces with randomly chosen objects
  for (let option in gameOptions) {
    // debugger
    gameOptions[option].objectID = data.objectIDs[randomNum(1, 500)];
    let objectToFind = gameOptions[option].objectID;
    //use our three objectIDs to then search for each object and gather data
    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectToFind}`
    )
      .then((resp) => resp.json())
      //next we set the artist name in our local object based on the info from the api
      .then((data) => {
        // this points to the gameOptions object, and for each option.artist in the object
        //it will set that param to data.artistDisplayName as it comes from the api
        // -->possible issue here is what if there is no displayName attribute for the object in the api?
        gameOptions[option].artist = data.artistDisplayName;
        gameOptions[option].image = data.primaryImageSmall;
        gameOptions[option].title = data.title;
        gameOptions[option].year = data.objectEndDate;
      });
  }
}



function reverseLookUp(objectIdToLookUp) {
  fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectIdToLookUp}`
  )
    .then((res) => res.json())
    .then(function (data) {
    })
}


window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
        welcomeScreen()
    // welcomePopupEl.toggle()
   
});
function welcomeScreen() {
    var myModal = new bootstrap.Modal(document.getElementById('welcome-popup'), {
        keyboard: false
      })
      myModal.show();
}


 
// const mockPieces = {
//   option1: {
//     objectID: 12345,
//     artist: "Tulip Painter",
//     title: "A painting of tulips",
//     year: 1964,
//     image: "https://dummyimage.com/600x400/000/fff&text=A+painting+of+tulips",
//   },
//   option2: {
//     objectID: 6789,
//     artist: "Ocean Master",
//     year: 1924,
//     title: "The beautiful ocean mists warm my fate with baseballs",
//     image:
//       "https://dummyimage.com/600x400/000/0011ff&text=A+painting+of+the+ocean",
//   },
//   option3: {
//     objectID: 101112,
//     artist: "Humanist Painter",
//     year: 1789,
//     title: "A painting of the fall of man",
//     image:
//       "https://dummyimage.com/600x400/000/ff00fb&text=The+fall+of+man+as+illustrated+by+a+dead+white+guy",
//   },
//   correct: {
//     objectID: "66666",
//     artist: "Correct Answer Painter",
//     year: 9999,
//     title: "A painting of the correct answer",
//     image:
//       "https://previews.123rf.com/images/dirkercken/dirkercken1312/dirkercken131200024/24419932-correct-answer-right-choice.jpg",
//   },
// };

function initialLoad() {
  goSearch();
  // pick a random dom element to make the correct answer
  let correctAnswerElement = `option${randomNum(1, 4)}`;
  //create a variable to store the correct answer object
  randomizeWinnerOptions();
  //set the id of each of the board pieces to match the input objectid
  option1.setAttribute("data-id", gameOptions.option1.objectID);
  option2.setAttribute("data-id", gameOptions.option2.objectID);
  option3.setAttribute("data-id", gameOptions.option3.objectID);
  mainImage.setAttribute("data-id", gameOptions.correct.objectID);

  mainImage.src = gameOptions.correct.image;
  option1.textContent = gameOptions.option1.artist;
  option2.textContent = gameOptions.option2.artist;
  option3.textContent = gameOptions.option3.artist;
}

initialLoad();

function randomizeWinnerOptions() {
  const randNum = Math.floor(Math.random() * (4 - 1) + 1);
  console.log(randNum);
  for (let option in gameOptions) {
    if (option === `option${randNum}`) {
      gameOptions["correct"] = gameOptions[option];
    }
  }
}

function correctAnnouncment() {
  //select our modal dom elements
  const modalObjectTitle = document.getElementById("modal-object-title");
  const modalObjectArtist = document.getElementById("modal-object-artist");
  const modalObjectArtistInsert = document.getElementById("artist-insert");
  const modalObjectYear = document.getElementById("modal-object-year");
  const modalObjectImage = document.getElementById("modal-object-image");
  //replace elements with our correct answer
  modalObjectTitle.textContent = gameOptions.correct.title;
  modalObjectArtist.textContent = gameOptions.correct.artist;
  modalObjectArtistInsert.textContent = gameOptions.correct.artist;
  modalObjectYear.textContent = gameOptions.correct.year;
  modalObjectImage.src = gameOptions.correct.image;
}

// winner logic- add to event listeners on option buttons
function winLogic() {
  //see if data-id matches mainImage.dat-id

  if (this.getAttribute("data-id") === mainImage.getAttribute("data-id")) {
    alert("correct! you know your artists!!!");
    console.log("correct!");
    correctAnswers++;
    totalQuestions++;
    totalCorrectScore.textContent = correctAnswers;
    totalQuestionsScore.textContent = totalQuestions;
    // openModalWindow()
    // reset();
  } else {
    alert("Incorrect! Better luck next round!");
    console.log("wrong!");
    totalQuestions++;
    totalQuestionsScore.textContent = totalQuestions;
    // openModalWindow()
    // reset();
  }
}

const reset = () => {
  option1.setAttribute("data-id", "");
  option2.setAttribute("data-id", "");
  option3.setAttribute("data-id", "");
  mainImage.setAttribute("data-id", "");
};

option1.addEventListener("click", winLogic);
option2.addEventListener("click", winLogic);
option3.addEventListener("click", winLogic);

