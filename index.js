"use strict";

// build random # function

//query API; https://collectionapi.metmuseum.org/public/collection/v1/objects/${num}

function newRound() {
  // random num generator
  const apiObjectNum = Math.floor(Math.random() * 470000);

  fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${apiObjectNum}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "ObjectID not found") {
        console.log("object not found in API. Re-running function");
        newRound();
      } else if (
        data.primaryImage === "" ||
        data.artistDisplayName === "" ||
        data.accessionYear === "" ||
        data.title === ""
      ) {
        //   console.log("Missing data. Running newRound() again");
        newRound();
      } else {
        console.log(apiObjectNum);
        console.log("image url: ", data.primaryImage);
        console.log("artist name: ", data.artistDisplayName);
        console.log("year: ", data.accessionYear);
        console.log("title: ", data.title);
      }
    });
}

newRound();
