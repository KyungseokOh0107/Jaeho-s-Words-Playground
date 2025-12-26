export function getUserId() {
  let id = localStorage.getItem("userId");
  if (!id) {
    id = "user-" + crypto.randomUUID();
    localStorage.setItem("userId", id);
  }
  return id;
}

export function loadScores() {
  return JSON.parse(localStorage.getItem("scores") || "{}");
}

export function saveScore(theme, difficulty) {
  const userId = getUserId();
  const scores = loadScores();

  scores[userId] ??= {};
  scores[userId][theme] ??= {};
  scores[userId][theme][difficulty] =
    (scores[userId][theme][difficulty] || 0) + 1;

  localStorage.setItem("scores", JSON.stringify(scores));
}
