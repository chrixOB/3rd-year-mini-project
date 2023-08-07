const questions = [
    {
        question: "Python is a case sensitive programming language",
        answers: [
            {text: "True", correct: false},
            {text: "False", correct: true},
            {text: "Maybe", correct: false},
            {text: "Sometimes", correct: false},
        ]
    },
    {
        question: "name = 'Charlotte'. this type of variable is a...",
        answers: [
            {text: "String", correct: true},
            {text: "Boolean", correct: false},
            {text: "Float", correct: false},
            {text: "Integer", correct: false},
        ]
    },
    {
        question: "x = 5 \ny = 6\nsum = x + y\nprint(sum)\nWhat wil be the output of the above code?",
        answers: [
            {text: "syntax error", correct: false},
            {text: "1", correct: false},
            {text: "indentation error", correct: false},
            {text: "11", correct: true},
        ]
    },
    {
        question: "Which of \nthe following \nis not a data type in python?",
        answers: [
            {text: "List", correct: false},
            {text: "Array", correct: true},
            {text: "Tuple", correct: false},
            {text: "Float", correct: false},
        ]
    },
    {
        question: "Which data type in python stores only true or false values?",
        answers: [
            {text: "Set", correct: false},
            {text: "Integer", correct: false},
            {text: "String", correct: false},
            {text: "Boolean", correct: true},
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
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

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
    nextButton.innerHTML = "Go To Next Chapter";
    nextButton.style.display = "none";
    //create another button which leads to the next page
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




















