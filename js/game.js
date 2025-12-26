import { saveScore } from "./score.js";

let questions = [];
let index = 0;
let mode = "";
let themeKey = "";

export function startGame(theme, difficulty, themeData) {
  themeKey = theme;
  mode = difficulty;
  questions = [...themeData.items].sort(() => Math.random() - 0.5);
  index = 0;

  document.getElementById("game").hidden = false;
  loadQuestion();
}

function loadQuestion() {
  if (index >= questions.length) {
    document.getElementById("question-image").src =
      window.currentTheme.clearImage;
    saveScore(themeKey, mode);
    return;
  }

  const q = questions[index];
  document.getElementById("question-image").src = q.image;

  const choicesDiv = document.getElementById("choices");
  const input = document.getElementById("text-input");
  const submit = document.getElementById("submit-text");

  choicesDiv.innerHTML = "";
  input.hidden = true;
  submit.hidden = true;

  if (mode === "Hard") {
    input.hidden = false;
    submit.hidden = false;
    submit.onclick = () => checkAnswer(input.value, q.answer);
  } else {
    let options = [q.answer];

    while (options.length < (mode === "Easy" ? 2 : questions.length)) {
      const rand =
        questions[Math.floor(Math.random() * questions.length)].answer;
      if (!options.includes(rand)) options.push(rand);
    }

    options.sort(() => Math.random() - 0.5);

    options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => checkAnswer(opt, q.answer);
      choicesDiv.appendChild(btn);
    });
  }
}

function checkAnswer(user, correct) {
  if (user.toLowerCase() === correct) {
    index++;
    loadQuestion();
  } else {
    alert("Try again!");
  }
}
