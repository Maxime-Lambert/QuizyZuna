import { Avatar, Box, Button, Card, CardContent, Stack, Tooltip, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectQuestionAnswers, selectAnswerTimers, selectQuestions, selectScore, changeQuestions, resetQuestionsValues } from "../question/questionSlice";
import { questionAnswerStatus } from "../question/questionAnswerStatus";
import { useEffect, useState } from "react";
import { BlockRounded, CheckRounded, ClearRounded, HouseRounded, PlayArrowRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { QuestionInformations } from "../question/QuestionInformations";
import { PieChart, useDrawingArea } from "@mui/x-charts";
import { styled } from '@mui/material/styles';
import useAxios from "../../hooks/useAxios";
import { questionAnswer } from "../question/questionAnswer";

export default function FinalScreen () {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const score = useAppSelector(selectScore);
  const answerStatuses = useAppSelector(selectQuestionAnswers);
  const answers = useAppSelector(selectAnswerTimers);
  const questions = useAppSelector(selectQuestions);

  const [showDetailedScore, setShowDetailedScore] = useState(false);
  const {getQuestionsFunction} = useAxios();
  
  useEffect(() => {
    if(questions.length === 0) {
      navigate('/');
    }
  }, []);
  
  const StyledText = styled('text')(({ theme }) => ({
    fill: "white",
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 32,
  }))
  
  function PieCenterLabel({ children }: { children: React.ReactNode }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }

  function handleGoAgain() {
    getQuestionsFunction()
      .then(res => {
        dispatch(resetQuestionsValues());
        dispatch(changeQuestions(res.data as QuestionInformations[]));
        navigate('/question');
      });
  }
  
  function handleGoHome(): void {
    navigate('/');
  }

  const answerSummary = [];
  if(answers.length > 0) {
    for (let index = 0; index < questions.length; index++) {
      const question = questions[index];
      const answer = answers[index];
      const answerStatus = answerStatuses[index];
      if(showDetailedScore) {
          const correctAnswerScore = 500;
          const maximumAngle = 360;
          const maximumPoints = 1000;
          const endAngle = maximumAngle-(((maximumPoints-answer.pointsScored)/maximumPoints)*maximumAngle);
    
          const dataChart = [
            { value: correctAnswerScore, label: answerStatus === questionAnswerStatus.Unanswered ? 'Non répondu' : 'Réponse Correcte', color:'#1b5e20' },
            { value: answer.pointsScored - correctAnswerScore, label: answerStatus === questionAnswerStatus.Unanswered ? 'Non répondu' : `Temps de réponse : ${answer.answerTimer}s`, color:'green'}
          ]; 
    
          answerSummary.push(
            CreateDetailedAnswerTooltip(index, question, answerStatus, answer, dataChart, endAngle)
        );
      } else {
          answerSummary.push(CreateAnswerSummaryTooltip(index, question, answerStatus, answer));
      }
    }
  }
 
  function ToggleDetailedScore () {
    setShowDetailedScore(!showDetailedScore);
  };

  return (
    <Box>
      <Typography variant="h2" align="center" sx={{
        background:"-webkit-linear-gradient(45deg, #f3b75a 10%, #ed3522 90%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}>{score}</Typography>
      <Button variant="contained" onClick={ToggleDetailedScore}>{showDetailedScore ? 'Score résumé' : 'Score détaillé'}</Button>
      <Card sx={{width:'80vw', marginTop:1, bgcolor:'primary.dark', border:'1px solid', borderColor:'secondary.main'}}>
        <CardContent sx={{display:'flex', flexWrap:'wrap', justifyContent:'flex-start', rowGap:1, columnGap:3}}>
          {answerSummary}
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

  function CreateDetailedAnswerTooltip(index: number, question: QuestionInformations, answerStatus: questionAnswerStatus, answer: questionAnswer, dataChart: { value: number; label: string; color: string; }[], a: number): any {
    return <Card key={index} sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'primary.main', flexBasis: '100%' }}>
      <CardContent>
        <Stack justifyContent={"center"} alignItems="center" direction="row" gap={1}>
          <Typography component="div" align="center" variant="h6">
            Question {index + 1} : {question.title}
          </Typography>
          {answerStatus === questionAnswerStatus.Correct ? <CheckRounded fontSize="large" sx={{ color: 'green' }}></CheckRounded> : answerStatus === questionAnswerStatus.Wrong ? <ClearRounded fontSize="large" color="error"></ClearRounded> : <BlockRounded fontSize="large" sx={{ color: 'gray' }}></BlockRounded>}
        </Stack>
        <Stack mt={1} height={200} direction="row" width="100%" textAlign="center" alignItems={"center"} spacing={2}>
          <Box width={"50%"} display={"flex"} justifyContent={"space-around"} flexWrap={"wrap"} rowGap={2} textAlign={"center"} flexGrow={1}>
            <Typography alignContent={"center"} sx={{ flexBasis: '45%', bgcolor: 'success.main', border: '1px solid', borderColor: 'secondary.main' }}>{question.correctAnswer}</Typography>
            {question.wrongAnswers.map((wrongAnswer, id) => (
              <Typography alignContent={"center"} key={id} sx={{ flexBasis: '45%', bgcolor: wrongAnswer === answer.answerGiven ? 'secondary.main' : 'primary.light', border: '1px solid', borderColor: 'secondary.main' }}>{wrongAnswer}</Typography>
            ))}
          </Box>
          <Box flexGrow={1}>
            <PieChart
              height={160}
              series={[{ data: dataChart, innerRadius: 80, endAngle: a }]}
              slotProps={{
                legend: {
                  labelStyle: {
                    fontSize: 14,
                    fill: 'white'
                  },
                },
              }}>
              <PieCenterLabel>{answer.pointsScored}pts</PieCenterLabel>
            </PieChart>
          </Box>
        </Stack>
      </CardContent>
    </Card>;
  }

  function CreateAnswerSummaryTooltip(index: number, question: QuestionInformations, answerStatus: questionAnswerStatus, answer: questionAnswer): any {
    return <Tooltip key={index} title={<Typography variant="body2" component={"h2"} style={{ whiteSpace: 'pre-line' }}>{`Question : ${question.title} 
                                        Temps de réponse : ${answerStatus === questionAnswerStatus.Unanswered ? 'Non répondu' : answer.answerTimer + 's'} 
                                        Réponse donnée : ${answer.answerGiven ? answer.answerGiven : 'Non répondu'} 
                                        Bonne réponse : ${question.correctAnswer}
                                        Points marqués : ${answer.pointsScored}`}</Typography>}>
      <Avatar sx={{ bgcolor: answerStatus === questionAnswerStatus.Correct ? 'success.light' : answerStatus === questionAnswerStatus.Unanswered ? 'grey' : 'error.light', flex: '0 1 auto' }}>{index + 1}</Avatar>
    </Tooltip>;
  }
}
