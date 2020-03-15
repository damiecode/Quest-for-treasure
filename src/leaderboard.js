const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

const createGameKey = async (gameName) => {
  const gameNameJson = JSON.stringify({ name: gameName });
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: gameNameJson,
  });

  const serverObj = await res.json();

  const gameKeyReg = /Game with ID: (.*) added\.$/;
  if (typeof serverObj.result === 'string') {
    const gameKeyRes = serverObj.result.match(gameKeyReg);
    if (gameKeyRes !== null) {
      const gameKey = gameKeyRes[1];
      return gameKey;
    }
  }

  return null;
};

const postUserScore = async (gameKey, user, score) => {
  const gameUrl = url.concat(gameKey).concat('/scores');
  const postJson = JSON.stringify({
    user, score,
  });

  const res = await fetch(gameUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: postJson,
  });

  const serverObj = await res.json();
  return serverObj;
};

const getUserScore = async (gameKey) => {
  const gameUrl = url.concat(gameKey).concat('/scores');
  const res = await fetch(gameUrl, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });

  const serverObj = await res.json();
  return serverObj;
};

const Leaderboard = { createGameKey, postUserScore, getUserScore };

export default Leaderboard;
