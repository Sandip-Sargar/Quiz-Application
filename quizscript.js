const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "Madrid", "Rome"],
        correct: 0
    },
    {
        question: "Which is the largest planet in our solar system?",
        options: ["Earth", "Jupiter", "Mars", "Saturn"],
        correct: 1
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Shakespeare", "Hemingway", "Tolkien", "Dickens"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const totalEl = document.getElementById("total");

function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        showResult();
        return;
    }

    let quizItem = quizData[currentQuestion];
    questionEl.textContent = quizItem.question;
    optionsEl.innerHTML = "";

    quizItem.options.forEach((option, index) => {
        let button = document.createElement("button");
        button.classList.add("option-btn");
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsEl.appendChild(button);
    });

    nextBtn.style.display = "none";
}

function checkAnswer(selectedIndex) {
    let correctIndex = quizData[currentQuestion].correct;
    let buttons = document.querySelectorAll(".option-btn");

    buttons.forEach((button, index) => {
        if (index === correctIndex) {
            button.classList.add("correct");
        } else {
            button.classList.add("wrong");
        }
        button.disabled = true;
    });

    if (selectedIndex === correctIndex) {
        score++;
    }

    nextBtn.style.display = "block";
}

function nextQuestion() {
    currentQuestion++;
    loadQuestion();
}

function showResult() {
    document.getElementById("quiz").classList.add("hidden");
    resultEl.classList.remove("hidden");
    scoreEl.textContent = score;
    totalEl.textContent = quizData.length;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    resultEl.classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    loadQuestion();
}

nextBtn.addEventListener("click", nextQuestion);
loadQuestion();
