import questionReducer, {
    QuestionState,
    addScore
  } from './questionSlice';

  describe('question reducer', () => {
    const initialState: QuestionState = {
      score: 3,
      questionTimer: 20,
      questionIndex: 0,
      questionAnswersStatus: [],
      questions: [],
      questionAnswers: []
    };
    it('should handle initial state', () => {
      expect(questionReducer(undefined, { type: 'unknown' })).toEqual({
        score: 3,
        questionIndex: 0,
        timer: 20,
        answers: [],
        questions: [],
        answerTimers: []
      });
    });

    it('should handle add score', () => {
      const actual = questionReducer(initialState, addScore(1));
      expect(actual.score).toEqual(4);
    });
  });
