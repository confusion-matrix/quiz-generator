var startButton = document.querySelector("#start");
var ansBtnOne = document.querySelector("#\\30 ");
var ansBtnTwo = document.querySelector("#\\31 ");
var ansBtnThree = document.querySelector("#\\32 ");
var ansBtnFour = document.querySelector("#\\33 ");
var submitScore = document.querySelector("#submit");

var questionArray = [{question:"questionOne",
                    answers:["one","two","three","four"],
                    correct: "one"},
                    {question:"questionTwo",
                    answers:["one","two","three","four"],
                    correct: "two"},
                    {question:"questionThree",
                    answers:["one","two","three","four"],
                    correct: "three"},
                    {question:"questionFour",
                    answers:["one","two","three","four"],
                    correct: "four"}
];

const timeout = async ms => new Promise(res => setTimeout(res, ms));
var sec = 0;
var userAnswer = "";
var nextQuestion = false;

// !!! --- Bind this onLoad() --- !!!
function timer() {
    sec = 90;
    var timer = setInterval(function() {
        document.getElementById("timerDisplay").innerHTML = "00:" + sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
            quizOver(false, -1);
        }

    }, 1000);
}

function quizOver(result, score) {
    document.getElementById("questions").style.display = "none";
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
    quizOver(true);
}

function getAnswer(event, choice) {
    userAnswer = document.querySelector("#\\3" + choice + " ").textContent;
    console.log("USER ANSWER: " + userAnswer);
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