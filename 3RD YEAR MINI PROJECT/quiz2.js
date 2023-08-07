const questions = [
    {
        question: "Comments in python begin with what symbol?",
        answers: [
            {text: "!", correct: false},
            {text: "$", correct: false},
            {text: "#", correct: true},
            {text: "%", correct: false},
        ]
    },
    {
        question: "Numeric data type consist of float,complex and .....",
        answers: [
            {text: "String", correct: false},
            {text: "Boolean", correct: false},
            {text: "Complex", correct: true},
            {text: "Tuple", correct: false},
        ]
    },
    {
        question: "To get the length of a string,which of these functions is used?",
        answers: [
            {text: "int()", correct: false},
            {text: "print()", correct: false},
            {text: "type()", correct: false},
            {text: "len()", correct: true},
        ]
    },
    {
        question: "Casting in python means....",
        answers: [
            {text: "Commenting your code", correct: false},
            {text: "Corretion of errors in code", correct: false},
            {text: "Converting one data type to another", correct: true},
            {text: "comparing two variables", correct: false},
        ]
    },
    {
        question: "v = int(23.5). The value of v will be?",
        answers: [
            {text: "syntax error", correct: false},
            {text: "2.35", correct: false},
            {text: "23.5", correct: false},
            {text: "23", correct: true},
        ]
    },
    {
        question: "p = 'WRITER' Print(p[3]) \n What will be the output of this code?",
        answers: [
            {text: "W", correct: false},
            {text: "T", correct: true},
            {text: "R", correct: false},
            {text: "I", correct: false},
        ]
    },
    
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const nextChapButton = document.getElementById("next-chpt");

let currentQuesNum = document.querySelector(".currentQuesNum");
const TotalQuestions = document.querySelector(".TotalQuestions");
const gulf = document.querySelector(".gulf");
const gulf_text = document.getElementById("gulf_text");
//set total questions to questions.length 

let currentQuestionIndex = 0;
let score = 0;

function StartQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    currentQuesNum.innerHTML = currentQuestionIndex + 1;
    TotalQuestions.innerHTML = questions.length;
    questionElement.innerHTML =  currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
    
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
    gulf.style.display = "block";
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

    //checks if we are on the last question and changes "next" to "finish quiz"
    if(currentQuestionIndex === questions.length - 1){
        nextButton.innerHTML = "Finish Quiz"
        nextButton.style.display = "block";
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "play again";
    nextButton.style.display = "none";
    nextChapButton.style.display = "block";
    // hides the gulf of evaluation when the scores is being displayed
    gulf.style.display = "none";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        StartQuiz();
    }
})

StartQuiz();




















