"use strict";

const mainImage = document.querySelector("#main-image");
const option1 = document.querySelector("#objectID-1");
const option2 = document.querySelector("#objectID-2");
const option3 = document.querySelector("#objectID-3");

const score = document.querySelector("#scorekeeper");
const timeLeft = document.querySelector("#timeleft");

//option1 = win, option2 and 3 = loss
// let gameOption1;
// let gameOption2;
// let gameOption3;

const gameChoicesObj = {
  gameOption1: { objectId: "" },
  gameOption2: { objectId: "" },
  gameOption3: { objectId: "" },
};
// console.log(gameChoicesObj);
console.log(gameChoicesObj);
console.log(gameChoicesObj.gameOption1);
console.log(gameChoicesObj.gameOption1["objectId"]);

function newRound() {
  // random number generator
  //   let randomNum = Math.floor(Math.random() * 494);

  fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?q=cat&hasImages=true`
    // ${apiObjectNum}`
  )
    .then((res) => res.json())
    .then((data) => {
      const catQueryId = data.objectIDs;
      //   console.log(catQueryId);
      for (let gameChoice in gameChoicesObj) {
        gameChoicesObj[gameChoice].objectId =
          catQueryId[Math.floor(Math.random() * 494)];
      }
      console.log(gameChoicesObj);
    });

  /*
    const gameChoicesObj = {
  gameOption1: { objectId: "" },
  gameOption2: { objectId: "" },
  gameOption3: { objectId: "" },
};
 */

  /*
  1. run randomNum generator 1-3
  2. pass that number into gameChoicesObj[`gameOption${num}`], to populate DOM
  3. For correct choice, pass in ".winner" class attribute into <li>
  4. run if else statement, if other numbers are != randomNum, then only use that to fill in options2 and 3
  */
  const indexCorrect = Math.floor(Math.random() * (4 - 1) + 1);

  console.log(gameChoicesObj.gameOption1.objectId);

  fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${
      gameChoicesObj[`gameOption${indexCorrect}`].objectId
    }`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      //   if (data.message === "ObjectID not found") {
      //     console.log("object not found in API. Re-running function");
      //     newRound();
      //   } else if (
      //     data.primaryImageSmall === "" ||
      //     data.artistDisplayName === "" ||
      //     data.accessionYear === "" ||
      //     data.title === ""
      //   ) {
      //     console.log("Query failed. Running newRound() again");
      //     newRound();
      //   } else {
      //     console.log(apiObjectNum);
      //     console.log("image url: ", data.primaryImageSmall);
      //     console.log("artist name: ", data.artistDisplayName);
      //     console.log("year: ", data.accessionYear);
      //     console.log("title: ", data.title);

      //     mainImage.src = data.primaryImageSmall;
      //     mainImage.style.width = "350px";
      //   }
    });
}

newRound();
// scorekeeper.innerText = 0;
