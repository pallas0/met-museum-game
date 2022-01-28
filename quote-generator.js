//this will simply be a data array of quotes - they are randomyl selected and then injected into the HTML in place - if this script gets bazongled it's all good!

let injectpoint = document.getElementById('cheekynote')


function quotePost() {
    fetch("http://localhost:3000/quotes")
    .then(response => response.json())
    .then((data) => {
            insertQuotes(data);
        })

    }

function insertQuotes(data) {
    let quoteRando = Math.floor(Math.random() * data.length);
    injectpoint.innerText = data[quoteRando]
}

quotePost()


