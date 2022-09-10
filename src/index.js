import './index.css';
// import { list, refresh, form } from './globalVariables.js';
// import addNewScore from './addNewScore.js';
// import displayBoardScreen from './displayBoardScreen.js';

const path = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/nYsEAp8XlytWpR931JLX/scores/';
const list = document.getElementById('list');
const refresh = document.querySelector('.refresh');
const form = document.querySelector('form');

const getGameScores = async () => {
  const response = await fetch(path);
  const data = await response.json();
  data.result.sort((a, b) => b.score - a.score);
  return data;
};

const displayBoardScreen = async () => {
  const data = await getGameScores();
  data.result.forEach((e) => {
    const line = document.createElement('li');
    const userName = document.createElement('h4');
    const points = document.createElement('span');

    list.appendChild(line);
    line.append(userName, points);

    userName.textContent = e.user;
    points.textContent = e.score;
  });
};

const addNewScore = async (userName, points) => {
  await fetch(path,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: userName,
        score: points,
      }),
    }).then(() => {
    const added = document.createElement('h5');
    added.classList.add('score-added');
    added.textContent = 'Your score has been added successfully! Click the refresh button to see it on the board';
    form.appendChild(added);
    setTimeout(() => {
      added.remove();
    }, 5000);
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const userName = document.querySelector('.user-name').value;
  const points = document.querySelector('.points').value;
  addNewScore(userName, points);
  form.reset();
});

refresh.addEventListener('click', () => {
  list.innerHTML = null;
  displayBoardScreen();
});

displayBoardScreen();
