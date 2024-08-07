import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { questionAnswerStatus } from "./questionAnswerStatus";
import QuestionInformations from "./QuestionInformations";
import { questionAnswer } from "./questionAnswer";

export interface QuestionState {
    score: number;
    questionTimer: number;
    questionIndex: number;
    questionAnswersStatus: questionAnswerStatus[];
    questions: QuestionInformations[];
    questionAnswers: questionAnswer[];
}

const initialState: QuestionState = {
    score: 0,
    questionTimer: 0,
    questionIndex: 0,
    questionAnswersStatus: [],
    questions: [],
    questionAnswers: []
};

export const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        addScore: (state, action) => {
          state.score += action.payload;
        },
        changeQuestionTimer: (state, action) => {
            state.questionTimer = action.payload;
        },
        correctQuestionAnswer: (state, action) => {
            state.questionAnswersStatus[action.payload] = questionAnswerStatus.Correct;
        },
        incorrectQuestionAnswer: (state, action) => {
            state.questionAnswersStatus[action.payload] = questionAnswerStatus.Wrong;
        },
        answeringQuestionAnswer: (state, action) => {
            state.questionAnswersStatus[action.payload] = questionAnswerStatus.Answering;
        },
        unansweredQuestionAnswer: (state, action) => {
            state.questionAnswersStatus[action.payload] = questionAnswerStatus.Unanswered;
        },
        changeQuestionAnswersStatus: (state, action) => {
            state.questionAnswersStatus = action.payload;
        },
        changeQuestions: (state, action) => {
            state.questions = action.payload;
        },
        addQuestionAnswer: (state, action) => {
            state.questionAnswers.push(action.payload);
        },
        nextQuestion: (state) => {
          state.questionIndex++;
        },
        resetQuestionsValues: (state) => {
            state.score = 0;
            state.questionTimer = 0;
            state.questionIndex = 0;
            state.questionAnswersStatus = [];
            state.questions = [];
            state.questionAnswers = [];
        }
    }
});

export const { addScore, changeQuestionTimer, correctQuestionAnswer, incorrectQuestionAnswer, answeringQuestionAnswer, unansweredQuestionAnswer,
    changeQuestionAnswersStatus, changeQuestions, addQuestionAnswer, nextQuestion, resetQuestionsValues } = questionSlice.actions;

export const selectScore = (state: RootState) => state.question.score;
export const selectQuestionTimer = (state: RootState) => state.question.questionTimer;
export const selectQuestionAnswers = (state: RootState) => state.question.questionAnswersStatus;
export const selectQuestions = (state: RootState) => state.question.questions;
export const selectAnswerTimers = (state: RootState) => state.question.questionAnswers;
export const selectQuestionIndex = (state: RootState) => state.question.questionIndex;

export default questionSlice.reducer;
