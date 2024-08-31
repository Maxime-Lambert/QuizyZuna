import { Box, FormControl, Slider, Typography } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { changeTimer } from '../settingsSlice';

export default function TimerField () {
    const dispatch = useAppDispatch();
    const handleChange = (event: Event, newValue: number | number[]) => {
        dispatch(changeTimer(newValue));
    };
    
    const marks = [
      {
        value: 5,
        label: '5',
      },
      {
        value: 10,
        label: '10',
      },
      {
        value: 15,
        label: '15',
      },
      {
        value: 20,
        label: '20',
      },
      {
        value: 25,
        label: '25',
      },
      {
        value: 30,
        label: '30',
      },
      {
        value: 35,
        label: '35',
      },
      {
        value: 40,
        label: '40',
      },
      {
        value: 45,
        label: '45',
      },
      {
        value: 50,
        label: '50',
      },
      {
        value: 55,
        label: '55',
      },
      {
        value: 60,
        label: '60',
      }
    ];
    
    return (
    <Box mt={3} width={"100%"}>
        <FormControl fullWidth size='small'>
          <Typography mb={4} id="input-slider" gutterBottom>
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
            marks={marks}
          />
      </FormControl>
    </Box>
  )
}
