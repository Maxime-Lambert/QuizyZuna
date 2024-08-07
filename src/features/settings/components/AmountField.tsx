import { Box, FormControl, Slider, TextField, Tooltip, Typography } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { changeAmount } from '../settingsSlice';

const AmountField = () => {
    const dispatch = useAppDispatch();
    const handleChange = (event: Event, newValue: number | number[]) => {
        dispatch(changeAmount(newValue));
    };
    
    return (
    <Box mt={3} width={"100%"}>
        <FormControl fullWidth size='small'>
          <Typography id="input-slider" gutterBottom>
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
          />
      </FormControl>
    </Box>
  )
}

export default AmountField

export {}
