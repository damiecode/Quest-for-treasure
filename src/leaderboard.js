const axios = require('axios');

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

module.exports = {
  init: async () => {
    try {
      const response = await axios.post(`${url}/games`, {
        name: 'Quest for treasure.',
      });

      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  },
};
