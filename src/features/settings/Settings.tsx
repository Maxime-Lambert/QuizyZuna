import ThemesSelectField from "./components/ThemesSelectField"
import DifficultySelectField from "./components/DifficultySelectField"
import AmountField from "./components/AmountField"
import { Alert, Box, Button, Container, FormGroup } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { HouseRounded, PlayArrowRounded } from "@mui/icons-material"
import { useAppDispatch } from "../../app/hooks"
import { changeQuestions, resetQuestionsValues } from "../question/questionSlice"
import TimerField from "./components/TimerField";
import { QuestionInformations } from "../question/QuestionInformations";
import useAxios from "../../hooks/useAxios"
import { AxiosError } from "axios"

export default function Settings () {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const {getQuestionsFunction} = useAxios();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    getQuestionsFunction()
      .then(res => {
        dispatch(resetQuestionsValues());
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
}
