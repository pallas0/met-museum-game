# Met Guess
## An educational game to explore the collection of the Metropolitan Museum of Art
Created as a Phase 1 project for the Flatiron School Software Engineering 15 Week course

| Collaborators: | Responsible for: | 
| ------ | ----- |
| Jonathan Potter https://github.com/hariseldon27 |HTML/CSS, Javascript flow, and Overall Concept | 
| Mike Starr https://github.com/personnamedmike | Core game Javascript logic and mechanics |
| Amelia Risner https://github.com/pallas0 | Javascript/DOM function hookups, quote generator using JSON server |

## Met Guess: What is it?

An educational multiple choice game covering the pieces at the Met Museum of Art.  We used HTMl and Javascript to create the application framework and functionality.

## What it does

The game is built on the Met Collection API (https://metmuseum.github.io/) which allows for open searching of the Met's over 400,000 items in their collection.  The initial fetch returns a selection of options for the user to choose from, one of those options is randomly selected by the game to be the correct answer.  That correct answer is then populated to the main image, and you have to guess which artist created the piece shown in the image.

---

## Challenges
### Data management
Dealing with a large dataset like the Met was uniquely interesting and difficult.  We faced a number of challenges in ensuring our game worked with consistent data:
1. We needed to make sure the options returned from the API had an image
    a. Solved this by using search limiters (hasImage=true etc.) in the initial randomized fetch call.
2. We needed to make sure the options returned from the API had artist information
    a.  We solved this by storing our returned pieces from the API in an object, and if that object had any empty keys we pulled a new piece from the API and used it instead.
3. We needed to make sure that if we accidentally pulled an object that did not contain either of the above, that we hae an extra option on hand just in case.
    a.  This again checks our object that is locally holding the API data, and if any of the keys are blank it initiates a new call to get a new item that does have the right keys.

### Loading Speed
Once we were able to consistently fetch usable data for the game, we had the issue that this took a long time and had to make at least four, but typically more fetch calls to get a locally stored dataset that would work.  

The loading speed introduced a few challenges that slowd the gameplay and UX down so drastically that we implemented a number of tools to help keep the player on page, and unaware of the speed issues.  

Our final UX uses a pair of modal windows to hide the speed issues (one appears when you first visit, and one after you answer) while the game-board is resets with new data.  If you carefully read each part of a modal window, it is unlikely you'll notice the gameboard reset.

> Our final UX uses a pair of modal windows to hide the loading speed issues

Just in case you do click away from the modal window while the game is resetting, I also built out a custom loadin animation that is triggered by our second fetch call, and waits for the DOM to complete populating before it hides itself.  


## External Resources Used
API : https://metmuseum.github.io/
Bootstrap : https://getbootstrap.com/