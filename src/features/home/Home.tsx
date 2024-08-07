import { PlayArrowRounded, SettingsRounded } from '@mui/icons-material';
import { Box, Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { resetQuestionsValues } from '../question/questionSlice';
import { resetSettings } from '../settings/settingsSlice';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(resetSettings());
      dispatch(resetQuestionsValues());
    }, []);

    function handleGoQuestions(): void {
      navigate('/question');
    }

    function handleGoSettings(): void {
      navigate('/settings');
    }

  return (
    <Container maxWidth='sm'>
      <Box display={'flex'} justifyContent={'space-around'} columnGap={5}>
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
