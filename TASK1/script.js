const questions = [
  {
    question: "Who was the first President of the United States?",
    options: ["Abraham Lincoln", "George Washington", "John Adams", "Thomas Jefferson"],
    answer: "George Washington",
  },
  {
    question: "Which is the longest river in the world?",
    options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
    answer: "Nile River",
  },
  {
    question: "In which year did World War II end?",
    options: ["1939", "1945", "1942", "1940"],
    answer: "1945",
  },  
  {
    question: "What does 'HTTP' stand for?",
    options: ["HyperText Transfer Protocol", "HighText Transfer Protocol", "HyperText Transmission Protocol", "High Transfer Text Protocol"],
    answer: "HyperText Transfer Protocol",
  },
  {
    question: "Which country has the largest population in the world?",
    options: ["India", "United States", "China", "Russia"],
    answer: "China",
  },
];

let currentQuestionIndex = 0;
let score = 0;

// DOM elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.createElement("p"); // Feedback element
feedbackEl.id = "feedback"; // Assign an ID for styling
quizScreen.appendChild(feedbackEl); // Add feedback element to the quiz screen
const nextBtn = document.getElementById("next-btn");
const resultScreen = document.getElementById("result-screen");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

// Start Quiz
document.getElementById("start-btn").addEventListener("click", () => {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  loadQuestion();
});

// Load Question
function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  optionsEl.innerHTML = ""; // Clear previous options
  feedbackEl.textContent = ""; // Clear previous feedback
  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(option, button));
    optionsEl.appendChild(button);
  });
  nextBtn.classList.add("hidden"); // Hide next button initially
}

// Check Answer
function checkAnswer(selectedOption, button) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.answer) {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    button.style.backgroundColor = "green"; // Highlight correct option
    score++;
  } else {
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
    button.style.backgroundColor = "red"; // Highlight selected option
  }
  disableOptions(); // Prevent multiple clicks
  nextBtn.classList.remove("hidden"); // Show next button
}

// Disable Options
function disableOptions() {
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach((button) => (button.disabled = true));
}

// Next Question
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
});

// End Quiz
function endQuiz() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  scoreEl.textContent = `Your score: ${score}/${questions.length}`;
}

// Restart Quiz
restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});
