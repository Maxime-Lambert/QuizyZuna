import { Box, Container, FormControl, Slider, Typography } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { changeTimer } from '../settingsSlice';

const TimerField = () => {
    const dispatch = useAppDispatch();
    const handleChange = (event: Event, newValue: number | number[]) => {
        dispatch(changeTimer(newValue));
    };
    
    return (
    <Box mt={3} width={"100%"}>
        <FormControl fullWidth size='small'>
          <Typography id="input-slider" gutterBottom>
            Temps de réponse (en secondes)
          </Typography>
          <Slider
            aria-label="Temps de réponse"
            defaultValue={20}
            onChange={handleChange}
            valueLabelDisplay="on"
            shiftStep={10}
            step={1}
            min={5}
            max={60}
          />
      </FormControl>
    </Box>
  )
}

export default TimerField

export {}
