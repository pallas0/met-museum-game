"use strict";

const mainImage = document.querySelector("#main-image");
const option1 = document.querySelector("#objectID-1");
const option2 = document.querySelector("#objectID-2");
const option3 = document.querySelector("#objectID-3");

const score = document.querySelector("#scorekeeper");
const timeLeft = document.querySelector("#timeleft");

//option1 = win, option2 and 3 = loss
let gameOption1 = 0;
let gameOption2 = 0;
let gameOption3 = 0;

function newRound() {
  // random number generator

  /*
  // psuedocode:
  1. create array inside newRound() function called objectIdArray[]
  2. Place fetch().then().then() into a new function. Return a randomized object ID, push ID into objectIdArray.
  3. Run function 3 times, so objectIdArray has 3 values
  
  4. pass objectIdArray into a new function, which runs a forEach loop, which passes each index into https://collectionapi.metmuseum.org/public/collection/v1/objects/`${apiObjectNum}`
*/

  // pass 3 objectId's into following array
  const gameChoicesArray = [];

  fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?q=cat&hasImages=true`
    // ${apiObjectNum}`
  )
    .then((res) => res.json())
    .then((data) => {
      const catQueryId = data.objectIDs;
      console.log(catQueryId);
      for (let i = 1; i <= 3; i++) {
        let randomNum = Math.floor(Math.random() * 494);
        debugger;
        gameOption = catQueryId[randomNum];
        // gameChoicesArray.push(catQueryId[randomNum]);
      }
    });
  console.log(gameChoicesArray);

  //   fetch("url")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data[4]);
  //       if (data.message === "ObjectID not found") {
  //         console.log("object not found in API. Re-running function");
  //         newRound();
  //       } else if (
  //         data.primaryImageSmall === "" ||
  //         data.artistDisplayName === "" ||
  //         data.accessionYear === "" ||
  //         data.title === ""
  //       ) {
  //         console.log("Query failed. Running newRound() again");
  //         newRound();
  //       } else {
  //         console.log(apiObjectNum);
  //         console.log("image url: ", data.primaryImageSmall);
  //         console.log("artist name: ", data.artistDisplayName);
  //         console.log("year: ", data.accessionYear);
  //         console.log("title: ", data.title);

  //         mainImage.src = data.primaryImageSmall;
  //         mainImage.style.width = "350px";
  //       }
  //     });
}

newRound();
// scorekeeper.innerText = 0;
