/* eslint-disable no-undef */

async function getGameKey() {
  try {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: 'Mock Test' }),
      });
    const content = await response.json();
    return content;
  } catch (err) {
    throw new Error();
  }
}

async function updateLeaderboard(name, points, key) {
  try {
    const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: name, score: points }),
      });
    const content = await response.json();
    return content;
  } catch (err) {
    throw new Error('Unable to send score');
  }
}

const sorter = (object) => {
  const scoreArr = [];
  for (let i = 0; i < object.length; i += 1) {
    scoreArr.push([object[i].user, object[i].score]);
  }
  return Array.from(scoreArr).sort((a, b) => b[1] - a[1]);
};

async function getLeaderboard() {
  try {
    const scores = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    const content = await scores.json();
    return sorter(content.result);
  } catch (err) {
    throw new Error('Unable to fetch JSON response');
  }
}

export { getGameKey, updateLeaderboard, getLeaderboard };