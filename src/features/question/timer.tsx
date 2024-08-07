import { Box } from "@mui/material";
import { useEffect } from "react";
import { changeQuestionTimer, selectQuestionTimer } from "./questionSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const TimerBar = ({ time } : {time:number}) => {
    const dispatch = useAppDispatch();
    const timeLeft = useAppSelector(selectQuestionTimer);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(changeQuestionTimer(timeLeft - 0.1));
    }, 100);

    return () => clearInterval(intervalId);
  }, [timeLeft, dispatch]);

  const progress = timeLeft > 0 ? (time - timeLeft) / time : 1;

  return (
    <Box mt={5}>
      <Box sx={{ 
        background: 'linear-gradient(to right, #f0ff00, #ff0000)',
            width: `${100 - (progress * 100)}%`,
            minHeight: 20 }}>
      </Box>
    </Box>
  );
};

export default TimerBar;

export {}
