"use strict";

// build random # function

//query API; https://collectionapi.metmuseum.org/public/collection/v1/objects/${num}

function newRound() {
  // random num generator
  const apiObjectNum = Math.floor(Math.random() * 470000);
  console.log(apiObjectNum);
  fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${apiObjectNum}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "ObjectID not found") {
        console.log(data.message);
        console.log(`running newRound() again`);
        newRound();
      } else {
        console.log(data);
        if (
          data.primaryImage === "" ||
          data.artistDisplayName === "" ||
          data.accessionYear === ""
        ) {
          console.log("Missing data. Running newRound() again");
          newRound();
        } else {
          console.log(data.primaryImage);
          console.log(data.artistDisplayName);
          console.log(data.accessionYear);
        }
      }
    });
}

newRound();
