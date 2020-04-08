/* eslint-disable no-unused-vars */
import { getGameKey, updateLeaderboard, getLeaderboard } from './leaderboad.mock';

describe('Get gamekey, use gamekey to send score & get score', () => {
  let key = '';
  test('Fetch gamekey', () => {
    const firstResponse = getGameKey();
    firstResponse.then(resp => {
      expect(resp).toMatch(/(Game with ID).*(added)/);
      key = resp.result.slice(14, 34);
    });
  });
  test('Use gamekey to send score', () => {
    const user = 'tester';
    const score = 310;
    const scoring = updateLeaderboard(user, score, key);
    scoring.then(reply => {
      expect(reply).toBe('Leaderboard score created correctly.');
    });
  });
  test('Get score', () => {
    const results = getLeaderboard();
    results.then(result => {
      expect(result.user).toBe('tested');
      expect(result.score).toBe(910);
    });
  });
});