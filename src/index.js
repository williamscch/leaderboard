import './index.css';

const path = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/EWfiKQuijyVR2B4R0w9s/scores/';
const list = document.getElementById('list');
const refresh = document.querySelector('.refresh');
const form = document.querySelector('form');

const getGameScores = async () => {
  const response = await fetch(path);
  // console.log(response);
  const data = await response.json();
  data.result.sort((a, b) => b.score - a.score);
  // console.log(data);
  return data.result;
};

const renderLeaderboard = () => {
  const data = getGameScores();
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
    }, 4000);
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const userName = document.querySelector('.user-name').value;
  const points = document.querySelector('.points').value;
  addNewScore(userName, points);
  userName.value = null;
  points.value = null;
});

refresh.addEventListener('click', () => {
  renderLeaderboard();
});