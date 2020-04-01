/* eslint-disable consistent-return */
/* eslint-disable no-console */
export default function updateLeaderboard(name, score) {
  (async () => {
    const player = {
      user: name,
      scores: score,
    };
    try {
      const response = await fetch(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/RQ7wTRILVQffKgAUBlO7/scores/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(player),
        },
      );

      const result = await response.json();
      return result;
    } catch (err) {
      console.log('error unable to fetch the data Please try again!');
    }
  })();
}
