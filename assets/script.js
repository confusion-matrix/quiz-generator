var startButton = document.querySelector("#start");

var questionArray = [{question:"question",
                    answers:["one","two","three","four"],
                    correct: "one"},
                    {question:"question",
                    answers:["one","two","three","four"],
                    correct: "two"},
                    {question:"question",
                    answers:["one","two","three","four"],
                    correct: "three"}

];

// Bind this onLoad()
function startQuiz() {
    var sec = 90;
    var timer = setInterval(function() {
        document.getElementById("timerDisplay").innerHTML = "00:" + sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
            quizOver();
        }
        if (!displayQuestion(1))
            sec -= 10;
    }, 1000);
}

function quizOver() {
    // Display the end of the quiz

}

function quizStart() {
    // Call this when button is pressed
    startQuiz();
}

function displayQuestion(questionNum) {
    // Display list of questions - make this random
    // Define list of questions in HTML

    // Display the question 1st
    // for index i
    // display question
    // provide choices
    // if selected choice text === ans text
    //    return true/false

    // pass integer to display questions

    document.getElementById("questionText").innerHTML = questionArray[questionNums].question;
    // Shuffle answers
    shuffleArray(questionArray.answers);
    // Display questions after shuffle
    question.answers.forEach((element, i) => {
        document.getElementById(i.toString()).innerHTML = element;
    });
    // Use JQuery to select the element picked
    // What we want here is to be able to get the text the person
    // clicked and then compare that to what is the right answer
    
}

// Event listeners
startButton.addEventListener("click", quizStart);

// Utility Functions

// Durstenfeld shuffle array -- FROM:
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}