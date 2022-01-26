const mainImage = document.querySelector("#main-image");
const option1 = document.querySelector("#objectID-1");
const option2 = document.querySelector("#objectID-2");
const option3 = document.querySelector("#objectID-3");

const score = document.querySelector("#scorekeeper");
const timeLeft = document.querySelector("#timeleft");

const baseSearchParam = "https://collectionapi.metmuseum.org/public/collection/v1/search?medium=Paintings&q=cat&department=13"

//returned value is no lower than (and may possibly equal) min, and is less than (and not equal) max.
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
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
          "image": "url"
        },
        "option2": {
            "objectID": 02, 
            "artist": "b",
            "image": "url"
        },
        "option3": {
            "objectID": 03, 
            "artist": "c",
            "image": "url"
        }
    }
    
function searchResults(data) {
    //this fills in our game pieces with randomly chosen objects
    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      }

    for (let option in gameOptions) {
        // debugger
        gameOptions[option].objectID = data.objectIDs[randomNum(1,500)]
        let objectToFind = gameOptions[option].objectID

            //use our three objectIDs to then search for each object and gather data
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectToFind}`)
            .then((resp) => resp.json())
            //next we set the artist name in our local object based on the info from the api
            .then((data) => {
                // this points to the gameOptions object, and for each option.artist in the object
                //it will set that param to data.artistDisplayName as it comes from the api
                // -->possible issue here is what if there is no displayName attribute for the object in the api?
                gameOptions[option].artist = data.artistDisplayName
                gameOptions[option].image = data.primaryImageSmall
            })
    }
}


function reverseLookUp(objectIdToLookUp){
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectIdToLookUp}`)
    .then((res) => res.json())
    .then(function (data) {
    })
}
goSearch()

let answerKey = {}
const mockPieces = {
    "option1": {
        "objectID": 12345, 
        "artist": "Tulip Painter",
        "title": "A painting of tulips",
        "year": 1964,
        "image": "https://dummyimage.com/600x400/000/fff&text=A+painting+of+tulips"
      },
      "option2": {
          "objectID": 6789, 
          "artist": "Ocean Master",
          "year": 1924,
          "title": "The beautiful ocean mists warm my fate with baseballs",
          "image": "https://dummyimage.com/600x400/000/0011ff&text=A+painting+of+the+ocean"
      },
      "option3": {
          "objectID": 101112, 
          "artist": "Humanist Painter",
          "year": 1789,
          "title": "A painting of the fall of man",
          "image": "https://dummyimage.com/600x400/000/ff00fb&text=The+fall+of+man+as+illustrated+by+a+dead+white+guy"
      },
      "correct": {
        "objectID": "66666",
        "artist": "Correct Answer Painter",
        "year": 9999,
        "title": "A painting of the correct answer",
        "image": "https://previews.123rf.com/images/dirkercken/dirkercken1312/dirkercken131200024/24419932-correct-answer-right-choice.jpg"
      }
}

function initialLoad() {
    // pick a random dom element to make the correct answer
    let correctAnswerElement = `option${randomNum(1,4)}`
    //create a variable to store the correct answer object
    const correctAnswerObj = mockPieces.correct
    //set the id of each of the board pieces to match the input objectid
    option1.setAttribute("data-id", mockPieces.option1.objectID)
    option2.setAttribute("data-id", mockPieces.option2.objectID)
    option3.setAttribute("data-id", mockPieces.option3.objectID)
    
    console.log(option1)

    //populate the main image and store the object id as the winner
    //winningChoice = option[randomNum()]
    //debugger
    
    // new! added a correct field to the dataset - its randomly filled on page load with the props of one of the three options
    // this then gives us a "source of truth" for all the comparisons we'd need to do.



    option1.addEventListener('click', function(event){
        checkAnswer(event.target)
    })
    chooseCorrect()
    
    //we need to popupate the main image
    //mainImage.id = mockPieces.option[correctAnswer]
}

initialLoad()

function chooseCorrect(){
    //let randomPick = 'option + randomNum(1,4)
    randomNum = Math.floor(Math.random() * (4 - 1) + 4)
    //console.log(Object.keys(mockPieces.option`{$randomNum}`));
    answerKey = {
        "correct": {
            "objectID": "",
            "artist": "",  
            "image": "url"
          }

          
    }
    
}

function correctAnnouncment() {
    //select our modal dom elements
    const modalObjectTitle = document.getElementById('modal-object-title')
    const modalObjectArtist = document.getElementById('modal-object-artist')
    const modalObjectArtistInsert = document.getElementById('artist-insert')
    const modalObjectYear = document.getElementById('modal-object-year')
    const modalObjectImage = document.getElementById('modal-object-image')
    //replace elements with our correct answer
    modalObjectTitle.textContent = mockPieces.correct.title
    modalObjectArtist.textContent = mockPieces.correct.artist
    modalObjectArtistInsert.textContent = mockPieces.correct.artist
    modalObjectYear.textContent = mockPieces.correct.year
    modalObjectImage.src = mockPieces.correct.image

}