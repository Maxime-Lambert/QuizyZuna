import axios from 'axios';
import { useAppSelector } from "../app/hooks";
import { selectAmount, selectDifficulties, selectThemes } from "../features/settings/settingsSlice";

axios.defaults.baseURL = 'https://quizyzuna-api.azurewebsites.net/api/v1/'
const questionThemesEndpoint = 'questions_topics';
const questionDifficultiesEndpoint = 'questions_difficulties';

export default function useAxios () {
    const amount = useAppSelector(selectAmount);
    const difficulties = useAppSelector(selectDifficulties);
    const themes = useAppSelector(selectThemes);

    function getQuestionsFunction() {
      return axios.get(createQuestionsURL());
    }

    function getQuestionsThemesFunction() {
      return axios.get(questionThemesEndpoint);
    }

    function getQuestionsDifficultiesFunction() {
      return axios.get(questionDifficultiesEndpoint);
    }

    function createQuestionsURL() {
      let apiUrl = `questions?amount=${amount}&randomize=true&orderByAscendantDifficulty=true`;
      if (difficulties.length > 0) {
        apiUrl = apiUrl.concat(`&difficulties=${difficulties.join(',')}`);
      }
      if (themes.length > 0) {
        apiUrl = apiUrl.concat(`&themes=${themes.join(',')}`);
      }
      return apiUrl;
    };

    return {getQuestionsThemesFunction, getQuestionsDifficultiesFunction, getQuestionsFunction};
};
