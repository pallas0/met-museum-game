window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  welcomeScreen();
  init();
});
//document selectors
const mainImage = document.getElementById("main-image");
const option1 = document.getElementById("objectID-1");
const option2 = document.getElementById("objectID-2");
const option3 = document.getElementById("objectID-3");
const nextButton = document.getElementById("skip");

const scoreEl = document.getElementById("scorekeeper");
const timeLeftEl = document.getElementById("timeleft");
const welcomePopupEl = document.getElementById("modal-holder");

const totalCorrectScore = document.getElementById("total-correct");
const totalQuestionsScore = document.getElementById("total-questions");

const newGameButton = document.getElementById("new-game");

const correctModalNextButton = document.getElementById(
  "correct-modal-next-question-button"
);
const incorrectModalNextButton = document.getElementById(
  "incorrect-modal-next-question-button"
);
//event listeners
option1.addEventListener("click", winLogic);
option2.addEventListener("click", winLogic);
option3.addEventListener("click", winLogic);

newGameButton.addEventListener("click", function (e) {
  e.preventDefault();
  reset();
  totalQuestionsScore.textContent = 0;
  totalCorrectScore.textContent = 0;
  correctAnswers = 0;
  totalQuestions = 0;
});
nextButton.addEventListener("click", function (e) {
  e.preventDefault();
  reset();
  totalQuestions++;
  totalQuestionsScore.textContent = totalQuestions;
});
correctModalNextButton.addEventListener("click", function (e) {
  e.preventDefault();
});
incorrectModalNextButton.addEventListener("click", function (e) {
  e.preventDefault();
});

let correctAnswers = 0;
let totalQuestions = 0;

function init() {
  goSearch();
}

const baseSearchParam =
  "https://collectionapi.metmuseum.org/public/collection/v1/search?medium=Paintings&q=cat&department=13";

//returned value is no lower than (and may possibly equal) min, and is less than (and not equal) max.
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function goSearch(searchTerm) {
  fetch(baseSearchParam)
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
    title: "title",
    year: 0000,
    image: "url",
  },
  option2: {
    objectID: 02,
    artist: "b",
    title: "title",
    year: 0000,
    image: "url",
  },
  option3: {
    objectID: 03,
    artist: "c",
    title: "title",
    year: 0000,
    image: "url",
  },
  option4: {
    objectID: 04,
    artist: "d",
    title: "title",
    year: 0000,
    image: "url",
  },
  option5: {
    objectID: 05,
    artist: "e",
    title: "title",
    year: 0000,
    image: "url",
  },
};

//this is the object that will store our game options
//first the objectID is filled from picking three random numbers from our search-set
//then the artist value should be filled in by a second fetch call to each of the relevant objects

//build function that loops over gameOptions to check for blank strings
function checkMissingStringsInObject() {
  console.log(gameOptions);
  for (const option in gameOptions) {
    if (gameOptions[option].artist === "") {
      gameOptions[option] = gameOptions.option4;
    } else if (gameOptions[option].artist === "Unidentified artist") {
      gameOptions[option] = gameOptions.option5;
    }
  }
  console.log(gameOptions);
}

async function searchResults(data) {
  //this fills in our game pieces with randomly chosen objects
  for (let option in gameOptions) {
    gameOptions[option].objectID = data.objectIDs[randomNum(1, 800)];
    let objectToFind = gameOptions[option].objectID;
    //use our three objectIDs to then search for each object and gather data
    await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectToFind}`
    )
      .then((resp) => resp.json())
      //next we set the artist name in our local object based on the info from the api
      .then((data) => {
        // this points to the gameOptions object, and for each option.artist in the object
        //it will set that param to data.artistDisplayName as it comes from the api
        gameOptions[option].artist = data.artistDisplayName;
        gameOptions[option].image = data.primaryImageSmall;
        gameOptions[option].title = data.title;
        gameOptions[option].year = data.objectEndDate;
      });
  }
  //run logic to check for empty strings
  checkMissingStringsInObject();
  initialLoad();
}
function randomizeWinnerOptions() {
  const randNum = Math.floor(Math.random() * (6 - 1) + 1);
  // console.log(randNum);
  for (let option in gameOptions) {
    if (option === `option${randNum}`) {
      gameOptions["correct"] = gameOptions[option];
    }
  }
}
// initialLoad populates DOM
function initialLoad() {
  //set the id of each of the board pieces to match the input objectid
  option1.setAttribute("data-id", gameOptions.option1.objectID);
  option2.setAttribute("data-id", gameOptions.option2.objectID);
  option3.setAttribute("data-id", gameOptions.option3.objectID);
  //set the text on the game pieces
  option1.textContent = gameOptions.option1.artist;
  option2.textContent = gameOptions.option2.artist;
  option3.textContent = gameOptions.option3.artist;
  //below randomly chooses from the three existing options to choose a winner and make a new obj
  randomizeWinnerOptions();
  //the below attribute won't work if we don't fire randomizeWinnerOptions first
  mainImage.setAttribute("data-id", gameOptions.correct.objectID);
  mainImage.src = gameOptions.correct.image;
}

// winner logic- add to event listeners on option buttons
function winLogic() {
  //see if data-id matches mainImage.dat-id
  if (this.getAttribute("data-id") === mainImage.getAttribute("data-id")) {
    answerPopUpFiller();
    correctAnswerPopUp();
    console.log("correct!");
    correctAnswers++;
    totalQuestions++;
    totalCorrectScore.textContent = correctAnswers;
    totalQuestionsScore.textContent = totalQuestions;
    // openModalWindow()
    reset();
  } else {
    answerPopUpFiller();
    console.log("wrong!");

    totalQuestions++;
    totalQuestionsScore.textContent = totalQuestions;
    incorrectAnswerPopUp();
    // openModalWindow()
    reset();
  }
}
//reset the game board (currently just clears, will need to fire goSearch again)
const reset = () => {
  option1.setAttribute("data-id", "");
  option2.setAttribute("data-id", "");
  option3.setAttribute("data-id", "");
  mainImage.setAttribute("data-id", "");
  goSearch();
};

// popup handlers below
function welcomeScreen() {
  const welcomePopUp = new bootstrap.Modal(
    document.getElementById("welcome-popup"),
    {
      keyboard: false,
    }
  );
  welcomePopUp.show();
}
function incorrectAnswerPopUp() {
  const incorrectAnswerPopUp = new bootstrap.Modal(
    document.getElementById("incorrect-popup"),
    {
      keyboard: false,
    }
  );
  incorrectAnswerPopUp.show();
}
function correctAnswerPopUp() {
  const correctAnsPopUp = new bootstrap.Modal(
    document.getElementById("correct-popup"),
    {
      keyboard: false,
    }
  );
  correctAnsPopUp.show();
}
//this function fills in the information for our popup with the correct info and opens it
function answerPopUpFiller() {
  //select our modal dom elements
  const modalObjectTitle = document.getElementById(
    "correct-modal-object-title"
  );
  const modalObjectArtist = document.getElementById(
    "correct-modal-object-artist"
  );
  const modalObjectArtistInsert = document.getElementById(
    "correct-artist-insert"
  );
  const modalObjectYear = document.getElementById("correct-modal-object-year");
  const modalObjectImage = document.getElementById(
    "correct-modal-object-image"
  );
  const incorrectModalObjectTitle = document.getElementById(
    "incorrect-modal-object-title"
  );
  const incorrectModalObjectArtist = document.getElementById(
    "incorrect-modal-object-artist"
  );
  const incorrectModalObjectArtistInsert = document.getElementById(
    "incorrect-artist-insert"
  );
  const incorrectModalObjectYear = document.getElementById(
    "incorrect-modal-object-year"
  );
  const incorrectModalObjectImage = document.getElementById(
    "incorrect-modal-object-image"
  );
  //replace elements with our correct answer
  modalObjectTitle.textContent = gameOptions.correct.title;
  modalObjectArtist.textContent = gameOptions.correct.artist;
  modalObjectArtistInsert.textContent = gameOptions.correct.artist;
  modalObjectYear.textContent = gameOptions.correct.year;
  modalObjectImage.src = gameOptions.correct.image;
  incorrectModalObjectTitle.textContent = gameOptions.correct.title;
  incorrectModalObjectArtist.textContent = gameOptions.correct.artist;
  incorrectModalObjectArtistInsert.textContent = gameOptions.correct.artist;
  incorrectModalObjectYear.textContent = gameOptions.correct.year;
  incorrectModalObjectImage.src = gameOptions.correct.image;
  //then after this open the popup
}


// animated popup 

const loadingEl = document.getElementById('animated-loader')

const changeState = document.querySelector(".game-option")

function showSpinner() {
    setTimeout(() => {
        loadingEl.style.display = "block";
    }, 5000);
}

function hideSpinner() {
  loadingEl.style.display = "none";
}