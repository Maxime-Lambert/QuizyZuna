import { Box, Checkbox, CircularProgress, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { changeDifficulties } from '../settingsSlice';
import { useAppDispatch } from '../../../app/hooks';
import useAxios from '../../../hooks/useAxios';
import { useTranslation } from 'react-i18next';

const DifficultySelectField = () => {
  const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [difficulties, setDifficulties] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof difficulties>) => {
      const {
        target: { value },
      } = event;
      setDifficulties(
        typeof value === 'string' ? value.split(',') : value,
      );
      dispatch(changeDifficulties(value));
    };
  
    const { response, error, loading } = useAxios({ url : "questions_difficulties" })
  
    const difficultyOptions = response as string[];

    useEffect(() => {
      if(Array.isArray(difficultyOptions)) {
        setDifficulties(difficultyOptions);
      }
    }, [difficultyOptions]);
  
    if(loading) {
      return (
        <Box mt={20}>
          <CircularProgress></CircularProgress>
        </Box>
      )
    }
  
    if(error) {
      return (
        <Typography variant="h6" mt={20} color={"red"}>
          Something Went Wrong !
        </Typography>
      )
    }

    const EmptyBox = difficultyOptions.length % 2 === 1 ? <Box sx={{background:'linear-gradient(to right top, #6b00ff, #0200ff)', flexBasis:'50%'}}></Box> : null;

  return (
    <Box mt={3} width={"100%"}>
        <FormControl size='small' fullWidth>
            <InputLabel> Difficultés </InputLabel>
            <Tooltip arrow title={<Typography variant="body2">{`Sélectionnez les difficultés de questions qui vous intéressent.`}</Typography>} placement='right'>
              <Select multiple 
                      value={difficulties} 
                      label='Difficultés' 
                      onChange={handleChange} 
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

export default DifficultySelectField;

export {}
