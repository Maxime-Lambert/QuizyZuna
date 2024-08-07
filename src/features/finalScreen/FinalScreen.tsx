import { Avatar, Box, Button, Card, CardContent, Tooltip, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectQuestionAnswers, selectAnswerTimers, selectQuestions, selectScore, changeQuestions, resetQuestionsValues } from "../question/questionSlice";
import { questionAnswerStatus } from "../question/questionAnswerStatus";
import { useEffect, useState } from "react";
import { HouseRounded, PlayArrowRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QuestionInformations from "../question/QuestionInformations";
import { selectAmount, selectDifficulties, selectThemes, selectTimer } from "../settings/settingsSlice";
import { PieChart, useDrawingArea } from "@mui/x-charts";
import { styled } from '@mui/material/styles';

const FinalScreen = () => {
  const score = useAppSelector(selectScore);
  const answerStatuses = useAppSelector(selectQuestionAnswers);
  const answers = useAppSelector(selectAnswerTimers);
  const questions = useAppSelector(selectQuestions);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const amount = useAppSelector(selectAmount);
  const difficulties = useAppSelector(selectDifficulties);
  const category = useAppSelector(selectThemes);
  const timerBase = useAppSelector(selectTimer);
  const [questionAnswersIcons, setQuestionAnswersIcons] = useState<JSX.Element[]>([]);

  function handleGoAgain(): void {
    axios
      .get(createUrl())
      .then(res => {
        dispatch(resetQuestionsValues());
        dispatch(changeQuestions(res.data as QuestionInformations[]));
        navigate('/question');
      });
  }
  

  function handleGoHome(): void {
    navigate('/');
  }

  useEffect(() => {
    if(answers.length > 0 && questions.length > 0 && answerStatuses.length > 0) {
      const answerSummary = [];
      for (let index = 0; index < questions.length; index++) {
        const question = questions[index];
        const answerStatus = answerStatuses[index];
        const answer = answers[index];
        answerSummary.push(
          <Tooltip key={index} title={<Typography variant="body2" component={"h2"} style={{ whiteSpace: 'pre-line' }}>{`Question : ${question.title} 
                                        Temps de réponse : ${answer.answerTimer}s 
                                        Réponse donnée : ${answer.answerGiven} 
                                        Bonne réponse : ${question.correctAnswer}
                                        Points marqués : ${answer.pointsScored}`}</Typography>}>
            <Avatar sx={{bgcolor:answerStatus === questionAnswerStatus.Correct ? 'green' : answerStatus === questionAnswerStatus.Unanswered ? 'black' : '#ba000d', flex: '0 1 auto'}}>{index + 1}</Avatar>
          </Tooltip>
      )};
      setQuestionAnswersIcons(answerSummary);
    }
  }, [answerStatuses, answers, questions]);
  
  const StyledText = styled('text')(({ theme }) => ({
    fill: "white",
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 32,
  }));
  
  function PieCenterLabel({ children }: { children: React.ReactNode }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  };

  var ToggleDetailedScore = function() {
    const answerSummary = [];
    for (let index = 0; index < questions.length; index++) {
      const question = questions[index];
      const answerStatus = answerStatuses[index];
      const answer = answers[index];
      const size = {
        width: 800,
        height: 200,
      };

      const dataChart = [
        { value: 500, label: 'Réponse Correcte' },
        { value: answer.pointsScored - 500, label: `Temps de réponse : ${answer.answerTimer}s`}
      ];
      const a = 360-(((1000-answer.pointsScored)/1000)*360);

      answerSummary.push(
        <Card key={index} sx={{bgcolor:answerStatus === questionAnswerStatus.Correct ? 'green' : answerStatus === questionAnswerStatus.Unanswered ? 'black' : '#ba000d', flex: '1 1 100%'}}>
          <CardContent>
            <Typography variant="h6" align="center">Question {index+1} : {question.title}</Typography>
            <Box mt={2} display={"flex"} alignItems={"center"} justifyContent={"space-around"}>
              <Box mt={2} display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"} rowGap={2} textAlign={"center"} sx={{flexBasis:'50%'}} minHeight={'10vh'}>
                <Box sx={{flexBasis:'49%', background: 'green'}}><Typography>{question.correctAnswer}</Typography></Box>
                {question.wrongAnswers.map( (wrongAnswer, id) => (
                  <Box key={id} sx={{flexBasis:'49%', background: wrongAnswer === answer.answerGiven ? 'orange' : 'linear-gradient(to right top, #6b00ff, #0200ff)'}}><Typography>{wrongAnswer}</Typography></Box>
                ))}
              </Box>
              <PieChart sx={{flexBasis:'50%'}} series={[{ data: dataChart, innerRadius: 80, endAngle:a }]} {...size}>
                <PieCenterLabel>{answer.pointsScored}pts</PieCenterLabel>
              </PieChart>
            </Box>
          </CardContent>
        </Card>
    )};
    setQuestionAnswersIcons(answerSummary);
  };

  return (
    <Box>
      <Typography mb={2} variant="h4" align="center">  Score final : {score}</Typography>
      <Button variant="contained" onClick={ToggleDetailedScore}>Score détaillé</Button>
      <Card>
        <CardContent sx={{display:'flex', flexWrap:'wrap', justifyContent:'flex-start', rowGap:1, columnGap:3, background: 'linear-gradient(to right top, #6b00ff, #0200ff)', border:'1px solid cyan' }}>
          {questionAnswersIcons}
        </CardContent>
      </Card>
      <Box mt={2} display={'flex'} justifyContent={'space-around'}>
        <Button variant='contained' onClick={handleGoHome} startIcon={<HouseRounded></HouseRounded>}>
          Accueil
        </Button>
        <Button variant='contained' onClick={handleGoAgain} startIcon={<PlayArrowRounded></PlayArrowRounded>}>
          Rejouer
        </Button>
      </Box>
    </Box>
  )
  
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
}

export default FinalScreen

export {}
