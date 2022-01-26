"use strict";

const mainImage = document.querySelector("#main-image");
const option1 = document.querySelector("#objectID-1");
const option2 = document.querySelector("#objectID-2");
const option3 = document.querySelector("#objectID-3");

const score = document.querySelector("#scorekeeper");
const timeLeft = document.querySelector("#timeleft");

const gameChoicesObj = {
  gameOption1: {
    objectId: "123",
    artist: "picasso",
    src: "google.com",
    winner: "false",
  },
  gameOption2: {
    objectId: "456",
    artist: "monet",
    src: "yahoo.com",
    winner: "false",
  },
  gameOption3: {
    objectId: "789",
    artist: "michaelangelo",
    src: "msn.com",
    winner: "false",
  },
};

function newRound() {
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

  const indexCorrect = Math.floor(Math.random() * (4 - 1) + 1);

  let gameOptionRand = gameChoicesObj[`gameOption${indexCorrect}`].objectId;

  fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${gameOptionRand}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      if (data.message === "ObjectID not found") {
        console.log("object not found in API. Re-running function");
        newRound();
      } else if (
        data.primaryImageSmall === "" ||
        data.artistDisplayName === "" ||
        data.accessionYear === "" ||
        data.title === ""
      ) {
        console.log("Query failed. Running newRound() again");
        newRound();
      } else {
        console.log("image url: ", data.primaryImageSmall);
        console.log("artist name: ", data.artistDisplayName);
        console.log("year: ", data.accessionYear);
        console.log("title: ", data.title);

        mainImage.src = data.primaryImageSmall;
        mainImage.style.width = "350px";
      }
    });
}

newRound();
// scorekeeper.innerText = 0;
