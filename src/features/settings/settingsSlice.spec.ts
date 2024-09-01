import questionReducer, {
    SettingsState,
    changeThemes,
    changeAmount,
    changeDifficulties,
    changeTimer
  } from './settingsSlice';

  describe('settings reducer', () => {
    const initialState: SettingsState = {
      amount: 10,
      timer: 20,
      themes: [],
      difficulties: []
    };
    it('should handle initial state', () => {
      expect(questionReducer(undefined, { type: 'unknown' })).toEqual({
        amount: 10,
        timer: 20,
        themes: [],
        difficulties: []
      });
    });

    it('should handle amount change', () => {
      const actual = questionReducer(initialState, changeAmount(1));
      expect(actual.amount).toEqual(1);
    });

    it('should handle timer change', () => {
      const actual = questionReducer(initialState, changeTimer(1));
      expect(actual.timer).toEqual(1);
    });

    it('should handle difficulties change', () => {
      const actual = questionReducer(initialState, changeDifficulties(["Beginner"]));
      expect(actual.difficulties).toEqual(["Beginner"]);
    });

    it('should handle themes change', () => {
      const actual = questionReducer(initialState, changeThemes(["Literature"]));
      expect(actual.themes).toEqual(["Literature"]);
    });
  });
