window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    welcomeScreen()
    init()    
  });
  //document selectors
  const mainImage = document.getElementById("main-image");
  const option1 = document.getElementById("objectID-1");
  const option2 = document.getElementById("objectID-2");
  const option3 = document.getElementById("objectID-3");
  
  const scoreEl = document.getElementById("scorekeeper");
  const timeLeftEl = document.getElementById("timeleft");
  const welcomePopupEl = document.getElementById("modal-holder")
  
  const totalCorrectScore = document.getElementById("total-correct");
  const totalQuestionsScore = document.getElementById("total-questions");
  
  const newGameButton = document.querySelector('.new-game-button')
 //event listeners 
  option1.addEventListener("click", winLogic);
  option2.addEventListener("click", winLogic);
  option3.addEventListener("click", winLogic);

  newGameButton.addEventListener("click", function(e) {
    // //e.preventDefault()
    // window.location.reload()
    reset();
})


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
    .then((data) => searchResults(data))
  }


  //this is the object that will store our game options
  //first the objectID is filled from picking three random numbers from our search-set
  //then the artist value should be filled in by a second fetch call to each of the relevant objects
  const gameOptions = {
      "option1": {
        "objectID": 01,
        "artist": "a",
        "title": "title",
        "year": 0000,
        "image": "url",
      },
        "option2": {
          "objectID": 02,
          "artist": "b",
          "title": "title",
          "year": 0000,
          "image": "url",
        },
        "option3": {
          "objectID": 03,
          "artist": "c",
          "title": "title",
          "year": 0000,
          "image": "url",
        }
    }
    


//this is the object that will store our game options
//first the objectID is filled from picking three random numbers from our search-set
//then the artist value should be filled in by a second fetch call to each of the relevant objects


async function searchResults(data) {
  //this fills in our game pieces with randomly chosen objects
  for (let option in gameOptions) {
        gameOptions[option].objectID = data.objectIDs[randomNum(1, 500)];
        let objectToFind = gameOptions[option].objectID;
        //use our three objectIDs to then search for each object and gather data
        await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectToFind}`)
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
  initialLoad()
  }
  function randomizeWinnerOptions() {
    const randNum = Math.floor(Math.random() * (4 - 1) + 1);
    // console.log(randNum);
    for (let option in gameOptions) {
      if (option === `option${randNum}`) {
        gameOptions["correct"] = gameOptions[option];
      }
    }
  }
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
      correctAnswerPopUp();
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
  //reset the game board (currently just clears, will need to fire goSearch again)
  const reset = () => {
    option1.setAttribute("data-id", "");
    option2.setAttribute("data-id", "");
    option3.setAttribute("data-id", "");
    mainImage.setAttribute("data-id", "");
    welcomeScreen()
    goSearch()
  };
  
  // popup handlers below
  function welcomeScreen() {
    const welcomePopUp = new bootstrap.Modal(document.getElementById('welcome-popup'), {
      keyboard: false
    })
    welcomePopUp.show();
  }
  //this function fills in the information for our popup with the correct info and opens it
  function correctAnswerPopUp() {
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
    //this open the popup
    const correctAnsPopUp = new bootstrap.Modal(document.getElementById('correct-popup'), {
      keyboard: false
    })
    correctAnsPopUp.show();
  }
  
  