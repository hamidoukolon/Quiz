

//create the question 
var questions = [
    {
        title: "who is the best between this superheroes?",
        choices: ["Superman", "Batman", "Kolon"],
        answer: "Kolon"
    },

    {
        title: "What movie is the best",
        choices: ["Avengers", "BAtaman vs superman", "Avatar"],
        answer: "Avatar"
    },
    {
        title: "What is the best time to post on social media ?",
        choices: ["7am", "7pm", "noon"],
        answer: "noon"
    },
];

//Time setting
//variables

var thetime = document.querySelector("#Thetime");
var startScreen = document.querySelector("#startScreen");
var StartBtn = document.querySelector("#start_time");

var number_ofsecond;
var intervalID;
var qIndex;
var correct = 0, incorrect = 0;
var highScore = localStorage.getItem("highScore")
var highScoreName = localStorage.getItem("highScoreName")

var questionBox = document.querySelector("#questionBox");
var thisQuestion = document.querySelector("#thisQuestion");
var answers = document.querySelector("#answers");
var submitChoice = document.querySelector("#submitChoice");
var scoreboard = document.querySelector("#scoreboard");


//  ======== Start Game =========== //
StartBtn.addEventListener("click", StartQuiz);
ShowScores();
//Start timer
//based my self on dave example in class

function StartQuiz(){
    number_ofsecond = questions.length * 15;
    thetime.textContent = number_ofsecond + " second";

    qIndex = 0;


    StartTimer();

    startScreen.classList.add("hide")
    scoreboard.classList.add("hide")
    questionBox.classList.remove("hide")

    displayQuestion();
}
function StartTimer(){    
    clearInterval(intervalID);
    intervalID = setInterval(function () {
        number_ofsecond--;
        thetime.textContent = number_ofsecond + " second";
        
        if (number_ofsecond <= 0) {
            clearInterval(intervalID);
            ShowScores();
        }
        
    }, 1000);
}
function displayQuestion(){
    var thisQ = questions[qIndex];
    thisQuestion.innerText = thisQ.title;
    answers.innerHTML = "";

    for(var i = 0; i < thisQ.choices.length; i++){
        var choiceBtn = document.createElement("button");
        choiceBtn.innerText = thisQ.choices[i];
        choiceBtn.onclick = handleChoice;
        choiceBtn.setAttribute("value", thisQ.choices[i])

        answers.appendChild(choiceBtn)
    }
}
function handleChoice(){
    var correctAnswer = questions[qIndex].answer;
    var userChoice = this.value;
    
    if(correctAnswer === userChoice){
        console.log('match')
        correct++;
    } else {
        incorrect++;
        console.log("incorrect")
        number_ofsecond -= 5;
    }

    qIndex++;
    if(qIndex < questions.length){
        displayQuestion();
    } else {
        console.log("Out of Questions!");
        ShowScores()
    }
}
function ShowScores(){
    // if(!highScore || highScoreName){
    //     console.log("test")
    //     highScore = 0
    //     highScoreName = ""
    //     localStorage.setItem("highScore", highScore)
    //     localStorage.setItem("highScoreName", highScore)
    // }
    if(correct > highScore){
        var name = prompt("What is your name?")
        highScore = correct;
        localStorage.setItem("highScore", highScore)
        localStorage.setItem("highScoreName", name)
    }
    scoreboard.classList.remove("hide")
    startScreen.classList.remove("hide")
    questionBox.classList.add("hide")

    document.getElementById("winCount").innerText = correct
    document.getElementById("lossCount").innerText = incorrect
    document.getElementById("highScore").innerText = highScore + " " + highScoreName
}

//  change storage to array 
// json parse and stringfire 