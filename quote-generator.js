//this will simply be a data array of quotes - they are randomyl selected and then injected into the HTML in place - if this script gets bazongled it's all good!

let injectpoint = document.getElementById('cheekynote')

const quotes = [
    "'Every artist was first an amateur' – Ralph Waldo Emerson",
    "'Creativity takes courage' – Henri Matisse",
    "'You don't take a photograph, you make it' – Ansel Adams",
    "'We don't make mistakes, just happy little accidents.' – Bob Ross",
    "'Creativity is contagious, pass it on' – Albert Einstein",
    "'A line is a dot that went for a walk.' – Paul Klee",
    "'The job of the artist is always to deepen the mystery' -Francis Bacon",
    "Lesser artists borrow, great artists steal.' -Igot Stravinsky",
    "'Art is the most beautiful of all lies.' -Claude Debussy"


]

let randomNum = Math.floor(Math.random() * arry.length);

function gimme(arry){
    return arry[randomNum]
}
//gimme(quotes)

injectpoint.innerText = gimme(quotes)