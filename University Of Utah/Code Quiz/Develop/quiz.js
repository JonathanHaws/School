
function createQuestion(prompt,answer,a,b,c,d){ // function to make creating questions easier
    return { prompt:prompt, answer:answer, a:a, b:b, c:c, d:d }
}

var questions = []; // questions[]=(createQuestion("","","","","",""));
questions[0]=(createQuestion("What surrounds a string?","c","Square Brackets [ ]","Curly Brackets { }",'Quotation Marks " "', "Nothing"));
questions[1]=(createQuestion("Which compares with loose equality?","b","One Equal Sign =","Two Equal Signs ==","Three Equal Signs ===", "Four Equal Signs ===="));
questions[2]=(createQuestion("Which tells you if a condition is not true?","a","Exclamation Point !","Parrallels ||","Ampersands &&", "Question Mark ?"));
questions[3]=(createQuestion("What will array.splice do?","c","Delete entries only","Insert entries only","Delete and insert entries", "Nothing"));
questions[4]=(createQuestion("What does array.push do?","a","Add to the end of the array","Move every entry","Delete entries of an array", "Nothing"));
questions[5]=(createQuestion("How do you comment code","d","One slash /","Backslash \\","Asterisk *","Two Slashes //"));
questions[6]=(createQuestion("Which compares with strict equality?","c","One Equal Sign =","Two Equal Signs ==","Three Equal Signs ===", "Four Equal Signs ===="));
questions[7]=(createQuestion("What is the symbol for the or opertator?","b","Exclamation Point !","Parrallels ||","Ampersands &&", "Question Mark ?"));
questions[8]=(createQuestion("What is the symbol for the and opertator?","c","Exclamation Point !","Parrallels ||","Ampersands &&", "Question Mark ?"));

var quiz = document.querySelector("#quiz"); // get reference to elements
var clock = document.querySelector("#clock"); 
var prompt = document.querySelector("#prompt"); 
var a = document.querySelector("#a"); 
var b = document.querySelector("#b");
var c = document.querySelector("#c"); 
var d = document.querySelector("#d"); 

function displayQuestion(q){ // updates elements to reflect current question
    prompt.innerHTML = q.prompt; 
    a.innerHTML = q.a;
    b.innerHTML = q.b;
    c.innerHTML = q.c;
    d.innerHTML = q.d;
}

var time = 60; // initial setup
var score = 0;
var question = 0;
displayQuestion(questions[question]);
var tick = setInterval(tick,50);

function tick(){  // loop once every second
    time -= .05;
    clock.innerHTML = Math.floor(time); 
    if(time < 0){ //Quiz Finish
        quiz.innerHTML = "<h1> Good Job! Your score was " + score + "</h1> <h2> Enter Your Initials </h2> <input type='text' maxlength='2'> <a href='./../index.html'><button> Submit </button>";
        clearInterval(tick);
    }
} 

a.addEventListener("click", function a(){ checkAnswer("a")}); // trigger check when one of the options is pressed
b.addEventListener("click", function b(){ checkAnswer("b")}); 
c.addEventListener("click", function c(){ checkAnswer("c")}); 
d.addEventListener("click", function d(){ checkAnswer("d")}); 

function checkAnswer(answer){  
    if (answer == questions[question].answer){
        score += 10;
    } else {
        time -= 10;
    }
    var currentquestion = question; // find a new random question
    while (question == currentquestion){ 
        question = Math.floor(Math.random() * questions.length);
    } 
    displayQuestion(questions[question]);
}

addEventListener("beforeunload", function s(){ saveScore(document.querySelector("input").value, score)}); //Save score before page unloads

function saveScore(initials, score){
    
    var leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    if(leaderboard == null){ var leaderboard = {"names":[],"scores":[]}; } // create board if none exists
    
    var index = 0; // find sorted index to insert new entry 
    while (score < leaderboard.scores[index]) { index++; } 
    
    leaderboard.names.splice(index, 0, initials); // insert
    leaderboard.scores.splice(index, 0, score);  
    
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard)); //replace  
}
