export default class Scores {
  getScore() {
    return this.score;
  }

  setScore(score) {
    this.score = score;
  }

  getPlayerName() {
    return this.name;
  }

  updateScore() {
    this.scoreText.setText(`Score: ${this.score}`);
  }

  async uploadScore() {
    const player = {
      user: this.getPlayerName(),
      score: this.getScore(),
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
      return err;
    }
  }
}
