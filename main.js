const questions = [
  {
    question: "Qual linguagem usamos para estruturar páginas da web?",
    answers: [
      { text: "HTML", correct: true },
      { text: "CSS", correct: false },
      { text: "Java", correct: false },
      { text: "Python", correct: false }
    ]
  },
  {
    question: "Qual linguagem serve para estilizar o site?",
    answers: [
      { text: "CSS", correct: true },
      { text: "HTML", correct: false },
      { text: "JavaScript", correct: false },
      { text: "C++", correct: false }
    ]
  },
  {
    question: "Qual linguagem dá interatividade ao site?",
    answers: [
      { text: "JavaScript", correct: true },
      { text: "CSS", correct: false },
      { text: "HTML", correct: false },
      { text: "Ruby", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Próxima";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(button, answer.correct));
    answersElement.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answersElement.firstChild) {
    answersElement.removeChild(answersElement.firstChild);
  }
}

function selectAnswer(button, correct) {
  if (correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  Array.from(answersElement.children).forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === "HTML" && questions[currentQuestionIndex].question.includes("estruturar")) {
      btn.classList.add("correct");
    }
    if (btn.innerText === "CSS" && questions[currentQuestionIndex].question.includes("estilizar")) {
      btn.classList.add("correct");
    }
    if (btn.innerText === "JavaScript" && questions[currentQuestionIndex].question.includes("interatividade")) {
      btn.classList.add("correct");
    }
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerText = Você acertou ${score} de ${questions.length} perguntas!;
  nextButton.innerText = "Reiniciar";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();