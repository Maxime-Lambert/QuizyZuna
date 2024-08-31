import { PlayArrowRounded, SettingsRounded } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { resetQuestionsValues } from '../question/questionSlice';
import { resetSettings } from '../settings/settingsSlice';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    function handleGoQuestions(): void {
      dispatch(resetQuestionsValues());
      dispatch(resetSettings());
      navigate('/question');
    }

    function handleGoSettings(): void {
      dispatch(resetSettings());
      navigate('/settings');
    }

  return (
    <Container maxWidth='sm'>
      <Typography variant='h5' mb={2} align='center'>Testez votre culture générale en QCM</Typography>
      <Box display={'flex'} justifyContent={'space-around'}>
        <Button onClick={handleGoQuestions} 
            variant="contained" 
            sx={{
                flexBasis: '40%'
              }}
              startIcon={<PlayArrowRounded />}>
            Partie rapide
        </Button>
        <Button onClick={handleGoSettings} 
            variant="contained" 
            sx={{
                flexBasis: '40%'
              }}
              startIcon={<SettingsRounded />}>
            Partie Personalisée
        </Button>
      </Box>
    </Container>
  )
}

export default Home
