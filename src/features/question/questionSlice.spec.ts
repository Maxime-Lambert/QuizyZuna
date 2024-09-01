import questionReducer, {
    QuestionState,
    addScore
  } from './questionSlice';

  describe('question reducer', () => {
    const initialState: QuestionState = {
      score: 0,
      questionTimer: 0,
      questionIndex: 0,
      questionAnswersStatus: [],
      questions: [],
      questionAnswers: []
    };
    it('should handle initial state', () => {
      expect(questionReducer(undefined, { type: 'unknown' })).toEqual({
        score: 0,
        questionTimer: 0,
        questionIndex: 0,
        questionAnswersStatus: [],
        questions: [],
        questionAnswers: []
      });
    });

    it('should handle add score', () => {
      const actual = questionReducer(initialState, addScore(444));
      expect(actual.score).toEqual(444);
    });
  });
