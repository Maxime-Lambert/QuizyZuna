import QuestionInformations from "../question/QuestionInformations"
import ThemesSelectField from "./components/ThemesSelectField"
import DifficultySelectField from "./components/DifficultySelectField"
import AmountField from "./components/AmountField"
import { Alert, Box, Button, Container, FormGroup } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { HouseRounded, PlayArrowRounded } from "@mui/icons-material"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { resetSettings, selectAmount, selectDifficulties, selectThemes } from "./settingsSlice"
import { changeQuestions } from "../question/questionSlice"
import axios, { AxiosError } from "axios"
import { useEffect } from "react"
import TimerField from "./components/TimerField";

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const amount = useAppSelector(selectAmount);
  const difficulties = useAppSelector(selectDifficulties);
  const category = useAppSelector(selectThemes);

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  useEffect(() => {
    axios.defaults.baseURL = 'http://localhost:5215/api/v1/';
    dispatch(resetSettings());
  }, []);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    axios
      .get(createUrl())
      .then(res => {
        dispatch(changeQuestions(res.data as QuestionInformations[]));
        navigate('/question');
      })
      .catch(async err => {
        const axiosError = err as AxiosError;
        const status = axiosError.response?.status;
        const element = document.getElementById('truc');
        element!.style.display = 'block';
        if(status === 400) {
          element!.textContent = 'Aucune question n\'a été trouvée avec ces paramètres, veuillez modifier les critères de recherche';
        } else {
          element!.textContent = 'Il semble que le site ne fonctionne pas, veuillez revenir plus tard';
        }
        await delay(5000);
        element!.style.display = 'none';
      });
  };

  function handleGoHome(): void {
    navigate('/');
  }

  return (
    <Container maxWidth='xs'>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <ThemesSelectField></ThemesSelectField>
            <DifficultySelectField></DifficultySelectField>
            <AmountField></AmountField>
            <TimerField></TimerField>
            <Box mt={2} display={'flex'} justifyContent={'space-around'}>
              <Button variant='contained' onClick={handleGoHome} startIcon={<HouseRounded></HouseRounded>}>
                Accueil
              </Button>
              <Button variant='contained' type="submit" startIcon={<PlayArrowRounded></PlayArrowRounded>}>
              Jouer
              </Button>
            </Box>
            <Alert id="truc" variant="filled" sx={{ display: 'none'}} severity="error">
              This is a filled error Alert.
            </Alert>
          </FormGroup>
        </form>
    </Container>
  )
  
  function createUrl() {
    let apiUrl = `/questions?amount=${amount}&randomize=true&orderByAscendantDifficulty=true`;
    if (difficulties.length > 0) {
      apiUrl = apiUrl.concat(`&difficulties=${difficulties.join(',')}`);
    }
    if (category.length > 0) {
      apiUrl = apiUrl.concat(`&themes=${category.join(',')}`);
    }
    return apiUrl;
  }
}

export default Settings

export {}
