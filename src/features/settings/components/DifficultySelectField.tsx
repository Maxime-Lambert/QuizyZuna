import { Box, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { changeDifficulties } from '../settingsSlice';
import { useAppDispatch } from '../../../app/hooks';
import { useTranslation } from 'react-i18next';
import useAxios from '../../../hooks/useAxios';

export default function DifficultySelectField () {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [difficultyOptions, setDifficultyOptions] = useState<string[]>([]);

  const {getQuestionsDifficultiesFunction} = useAxios();
  
  useEffect(() => {
    getQuestionsDifficultiesFunction()
      .then(difficultiesResponse => { setDifficultyOptions(difficultiesResponse.data as string[]); setDifficulties(difficultiesResponse.data as string[]); })
      .catch(err => {
        return (
          <Typography variant="h6" mt={20} color={"red"}>
            Une erreur s'est produite
          </Typography>
        )});
  }, []);

  const handleDifficultySelection = (event: SelectChangeEvent<typeof difficulties>) => {
    const {
      target: { value },
    } = event;
    setDifficulties(
      typeof value === 'string' ? value.split(',') : value,
    );
    dispatch(changeDifficulties(value));
  };

  const EmptyBox = difficultyOptions.length % 2 === 1 ? <Box sx={{background:'#283593', flexBasis:'50%'}}></Box> : null;

  return (
    <Box mt={3} width={"100%"}>
        <FormControl size='small' fullWidth>
            <InputLabel> Difficultés </InputLabel>
            <Tooltip title={<Typography variant="body2">{`Sélectionnez les difficultés de questions qui vous intéressent.`}</Typography>} placement='right'>
              <Select multiple
                      color='primary'
                      value={difficulties} 
                      label='Difficultés' 
                      onChange={handleDifficultySelection} 
                      renderValue={(selected) => (<Typography> {selected.map(sel => t(sel)).join(', ')} </Typography> )}>
                          { difficultyOptions.map((difficulty) => (
                            <MenuItem key={difficulty} value={difficulty} sx={{flexBasis:'50%'}}>
                              <Checkbox checked={difficulties.indexOf(difficulty) > -1} />
                              <ListItemText primary={t(difficulty)} />
                            </MenuItem>
                        ))}
                        {EmptyBox}
              </Select>
            </Tooltip>
        </FormControl>
    </Box>
  )
};
