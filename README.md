# Met Guess

Collaborators:
### Jonathan Potter https://github.com/hariseldon27
### Mike Starr https://github.com/personnamedmike
### Amelia Risner  https://github.com/pallas0

Met Guess

An educational multiple choice game covering the pieces at the Met Museum of Art.  We used HTMl and Javascript to create the application framework and functionality.

We pulled data from the Met's API, at https://metmuseum.github.io/.

The speed of loading is our biggest challenge, and remains our biggest challenge.  To address the issue of loading speed, in the future, we would like to implement a custom loadaing animation to ensure better gameplay and UX experience.  Interacting with the data objects proved to also be challenging for the initial phase of this project.  To ensure consistency in our data set, we had to write logic gates in order to bypass holes in the API.

User begins the game by pressing 'Start the Game' in the pop up window.  They guess one of three potential artists for the artwork displayed, and will have information on the piece returned regardless of response accuracy.  They continue the game by pressing 'next' in the pop up window and answering more questions.  Results are stored in the [correct guesses]/[total score] counter beneath the questions.

You can play the game here.  All features will work, except for the randomized quote feature, which is fetched from a local json-server.  For full functionality, download JSON server, open your Terminal window, and enter the following command: json-server. https://www.npmjs.com/package/json-server.
