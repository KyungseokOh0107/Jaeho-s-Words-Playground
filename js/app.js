import { getUserId, loadScores } from "./score.js";
import { startGame } from "./game.js";

const themeSelect = document.getElementById("theme-select");
const diffSelect = document.getElementById("difficulty-select");

fetch("data/themes.json")
  .then(res => res.json())
  .then(themes => {
    window.themes = themes;

    Object.keys(themes).forEach(key => {
      const btn = document.createElement("button");
      btn.textContent = themes[key].title;
      btn.onclick = () => selectTheme(key);
      themeSelect.appendChild(btn);
    });
  });

function selectTheme(key) {
  window.currentTheme = themes[key];
  window.currentThemeKey = key;
  diffSelect.hidden = false;
}

document.querySelectorAll("#difficulty-select button").forEach(btn => {
  btn.onclick = () => {
    startGame(
      window.currentThemeKey,
      btn.dataset.diff,
      window.currentTheme
    );
  };
});

// User info
const userInfo = document.getElementById("user-info");
const userId = getUserId();
const scores = loadScores();

userInfo.innerHTML = `<p>User: ${userId}</p><pre>${JSON.stringify(
  scores[userId] || {},
  null,
  2
)}</pre>`;
