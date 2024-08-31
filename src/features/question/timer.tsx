import { Box, Button, LinearProgress } from "@mui/material";
import { useEffect } from "react";
import { changeQuestionTimer, nextQuestion, selectQuestionTimer } from "./questionSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTimer } from "../settings/settingsSlice";
import { DoubleArrowRounded } from "@mui/icons-material";

export default function TimerBar ({goNext}:{goNext:boolean}) {
  const dispatch = useAppDispatch();
  const timeLeft = useAppSelector(selectQuestionTimer);
  const timerBase = useAppSelector(selectTimer);
  const timePassed = 0.1;
  const intervalTime = 100;
  const timerStartOffset = 1000;

  function HandleGoNextQuestion() {
    dispatch(nextQuestion());
  }

  useEffect(() => {
    if(timeLeft === timerBase) {
      setTimeout(() => {
        if(timeLeft > 0) {
          dispatch(changeQuestionTimer(timeLeft - timePassed));
        }
      }, timerStartOffset);
    } else {
      const intervalId = setInterval(() => {
        dispatch(changeQuestionTimer(timeLeft - timePassed));
      }, intervalTime);
  
      return () => clearInterval(intervalId);
    }
  }, [timeLeft]);

  if(goNext) {
    return(
      <Box mt={5} display={"flex"} justifyContent={"flex-end"}>
        <Button sx={{ height:30 }} variant="contained" onClick={HandleGoNextQuestion} startIcon={<DoubleArrowRounded/>}>
          Question Suivante
        </Button>
      </Box>
    )
  }

  const progress = timeLeft > 0 ? (timerBase - timeLeft) / timerBase : 1;
  const timerColor = timeLeft < (timerBase / 5) ? "error" : timeLeft < (timerBase/2) ? "secondary" : "success";
  const TimerProgressPercentage = 100 - (progress * 100);

  return (
    <Box mt={5}>
      <LinearProgress color={timerColor} sx={{height:30}} variant="determinate" value={TimerProgressPercentage}></LinearProgress>
    </Box>
  );
};
