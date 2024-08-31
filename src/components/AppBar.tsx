import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { HouseRounded, VolumeDown, VolumeUp } from '@mui/icons-material';
import { Stack, Slider } from '@mui/material';
import { useAppDispatch } from '../app/hooks';
import { changeVolume } from '../appSlice';
import { useNavigate } from 'react-router-dom';
import { resetQuestionsValues } from '../features/question/questionSlice';

export default function ButtonAppBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleGoHome(): void {
    dispatch(resetQuestionsValues());
    navigate('/');
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    dispatch(changeVolume(newValue as number/ 100));
  };

  return (
    <Box sx={{flexGrow: 1 }}>
      <AppBar position="absolute">
        <Toolbar variant='dense'>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleGoHome}
            sx={{ mr: 2 }}
          >
            <HouseRounded />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            QuizyZuna
          </Typography>
          <Box sx={{ width: 200 }}>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
              <VolumeDown />
              <Slider aria-label="Volume" defaultValue={50} onChange={handleChange} />
              <VolumeUp />
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )};
