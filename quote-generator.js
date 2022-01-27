//this will simply be a data array of quotes - they are randomyl selected and then injected into the HTML in place - if this script gets bazongled it's all good!

const quotes = [
    "'Every artist was first an amateur' – Ralph Waldo Emerson",
    "'Creativity takes courage' – Henri Matisse",
    "'You don't take a photograph, you make it' – Ansel Adams",
    "'We don't make mistakes, just happy little accidents.' – Bob Ross",
    "'Creativity is contagious, pass it on' – Albert Einstein",
    


]

let randomNum = Math.floor(Math.random() * arry.length);

function gimmeQuote(arry){
    return arry[randomNum]
}
gimmeQuote(arry)