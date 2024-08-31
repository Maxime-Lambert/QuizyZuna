import { Box, FormControl, Slider, Typography } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { changeAmount } from '../settingsSlice';

export default function AmountField () {
    const dispatch = useAppDispatch();
    const handleChange = (event: Event, newValue: number | number[]) => {
        dispatch(changeAmount(newValue));
    };

    
const marks = [
  {
    value: 1,
    label: '1',
  },
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
  }
];
    
    return (
    <Box mt={3} width={"100%"}>
        <FormControl fullWidth size='small'>
          <Typography id="input-slider" mb={4} gutterBottom>
          Nombre de Questions
          </Typography>
          <Slider
            aria-label="Nombre de Questions"
            defaultValue={10}
            onChange={handleChange}
            valueLabelDisplay="on"
            shiftStep={10}
            step={1}
            min={1}
            max={40}
            marks={marks}
          />
      </FormControl>
    </Box>
  )
}
