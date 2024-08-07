import { Alert, Box, Button, CircularProgress, Collapse, Container, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { addQuestionAnswer, addScore, answeringQuestionAnswer, changeQuestionAnswersStatus,
  changeQuestions, changeQuestionTimer, correctQuestionAnswer, incorrectQuestionAnswer,
  nextQuestion,
  selectQuestionAnswers, selectQuestionIndex, selectQuestions, selectQuestionTimer, selectScore, unansweredQuestionAnswer } from "./questionSlice";
import { useNavigate } from "react-router-dom";
import { questionAnswerStatus } from "./questionAnswerStatus";
import React from "react";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import useSound from 'use-sound';
import TimerBar from "./timer";
import { selectAmount, selectDifficulties, selectThemes, selectTimer } from "../settings/settingsSlice";
import QuestionInformations from "./QuestionInformations";
import axios from "axios";
import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import { selectVolume } from "../../appSlice";

const maxPointsForCorrectAnswer = 1000;
const minimumPointsForCorrectAnswer = 500;
export const Question = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const questions = useAppSelector(selectQuestions);
  const questionAnswers = useAppSelector(selectQuestionAnswers);
  const questionTimer = useAppSelector(selectQuestionTimer);
  const timerBase = useAppSelector(selectTimer);
  const amount = useAppSelector(selectAmount);
  const difficulties = useAppSelector(selectDifficulties);
  const category = useAppSelector(selectThemes);
  const score = useAppSelector(selectScore);
  const volume = useAppSelector(selectVolume);
  const questionIndex = useAppSelector(selectQuestionIndex);
  
  const correctSound = require("../../assets/610703__oggraphics__good-answer-harp-glissando.wav");
  const wrongSound = require("../../assets/150879__nenadsimic__jazzy-chords.wav");
  const timeoutSound = require("../../assets/715226__pigeonfriend__rejectionincorrecterror.wav");
  const moneySound = require("../../assets/566201__colorscrimsontears__coin-rpg.wav");

  const [playCorrectSound] = useSound(correctSound, { volume:volume });
  const [playWrongSound] = useSound(wrongSound, { volume:volume });
  const [playTimeOutSound] = useSound(timeoutSound, { volume:volume });
  const [playMoneySound] = useSound(moneySound, { volume:volume });

  console.log(volume);
  
  const [options, setOptions] = useState<string[]>([]);
  const [answered, setAnswered] = useState(false);
  const [questionAnswersIcons, setQuestionAnswersIcons] = useState<JSX.Element[]>([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [questionTitle, setQuestionTitle] = useState('');

  const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  function truncate(numToTruncate: number, intDecimalPlaces: number) {    
    var numPower = Math.pow(10, intDecimalPlaces);
    return ~~(numToTruncate * numPower)/numPower;
  }

  useEffect(() => {
    if(questions.length > 0) {
      const question = questions[questionIndex];
      let questionOptions = [...question.wrongAnswers];
      questionOptions.splice(getRandomInt(0, question.wrongAnswers.length), 0, question.correctAnswer);
      setQuestionTitle('');
      const timeToRead = question.title.length * 60 + 1000;
      dispatch(answeringQuestionAnswer(questionIndex));
      setTimeout(() => {
        setOptions(questionOptions);
        dispatch(changeQuestionTimer(timerBase));
      }, timeToRead);
    } else {
      axios.defaults.baseURL = 'http://localhost:5215/api/v1/';
      axios
        .get(createUrl())
        .then(res => {
          dispatch(changeQuestions(res.data as QuestionInformations[]));
        })
    }
  }, [questions, questionIndex]);

  useEffect(() => {
    if(questions.length > 0) {
      const baseQuestionAnswers = [questionAnswerStatus.Answering];
      for (let index = 1; index < questions.length; index++) {
        baseQuestionAnswers.push(questionAnswerStatus.Unanswered);
      }
      dispatch(changeQuestionAnswersStatus(baseQuestionAnswers));
    }
  }, [questions]);

  useEffect(() => {
    if(questions.length > 0) {
      let myQuestionsIcons = []
      for (let i = 0; i < questionAnswers.length; i++) {
        const currentQuestionAnswer = questionAnswers[i];
        myQuestionsIcons.push(<FiberManualRecordIcon key={i} fontSize="small" sx={{ 
          color: currentQuestionAnswer === questionAnswerStatus.Answering ? "white" : 
                  currentQuestionAnswer === questionAnswerStatus.Unanswered ? "grey" : 
                  currentQuestionAnswer === questionAnswerStatus.Correct ? "green" : "red", 
          flex: '0 1 5%'
        }} />)
      };
      setQuestionAnswersIcons(myQuestionsIcons);
    }
  }, [questions, questionAnswers]);

  const handleClickAnswer = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if(answered || questionTimer <= 0) {
      e.preventDefault();
    } else {
      setAnswered(true);
      const question = questions[questionIndex];
      const button = e.target as unknown as HTMLButtonElement;
      const progress = questionTimer > 0 ? (timerBase - questionTimer) / timerBase : 1;
      const pointsScored = truncate(maxPointsForCorrectAnswer-(minimumPointsForCorrectAnswer*progress),0);
      const answer = { answerTimer: truncate(timerBase-questionTimer, 2), answerGiven: button["textContent"] ? button["textContent"] : '',
        pointsScored: button["textContent"] === question.correctAnswer ? pointsScored : 0 };
      dispatch(addQuestionAnswer(answer))
      dispatch(changeQuestionTimer(0));
      for (let index = 0; index < 5; index++) {
        if(button.style.background === 'orange') {
          button.style.background = 'linear-gradient(to right top, #6b00ff, #0200ff)';
        } else {
          button.style.background = 'orange';
        }
        await delay(150);
      }
      await delay(200);
      if (button["textContent"] === question.correctAnswer) {
        playCorrectSound();
        dispatch(correctQuestionAnswer(questionIndex));
        button.style.background = 'green';
        await delay(1500);
        setCurrentScore(pointsScored);
        playMoneySound();
        dispatch(addScore(pointsScored));
      } else {
        const buttons = button.parentElement?.children;
        if(buttons !== undefined) {
          for (let index = 1; index < buttons.length; index++) {
            const buttonCurrent = buttons.item(index) as unknown as HTMLButtonElement;
            if(buttonCurrent["textContent"] === question.correctAnswer) {
              buttonCurrent.style.background = 'green';
            }
          }
        }
        dispatch(incorrectQuestionAnswer(questionIndex));
        playWrongSound();
      }
      if (questionIndex + 1 < questions.length) {
        await delay(2500);
        setCurrentScore(0);
        setAnswered(false);
        const buttons = button.parentElement?.children;
        if(buttons !== undefined) {
          for (let index = 1; index < buttons.length; index++) {
            const buttonCurrent = buttons.item(index) as unknown as HTMLButtonElement;
            buttonCurrent.style.background = 'linear-gradient(to right top, #6b00ff, #0200ff)';
          }
        }
        setOptions([]);
        dispatch(nextQuestion());
      } else {
        await delay(2500);
        setCurrentScore(0);
        setAnswered(false);
        navigate('/score');
      }
    }
  };

  
  function handleGoNextQuestion(): void {
    dispatch(unansweredQuestionAnswer(questionIndex));
    const answer = { answerTimer: truncate(timerBase,2), answerGiven: 'Aucune', pointsScored: 0 };
    dispatch(addQuestionAnswer(answer));
    if (questionIndex + 1 < questions.length) {
      setOptions([]);
      setQuestionTitle('');
      dispatch(nextQuestion());
    } else {
      navigate('/score');
    }
  }

  useEffect(() => {
    if(questions.length > 0) {
      var currentQuestionTitle = questions[questionIndex].title;
      if (questionTitle.length < currentQuestionTitle.length) {
        const intervalId = setInterval(() => {
          setQuestionTitle(currentQuestionTitle.substring(0,questionTitle.length+1));
        }, 60);
  
        return () => clearInterval(intervalId);
      }
    }
  }, [questions, questionTitle]);

  if(questionTimer <= 0 && questions.length > 0 && options.length > 0 && !answered) {
    playTimeOutSound();
  }

  if(questions.length === 0) {
    return (
      <CircularProgress></CircularProgress>
    )
  }

  if(questionTimer <= 0 && questions.length > 0 && options.length > 0 && !answered) {
    return (
      <Container maxWidth='xl'>
      <Typography variant="h5" mt={2} align="right">{score}pts</Typography>
          <Alert 
            severity="warning"
            action={
              <Button variant="contained" size="small" endIcon={<KeyboardDoubleArrowRight/>} onClick={handleGoNextQuestion}>
                Question Suivante
              </Button>
            }
            sx={{mt:5}}
          >
            Le temps a été dépassé.
          </Alert>
          <Box mt={2} display={"flex"} justifyContent={"center"} alignItems={"center"}
            sx={{
              background: 'linear-gradient(to right top, #6b00ff, #0200ff)',
              minHeight: '10vh',
              border:  '1px solid cyan'
            }}>
        <Typography variant="h5"> {questions[questionIndex].title} </Typography>
      </Box>
      <Box mt={2} display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"} rowGap={2} textAlign={"center"} sx={{minHeight: '15vh'}}>
      {options.map( (option, id) => (
        <Button id={`answer${id}`} key={id} 
                onClick={(e) => handleClickAnswer(e)}  
                variant="contained"
                sx={{
                  flex: '0 1 49%',
                  background: option === questions[questionIndex].correctAnswer ? 'green' : 'linear-gradient(to right top, #6b00ff, #0200ff)'
                }}>
          {option}
        </Button>
      ))}
      </Box>
      <Box mt={4} display={"flex"} flexWrap={"wrap"}  justifyContent={"center"} rowGap={1}>
        {questionAnswersIcons}
      </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth='xl'>
      <Typography variant="h2" align="center" sx={{
        background:"-webkit-linear-gradient(45deg, #f3b75a 10%, #ed3522 90%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}>{score.toLocaleString('en-US', {
        minimumIntegerDigits: 5,
        useGrouping: false
      })}</Typography>
      <Collapse in={currentScore > 0}>
        <Typography variant="h2" align="center" sx={{
        background:"-webkit-linear-gradient(45deg, #f3b75a 10%, #ed3522 90%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}>+{currentScore}pts</Typography>
      </Collapse>
      <TimerBar time={timerBase}></TimerBar>
      <Box mt={2} display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={"center"}
            sx={{
              background: 'linear-gradient(to right top, #6b00ff, #0200ff)',
              minHeight: '10vh',
              border:  '1px solid cyan'
            }}>
        <Typography variant="h5"> {questionTitle} </Typography>
      </Box>
      <Box mt={2} display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"} rowGap={2} textAlign={"center"} sx={{minHeight: '15vh'}}>
      {options.map( (option, id) => (
        <Button id={`answer${id}`} key={id} 
                onClick={(e) => handleClickAnswer(e)}  
                variant="contained"
                sx={{
                  flexBasis: '49%'
                }}>
          {option}
        </Button>
      ))}
      </Box>
      <Box mt={4} display={"flex"} flexWrap={"wrap"}  justifyContent={"center"} rowGap={1}>
        {questionAnswersIcons}
      </Box>
    </Container>
  );
  
  function createUrl() {
    let apiUrl = `/questions?amount=${amount}&randomize=true&orderByAscendantDifficulty=true`;
    if (difficulties.length > 0) {
      apiUrl = apiUrl.concat(`&difficulties=${difficulties.join(',')}`);
    }
    if (category.length > 0) {
      apiUrl = apiUrl.concat(`&themes=${category.join(',')}`);
    }
    return apiUrl;
  }

};

export default Question

export {}
