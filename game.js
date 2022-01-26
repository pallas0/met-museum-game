const mainImage = document.querySelector("#main-image");
const option1 = document.querySelector("#objectID-1");
const option2 = document.querySelector("#objectID-2");
const option3 = document.querySelector("#objectID-3");

const score = document.querySelector("#scorekeeper");
const timeLeft = document.querySelector("#timeleft");

const baseSearchParam = "https://collectionapi.metmuseum.org/public/collection/v1/search?medium=Paintings&q=cat&department=13"

function randomNum(max) {
    return Math.floor(Math.random() * max);
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
    console.log(data)
    //this fills in our game pieces with randomly chosen objects
    for (let option in gameOptions) {
        gameOptions[option].objectID = data.objectIDs[randomNum(3)]
        let objectToFind = gameOptions[option].objectID
        console.log(objectToFind)
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
        console.log(data)
    })
}
//console.log(gameOptions)
goSearch()

const mockPieces = {
    "option1": {
        "objectID": 12345, 
        "artist": "Tulip Painter",
        "image": "https://dummyimage.com/600x400/000/fff&text=A+painting+of+tulips"
      },
      "option2": {
          "objectID": 6789, 
          "artist": "Ocean Master",
          "image": "https://dummyimage.com/600x400/000/0011ff&text=A+painting+of+the+ocean"
      },
      "option3": {
          "objectID": 101112, 
          "artist": "Humanist Painter",
          "image": "https://dummyimage.com/600x400/000/ff00fb&text=The+fall+of+man+as+illustrated+by+a+dead+white+guy"
      }
}

function initialLoad() {
    //set the id of each of the board pieces to match the input objectid
    option1.id = mockPieces.option1.objectID
    option2.id = mockPieces.option2.objectID
    option3.id = mockPieces.option3.objectID
    //populate the main image and store the object id as the winner
    //winningChoice = option[randomNum()]
    debugger
    mainImage.id = mockPieces.option[correctAnswer]
    //we need to fill the main image, and then check answers against the main image id
    let correctAnswer = `option${randomNum(3)}`

    option1.addEventListener('click', function(e){
        checkAnswer(event.target)
    })
}