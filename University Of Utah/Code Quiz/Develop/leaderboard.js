
var leaderboard = JSON.parse(localStorage.getItem("leaderboard"));

for(var i=0; i < leaderboard.names.length; i++){
    document.querySelector("#leaderboard").innerHTML += leaderboard.names[i] + "   " + leaderboard.scores[i] + "<br>"
}

var clear = document.querySelector("#clear"); //clear button
clear.addEventListener("click", function clearLocalStorage(){ 
    localStorage.clear();
    leaderboard.innerHTML = "";
}); 
