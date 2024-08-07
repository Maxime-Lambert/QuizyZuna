import questionReducer, {
    SettingsState,
    changeThemes,
    changeAmount,
    changeDifficulties
  } from './settingsSlice';

  describe('settings reducer', () => {
    const initialState: SettingsState = {
        themes: [],
        difficulties: [],
        amount: 10,
        timer: 20,
    };
    it('should handle initial state', () => {
      expect(questionReducer(undefined, { type: 'unknown' })).toEqual({
        amount: 5,
        themes: [],
        eras: [],
        difficulties: []
      });
    });
  
    it('should handle amount change', () => {
      const actual = questionReducer(initialState, changeAmount(1));
      expect(actual.amount).toEqual(1);
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