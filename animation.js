
// const loadingDiv = document.getElementById("loading");


if (changeState.textContent = null) {
    showSpinner()
    console.log("changed state")
}

const loadingEl = document.getElementById('animated-loader')

const changeState = document.querySelector(".game-option")

function showSpinner() {
    setTimeout(() => {
        loadingEl.style.display = "block";
    }, 5000);
}

function hideSpinner() {
  loadingEl.style.display = "none";
}