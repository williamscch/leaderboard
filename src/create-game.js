// const newGamePost = {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     name: 'Mortal Kombat',
//   }),
// };

// const createNewGame = async () => {
//   await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', newGamePost).then((response) => response.json());
// };

// Another way to it with the terminal
// curl -X POST -d 'name=Mortal Kombat' https://us-central1-js-capstone-backend.cloudfunctions.net/api/games

// createNewGame();