var startButton = document.querySelector("#start");
var ansBtnOne = document.querySelector("#\\30 ");
var ansBtnTwo = document.querySelector("#\\31 ");
var ansBtnThree = document.querySelector("#\\32 ");
var ansBtnFour = document.querySelector("#\\33 ");
var submitScore = document.querySelector("#submit");

var questionArray = [{question:"What is the result of: console.log(4 * (2 + 2) / 8)?",
                    answers:["5", "2", "3", "4"],
                    correct: "2"},
                    {question:"What is the correct structure of a for loop?",
                    answers:["for (var i = 0; i < end; i++)", "for (i++; i < end; var i = 0)", "for (i < end; var i = 0; i++)", "for (var i = 0; i++; i < end)"],
                    correct: "for (var i = 0; i < end; i++)"},
                    {question:"What is the missing value?<br>function addStuff(val1, val2) {<br>var sum =  val1 + 3;<br>return sum + val2;<br>console.log(addStuff(x, y));<br>}<br>Output: 10",
                    answers:["x = 4, y = 7","x = 8, y = 9","x = 4, y = 2","x = 2, y = 5"],
                    correct: "x = 2, y = 5"},
                    {question:"How do you store data locally?",
                    answers:["localStorage(\"varName\", \"value\")","store.Local(\"varName\", \"value\")","localStorage.setItem(\"varName\", \"value\")","localStorage.save(\"varName\", \"value\")"],
                    correct: "localStorage.setItem(\"varName\", \"value\")"}
];

const timeout = async ms => new Promise(res => setTimeout(res, ms));
var sec = 0;
var userAnswer = "";
var nextQuestion = false;

// !!! --- Bind this onLoad() --- !!!
function timer() {
    document.getElementById("timer").style.display = "block";
    sec = 100;
    var timer = setInterval(function() {
        document.getElementById("timerDisplay").innerHTML = "Time remaining: " + sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
            quizOver(false, -1);
        }

    }, 1000);
}

function quizOver(result, score) {
    document.getElementById("questions").style.display = "none";
    document.getElementById("timer").style.display = "none"
    if (result) {
        document.getElementById("resultWin").style.display = "block";

    }
    else {
        document.getElementById("resultLose").style.display = "block";
    }
}

async function awaitAnswer() {
    while (nextQuestion === false) await timeout(50);
    nextQuestion = false;
}

async function displayQuestions() {
    document.getElementById("questions").style.display = "block";
    var questionOrder = [0, 1, 2, 3];
    shuffleArray(questionOrder);
    for (var i = 0; i < questionArray.length; i++) {
        document.getElementById("questionText").innerHTML = questionArray[questionOrder[i]].question;
        shuffleArray(questionArray[questionOrder[i]].answers);
        for (var j = 0; j < questionArray[questionOrder[i]].answers.length; j++)
            document.getElementById(j.toString()).innerHTML = questionArray[questionOrder[i]].answers[j];
        await awaitAnswer();
        await timeout(250);
        console.log("userAnswer:" + userAnswer + "\nCorrectAnswer: " + questionArray[questionOrder[i]].correct);
        if (userAnswer !== questionArray[questionOrder[i]].correct)
            sec -= 10;
    }
    quizOver(true, sec);
}

function getAnswer(event, choice) {
    userAnswer = document.querySelector("#\\3" + choice + " ").textContent;
    nextQuestion = true;
}

function quizStart(event) {
    event.preventDefault();
    document.getElementById("startQuiz").style.display = "none";
    timer();
    displayQuestions();

}

startButton.addEventListener("click", quizStart);
ansBtnOne.addEventListener("click", getAnswer.bind(null, event, 0));
ansBtnTwo.addEventListener("click", getAnswer.bind(null, event, 1));
ansBtnThree.addEventListener("click", getAnswer.bind(null, event, 2));
ansBtnFour.addEventListener("click", getAnswer.bind(null, event, 3));
//submitScore.addEventListener("click", enterName);

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}