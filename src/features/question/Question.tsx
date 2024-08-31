import { Box, Button, CircularProgress, Container, Fade, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { addQuestionAnswer, addScore, answeringQuestionAnswer, changeQuestionAnswersStatus,
  changeQuestions, changeQuestionTimer, correctQuestionAnswer, incorrectQuestionAnswer,
  nextQuestion, selectQuestionAnswers, selectQuestionIndex, selectQuestions, 
  selectQuestionTimer, selectScore, 
  unansweredQuestionAnswer} from "./questionSlice";
import { useNavigate } from "react-router-dom";
import { questionAnswerStatus } from "./questionAnswerStatus";
import React from "react";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { selectTimer } from "../settings/settingsSlice";
import TimerBar from "./timer";
import { QuestionInformations } from "./QuestionInformations";
import useSoundHook from "../../hooks/useSound";
import useAxios from "../../hooks/useAxios";

export default function Question () {
  const maxPointsForCorrectAnswer = 1000;
  const minimumPointsForCorrectAnswer = 500;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const [options, setOptions] = useState<string[]>([]);
  const [answered, setAnswered] = useState(false);
  const [hideTimer, setHideTimer] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [questionTitle, setQuestionTitle] = useState('');

  const {playCorrectSound, playMoneySound, playWrongSound, playTimeOutSound} = useSoundHook();
  const {getQuestionsFunction} = useAxios();

  const questions = useAppSelector(selectQuestions);
  const questionAnswers = useAppSelector(selectQuestionAnswers);
  const questionTimer = useAppSelector(selectQuestionTimer);
  const timerBase = useAppSelector(selectTimer);
  const score = useAppSelector(selectScore);
  const questionIndex = useAppSelector(selectQuestionIndex);

  const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
  function truncate(numToTruncate: number, intDecimalPlaces: number) {    
    var numPower = Math.pow(10, intDecimalPlaces);
    return ~~(numToTruncate * numPower)/numPower;
  };
  
  useEffect(() => {
    if(questions.length === 0) {
      getQuestionsFunction()
        .then(res => {
          dispatch(changeQuestions(res.data as QuestionInformations[]));
        })
    }
  }, [questions, questionIndex]);
  
  useEffect(() => {
    if(questions.length > 0 && questionIndex >= questions.length) {
      navigate('/score');
    }
  }, [questions, questionIndex]);

  useEffect(() => {
    if(questions.length > 0 && questionIndex < questions.length) {
      resetCurrentQuestionValues();
      const question = questions[questionIndex];
      let questionOptions = [...question.wrongAnswers];
      questionOptions.splice(getRandomInt(0, question.wrongAnswers.length), 0, question.correctAnswer);
      const timeToRead = question.title.length * 50 + 1500;
      setTimeout(() => {
        setOptions(questionOptions);
        dispatch(changeQuestionTimer(timerBase));
      }, timeToRead);
    }
  }, [questions, questionIndex]);

  useEffect(() => {
    if(questionIndex === 0 && questions.length > 0) {
      const baseQuestionAnswers = [questionAnswerStatus.Answering];
      for (let index = 1; index < questions.length; index++) {
        baseQuestionAnswers.push(questionAnswerStatus.Unanswered);
      }
      dispatch(changeQuestionAnswersStatus(baseQuestionAnswers));
    }
  }, [questions]);

  useEffect(() => {
    if(questions.length > 0 && questionIndex < questions.length && questionTitle.length < questions[questionIndex].title.length) {
        const intervalId = setInterval(() => {
          setQuestionTitle(questions[questionIndex].title.substring(0,questionTitle.length+1));
        }, 40);
  
        return () => clearInterval(intervalId);
    }
  }, [questions, questionTitle]);

  if(questions.length === 0 || questionIndex > questions.length) {
    return (
      <CircularProgress></CircularProgress>
    )
  }

  if(questionTimer <= 0 && options.length > 0 && !answered && !hideTimer) {
    playTimeOutSound();
    const answer = { answerTimer: timerBase, answerGiven: '', pointsScored: 0 };
    dispatch(addQuestionAnswer(answer));
    dispatch(unansweredQuestionAnswer(questionIndex));
    setAnswered(true);
    const buttons = document.getElementById('answer1')!.parentElement!.children;
    for (let index = 1; index < buttons.length; index++) {
      const buttonCurrent = buttons.item(index) as unknown as HTMLButtonElement;
      const buttonText = buttonCurrent["textContent"];
      buttonCurrent.style.background = buttonText === questions[questionIndex].correctAnswer ? "success" : "primary";
    }
    setTimeout(() => {
      setHideTimer(true);
    }, 500);
  }

  const questionAnswersIcons = [];
  for (let i = 0; i < questionAnswers.length; i++) {
    const currentQuestionAnswer = questionAnswers[i];
    questionAnswersIcons.push(<FiberManualRecordIcon key={i} fontSize="small" sx={{ 
      color: currentQuestionAnswer === questionAnswerStatus.Answering ? "white" : 
              currentQuestionAnswer === questionAnswerStatus.Unanswered ? "grey" : 
              currentQuestionAnswer === questionAnswerStatus.Correct ? "green" : "red", 
      flex: '0 1 5%'}}/>);
  };

  return (
    <Container maxWidth='xl'>
        <Typography variant="h2" align="center" sx={{
          background:"-webkit-linear-gradient(45deg, #f3b75a 10%, #ed3522 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>{score.toLocaleString('en-US', {
          minimumIntegerDigits: 5,
          useGrouping: false
        })}</Typography>
        <Fade in={currentScore>0}>
          <Typography variant="h2" align="center" sx={{
            background:"-webkit-linear-gradient(45deg, #f3b75a 10%, #ed3522 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>+{currentScore}</Typography>
        </Fade>
      <TimerBar goNext={hideTimer}></TimerBar>
      <Box mt={2} display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={"center"}
            sx={{
              backgroundColor: 'primary.main',
              minHeight: '10vh',
              border:  '1px solid #fbc02d'
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
      <Box mt={4} display={"flex"} flexWrap={"wrap"} justifyContent={"center"} rowGap={1}>
        {questionAnswersIcons}
      </Box>
    </Container>
  );

  async function handleClickAnswer (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if(answered || questionTimer <= 0) {
      e.preventDefault();
    } else {
      setAnswered(true);
      const question = questions[questionIndex];
      const buttonClicked = e.target as unknown as HTMLButtonElement;
      const answerClicked = buttonClicked["textContent"];
      const timerProgress = questionTimer > 0 ? (timerBase - questionTimer) / timerBase : 1;
      const pointsScored = truncate(maxPointsForCorrectAnswer-(minimumPointsForCorrectAnswer*timerProgress),0);
      const answer = { answerTimer: truncate(timerBase-questionTimer, 2), 
                        answerGiven: answerClicked ? answerClicked : '',
                        pointsScored: answerClicked === question.correctAnswer ? pointsScored : 0 };
      dispatch(addQuestionAnswer(answer));
      await FlashClickedAnswer(buttonClicked);
      dispatch(changeQuestionTimer(0));
      if (answerClicked === question.correctAnswer) {
        await CorrectAnswerActions(buttonClicked, pointsScored);
      } else {
        WrongAnswerActions(buttonClicked, question);
      }
      await delay(2500);
      if (questionIndex + 1 < questions.length) {
        ResetAnswersBackgroundsAndIncrementQuestionIndex(buttonClicked);
      } else {
        navigate('/score');
      }
    }
  };

  function resetCurrentQuestionValues() {
    setQuestionTitle('');
    setCurrentScore(0);
    setOptions([]);
    setAnswered(false);
    setHideTimer(false);
    dispatch(answeringQuestionAnswer(questionIndex));
  }

  async function FlashClickedAnswer(buttonClicked: HTMLButtonElement) {
    for (let index = 0; index < 5; index++) {
      if (buttonClicked.style.background === 'rgb(251, 192, 45)') {
        buttonClicked.style.background = '#283593';
      } else {
        buttonClicked.style.background = '#fbc02d';
      }
      await delay(150);
    }
    await delay(250);
  }

  async function CorrectAnswerActions(button: HTMLButtonElement, pointsScored: number) {
    playCorrectSound();
    button.style.background = '#1b5e20';
    dispatch(correctQuestionAnswer(questionIndex));
    await delay(1500);
    setCurrentScore(pointsScored);
    playMoneySound();
    dispatch(addScore(pointsScored));
  }

  function WrongAnswerActions(buttonClicked: HTMLButtonElement, question: QuestionInformations) {
    playWrongSound();
    dispatch(incorrectQuestionAnswer(questionIndex));
    const buttons = buttonClicked.parentElement?.children;
    if (buttons !== undefined) {
      for (let index = 1; index < buttons.length; index++) {
        const buttonCurrent = buttons.item(index) as unknown as HTMLButtonElement;
        if (buttonCurrent["textContent"] === question.correctAnswer) {
          buttonCurrent.style.background = '#1b5e20';
        }
      }
    }
  }

  function ResetAnswersBackgroundsAndIncrementQuestionIndex(buttonClicked: HTMLButtonElement) {
    const buttons = buttonClicked.parentElement!.children;
    for (let index = 1; index < buttons.length; index++) {
      const buttonCurrent = buttons.item(index) as unknown as HTMLButtonElement;
      buttonCurrent.style.background = '#283593';
    }
    dispatch(nextQuestion());
  }
};

