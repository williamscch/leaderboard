import './index.css';

const path = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/EWfiKQuijyVR2B4R0w9s/scores/';
const list = document.getElementById('list');

const renderLeaderboar = (data) => {
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

const getGameScores = async () => {
  const response = await fetch(path);
  console.log(response);
  const data = await response.json();
  // data.result.splice(0, 1);
  data.result.sort((a, b) => b.score - a.score);
  console.log(data);
  renderLeaderboar(data);
};

const addNewScore = async (userName, points) => {
  const response = await fetch(path,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: userName,
        score: points,
      }),
    }).then((data) => data.json());

  const data = await response.json();
};

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const userName = document.querySelector('.user-name').value;
  const points = document.querySelector('.points').value;
  addNewScore(userName, points);
  // userName.value = null;
  // points.value = null;
});

getGameScores();
