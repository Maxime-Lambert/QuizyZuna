import appReducer, {
  AppState,
  changeVolume
} from './appSlice';

describe('settings reducer', () => {
  const initialState: AppState = {
    volume: 0.5,
  };
  it('should handle initial state', () => {
    expect(appReducer(undefined, { type: 'unknown' })).toEqual({
      volume: 0.5,
    });
  });

  it('should handle amount change', () => {
    const actual = appReducer(initialState, changeVolume(1));
    expect(actual.volume).toEqual(1);
  });
});
